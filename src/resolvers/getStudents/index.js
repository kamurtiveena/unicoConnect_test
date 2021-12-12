const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken');
const models = require('../../models');
const codeConstant = require('../../constant');

let getStudents = async (parent, args, context, info) => {
  try {
    logger.info('getStudents resolver called');
    const temp = await models.Users.findAll({
        include: [{
            model: models.addStudentDetails,
            attributes: ['name', 'class', 'percentage', 'remark']
        }]
    });
    let student = [];
    for (i = 0; i <= temp.length - 1; i++) {
        const studentInfo = temp[i].dataValues.addStudentDetails;
        let mark = [];
        for (j = 0; j <= studentInfo.length - 1; j++) {
            mark.push(studentInfo[j].dataValues)
        }
        student.push(
            {
                username: temp[i].dataValues.username,
                email: temp[i].dataValues.email,
                rollNumber:temp[i].dataValues.rollNumber,
                name:temp[i].dataValues.name,
                marks: mark
            }
        )
    }
    return student
} catch (error) {
    logger.error(error);
    return {
        status: codeConstant.error,
        data: null
      }
}
}

module.exports = getStudents;