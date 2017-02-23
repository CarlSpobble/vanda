function hmsToSeconds(time) {

  this.time = time;

  //arrotondare in difetto o eccesso i secondi
  var times = this.time.split(":");
  times.reverse();
  var x = times.length, y = 0, z;
  for (var i = 0; i < x; i++) {
    z = times[i] * Math.pow(60, i);
    y += z;
  }

  return y;
  //console.log(this.time);
}

function mousePressed() {
  for (var i = 0; i < totActions.length; i++) {
    totActions[i].clicked();
  }
}
