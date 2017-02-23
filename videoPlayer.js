var videoContainer;

function loadPlayerAPI() {

videoContainer = select('#video_container');
  console.log(videoContainer.width);
  console.log(videoContainer.height);


  // 2. This code loads the IFrame Player API code asynchronously.

        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }


  // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.

      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: videoContainer.height,
          width: videoContainer.width,
          videoId: '',

          events: {
            //'onReady': onPlayerReady
            //'onStateChange': onPlayerStateChange
          }
        });
      }

// 4. The API will call this function when the video player is ready.
          function onPlayerReady(event) {

            event.target.playVideo();
          }

  // 6. This function is called when the spobble is clicked
    function cueVideo(youtube_id, timeStart, timeStop) {

            this.youtube_id = youtube_id;
            this.timeStart = timeStart;
            this.timeStop = timeStop;

            player.cueVideoById({videoId: this.youtube_id,
                    startSeconds: this.timeStart,
                    //endSeconds: this.timeStop,
                    suggestedQuality: 'default'})

              player.playVideo();
    }
