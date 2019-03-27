const express = require("express");

const db = require("./cohortsModel");

const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => {
      res.status(500).json({ message: "The cohorts could not be retrieved!" });
    });
});

// GET a cohort object with the specified id ----------

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.getById(id)
    .then(cohort => {
      if (cohort) {
        res.status(200).json(cohort);
      } else {
        res.status(404).json({
          message: "The cohort with the specified id could not be found!"
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "This cohort could not be retrieved!" });
    });
});

// POST will create a cohort object ----------

router.post("/", (req, res) => {
  const newCohort = req.body;

  if (newCohort.name) {
    db.insert(newCohort)
      .then(cohort => {
        res.status(201).json(cohort);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "There was an error saving your cohort!" });
      });
  } else {
    res.status(400).json({ message: "Please provide a name for your cohort!" });
  }
});

// DELETE will remove a cohort object with the specified id ----------

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(cohort => {
      if (cohort) {
        res.status(204).end();
      } else {
        res.status(404).json({
          message: "The cohort with the specified id could not be found!"
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "This cohort could not be deleted!" });
    });
});

// PUT updates a cohort object with the specified id ----------

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  if (updates.name) {
    db.update(id, updates)
      .then(updates => {
        if (updates) {
          res.status(200).json(updates);
        } else {
          res.status(404).json({
            message: "The cohort with the specified id could not be found!"
          });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "The cohort information could not be modified!" });
      });
  } else {
    res.status(400).json({ message: "Please provide a name for this cohort!" });
  }
});

// GET students from a cohort object with a specified id ----------

router.get("/:id/students", (req, res) => {
  const id = req.params.id;
  db.getCohortStudents(id)
    .then(students => {
      if (students) {
        res.status(200).json(students);
      } else {
        res.status(404).json({
          message: "The cohort with the specified id could not be found!"
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The cohort's students could not be retrieved!" });
    });
});

module.exports = router;
