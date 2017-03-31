function UI() {
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
  btnTeamSelect.option("team's view");
  btnTeamSelect.changed(pointOfView);

}
