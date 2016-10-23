/******************************************
Very tiny battery api app w. service workers for offline (for use with offline widgets flow)
******************************************/

const $ = document.querySelector.bind(document)

document.addEventListener('DOMContentLoaded', () =>{

  let statsContainer = $('#stats-container')
  let dcTimeSpan = statsContainer.querySelector('.discharge-time')

  navigator.getBattery()
  .then( battery => {
    console.log(battery);
    battery.onchargingchange = onChargingChange(battery)
    battery.ondischargingtimechange = onDischargeChange(battery)
    if (battery.charging){
      setupCharging()
    } else {
      setupDischarging()
    }
  })
  .catch(console.error)

  function onChargingChange(){
    console.log("charging change");
  }

  function onDischargeChange(dischargeTime){
    dcTimeSpan.innerHTML = dischargeTime
  }

  function setupCharging(){}

  // const batteryMeter = new BatteryMeter()
})


// class BatteryMeter {
//   constructor(){
//     navigator.getBattery()
//       .then( battery => {
//         this.battery = battery
//         battery.onchargingchange = this.onChargingChange.bind(this)
//         battery.ondischargingtimechange = this.onDischargeChange.bind(this)
//         // battery.onlevelchange = this.onLevelChange.bind(this)
//         if (battery.charging){
//           this.setupCharging()
//         } else {
//           this.setupDischarging
//         }
//       })
//       .catch(console.error)
//   }
//   setupDischarging(){
//     console.log("setupDischarge");
//     // setup dom here
//   }
//   setupCharge(){
//     console.log("setupCharge");
//   }
//   changeDischarge(){
//     // change dom here
//   }
//   onLevelChange(newLevel){
//     console.log("levelChanged", newLevel);
//   }
//   onDischargeChange(newDischarge){
//     console.log("newDischarge", this.battery.dischargingTime);
//     setupDischarge(this.battery.dischargingTime)
    
//   }
//   onChargingChange(){
//     console.log("charging changed");
//   }
// }


// function setupCallback

// const myMeter = new BatteryMeter()

// const batteryMeter = navigator.getBattery()

// batteryMeter.then( battery => {
//   let level = battery.level;
//   let dischargetime = battery.dischargetime;
//   battery.onlevelchange = (lvl) =>{
//     console.log("level", lvl);
//    level = lvl;
//   }
//   battery.ondischargingtimechange = (tm) => {
//     dischargeTime = tm;
//     console.log("discharge", dischargeTime);
//   } 

//   console.info("battery", battery)
// })
// .catch( err => console.error("err", err))