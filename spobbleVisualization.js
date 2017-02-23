var canvas, canvasContainer, spobbleMaxDiam, longestAction;
var totActions = [];

function spobbleVisualization(spobbles) {

  this.spobbles = spobbles;
  console.log(this.spobbles);

  var totSets = Object.keys(this.spobbles);
  //console.log(totSets.length);

  var longestSet = 0;
  var totAction = 0;

  var longestSet = 0;
  var totAction = 0;

for (var i = 0; i < totSets.length; i++ ) {
   totAction = this.spobbles[totSets[i]].action.length;

if (totAction > longestSet) {
  longestSet = totAction;
} else {
  longestSet = longestSet;
 }
}

//console.log(longestSet);

canvasContainer = select('#canvas_container');

var columnsSpace = canvasContainer.width;
var columnWidth = columnsSpace / totSets.length;

//console.log(columnWidth);

var margin = columnWidth * 2 / 100;
spobbleMaxDiam = columnWidth - margin;
var cHeight = ((spobbleMaxDiam + margin) * longestSet) + spobbleMaxDiam;


  canvas = createCanvas(canvasContainer.width, cHeight).parent('canvas_container');
  background(75);
  //console.log(canvas.width);
  //console.log(cHeight);

var spobbleY = 0;
var singleSet = [];
var spobbleDistance = spobbleMaxDiam + margin;

// var s means set
for (var s = 0; s < totSets.length; s++) {
  spobbleY = 1;
  singleSet = this.spobbles[totSets[s]].action;

// var a means action
  for (var a = 0; a < singleSet.length; a++ ) {
    if (s === 0) {
    singleSet[a].x = columnWidth/2;
    singleSet[a].verticalStart = spobbleY * spobbleDistance;
    spobbleY++;
    }

    else if (s === 1) {
      singleSet[a].x = columnWidth + columnWidth/2;
      singleSet[a].verticalStart = spobbleY * spobbleDistance;
      spobbleY++;
    }

    else if (s === 2) {
      singleSet[a].x = (columnWidth*2) + (columnWidth/2);
      singleSet[a].verticalStart = spobbleY * spobbleDistance;
      spobbleY++;
    }

    else if (s === 3) {
      singleSet[a].x = (columnWidth*3) + (columnWidth/2);
      singleSet[a].verticalStart = spobbleY * spobbleDistance;
      spobbleY++;
    }

    else if (s === 4) {
      singleSet[a].x = (columnWidth*4) + (columnWidth/2);
      singleSet[a].verticalStart = spobbleY * spobbleDistance;
      spobbleY++;
    }

    totActions.push(singleSet[a]);
  }
}// trovare su totActions l'azione piu lunga per settare il range della map function

//console.log(totActions);
longestAction = 0;
//var la means longestAction
for (var la = 0; la < totActions.length; la++) {
  if(totActions[la].actionDuration > longestAction) {
    longestAction = totActions[la].actionDuration;
  }
  else {
    longestAction = longestAction;
    }
}

for (var d = 0; d < totActions.length; d++) {
  totActions[d].diam = Math.round(map(totActions[d].actionDuration, 0, longestAction, 0, spobbleMaxDiam));
}

console.log(totActions);

}
