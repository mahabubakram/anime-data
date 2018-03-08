'use strict';
let fetch = require('node-fetch');
let fetchUrl = 'http://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=8955';

function fetcher(arg) {
  console.log(arg);
  if (arg) {
    fetch(arg)
      .then(res => res.json())
      .then(json => {
        for (let i = 0; i < json.data.length; i++) {
          let temp = {};
          const dt = json.data[i];

          temp.type = dt.type;

          temp.links = dt.links;

          temp.attributes = dt.attributes;
          temp.startedAt = dt.attributes.startDate;
          temp.endedAt = dt.attributes.endDate;
          temp.name = dt.attributes.slug;
          temp.synopsis = dt.attributes.synopsis;
          temp.status = dt.attributes.status;
          temp.posterImage = dt.attributes.posterImage;
          temp.coverImage = dt.attributes.coverImage;
          temp.episodeCount = dt.attributes.episodeCount;
          temp.youtubeVideoId = dt.attributes.youtubeVideoId;

          temp.relationships = dt.relationships;

          fetch('http://localhost:3000/api/animes', {
            method: 'POST',
            body: JSON.stringify(temp),
            headers: {'Content-Type': 'application/json'},
          })
            .then(res => res.json())
            .then(json => console.log(json));
        }

        if (json.links.next) {
          console.log(json.links);
          fetchUrl = json.links.next;
          setTimeout(()=> {
            fetcher(fetchUrl);
          }, 60000);
        } else {
          console.log('NO NEXT LINKS');
          this.fetchUrl = null;
        }
      });
  }
}

console.log(fetchUrl);
fetcher(fetchUrl);
