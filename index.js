function rad2deg(rad) {
  return 180 * rad / Math.PI;
}


var cars = document.getElementsByClassName('car');
window.addEventListener("scroll", loopItems);

window.addEventListener("scroll", scrollIntro)

function scrollIntro(){
  var intro = document.getElementById('intro');
  var scrollY = window.scrollY || window.pageYOffset;
  var maxScrollY = window.innerHeight;
  var difference = (maxScrollY - scrollY);
  if(difference <= 0){
    intro.style.top = difference+'px';
  }
  else{
    intro.style.top = '0px';
  }
}

function loopItems(){
  var os = 20;
  for(var i=0;i<cars.length;i++){
    positionCars(cars[i],(os * -1));
    // console.log(cars[i].clientHeight)
    os = os + cars[i].clientHeight +8;
  }
}




var container = document.getElementById('intro');
function positionCars(div,offset)
{
  var  scrollY = window.scrollY || window.pageYOffset;
  // var  maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
  var maxScrollY = document.getElementById('intro').clientHeight;
  var  path = document.getElementById("path1");
  // Calculate distance along the path the div should be for the current scroll amount
  var  pathLen = path.getTotalLength();
  var  dist = pathLen * scrollY / maxScrollY - offset;
  var  pos = path.getPointAtLength(dist);

  // Calculate position a little ahead of the div
  if (dist + 1 <= pathLen) {
    var  posAhead = path.getPointAtLength(dist + 1);
    var  angle = Math.atan2(posAhead.y - pos.y, posAhead.x - pos.x);
  } else {
    var  posBehind = path.getPointAtLength(dist - 1);
    var  angle = Math.atan2(pos.y - posBehind.y, pos.x - posBehind.x);
  }
  // Position the div at "pos" totated by "angle"

  var s = div;
  // s.setAttribute("transform", "translate(" + pos.x + "," + pos.y + ") rotate(" + rad2deg(angle) + ")");
  if(dist >0)
    s.setAttribute("style", "transform: translate(" + pos.x + "px," + pos.y + "px) rotate(" + (rad2deg(angle) - 90) + "deg)");
  // s.setAttribute("style", "transform: translate(" + pos.x + "px," + pos.y + "px);");

}

// INITIALIZE

function InitPath() {
  let w = wrap.clientWidth;
  let h = wrap.clientHeight;
  ellipse.setAttributeNS(null, "viewBox", `0 0 ${w}  ${h}`);
  // let d=`M100,80 h${w-200} a20,20 0 0 1 20,20 v${h-200} a20,20 0 0 1 -20,20 h-${w-200} a20,20 0 0 1 -20,-20 v-${h-200} a20,20 0 0 1 20,-20 h${w-200} a20,20 0 0 1 20,20 v${h-200} a20,20 0 0 1 -20,20 h-${w-200} a20,20 0 0 1 -20,-20 v-${h-200} a20,20 0 0 1 20,-20 z`;
  let d = `m 00,00 v${h-320} a90,90 0 0 0 90,90 h${w-20}`
  // if(w<900)
  // d=`M60,40 h${w-120} a20,20 0 0 1 20,20 v${h-120} a20,20 0 0 1 -20,20 h-${w-120} a20,20 0 0 1 -20,-20 v-${h-120} a20,20 0 0 1 20,-20 h${w-120} a20,20 0 0 1 20,20 v${h-120} a20,20 0 0 1 -20,20 h-${w-120} a20,20 0 0 1 -20,-20 v-${h-120} a20,20 0 0 1 20,-20 z`;
  // else
  // d=`M100,80 h${w-200} a20,20 0 0 1 20,20 v${h-200} a20,20 0 0 1 -20,20 h-${w-200} a20,20 0 0 1 -20,-20 v-${h-200} a20,20 0 0 1 20,-20 h${w-200} a20,20 0 0 1 20,20 v${h-200} a20,20 0 0 1 -20,20 h-${w-200} a20,20 0 0 1 -20,-20 v-${h-200} a20,20 0 0 1 20,-20 z`;

  path1.setAttributeNS(null, "d", d);
}

InitPath();

window.addEventListener("resize", InitPath, false);


function startTime() {
  var date = dayjs().format('dddd MMMM D, YYYY')
  var time = dayjs().format('h:m:s')
  document.getElementById('date').innerHTML =  date;
  document.getElementById('time').innerHTML =  time;
  setTimeout(startTime, 1000);
}

startTime();

// loopItems();
window.onload = function(){
  console.log("LOAD")
  loopItems()
  // loopMains()
};


$(document).ready(function() {
  $('.img').magnificPopup({
    type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 200 // don't foget to change the duration also in CSS
		},
    overflowY: scroll
  });
});

function loopMains(){
  window.addEventListener("scroll", moveWithScroll)
}

function moveWithScroll(){
  var mainItems = document.getElementsByClassName('main');
  for(var i=0; i<mainItems.length; i++){
    var el = mainItems[i];
    var children = el.children;
    for(var j=0; j<children.length; j++){
        var child = children[j];
        var viewportOffset = child.getBoundingClientRect();
        // these are relative to the viewport, i.e. the window
        var top = viewportOffset.top;
        if(top <= 20){
          child.style.marginLeft = (top-20) * 5+'px';
        }
        else{
          child.style.marginLeft = 0+'px';
        }
    }
  }
}



var t = gsap.from(".window", {
  duration: 0.5, 
  x: '100%', 
  ease: "power3", 
  paused: true,
});



var blur = gsap.to('main',
{
  duration: 0.5, 
  css:{
    filter:"blur(4px)"
  },
  paused: true
});

// click handlers for controlling the tween instance...

// document.querySelector("#play").onclick = () => {
//   console.log("PLAY")
//   playAnim()
// };
document.querySelector(".window--spacer").onclick = () => {
  console.log("reverse")
  revAnim()
};

function playAnim(){
  t.play();
  blur.play();
  document.body.classList.add('window-open')
}

function revAnim(){
  t.reverse();
  blur.reverse();
  document.body.classList.remove('window-open')
}

const btns = document.querySelectorAll('.preview')
var frameLoaded = false;
const site = document.getElementById('site')
var currentUrl = "";

btns.forEach(btn => {
   btn.addEventListener('click', event => {
      event.preventDefault()
      playAnim()
      if(currentUrl != event.target.href){
        site.classList.add('is-loading')
        setTimeout(function(){ 
        console.log( event.target.href );
          site.src = event.target.href;
         }, 500);
      }
      currentUrl = event.target.href;
   });
});

document.getElementById("site").onload = function(){
  // alert('loaded')
  frameLoaded = true;
  setTimeout(function(){ 
    site.classList.remove('is-loading')
   }, 500);
};