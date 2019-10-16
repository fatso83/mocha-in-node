var Mocha = require("mocha");
var loaded = false;
var mochaGlobals = "describe it suite xdescribe xit before beforeEach".split(
  " "
);

function installGlobalDummies() {
  var noop = function() {};

  // ignore all Mocha functions until Mocha registeres them
  // This avoid either adding the tests twice or having undefined function errors
  mochaGlobals.forEach(function(term) {
    global[term] = noop;
  });
}

function uncache(module) {
  delete require.cache[require.resolve(module)];
}

installGlobalDummies();

/**
 * @param options {Object} This is the usual Mocha options object
 * @param options.useExitCode {boolean} A custom flag. False by default
 */
module.exports = function(module, options) {
  uncache(module); // needed to make Mocha forget about it
  options = options || {};

  var mocha = new Mocha(options);
  mocha.addFile(module);
  if (loaded) {
    // avoid recursive runs
    return;
  }

  loaded = true;

  // Run the tests.
  mocha.run(function(failures) {
    if (options.useExitCode) {
      process.exitCode = failures ? 1 : 0; // exit with non-zero status if there were failures
    }
  });

  // if we run the function before our tests our hit, they will be added twice
  // to avoid this, we clear the globals after adding the tests
  installGlobalDummies();
};
