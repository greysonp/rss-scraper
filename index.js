var async = require('async');
var request = require('request');

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

      // Add extra info to the results, as well as clean up a bit
      for (var i = 0; i < data.responseData.entries.length; i++) {
        var entry = data.responseData.entries[i];
        entry.description = entry.contentSnippet;
        delete entry.contentSnippet;
        entry.tags = [query];
        entry.icon = 'http://s2.googleusercontent.com/s2/favicons?domain=' + entry.link;
      }
      callback(null, data.responseData.entries);
    }
  );
}

function merge(result) {
  // 'result' is a list of lists. This flattens that to a single list.
  var flat = [].concat.apply([], result);

  // First we map everything by the link field, merging items that map to the same link.
  var mapByUrl = {};
  flat.forEach(function(item) {
    if (mapByUrl[item.url]) {
      mapByUrl[item.url].tags = mapByUrl[item.url].tags.concat(item.tags);
    } else {
      mapByUrl[item.url] = item;
    }
  });

  // Then we flatten the map back out into a list and wrap it up nice
  var unique = [];
  Object.keys(mapByUrl).forEach(function(key) {
    unique.push(mapByUrl[key]);
  });
  return {
    feeds: unique
  };
}

async.map(require('./searches'), getFeed, function(err, result) {
  console.log(JSON.stringify(merge(result), null, 2));
});
