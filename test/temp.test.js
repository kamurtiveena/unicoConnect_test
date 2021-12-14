const chai = require('chai')
const { expect } = chai;
const { runQuery } = require('./helper')

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
});