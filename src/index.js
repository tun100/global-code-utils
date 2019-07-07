var sh = require('shelljs')
var _ = require('lodash')
var moment = require('moment')
var fs = require('fs')
var path = require('path')
var utils = {
  loopFile (mypath, handlefunc) {
    if (utils.isFile(mypath)) {
      handlefunc(mypath)
    } else {
      var mychildren = utils.readDir(mypath)
      _.forEach(mychildren, childName => {
        var fullChildPath = path.join(mypath, childName)
        utils.loopFile(fullChildPath, handlefunc)
      })
    }
  },
  readDir (mypath) {
    return fs.readdirSync(mypath)
  },
  getCrtPath (relativePath, crtdirname) {
    if (_.isNil(crtdirname)) {
      crtdirname = __dirname
    }
    return path.join(crtdirname, relativePath)
  },
  isSameValueOnPos (obj, key, value) {
    return _.get(obj, key) === value
  },
  writeStringToFile (targetPath, ctn) {
    if (!_.isString(ctn)) {
      ctn = JSON.stringify(ctn)
    }
    return fs.writeFileSync(targetPath, ctn)
  },
  writeStringToRelativeFile (targetPath, ctn) {
    return utils.writeStringToFile(utils.getCrtPath(targetPath), ctn)
  },
  readFileToString (targetPath) {
    return fs.readFileSync(targetPath, 'UTF-8')
  },
  readRelativeFileToString (targetPath) {
    return utils.readFileToString(utils.getCrtPath(targetPath))
  },
  log (str) {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]: ${JSON.stringify(str)}`)
  },
  isDir (path) {
    var info = fs.statSync(path)
    return info.isDir()
  },
  isFile (path) {
    var info = fs.statSync(path)
    return info.isFile()
  }
}

module.exports = utils
