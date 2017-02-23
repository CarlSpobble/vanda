function Spobble(gameAction, Youtube_ID, spobbleType) {

  this.gameAction = gameAction;
  this.YouTubeID = Youtube_ID;
  this.spobbleType = spobbleType;
  this.x;
  this.verticalStart;
  this.diam;

  this.point_scored = this.gameAction.point_scored;

  this.actionStart = (Math.round(hmsToSeconds(this.gameAction.Start)));
  this.actionStop = (Math.round(hmsToSeconds(this.gameAction.Stop)));
  this.actionDuration = this.actionStop - this. actionStart;

  // function to map la durata della spobble in secondi nel range con il
  // spobbleMaxDiam and retrieve the this.spobbleDiam


  //console.log(longestAction);
  //console.log(spobbleMaxDiam);

  this.drawSpobble = function() {


    if (this.spobbleType === 'default') {
      fill(200, 200, 200, 130);
    }

    else if (this.spobbleType === 'pointOfView') {

      if (btnTeamSelect.value() === this.point_scored) {
        fill(75, 148, 106, 130);
      } else {
        fill(234, 71, 71, 130);
      }

    }
    ellipse(this.x, this.verticalStart, this.diam, this.diam);
}

this.clicked = function() {

  var d = dist(mouseX, mouseY, this.x, this.verticalStart);

  if (d < this.diam/2) {
    cueVideo(this.YouTubeID, this.actionStart, this.actionStop);
    displayActualScoreboard('actualResult', this.gameAction);
  }
 }

}
