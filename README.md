# RSS Scraper
Fills out a sample directory of RSS feeds. It does so simply by querying the Google Feeds API for a wide variety of queries and concatenating the results into JSON that is spit out into the console. The Google Feeds API is deprecated and could disappear any day now, so let's get as much out of it as we can while it's still here :)

## How to Use
```node index.js > feeds.json```

## Why?
I couldn't find a good open data source of popular RSS feeds. The Google Feeds API may exist now, but it's going away soon. The idea is that people could use the data found here to power their own search.

## More Info
I'm hosting a copy of the data on Github pages [here](https://greysonp.github.io/rss-feeds/feeds.json) if you'd just like to use that :)
