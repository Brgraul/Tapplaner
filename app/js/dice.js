var face1=1;

var show = function() {
  document.getElementById("cube1").setAttribute('class', 'show'+face1);
  if(face1==6) {
    face1=1;
  } else {
    face1++;
  }
};

var face2=2;

var showTouch = function() {
  document.getElementById("cube2").setAttribute('class', 'show'+face2);
  console.log("I was executed!");
  console.log(face2);
  if(face2==6) {
    face2=1;
    console.log("I was face6!")
  } else {
    face2++;
  }
};

var timer=setInterval("show()", 1500);
