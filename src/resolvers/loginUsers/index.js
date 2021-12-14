const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken');
const models = require('../../models');
const codeConstant = require('../../constant');
const {checkRequiredMissingParam } = require('../../utils');

let loginUser = async (parent, args, context, info) => {
  try {
    logger.info('loginUser resolver called');
    let requireParam = ['email','password'];
    let missingParam = await checkRequiredMissingParam(args,requireParam);
    if(missingParam){
      return {
        status: codeConstant.error,
        data:{
          message:missingParam
        }
      }
    }
    const user = await models.Users.findOne({ where: { email: args.email } });
    if (!user) {
      return {
        status: codeConstant.error,
        data: {
          message: "No user with that email"
        }
      }
    }
    const isValid = await bcrypt.compare(args.password, user.dataValues.password);
    if (!isValid) {
      return {
        status: codeConstant.error,
        data: {
          message: "Incorrect password"
        }
      }
    }
    const token = jsonwebtoken.sign(
      { id: user.dataValues.id, email: user.dataValues.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )
    const studentData = await models.addStudentDetails.findAll({ where: { userId: user.dataValues.id } });
    const marks = [];
    if (studentData && studentData.length > 0) {

    for (i = 0; i <= studentData.length - 1; i++) {
      marks.push(studentData[i].dataValues);
    }
  }
    return {
      status: codeConstant.success,
      data: {
        class: user.dataValues.class,
        name: user.dataValues.name,
        rollNumber: user.dataValues.rollNumber,
        message: "Login succesfull",
        marks
      }
    }
  } catch (error) {
    logger.error(error);
    return {
      status: codeConstant.error,
      data: null
    }
  }
}

module.exports = loginUser;