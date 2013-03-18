function b () {
  var err = new Error;

  Error.prepareStackTrace = function (err, stack) {
    return stack;
  };

  Error.captureStackTrace(err, b);

  err.stack.forEach(function (frame) {
    console.error(' call: %s:%d - %s'
      , frame.getFileName()
      , frame.getLineNumber()
      , frame.getFunctionName());
  });
}

b();