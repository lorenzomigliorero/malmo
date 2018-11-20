const NodeEnvironment = require('jest-environment-node');
const { getArgs } = require('@malmo/cli-utils');

class CustomEnvironment extends NodeEnvironment {
  async setup() {
    this.global.ARGS = getArgs();
    await super.setup();
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = CustomEnvironment;
