'use strict'

const test = require('tape')
const vi = require('win-version-info')
const dummy = require('.')

test('basic', function (t) {
  t.plan(2)

  dummy({
    assemblyFileVersion: '1.0.0',
    assemblyInformationalVersion: '1.0.0.1',
    assemblyCopyright: '© Beep 嘟 Inc.',
    assemblyDescription: 'test'
  }, function (err, exe) {
    t.ifError(err, 'no error')
    t.same(vi(exe), {
      FileVersion: '1.0.0.0',
      ProductVersion: '1.0.0.1',
      Comments: 'test',
      LegalCopyright: '© Beep 嘟 Inc.',
      InternalName: 'dummy.exe',
      OriginalFilename: 'dummy.exe'
    })
  })
})
