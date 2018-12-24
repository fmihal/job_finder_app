const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Job = require("../models/Job");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//Get job list
router.get("/", (req, res) => {
  Job.findAll()
    .then(jobs => {
      res.render("jobs", {
        jobs
      });
    })
    .catch(err => {
      console.log(err);
    });
});

// Display add job form
router.get("/add", (req, res) => {
  res.render("add");
});

// Add a job
router.post("/add", (req, res) => {

  let { title, skills, payment, description, contact_email } = req.body;
  let errors = [];

  if (!title) {
      errors.push({text: 'Please add title!'})
  }
  if (!skills) {
      errors.push({text: 'Please add required skills!'})
  }
  if (!description) {
      errors.push({text: 'Please add description!'})
  }
  if (!contact_email) {
      errors.push({text: 'Please add a contact email!'})
  }

  if (errors.length > 0) {
      res.render('add', {
          errors,
          title,
          skills,
          payment,
          description,
          contact_email
      })
  } else {
      if (!payment) {
          payment='Unknown';
      } else {
          payment = `$${payment}`;
      }
    

    Job.create({
        title,
        skills,
        description,
        payment,
        contact_email
      })
        .then(job => {
          res.redirect("/jobs");
        })
        .catch(err => console.log(err));
  }
  
});


// Search for jobs 
router.get('/search', (req,res) => {
    let { term } = req.query;

    term = term.toLowerCase();

    Job.findAll({ where: { title: { [Op.like]: '%'+ term +'%' }} })
       .then(jobs => res.render('jobs', { jobs }))
       .catch(err => console.log(err));
});

module.exports = router;
