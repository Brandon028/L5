// explore.js

window.addEventListener('DOMContentLoaded', init);

const button = document.querySelector('button');
const voiceSelect = document.querySelector("select");
let voices = [];
const synth = window.speechSynthesis;
const image = document.querySelector('img');

function init() {
  //call the documentation method to fill dropdown menu
  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  button.addEventListener('click', play_sound);
}

function populateVoiceList() {
  voices = synth.getVoices();

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += " — DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
}


function play_sound(){
  const utterThis = new SpeechSynthesisUtterance(document.getElementById('text-to-speak').value);
  const selectedOption =
    voiceSelect.selectedOptions[0].getAttribute("data-name");
  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }
  synth.speak(utterThis);
  utterThis.onstart = function(event) {
    image.src = 'assets/images/smiling-open.png';
  };

  utterThis.onend = function(event) {
    image.src = 'assets/images/smiling.png';
  };

}

