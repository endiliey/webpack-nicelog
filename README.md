<h1 align="center">Webpack-NiceLog</h1>

![preview GIF](https://github.com/endiliey/webpack-nicelog/blob/master/demo.gif?raw=true)

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
    new WebpackNiceLog({
      onDone: () => console.log('test');
    })
  ]
}
```


## API

### WebpackNiceLog(options)

## Options

### `compileMessage`
  - Default: `Compiling ...`

Message to display during compilation step. Use `none` to disable any display.

### `onDone`
  - Type: `Function()`

A function that will be called when **all** builds are finished.

## License

MIT © [Endilie Yacop Sucipto](https://endiliey.com)
