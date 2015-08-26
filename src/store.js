'use strict';
var DB = require('./lib/database');
var modelsFactory = require('./lib/models.js');
var Promise = require('bluebird');
var moment = require('moment');
var hbaseHelper = require('./lib/hbaseHelper')

// function saveDB(crawlJson, dbUrl, logsql) {
//   var log = logsql ? console.log : false;
//   var sql = DB.initSql(dbUrl, log);
//   return modelsFactory(sql).then(function(models) {
//     return models.Crawl.create({start_at: crawlJson.start,
//                          end_at: crawlJson.end,
//                          entry_ipp: crawlJson.entry,
//                          data: JSON.stringify(crawlJson.data),
//                          exceptions: JSON.stringify(crawlJson.errors)});
//   });
// }

function saveDB(crawlJson, logsql) {
  return hbaseHelper.storeCrawl(crawlJson);
}

module.exports = function(crawl, logsql) {
  return new Promise(function(resolve, reject) {
    saveDB(crawl, logsql)
    .then(function(row) {
      console.log('Stored crawl (%s) \t at %s \t to hBase',
              moment(crawl.start).format(), moment().format());
      resolve(row);
    })
    .catch(function(err) {
      console.error(err);    // this is a serious error
      process.exit(1);
    });
  });
};
