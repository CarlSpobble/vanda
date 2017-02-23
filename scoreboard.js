var scoreboardDiv;
var teamHomeDiv, teamAwayDiv, pointsHomeDiv, pointsAwayDiv, setsHomeDiv, setsAwayDiv;
var setsResultScoreboard, homeScoreboard, awayScoreboard;

function removeSetsResult() {
  var result = document.getElementById("sets_result");

  while (result.hasChildNodes()) {
    result.removeChild(result.lastChild);
    console.log('child removed');
  }
}

function buildScoreboard() {



// create scoreboard div
  scoreboardDiv = createDiv('').parent('right_box').id('scoreboard');

// create scoreboard_home
  homeScoreboard = createDiv('').parent(scoreboardDiv).id('scoreboard_home');
  awayScoreboard = createDiv('').parent(scoreboardDiv).id('scoreboard_away');
  setsResultScoreboard = createDiv('').parent(scoreboardDiv).id('sets_result');





  //homeScoreboard = select('#scoreboard_home');
  //awayScoreboard = select('#scoreboard_away');
  //setsResultScoreboard = select('#sets_result');



  createDiv('').parent(homeScoreboard).id('teamHomeDiv');
  teamHomeDiv = select('#teamHomeDiv');
  createDiv('').parent(awayScoreboard).id('teamAwayDiv');
  teamAwayDiv = select('#teamAwayDiv');

  createDiv('').parent(homeScoreboard).id('pointsHomeDiv');
  pointsHomeDiv = select('#pointsHomeDiv');
  createDiv('').parent(awayScoreboard).id('pointsAwayDiv');
  pointsAwayDiv = select('#pointsAwayDiv');

  createDiv('').parent(homeScoreboard).id('setsHomeDiv');
  setsHomeDiv = select('#setsHomeDiv');
  createDiv('').parent(awayScoreboard).id('setsAwayDiv');
  setsAwayDiv = select('#setsAwayDiv');

  // connettersi allo scoreboard id firebase e chiedere per i
  // parziali set




}

function displayFinalScoreboard(setsResult, teamHome, teamAway, setsHome, setsAway) {

  this.setsResult = setsResult;
  this.teamHome = teamHome;
  this.teamAway = teamAway;
  this.setsHome = setsHome;
  this.setsAway = setsAway;

  select('#scoreboard').style('background-color', 'black');

  var keys = Object.keys(this.setsResult);
  console.log(this.setsResult);
  var counter = 1;
  var widthSetResult = 0;

  removeSetsResult();


  for (var i = 0; i < keys.length; i++) {


    createDiv('').parent(setsResultScoreboard).class('setResults_container').id('container_set' + counter);
    createP('set ' + counter).parent('container_set' + counter).class('set_number').id('set ' + counter);
    createP(this.setsResult[keys[i]].team_home + ' : ' + this.setsResult[keys[i]].team_away).parent('container_set' + counter).class('points_set');
    widthSetResult = 100 / keys.length;
    select('#container_set' + counter).style('width', widthSetResult + '%');

    if (keys.length === 3) {
      select('#container_set' + counter).style('font-size', '100%');
    }

    if (keys.length === 5) {
      select('#container_set' + counter).style('font-size', '80%');
    }


    //select('#set ' + counter).style('font-size', '200%');


    counter++;

  }



  teamHomeDiv.html(
    '<p>' + this.teamHome + '</p>'
  );

  teamAwayDiv.html(
    '<p>' + this.teamAway + '</p>'
  );

  pointsHomeDiv.html(
    '<p>' + this.setsResult[keys[keys.length - 1]].team_home + '</p>'
  );

  pointsAwayDiv.html(

  '<p>' + this.setsResult[keys[keys.length - 1]].team_away + '</p>'

  );

  setsHomeDiv.html(
    '<p>' + this.setsHome + '</p>'
  );

  setsAwayDiv.html(
    '<p>' + this.setsAway + '</p>'
  );




}

function displayActualScoreboard(result, gameAction) {

  select('#scoreboard').style('background-color', 'black');

  this.result = result;
  this.gameAction = gameAction;
  this.teamHome = this.gameAction.team_home;
  this.teamAway = this.gameAction.team_away;
  this.pointsHome = this.gameAction.actual_point_home;
  this.pointsAway = this.gameAction.actual_point_away;
  this.setsHome = this.gameAction.sets_won_home;
  this.setsAway = this.gameAction.sets_won_away;

  //buildScoreboard();

  console.log(this.gameAction);




  if(this.result === 'actualResult') {

    pointsHomeDiv.html(
      '<p>' + this.pointsHome + '</p>'
    );

    pointsAwayDiv.html(
      '<p>' +  this.pointsAway + '</p>'
    );

    teamHomeDiv.html(
      '<p>' + this.teamHome + '</p>'
    );

    teamAwayDiv.html(
      '<p>' + this.teamAway + '</p>'
    );

    setsHomeDiv.html(
      '<p>' + this.setsHome + '</p>'
    );

    setsAwayDiv.html(
      '<p>' + this.setsAway + '</p>'
    );

  }


}
