const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const models = require('../models');
const registerUser = require('./registerUsers');
const loginUser = require('./loginUsers');
const addStudentDetails = require('./addStudentDetails');
const getStudents = require('./getStudents');

require('dotenv').config()

const resolvers = {
    Query: {
        getStudents
    },
    Mutation: {
        registerUser,
        loginUser,
        addStudentDetails
    }
}

module.exports = resolvers