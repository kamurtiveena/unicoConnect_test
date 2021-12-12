const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken');
const models = require('../../models');
const codeConstant = require('../../constant');
const { checkRequiredMissingParam } = require('../../utils');

let addStudentDetails = async (parent, args, context, info) => {
  try {
    logger.info('addStudentDetails resolver called');
    let requireParam = ['remark', 'UserId', 'percentage', 'class'];
    let missingParam = await checkRequiredMissingParam(args, requireParam);
    if (missingParam) {
      return {
        status: codeConstant.error,
        data: {
          message: missingParam
        }
      }
    }
    const studentDetails = await models.addStudentDetails.create({
      remark: args.remark,
      class: args.class,
      percentage: args.percentage,
      UserId: args.UserId,
      name: args.name
    });
    let userData = {
      UserId: studentDetails.dataValues.UserId,
      class: studentDetails.dataValues.class,
      percentage: studentDetails.dataValues.percentage,
      remark: studentDetails.dataValues.remark
    }
    return {
      status: codeConstant.success,
      data: {
        studentData: userData, message: "success"
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

module.exports = addStudentDetails;