# A test-driven JS assessment

## I want to work on the tests – what do I do?

To use the unit tests, you will need to install Node – you can do this via the
[download page](http://nodejs.org/#download) or using
[Homebrew](http://mxcl.github.com/homebrew/) if you are on a Mac. On Windows you might need to restart after installing Node.

After Node has been installed, from this directory, run:

```
npm install
npm start
```

You can then view the tests in your browser at
[http://localhost:4444/tests](http://localhost:4444/tests).

When you visit that page, all of the tests should be failing; your job is to
get the tests to pass (as many as you can). To do this, you'll need to refer to the tests in the `tests/` directory, and edit the source files in the `src/` directory.

Once you update a test, you can reload the test page in the browser to see
whether it worked. You can also [visit this url to develop with live-reload](http://localhost:4444/webpack-dev-server/tests) if that's your thing.

You can also run (most of) the tests on the command line:

```
npm test
```

*Hint:* Start with "Best practices", the rest is harder.


### Data-driven tests

If your tests need data that can be fetched via XHR, stick a `.json` file in
the `data` directory; you can access it at `/data/<filename>.json`.
