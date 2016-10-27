/******************************************
Very tiny battery api app w. service workers for offline (for use with offline widgets flow)
******************************************/

// install service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function(err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}

// $ will never die 
const $ = document.querySelector.bind(document)

// wait till window (all images) are loaded (not just dom/document)
window.addEventListener('load', () =>{

  // get svg's document
  let batteryDom = $('#battery')
  let svgDoc = batteryDom.contentDocument
  let svg$ = svgDoc.querySelector.bind(svgDoc)
  let mouth = svg$('#mouth')
  let background = svg$('rect#background')
  
  function setupDischarging(battery){  
    let yDisp = background.y.baseVal.value;
    let height = background.height.baseVal.value;
    
    function setBGHeight(perc){
      let newHeight = height * perc
      let newY = yDisp + (height - newHeight)
      background.style.y = newY
      background.style.height = newHeight
    }
    
    function onDischargeChange(battery){
      console.log(battery.level);
      if (battery.level < 0.5) {
        if (!mouth.classList.contains('sad')) {
          mouth.classList.toggle('sad')
          mouth.classList.toggle('happy')
        }
      }
      setBGHeight(battery.level)
    }

    onDischargeChange(battery)
    battery.ondischargetimechage = onDischargeChange
  }

  navigator.getBattery()
    .then( battery => {
      if (battery.charging){
        setupCharging(battery)
      } else {
        setupDischarging(battery)
      }
    })
    .catch(console.error)
})

function setupCharging(){
  console.log("actually i'm charging")
}


