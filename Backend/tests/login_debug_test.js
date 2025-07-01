const { app } = require("../app");
const get_chai = require("../util/get_chai");
const User = require("../models/User");

describe("🔍 DEBUG login test", function () {
  const testUser = {
    name: "Debug User",
    email: "debuguser@example.com",
    password: "Debug123!",
  };

  before(async () => {
    console.log("🔧 BEFORE: deleting and creating user");
    await User.deleteOne({ email: testUser.email });
    await User.create(testUser);
    console.log("✅ BEFORE: user created");
  });

  after(async () => {
    console.log("🧹 AFTER: cleaning up user");
    await User.deleteOne({ email: testUser.email });
  });

  it("should log in and show full body", async () => {
    const { expect, request } = await get_chai();

    const res = await request
      .execute(app)
      .post("/api/v1/auth/login")
      .set("content-type", "application/json")
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    console.log("📦 STATUS:", res.status);
    console.log("📦 TEXT:", res.text);
    console.log("📦 BODY:", res.body);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("user");
    expect(res.body).to.have.property("token");
  });
});
