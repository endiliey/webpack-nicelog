<h1 align="center">Webpack-log-plugin</h1>

![demo](preview/demo.gif)

## Install

```
$ npm install webpack-log-plugin --save-dev
```


## Usage

```js
// webpack.config.js
const WebpackLogPlugin = require('webpack-log-plugin');

module.exports = {
  // ...
  plugins: [
    new WebpackLogPlugin()
  ]
}
```


## API

### WebpackLogPlugin(options)

#### options.onDone (optional)

Type: `Function`

Run a custom function after bundle has been successfully compiled.

## License

MIT © [Endilie Yacop Sucipto](https://endiliey.com)
