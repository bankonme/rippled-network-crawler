var Crawler = require('../src/crawler.js').Crawler
var _ = require('lodash');
var nconf = require('nconf');

nconf.argv().env();
var argv = nconf.get('_')

if (argv.length == 1) {
  main(argv[0]);
} else {
  console.error('eg: node misc/crawl.js 192.170.145.70:51235\n' + 
                '\t--r: prints out in readable format');
  process.exit(1);
}

function main(entryIp) {
  var noopLogger = {log: _.noop, error: _.noop};
  var crawler = new Crawler(100, console)

  crawler.getCrawl(entryIp).then(function(response) {
    if (nconf.get('r')) {
      console.log(JSON.stringify(response, null, 4));
    } else {
      console.log(JSON.stringify(response));
    }
  })
  .catch(function(error) {
    console.log('error', error)
  })
}