'use strict';
var Promise = require('bluebird');
var hbase = require('./database').hbase;

module.exports = {
  storeCrawl: function(crawl) {
    return new Promise(function(resolve, reject) {
      var key = crawl.start + '_' + crawl.end;
      hbase
      .table('raw_crawls')
      .create('rc', function(err, success) {
        if (err) {
          return reject(err);
        }
        var row = this.row(key);
        var cells = [
          { column: 'rc:start_at',    $: crawl.start },
          { column: 'rc:end_at',      $: crawl.end },
          { column: 'rc:entry_ipp',   $: crawl.entry },
          { column: 'rc:data',        $: JSON.stringify(crawl.data) },
          { column: 'rc:exceptions',  $: JSON.stringify(crawl.errors) }
        ];
        row
        .put(cells, function(err, success) {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });
  },
};
