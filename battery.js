/******************************************
Very tiny battery api app w. service workers for offline (for use with offline widgets flow)
******************************************/

// install service worker
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/sw.js').then(function(registration) {
//     // Registration was successful
//     console.log('ServiceWorker registration successful with scope: ', registration.scope);
//   }).catch(function(err) {
//     // registration failed :(
//     console.log('ServiceWorker registration failed: ', err);
//   });
// }

// $ will never die 
const $ = document.querySelector.bind(document)

// wait till window (all images) are loaded (not just dom/document)
window.addEventListener('load', () =>{

  // get svg's document
  let batteryDom = $('#battery')
  let svgDoc = batteryDom.contentDocument
  let svg$ = svgDoc.querySelector.bind(svgDoc)
  let mouth = svg$('#mouth')
  let eyes = svg$('#eyes')
  let background = svg$('rect#background')
  


  function onChargingChange({currentTarget}){
    let battery = currentTarget, isCharging = battery.charging;
    if (isCharging){
      setupCharging(battery)
    } else {
      setupDischarging(battery)
    }
  }

  function setupDischarging(battery){  
    let yDisp = background.y.baseVal.value;
    let height = background.height.baseVal.value;
    
    function setBGHeight(perc){
      let newHeight = height * perc
      let newY = yDisp + (height - newHeight)
      background.style.y = newY
      background.style.height = newHeight
    }
    
    function onLevelChange(battery){
      console.log(battery.level);
      if (battery.level < 0.5 && battery.level >= 0.35) {
        mouth.setAttribute('class', 'mouth-neutral')
        eyes.setAttribute('class', 'eyes-neutral')
      } else if (battery.level < 0.35 && battery.level >= 0.10) {
        mouth.setAttribute('class', 'mouth-sad')
        eyes.setAttribute('class', 'eyes-sad')
      } else if (battery.level < 0.10) {
        mouth.setAttribute('class', 'mouth-wobbly')
        eyes.setAttribute('class', 'eyes-wobbly')
      }
      setBGHeight(battery.level)
    }

    onLevelChange(battery)
    battery.onlevelchange = onLevelChange
  }

  function setupCharging(){
    console.log("actually i'm charging")

    // mouth.classList.toggle("mouth-happy")
    mouth.setAttribute('class', 'mouth-happy')
    eyes.setAttribute('class', "eyes-happy")

    // what happens to the fill when charging?
  }

  navigator.getBattery()
    .then( battery => {
      if (battery.charging){
        setupCharging(battery)
      } else {
        setupDischarging(battery)
      }
      battery.onchargingchange = onChargingChange
    })
    .catch(console.error)
})


