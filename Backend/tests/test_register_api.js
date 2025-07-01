const { app } = require("../app");
const get_chai = require("../util/get_chai");
const User = require("../models/User");

describe("API login test", function () {
  const testUser = {
    name: "Test User",
    email: "testuser@example.com",
    password: "SuperSecret123!",
  };

  before(async () => {
  
    await User.deleteOne({ email: testUser.email });
    await User.create(testUser); 
  });

  after(async () => {
    await User.deleteOne({ email: testUser.email });
  });

  it("should log in with valid credentials", async () => {
    const { expect, request } = await get_chai();

    const res = await request
      .execute(app)
      .post("/api/v1/auth/login")
      .set("content-type", "application/json")
      .send({
        email: testUser.email,
        password: testUser.password,
      });

  
    console.log("STATUS:", res.status);
    console.log("BODY (raw):", res.text);
    console.log("BODY (parsed):", res.body);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("user");
    expect(res.body).to.have.property("token");
  });
});
