var async = require('async');
var request = require('request');
var _ = require('lodash');

function getFeed(query, callback) {
  var opts = {
    v: '1.0',
    q: query
  };
  request({
    url: 'https://ajax.googleapis.com/ajax/services/feed/find',
    qs: opts},
    function (err, res, body) {
      if (err) {
        return callback(err);
      }

      var data = JSON.parse(body);
      if (!data.responseData || !data.responseData.entries) {
        return callback(null, []);
      }
      callback(null, data.responseData.entries);
    }
  );
}

async.map(require('./searches'), getFeed, function(err, result) {
  var merged = [].concat.apply([], result);
  var unique = {
    feeds: _.uniqBy(merged, 'url')
  }
  console.log(JSON.stringify(unique, null, 2));
});
