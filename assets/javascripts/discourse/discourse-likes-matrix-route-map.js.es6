export default function() {
  this.route("discourse-likes-matrix", { path: "/likes-matrix" }, function() {
    this.route("index", { path: "/" });
  });
}
