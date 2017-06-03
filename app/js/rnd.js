function getRndBias(min, max, bias, influence) {
    var rnd = Math.floor(Math.random() * (max - min + 1)) + min;   // random in range (Including the boundaries)
        mix = Math.random() * influence;                           // random mixer
    return Math.floor(rnd * (1 - mix) + bias * mix);               // mix full range and bias
}

function nth(d) {
  if(d>3 && d<21) return 'th'; // thanks kennebec
  switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
}

function dater(d){
  var date = d.getDate(),
  month = "January,February,March,April,May,June,July,August,September,October,November,December"
  .split(",")[d.getMonth()];
  return (date+nth(date) +" "+month)
}
