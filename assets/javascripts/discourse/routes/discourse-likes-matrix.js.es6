import { ajax } from "discourse/lib/ajax";
import DiscourseRoute from "discourse/routes/discourse";

export default DiscourseRoute.extend({
  controllerName: "discourse-likes-matrix",

  model() {
    return ajax("/likes-matrix.json");
  },

  setupController(controller, model) {
    controller.loadChart(model.discourse_likes_matrix);
  }
});
