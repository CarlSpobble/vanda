var spobbles = {};


function spobbleCollection(gameActions, YTvideoID, spobbleType) {

  this.gameActions = gameActions;
  this.YoutubeID = YTvideoID;
  this.spobbleType = spobbleType;

  //console.log(this.gameActions);

  var keys = Object.keys(this.gameActions);
  var counterSets = 1;
  var set_actions = [];

  for (var i = 0; i < keys.length; i++) {
// retrieve all the spobble from the same set
  if (this.gameActions[keys[i]].set_number === counterSets ) {
    set_actions.push(new Spobble(this.gameActions[keys[i]], this.YoutubeID, this.spobbleType));
    spobbles['Set' + counterSets] = {
      action : set_actions
    }

} else {
  set_actions = [];
  counterSets++;
// la prima spobble del nuovo set
  set_actions.push(new Spobble(this.gameActions[keys[i]], this.YoutubeID, this.spobbleType));
  spobbles['Set' + counterSets ] = {
      action : set_actions
    }
  }
}

//console.log(spobbles);
spobbleVisualization(spobbles);
}
