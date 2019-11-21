// Dependencies
// =============================================================

// Grabbing our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the burgers
  app.get("/", function(req, res) {
    db.burgers.findAll({}).then(function(data) {
        var burgerObject = {
            burgers:data
        };
        res.render("index", burgerObject);
    });
  });

  // POST route for saving a new burger
  app.post("/", function(req, res) {
    console.log(req.body);
    db.burgers.create({
        burger_name: req.body.burger_name,
        devoured: 0
    }).then(function() {
        res.redirect("/");
    });
  });

  // PUT route for updating burgers. 
  app.put("/:id", function(req, res) {
    db.burgers.update(req.body,
      {
        where: {
          id: req.params.id
        }
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // DELETE route for deleting burgers. You can access the burgers's id in req.params.id
  app.delete("/:id", function(req, res) {
    db.burgers.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

};