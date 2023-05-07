// expose.js


window.addEventListener('DOMContentLoaded', init);
const jsConfetti = new JSConfetti();

const imageList = document.querySelectorAll('img');
const audio = document.querySelector('audio');
const button = document.querySelector('button');
var is_party = false;

function init() {
  //watch for when the dropdown changes, call change_horn
  document.getElementById('horn-select').addEventListener('change', change_horn);

  //watch for when the slider changes, call change_volume
  document.getElementById('volume').addEventListener('input', change_volume);

  //watch for button press, call play_sound
  button.addEventListener('click', play_sound);
}


function change_horn(){
  //get dropdown choice
  var horn_value = document.getElementById('horn-select').value;

  //change image
  var image = imageList[0];
  image.src = 'assets/images/' + horn_value + '.svg';
  
  //change sound
  audio.src = 'assets/audio/' + horn_value + '.mp3';

  //check if party horn is selected, 
  is_party = (horn_value == 'party-horn');
}

function change_volume(){
  //get slider value
  var volume_value = document.getElementById('volume').value;

  //change volume icon based on slider
  var image = imageList[1];
  if (volume_value == 0) {
    image.src = 'assets/icons/volume-level-0.svg';
  } else if (volume_value < 33){
    image.src = 'assets/icons/volume-level-1.svg';
  } else if (volume_value < 67){
    image.src = 'assets/icons/volume-level-2.svg';
  } else {
    image.src = 'assets/icons/volume-level-3.svg';
  }

  //update audio level
  audio.volume = volume_value/100
}

function play_sound(){
  audio.play();
  if (is_party){
    jsConfetti.addConfetti({
      confettiColors: ["#fcf403","#62fc03","#f4fc03","#03e7fc","#03fca5","#a503fc","#fc03ad","#fc03c2"],
    })
  }
}
