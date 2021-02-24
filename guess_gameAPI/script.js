// getelementbyid is faster and better traversing 
// access the DOM elemt 'msg'
const msgEl = document.getElementById('msg');

// create a Random Number 
const randomNum =  getRandomNumber(); 
// Function getRandom Number
// getRandom () => Math.random()*100 

function getRandomNumber (){
          return Math.floor(Math.random()*100) + 1;
}

console.log(` Number: ${randomNum}`)
// console.log('Number:'+ randomNum);

// Lines 14-20 are utilizing the code from API
// recognition is an object. Initalize the Speech Recognition. 
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// create a new instance called recognition 
let recognition = new window.SpeechRecognition(); 

recognition.start();

// event listener and an onSpeak function needs to be made
recognition.addEventListener('result', onSpeak)

// Capture the input from the user's speech
function onSpeak(e){
          // console.log(e)
          const msg = e.results [0][0].transcript; 
          console.log(msg);

          writeMessage(msg);
          checkNumber(msg);
}

//Display user's input into the UI / Write what the user speaks
function writeMessage(msg){
msgEl.innerHTML = `
<div>You said:</div>
<span class ="box">${msg}</span>
`;

}

//Check the user's guess against the number
function checkNumber(msg) {
          // +msg converts a string into a number
          const num = +msg;

          // Check number to see if it's valid 
          if (Number.isNaN(num)){
                    // console.log(`msgEl.innerHTML +=`)
                    msgEl.innerHTML += `<div>That is not a number</div>`;
                    return;
          }
          
          //Check if the number is range 
          //So the number needs to be between 1 and 100
          if(num > 100 || num < 1) {
                    msgEl.innerHTML += `<div>Number must be between 1 and 100</div>`;
                    return;
          }

          //Check the number
          if(num === randomNum){
                    // Let the user know they have won
                    document.body.innerHTML = `
                              <h2>Congrat's! You have guessed the number!!!<br><br> It was ${num}</h2> 
                              <button class="play-again" id="play-again">Play Again </button>
                              
                    `
          } else if(num > randomNum) {
                    msgEl.innerHTML += `<div> Go Lower!</div>`;
          } else {
                    msgEl.innerHTML += `<div> Go Highter!</div>`;

          }

}

//End Speech Recognition Servce 
//Even Listener 
recognition.addEventListener('end',() => recognition.start());

document.body.addEventListener('click', e => {
          if(e.target.id == 'play-again'){
                    window.location.reload();
          }
})