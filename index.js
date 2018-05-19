'use strict'

const jsc = require('win-find-jscript-compiler')
const Assembly = require('assembly-source')
const execFile = require('child_process').execFile
const path = require('path')
const fs = require('fs')
const tmp = require('tmpgen')('win-dummy-exe/*', { clean: true })

module.exports = function (values, opts, done) {
  if (typeof values === 'function') {
    done = values
    opts = {}
    values = {}
  } else if (typeof opts === 'function') {
    done = opts
    opts = {}
  } else if (!opts) {
    opts = {}
  }

  jsc(function (err, results) {
    if (err) return done(err)

    const bin = results.pop().path
    const code = generateAssembly(values)
    const dir = tmp()
    const exe = path.join(dir, 'dummy.exe')
    const args = ['/nologo', '/utf8output']

    // One of x86, Itanium, x64, anycpu
    const platform = opts.platform === 'itanium' ? 'Itanium' : opts.platform ? opts.platform.toLowerCase() : 'anycpu'
    const target = opts.target || 'exe' // One of exe, winexe, library.

    args.push(`/platform:${platform}`)
    args.push(`/t:${target}`)

    if (opts.strict) args.push('/warnaserror+')

    if (opts.verbose) args.push(`/warn:4`) // 0-4
    else if (opts.silent) args.push(`/warn:0`)
    else if (opts.warn) args.push(`/warn:${opts.warn}`)
    else args.push(`/warn:3`)

    args.push(opts.debug ? '/debug+' : '/debug-') // If true, generate .pdb
    args.push(opts.print ? '/print+' : '/print-') // If true, define print()

    if (Array.isArray(opts.define)) {
      args.push(`/define:${opts.define.join(',')}`)
    } else if (opts.define) {
      const symbols = []

      for (let k in opts.define) {
        if (!opts.define.hasOwnProperty(k)) continue
        symbols.push(`${k}=${String(opts.define[k])}`)
      }

      args.push(`/define:${symbols.join(',')}`)
    } else if (opts.debug) {
      args.push('/define:DEBUG')
    }

    args.push('dummy.js')

    // The jsc compiler needs a BOM to read the source as UTF-8
    fs.writeFile(path.join(dir, 'dummy.js'), '\ufeff' + code, function (err) {
      if (err) return done(err)

      execFile(bin, args, { cwd: dir }, function (err) {
        if (err) return done(err)

        // Make sure the executable exists
        fs.access(exe, function (err) {
          if (err) done(err)
          else done(null, exe)
        })
      })
    })
  })
}

function generateAssembly (values) {
  const assembly = Assembly({ language: 'jscript' })

  for (let k of Object.keys(values)) {
    assembly.set(k, values[k])
  }

  return assembly.toSource()
}
