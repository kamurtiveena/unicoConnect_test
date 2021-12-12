const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken');
const models = require('../../models');
const codeConstant = require('../../constant');
const {checkRequiredMissingParam } = require('../../utils');

let registerUser = async (parent, args, context, info) => {
  logger.info('registerUser resolver called');
  try {
    let requireParam = ['username','email','name','class_current','rollNumber'];
    let missingParam = await checkRequiredMissingParam(args,requireParam);
    if(missingParam){
      return {
        status: codeConstant.error,
        data:{
          message:missingParam
        }
      }
    }
    const user = await models.Users.create({
      username: args.username,
      email: args.email,
      password: await bcrypt.hash(args.password, 10),
      name:args.name,
      class:args.class_current,
      rollNumber:args.rollNumber
    });

    const token = jsonwebtoken.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1y' }
    )
    let userData = {
      id: user.dataValues.id,
      username: user.dataValues.username,
      email: user.dataValues.email,
      rollNumber:user.dataValues.rollNumber
    }
    logger.info('User data::');
    logger.info(userData);
    return {
      status: codeConstant.success,
      data: {
        token, id: user.dataValues.id,  email: user.dataValues.email, name: user.dataValues.name ,username: user.dataValues.username,message: "Succes"
      }
    }

  } catch (error) {
    console.log(error)
    logger.error(error);
    return {
      status: codeConstant.error,
      data:null
    }
  }
}

module.exports = registerUser;