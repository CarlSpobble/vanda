var btnMatchSelect;
var btnTeamSelect;
var scoreboard;

function setup() {

  var logoImg = createImg('images/logo.png');
  logoImg.parent('logo');
  logoImg.style('width', '100%');

  var legendaImg = createImg('images/legenda.png');
  legendaImg.parent('legenda');
  legendaImg.style('width', '100%');

  UI();
  retrieveGameList();
  loadPlayerAPI();
  buildScoreboard();

}

function draw() {
  //background(75);
  for(var i = 0; i < totActions.length; i++ ) {
    totActions[i].drawSpobble();
  }
}


function retrieveGameList() {

loadJSON("https://vanda-b39f9.firebaseio.com/volleyball.json", gotData);

function gotData(data) {

  //var teamHome, teamAway;
  var gameName;

  scoreboard = data;
  console.log(scoreboard);


  var games = Object.keys(data);
  console.log(games);

  for (var i = 0; i < games.length; i++) {

    //teamHome = scoreboard[games[i]].team_home;
    //teamAway = scoreboard[games[i]].team_away;
    gameName = scoreboard[games[i]].game_name;


    btnMatchSelect.option(gameName);
    //btnMatchSelect.option(teamHome + ' Vs ' + teamAway);
  }

   //console.log(YTvideoID);

 }
}// close retrieveGameList


function pointOfView() {

  spobbleCollection(gameActions, YTvideoID, 'pointOfView');
};

function loadGameData() {

  //canvas.background(75);

  totActions = [];
  //singleSet = [];
  //set_actions = [];
  spobbles = {};

  var gameActions;
  var setsResult = {};
  var setsHome = 0;
  var setsAway = 0;
  var teamHome, teamAway, competition;

  var teams = document.getElementById("btnTeamSelect");
  teams.options.remove(0);
  teams.options.remove(1);

  if (btnMatchSelect.value() == 'select a match') {

    teams.options.remove(0);
    btnTeamSelect.style('display', 'none');
    background(55);
    console.log('please select a game');
  } else {

    teams.options.remove(0);
    teams.options.remove(1);
    //btnTeamSelect.style('display', 'inline-block');
    var gameString = btnMatchSelect.value().replace(/ /g,'_');
    loadJSON("https://vanda-b39f9.firebaseio.com/" + gameString + "/all_actions.json", gotData);

    var keys = Object.keys(scoreboard);
    //console.log(keys);

    for (var i = 0; i < keys.length; i++) {

      if (scoreboard[keys[i]].game_name === btnMatchSelect.value()) {

        setsResult = scoreboard[keys[i]].sets_result;
        setsHome = scoreboard[keys[i]].sets_won_home;
        setsAway = scoreboard[keys[i]].sets_won_away;
        teamHome = scoreboard[keys[i]].team_home;
        teamAway = scoreboard[keys[i]].team_away;
        competition = scoreboard[keys[i]].competition;

        YTvideoID = scoreboard[keys[i]].youtube_ID;
        btnTeamSelect.option("team's view");
        btnTeamSelect.option(scoreboard[keys[i]].team_home);
        btnTeamSelect.option(scoreboard[keys[i]].team_away);
        btnTeamSelect.style('display', 'inline-block');
      }
    }
  }

  displayFinalScoreboard(setsResult, teamHome, teamAway, setsHome, setsAway);

  var matchDescription = select('#match_description');
  matchDescription.html(
  '<p>' + competition + '</p>'
);

  //select('#player').style('display', 'inline-block');
  player.loadVideoById({videoId: YTvideoID,
                         startSeconds :0,
                         //endSeconds : 20,
                         suggestedQuality :'default'});

    player.stopVideo();

  function gotData(data) {
    gameActions = data;
    spobbleCollection(gameActions, YTvideoID, 'default');
    //console.log(gameActions);

  }
}// close loadGameData
