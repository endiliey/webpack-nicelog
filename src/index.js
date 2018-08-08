var chalk = require('chalk');
var WebpackBar = require('webpackbar');
var formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

function clearScreen() {
  process.stdout.write(
    process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
  );
}

function showError(str, arr) {
  let msg = str;
  if (arr) {
    msg += `\n\n${  arr.join('')}`
  }
  console.log(msg);
}

class WebpackNiceLog extends WebpackBar {
  constructor(options) {
    super(Object.assign(options, {compiledIn: false, profile: false, done: undefined}));
    this.onDone = options.onDone;
    this.clearScreen = options.clearScreen;
  }

  apply(compiler) {
    super.apply(compiler);

    compiler.hooks.done.tap('WebpackNiceLog', stats => {
      if (this.clearScreen) {
        clearScreen()
      }

      var messages = formatWebpackMessages(stats.toJson({}, true));
      var time = new Date().toTimeString().match(/^[\d:]+/)[0];
      var build = `${chalk.gray(`[${time}]`)} Build ${chalk.green(
        stats.hash.slice(0, 8)
      )}`;

      if (messages.errors.length) {
        showError(
          chalk.red(`❌  ${build} failed`),
          messages.errors
        );
      }

      if (messages.warnings.length) {
        showError(
          chalk.yellow(
            `⚠️  ${build} finished in ${chalk.green(
              stats.endTime - stats.startTime
            )} ms with warnings !`
          ),
          messages.warnings
        );
      }

      if (!messages.errors.length && !messages.warnings.length) {
        console.log(
          `✅  ${build} finished in ${chalk.green(
            stats.endTime - stats.startTime
          )} ms!`
        );
      }

      if (this.onDone !== undefined && !messages.errors.length) {
        this.onDone(stats);
      }
    });
  }
}

module.exports = WebpackNiceLog;
