var fs = require('fs');

function main() {
  if (process.argv.length < 4) {
    console.error('You must supply the two filenames of the files you want to merge.');
    console.error('Format: node merge.js original_file_path overriding_file_path');
    process.exit(1);
  }

  var file1 = process.argv[2];
  var file2 = process.argv[3];

  var original = JSON.parse(fs.readFileSync(file1).toString()).feeds;
  var overriding = JSON.parse(fs.readFileSync(file2).toString()).feeds;

  // Map by id (the url)
  var originalMapByUrl = {};
  original.forEach(function(feed) {
    originalMapByUrl[feed.url] = feed;
  });

  // Merge
  overriding.forEach(function(feed) {
    if (originalMapByUrl[feed.url]) {
      merge(originalMapByUrl[feed.url], feed);
    } else {
      originalMapByUrl[feed.url] = feed;
    }
  });

  // Flatten and return
  var merged = { feeds: [] };
  Object.keys(originalMapByUrl).forEach(function(key) {
    merged.feeds.push(originalMapByUrl[key]);
  });

  console.log(JSON.stringify(merged, null, 2));
}

function merge(original, overriding) {
  original.title = overriding.title;
  original.link = overriding.link;
  original.description = overriding.description;
  original.icon = overriding.icon;
  overriding.tags.forEach(function(tag) {
    if (original.tags.indexOf(tag) < 0) {
      original.tags.push(tag);
    }
  })
}

main();
