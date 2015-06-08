var _ = require('lodash');

var Crawler = require('./lib/crawler').Crawler;

/* ---------------------------------- MAIN ---------------------------------- */

/*
var argv = process.argv.slice(2);

if (argv.length == 1) {
  main(argv[0]);
} else {
  console.error('eg: `node src/crawl.js '+
                '192.170.145.67 ');
  process.exit(1);
}
*/

function newCrawler(maxRequests, logger) {
  return new Crawler(maxRequests, logger);
}

Crawler.prototype.crawlResp = function(entryIp) {
  var self = this;
  return new Promise(function(resolve, reject){
    self.once('done', function(crawlJson) {
      resolve(crawlJson.rawResponses)
    }).enter(entryIp)
  })
}

function main(entryIp) {
  var noopLogger = {log: _.noop, error: _.noop};
  var crawler = new Crawler(100, undefined);

  crawler
    .on('request', function() {
      process.stdout.write('.');
    })
    .once('done', function() { 
      console.log("done");
    })
    .once('done', function(crawlJson) {
      console.log(crawlJson.rawResponses)
    }).enter(entryIp)
}

exports.Crawler = newCrawler;