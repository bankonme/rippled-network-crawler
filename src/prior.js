'use strict';
var DB = require('./lib/database');
var rc_util = require('./lib/utility.js');
var modelsFactory = require('./lib/models.js');
var selective = require('./program').selective;
var Promise = require('bluebird');

module.exports = function(commander, lastCrawl) {
  return new Promise(function(resolve, reject) {
    function useLatestCrawl(latestCrawl) {
      var ipps = rc_util.getIpps(latestCrawl);
      if (ipps) {
        selective(ipps, commander)
        .then(resolve)
        .catch(reject);
      }
    }

    if (lastCrawl) {
      useLatestCrawl(lastCrawl);
    } else {
      rc_util.getLatestRow(commander.logsql)
      .then(function(row) {
        useLatestCrawl(JSON.parse(row.data));
      })
      .catch(reject);
    }
  });
};
