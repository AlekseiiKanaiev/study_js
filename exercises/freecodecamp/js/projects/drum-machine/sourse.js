// const banks = require('./banks.js')
const bankOne = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
}, {
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
}, {
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
}, {
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
}, {
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
}, {
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
}, {
  keyCode: 90,
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
}, {
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
}, {
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
},
];

const bankTwo = [{
keyCode: 81,
keyTrigger: 'Q',
id: 'Chord-1',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
}, {
keyCode: 87,
keyTrigger: 'W',
id: 'Chord-2',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
}, {
keyCode: 69,
keyTrigger: 'E',
id: 'Chord-3',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
}, {
keyCode: 65,
keyTrigger: 'A',
id: 'Shaker',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
}, {
keyCode: 83,
keyTrigger: 'S',
id: 'Open-HH',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
}, {
keyCode: 68,
keyTrigger: 'D',
id: 'Closed-HH',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
}, {
keyCode: 90,
keyTrigger: 'Z',
id: 'Punchy-Kick',
url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
}, {
keyCode: 88,
keyTrigger: 'X',
id: 'Side-Stick',
url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
}, {
keyCode: 67,
keyTrigger: 'C',
id: 'Snare',
url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
}];

let soundVolume = 0.3;
let isPower = true;
let set = bankOne;

str = `<p> Hello </p>`



function setContent(set){
    let content = '';
    for (let i = 0; i < set.length;){
        content += `<tr>`
        for (let j = 0; j < 3; j++, i++){
            content += `<td class="drum-pad" id=${set[i].id}>
            <p>${set[i].keyTrigger}</p>
                <audio src=${set[i].url} class="clip" id=${set[i].keyTrigger}></audio>
            </td>`
        }
        content +=`</tr>`
    
    }
    return content;
}


function addDrumPadListener(set){
  for (let pad of set) {
    document.getElementById(pad.id).addEventListener('click', (e) => {
      // console.log(e);
      action(pad)
    })
  }
}

function removeStyle(id, name){
  document.getElementById(id).classList.remove(name)
}

function action(pad){
  let styles = document.getElementById(pad.id).classList
  if (isPower) {
    playSound(pad.keyTrigger);
    showDisplay(pad.id);
    styles.add('activePadStyle');
    setTimeout(removeStyle, 250, pad.id, 'activePadStyle');
  } else {
    styles.add('inactivePadStyle');
    setTimeout(removeStyle, 250, pad.id, 'inactivePadStyle');
  }
}

function playSound(keyName){
  const sound = document.getElementById(keyName);
  sound.volume = soundVolume;
  sound.currentTime = 0;
  sound.play();
}

function showDisplay(text){
  // console.log(text);
  document.getElementById('display').innerHTML = text;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('drum-pads').innerHTML = setContent(set);
});

window.onload = () => {

    // console.log(document.getElementById('drum-pads'));
    let timer;
    let isBank = true;
    const volumeBar = document.getElementById('volume');
    const powerSelect = document.getElementById('power-select').children[0];
    const bankSelect = document.getElementById('bank-select').children[0];

    addDrumPadListener(set);

    document.addEventListener('keypress', (e) => {
      // console.log(e.code.slice(-1));
      let pad = set.filter(el => el.keyTrigger === e.code.slice(-1));
      // console.log(pad);
      if (pad.join()) action(pad[0])
    })

    volumeBar.addEventListener('click', (e) => {
      // console.log(e);
      if (timer) clearTimeout(timer);
      soundVolume = volumeBar.value;
      showDisplay(Math.round(soundVolume*100));
      timer = setTimeout(showDisplay, 3000, '');
    });
    
    powerSelect.addEventListener('click', () => {
      isPower = !isPower;
      if (isPower){
        powerSelect.children[0].style.float = 'left';
        volumeBar.removeAttribute("disabled", "disabled");
      } else {
        powerSelect.children[0].style.float = 'right';
        volumeBar.setAttribute("disabled", "disabled");
        if (timer) clearTimeout(timer);
        showDisplay('');
      }
    });
    
    bankSelect.addEventListener('click', () => {
      if (isPower){
        if (set === bankOne) {
          set = bankTwo;
          bankSelect.children[0].style.float = 'right';
          if (timer) clearTimeout(timer);
          showDisplay('Smooth Piano Kit');
        } else {
          set = bankOne;
          bankSelect.children[0].style.float = 'left';
          if (timer) clearTimeout(timer);
          showDisplay('Heater Kit');
        }
        document.getElementById('drum-pads').innerHTML = setContent(set);
      }
    });
}