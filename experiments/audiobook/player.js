/* Simple prototype for an Audiobook Player based on <audio> */

(function() {

  
  var DEFAULT_MANIFEST = "https://w3c.github.io/wpub/experiments/audiobook/flatland.json";
  var current_url_params = new URLSearchParams(location.href);

  if (current_url_params.has("href")) {
    console.log("Found manifest in params")
    var manifest_url = current_url_params.get("href");
  } else {
    var manifest_url = DEFAULT_MANIFEST;
  };

  if (current_url_params.has("track")) {
    console.log("Found reference to a document in params")
    var track = current_url_params.get("track");
  } else {
    var track = undefined;
  };
  
  var audio = document.getElementById("audio-element");
  var audio_source = document.getElementById("audio-source");
  var cover = document.getElementById("cover");
  var next = document.getElementById("next");
  var previous = document.getElementById("previous");

  var saved_track = localStorage.getItem(manifest_url+"#track");
  var saved_position = localStorage.getItem(manifest_url+"#t");
  if (saved_position && saved_track)
  {
    console.log("Found previous position at: "+saved_track+"#t="+saved_position)
    initializeNavigation(manifest_url, saved_track).then(
      function() { audio.currentTime = saved_position }).catch(function() {});
  } else {
    initializeNavigation(manifest_url, track).catch(function() {});
  }

  audio.addEventListener("timeupdate", function() {
    if (Math.round(audio.currentTime)%10==1) {
      localStorage.setItem(manifest_url+"#t", audio.currentTime);
    }
  });

  audio.addEventListener("ended", function() {
    if (next.hasAttribute("href")) {
      updateTrack(manifest_url, next.href).then(function() {
        audio.play();
      });
    };Ò
  });

  next.addEventListener("click", function(event) {
    if (next.hasAttribute("href")) {
      updateTrack(manifest_url, next.href).then(function() {
        audio.play()
      });
    };
    event.preventDefault();
  });

  previous.addEventListener("click", function(event) {
    if ( previous.hasAttribute("href")) {
      updateTrack(manifest_url, previous.href).then(function() {
        audio.play()
      });
    };
    event.preventDefault();
  });

  function getManifest(url) {
    return fetch(url).catch(function() {
      return caches.match(url);
    }).then(function(response) {
      return response.json();
    })
  };

  function initializeNavigation(url, track_url) {
    return getManifest(url).then(function(json) { 
      var title = json.name;
      console.log("Title of the publication: "+title);
      document.querySelector("title").textContent = title;

      //Search for cover and add it
      json.resources.forEach(function(link) {
        if (link.rel) {
          if (link.rel=="cover") {
            console.log("Found cover: "+link.url);
            cover.src = new URL(link.url, url).href;
          }
        }
      }, this);
      
      return json.readingOrder;
    }).then(function(item) {
      
      //Set start track
      var start_url = new URL(item[0].url, url).href;
      if (track_url) {
        updateTrack(url, track_url);
      } else {
        updateTrack(url, start_url);
      }

    });
  };

  function updateTrack(url, current) {
    console.log("Getting "+url)
    if (current) {
      var current_src = current;
    } else {
      var current_src = audio_source.src;
    }
    return getManifest(url).then(function(json) { return json.readingOrder} ).then(function(item) {

      var current_index = item.findIndex(function(element) {
        //console.log("Current URL is "+element.url);
        var element_url = new URL(element.url, url);
        //console.log("Comparing "+element_url+" with "+current_src);
        return element_url == current_src;
      })
      console.log("Current index is "+current_index);

      if (current_index >= 0) {
        console.log("Setting audio element src to: "+item[current_index].url)
        audio_source.src = new URL(item[current_index].url, url).href;
        localStorage.setItem(url+"#track", audio_source.src);
        audio_source.type = item[current_index].fileFormat;
        audio.load();

        if (current_index > 0) {
          console.log("Previous track is: "+item[current_index - 1].url);
          previous.href = new URL(item[current_index - 1].url, url).href;
        } else {
          previous.removeAttribute("href");
        };
        
        if (current_index < (item.length-1)) {
          console.log("Next track is: "+item[current_index + 1].url);
          next.href = new URL(item[current_index + 1].url, url).href;
        } else {
          next.removeAttribute("href");
        };
      }
    });
  };

}());