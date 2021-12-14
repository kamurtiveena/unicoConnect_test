const chai = require('chai')
const { expect } = chai;
const { runQuery, mutationQuery } = require('./helper')

describe("Filter function", () => {
  it("get all user data", async () => {
    const header = {};
    const queryData = `query{
        getStudents{
          username
          email
          rollNumber
          name
          marks{
            class
            percentage
            remark
          }
        }
      }`

    const gqlRequestData = await runQuery(header, queryData);
    expect(gqlRequestData.data.getStudents[0].name).to.equal('ghgghd');
  });


  it("Login Success", async () => {
    const header = {};
    const queryData = `mutation {
      loginUser(email: "uniconnect@test.com", password: "1234") {
        status {
          code
          header
          description
        }
        data {
          rollNumber
          name
          marks {
            class
            percentage
            remark
          }
          message
        }
      }
    }
    `
    const gqlRequestData = await mutationQuery(header, queryData);
    expect(gqlRequestData.data.loginUser.status.code).to.equal(1000);
  });

  
});