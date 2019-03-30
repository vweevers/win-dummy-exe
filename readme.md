# win-dummy-exe

**Generate a dummy Windows executable with .NET. Meant for testing.**

[![npm status](http://img.shields.io/npm/v/win-dummy-exe.svg?style=flat-square)](https://www.npmjs.org/package/win-dummy-exe)
[![node](https://img.shields.io/node/v/win-dummy-exe.svg?style=flat-square)](https://www.npmjs.org/package/win-dummy-exe)
[![AppVeyor build status](https://img.shields.io/appveyor/ci/vweevers/win-dummy-exe.svg?style=flat-square&label=appveyor)](https://ci.appveyor.com/project/vweevers/win-dummy-exe)
[![Dependency status](https://img.shields.io/david/vweevers/win-dummy-exe.svg?style=flat-square)](https://david-dm.org/vweevers/win-dummy-exe)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com) [![Greenkeeper badge](https://badges.greenkeeper.io/vweevers/win-dummy-exe.svg)](https://greenkeeper.io/)

## usage

```js
const dummy = require('win-dummy-exe')

const metadata = {
  assemblyFileVersion: '1.0.0',
  assemblyInformationalVersion: '1.0.0.1',
  assemblyCopyright: 'me me me'
}

dummy(metadata, function (err, exe) {
  if (err) throw err

  // exe is an absolute path to a dummy.exe in a temporary directory
})
```

## install

With [npm](https://npmjs.org) do:

```
npm install win-dummy-exe
```

## license

[MIT](http://opensource.org/licenses/MIT) © Vincent Weevers
