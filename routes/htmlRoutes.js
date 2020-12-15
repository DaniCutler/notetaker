var path = require("path");

// module exports
module.exports = function(app) {

  // GET Requests
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

  // CSS Link
  app.get("/styles", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/css/styles.css"));
  });

  // Go home if cannot find route
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });
};