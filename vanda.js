var btnMatchSelect;
var btnTeamSelect;




function setup() {

  var logoImg = createImg('images/logo.png');
  logoImg.parent('logo');
  logoImg.style('width', '100%');

  var legendaImg = createImg('images/legenda.png');
  legendaImg.parent('legenda');
  legendaImg.style('width', '100%');

  /*var backgroundImg = createImg('images/background.png');
  backgroundImg.parent('vanda_header');
  backgroundImg.parent('width', '100%');*/




  vandaHeader();


  confFirebase();
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


function vandaHeader() {
  select('#container')
  .style('height', windowHeight + 'px')
  .style('width', windowWidth + 'px')
  console.log(windowHeight);

  var matchSelector = createDiv('').parent('user_interface')
  .style('height', '50%');
  btnMatchSelect = createSelect().parent(matchSelector)
  .style('width', '100%')
  .style('font-size', 'large');

  btnMatchSelect.option('select a match');
  btnMatchSelect.changed(loadGameData);

  var teamSelector = createDiv('').parent('user_interface')
  .style('height', '50%');
  btnTeamSelect = createSelect().parent(teamSelector).id('btnTeamSelect')
  .style('display', 'none')
  .style('width', '100%')
  .style('margin-top', '4%')
  .style('font-size', 'large');
  btnTeamSelect.option('point of view');
  btnTeamSelect.changed(pointOfView);

}

function pointOfView() {

  spobbleCollection(gameActions, YTvideoID, 'pointOfView');
};


function confFirebase() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDJlwhq9jVKG8yWHDTveViUmAM5qgMsOhE",
    authDomain: "vanda-b39f9.firebaseapp.com",
    databaseURL: "https://vanda-b39f9.firebaseio.com",
    storageBucket: "vanda-b39f9.appspot.com",
    messagingSenderId: "253763869036"
  };
  firebase.initializeApp(config);
  //console.log(firebase);

  database = firebase.database();
  console.log("siamo connessi!");

}

// fill the btnMatchSelect with options
function retrieveGameList() {

var ref = database.ref('/volleyball');
ref.on('value', gotData, errData);

function errData(error) {
  console.log("Something went wrong.");
  console.log(error);
}

function gotData(data) {

  //var teamHome, teamAway;
  var gameName;

  scoreboard = data.val();
  //console.log(scoreboard);


  var games = Object.keys(scoreboard);
  //console.log(games);

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
    var matchSelected = database.ref(gameString + '/all_actions');
    matchSelected.on('value', gotData, errData);

    var keys = Object.keys(scoreboard);
    console.log(keys);



    for (var i = 0; i < keys.length; i++) {

      if (scoreboard[keys[i]].game_name === btnMatchSelect.value()) {

        setsResult = scoreboard[keys[i]].sets_result;
        setsHome = scoreboard[keys[i]].sets_won_home;
        setsAway = scoreboard[keys[i]].sets_won_away;
        teamHome = scoreboard[keys[i]].team_home;
        teamAway = scoreboard[keys[i]].team_away;
        competition = scoreboard[keys[i]].competition;

        YTvideoID = scoreboard[keys[i]].youtube_ID;
        btnTeamSelect.option('point of view');
        btnTeamSelect.option(scoreboard[keys[i]].team_home);
        btnTeamSelect.option(scoreboard[keys[i]].team_away);
        btnTeamSelect.style('display', 'inline-block');
      }
    }
  }

  displayFinalScoreboard(setsResult, teamHome, teamAway, setsHome, setsAway);

  //add match description div
  //var matchInfo= createDiv('prova').parent('user_interface').id('match_description');
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



  function errData(error) {
    console.log("Something went wrong.");
    console.log(error);
  };

  function gotData(data) {
    gameActions = data.val();
    spobbleCollection(gameActions, YTvideoID, 'default');
    //console.log(gameActions);

  }
}// close loadGameData
