const Sequelize = require('sequelize');
const db = require('../config/database');


const Job = db.define('job', {
    title: {
        type: Sequelize.STRING,
    },
    skills: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    payment: {
        type: Sequelize.STRING,
    },
    contact_email: {
        type: Sequelize.STRING,
    } 
});

module.exports = Job;