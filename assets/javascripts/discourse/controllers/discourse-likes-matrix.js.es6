import { avatarUrl } from "discourse/lib/utilities";
import loadScript from "discourse/lib/load-script";
import Controller from "@ember/controller";

export default Controller.extend({
  loadChart(users) {
    loadScript("/javascripts/Chart.min.js").then(() => {
      Ember.run.schedule("afterRender", () => {
        const likesMatrixData = users.map(m => {
          return {
            x: m.likes_given,
            y: m.likes_received,
            __meta: {
              id: m.id,
              likesGiven: m.likes_given,
              likesReceived: m.likes_received,
              username: m.username,
              avatarTemplate: m.avatar_template
            }
          };
        });

        const scatterChartData = {
          datasets: [
            {
              label: "Likes Received / Likes given",
              backgroundColor: "#0084ff",
              data: likesMatrixData,
              pointRadius: likesMatrixData.map(() => 18),
              pointHoverRadius: likesMatrixData.map(() => 18),
              pointHitRadius: likesMatrixData.map(() => 18),
              pointStyle: likesMatrixData.map(x => {
                const img = document.createElement("IMG");
                img.width = 36;
                img.height = 36;
                img.src = avatarUrl(x.__meta.avatarTemplate, "tiny");
                return img;
              })
            }
          ]
        };

        var ctx = document
          .getElementById("discourse-likes-matrix-canvas")
          .getContext("2d");
        window.myScatter = new window.Chart.Scatter(ctx, {
          data: scatterChartData,
          options: {
            scales: {
              xAxes: [
                {
                  type: "logarithmic",
                  ticks: {
                    display: false,
                    userCallback: function(tick) {
                      return tick.toString();
                    }
                  },
                  scaleLabel: {
                    labelString: "Likes Given",
                    display: true
                  }
                }
              ],
              yAxes: [
                {
                  type: "logarithmic",
                  ticks: {
                    display: false,
                    userCallback: function(tick) {
                      return tick.toString();
                    }
                  },
                  scaleLabel: {
                    labelString: "Likes Received",
                    display: true
                  }
                }
              ]
            },
            tooltips: {
              callbacks: {
                label: function(tooltipItem, chartData) {
                  const dataset = chartData.datasets[tooltipItem.datasetIndex];
                  const tooltipData = dataset.data[tooltipItem.index];
                  const user = tooltipData.__meta;
                  return `${user.username} given: ${
                    user.likesGiven
                  } received: ${user.likesReceived}`;
                }
              }
            }
          }
        });
      });
    });
  }
});
