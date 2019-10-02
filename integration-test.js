require("./index")(__filename);

describe("a suite", function() {
  it("is a passing test", function() {
    // OK
  });

  it("is a failing test", function() {
    throw new Error("OMG, I failed!");
  });
});
