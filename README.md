run-in-mocha
------------
> Run a single test file in Mocha

## Ask a test file to add its tests to Mocha and run itself

```javascript
require("@fatso83/run-in-mocha")(__filename);

describe("a suite", function() {
  it("is a passing test", function() {
    // OK
  });

  it("is a failing test", function() {
    throw new Error("OMG, I failed!");
  });
});
```
