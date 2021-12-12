const { gql } = require('apollo-server')

const typeDefs = gql`
    type User {
        id: String
        username: String
        email: String!
        rollNumber: String
        name:String
        marks:[mark]
    }
    type classData {
        token :String
        UserId:String
        rollNumber: String
        name:String
        username:String
        email:String
        id:String
        message: String
        marks:[mark]
    }

    type mark {
        name: String
        class: String
        percentage: String
        remark: String
  }

    type AuthPayload {
        token: String!
        user: User!
        message: String
    }

    type Payload {
        studentData: classData
        message: String
    }

    type AuthResponse{
        status: Status
        data:classData
    }

    type Status {
        code :Int
        header: String
        description :String
    }

    type detailsResponse{
        status: Status
        data:Payload
    }

    type Query {
        user(id: Int!): User
        allUsers: [User!]!
        me: User
        getStudents:[User]
    }

   



    type Mutation {
        registerUser(username: String, email: String!, password: String!, name:String,class_current:Int,rollNumber:String): AuthResponse
        loginUser(email: String!, password: String!): AuthResponse,
        addStudentDetails(UserId :String,name:String,class:Int, percentage:Int,remark:String): detailsResponse
    }

`
module.exports = typeDefs