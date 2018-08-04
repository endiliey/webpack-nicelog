<h1 align="center">Webpack-NiceLog</h1>

![preview GIF](https://github.com/endiliey/webpack-nicelog/blob/master/preview.gif?raw=true)

## Install

```
$ npm install webpack-nicelog --save-dev
```


## Example Usage

```js
// webpack.config.js
const WebpackNiceLog = require('webpack-nicelog');

module.exports = {
  // ...
  plugins: [
    new WebpackNiceLog()
  ]
}
```


## API

### WebpackNiceLog(options)

## Options

### `name`
  - Default: `webpack`

Display name

### `color`
  - Default: `green`

Display color (can be HEX like `#xxyyzz` or a web color like `green`).

### `stream`
  - Default: `process.stderr`

Output stream.

### `minimal`
  - Default: Auto enabled on CI, non-TTY and test environments

Hide progress bar and only show Compiling/Compiled messages.

### `onDone`
  - Type: `Function(stats)`

A function that will be called when **all** builds are finished (no errors).

## License

MIT © [Endilie Yacop Sucipto](https://endiliey.com)
