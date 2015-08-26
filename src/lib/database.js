'use strict';
var Promise = require('bluebird');
var Hbase = Promise.promisifyAll(require('hbase'));
var Sequelize = require('sequelize');
var sql;
var sqlInited;

module.exports = {
  initSql: function(dbUrl, log) {
    if (!sqlInited) {
      sql = new Sequelize(dbUrl,
      {
        logging: log,
        dialectOptions: {
          ssl: true
        },
        pool: {
          maxConnections: 10,
          minConnections: 0,
          maxIdleTime: 10000
        }
      });
      sqlInited = true;
    }
    return sql;
  }
};

module.exports.hbase = new Hbase({
  host: process.env.HBASE_HOST,
  port: process.env.HBASE_PORT
});
