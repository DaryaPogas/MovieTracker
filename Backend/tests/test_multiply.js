const multiply = require("../util/multiply");
const get_chai = require("../util/get_chai");

describe("testing multiply", () => {
  it("should give 7*6 is 42", async () => {
    const { expect } = await get_chai();
    expect(multiply(7, 6)).to.equal(42);
  });

  it("should give 2*3 is 6", async () => {
    const { expect } = await get_chai();
    expect(multiply(2, 3)).to.equal(6);
  });

  it("should give 0*10 is 0", async () => {
    const { expect } = await get_chai();
    expect(multiply(0, 10)).to.equal(0);
  });

  it("should give -4*5 is -20", async () => {
    const { expect } = await get_chai();
    expect(multiply(-4, 5)).to.equal(-20);
  });
});
