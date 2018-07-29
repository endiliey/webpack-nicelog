const chalk = require('chalk');
const ora = require('ora');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

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

class WebpackNiceLog {
  constructor(options = {}) {
    this.onDone = options.onDone;
  }

  apply(compiler) {
    const logger = ora(chalk.blue('Compiling ...'));
    compiler.hooks.compile.tap('WebpackNiceLog', () => {
      logger.start();
    });

    compiler.hooks.done.tap('WebpackNiceLog', stats => {;
      logger.stop();
      clearScreen()

      const messages = formatWebpackMessages(stats.toJson({}, true));
      const time = new Date().toTimeString().match(/^[\d:]+/)[0];
      const build = `${chalk.gray(`[${time}]`)} Build ${chalk.green(
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
        this.onDone();
      }
    });
    compiler.hooks.invalid.tap('WebpackNiceLog', clearScreen);
  }
}

module.exports = WebpackNiceLog;
