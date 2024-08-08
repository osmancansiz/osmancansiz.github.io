//styles
let bodyStyles = window.getComputedStyle(document.body);
let barcolor = bodyStyles.getPropertyValue("--barcolor");
let redcolor = bodyStyles.getPropertyValue("--redcolor");
console.log(barcolor, redcolor);
//icons
let greenCheck =
  '<svg aria-hidden="true" data-prefix="fas" data-icon="check-square" class="svg-inline--fa fa-check-square fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="16" width="16"><path fill=' +
  barcolor +
  ' d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"></path></svg>';
let redStop =
  '<svg aria-hidden="true" data-prefix="fas" data-icon="minus-square" class="svg-inline--fa fa-minus-square fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="16" width="16"><path fill=' +
  redcolor +
  ' d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM92 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H92z"></path></svg>';
//elements
let indicator = document.querySelector(".indicator");
let ud = document.querySelector(".ud");
let lr = document.querySelector(".lr");
let container = document.querySelector(".container");
let supWarn = document.querySelector(".supWarn");
let soundSwitchBG = document.querySelector(".soundSwitchBG");
let soundSwitch = document.querySelector(".soundSwitch");
let audio = document.getElementById("clickSound");
//strings
const betaCurrentId = document.getElementById("betaCurrent");
const gammaCurrentId = document.getElementById("gammaCurrent");
const betaCorrectedId = document.getElementById("betaCorrected");
const gammaCorrectedId = document.getElementById("gammaCorrected");
const betaOffsetId = document.getElementById("betaOffset");
const gammaOffsetId = document.getElementById("gammaOffset");
const scrnOrId = document.getElementById("scrnOr");
const devTypeId = document.getElementById("devType");
//bar text
let hbartxt = document.querySelector(".hbartxt");
let vbartxt = document.querySelector(".vbartxt");
//bars
let hbarl = document.querySelector(".hbarl");
let hbarr = document.querySelector(".hbarr");
let vbart = document.querySelector(".vbart");
let vbarb = document.querySelector(".vbarb");
//client size
let maxX = container.clientWidth - indicator.clientWidth;
let maxY = container.clientHeight - indicator.clientHeight;
console.log(maxX, maxY);
//settings
let centerTol = 0.2;
let menuExp = false;
let isCal = false;
let infExp = false;
let soundOn = false;
let devorSup = false;

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//check orientation support
let dosup = document.getElementById("dosup");
if (window.DeviceOrientationEvent) {
  // Our browser supports DeviceOrientation
  console.log("Yay");
  devorSup = true;
} else {
  console.log("Sorry, your browser doesn't support Device Orientation");
  devorSup = false;
}
//Check if FF
let isFF = "";
if (navigator.userAgent.indexOf("Firefox") !== -1) {
  let dtp = deviceType();
  if (dtp === "mobile") {
    isFF = false;
  } else {
    isFF = true;
  }
}
//check if Opera
let isOP = false;
isOP = navigator.userAgent.match(/Opera|OPR\//) ? true : false;
//Set styles
if (devorSup === false || isFF || isOP) {
  setNoSup();
} else {
  setSup();
}

function setNoSup() {
  supWarn.style.display = "inline";
  dosup.innerHTML = redStop;
}
function setSup() {
  supWarn.style.display = "none";
  dosup.innerHTML = greenCheck;
}
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

//Vibr Stuff
//Vibr Stuff
let vibSwitchBG = document.querySelector(".vibSwitchBG");
let vibSwitch = document.querySelector(".vibSwitch");

//detect vibra
let vibraNav = "vibrate" in navigator;
let vibraSup = false;
let devT = deviceType();
if (devT === "mobile") {
  if (vibraNav) {
    vibraSup = true;
  }
}
let vibraOn = true;

//Set support in UI
let vibsup = document.getElementById("vibsup");
if (vibraSup) {
  vibsup.innerHTML = greenCheck;
} else {
  vibsup.innerHTML = redStop;
  vibSwitch.style.left = "5px";
  vibSwitch.style.background = "#666";
  vibSwitchBG.style.background = "var(--greycolor)";
}

let betaCurrent = 0;
let gammaCurrent = 0;
let betaCorrected = 0;
let gammaCorrected = 0;
let betaOffset = 0;
let gammaOffset = 0;
let scrnOr = "";
let devType = "";

function closeWarning() {
  supWarn.style.display = "none";
}

function UpdateDataView() {
  betaCurrentId.innerHTML = parseFloat(betaCorrected).toFixed(1);
  gammaCurrentId.innerHTML = parseFloat(gammaCorrected).toFixed(1);
  betaCorrectedId.innerHTML = parseFloat(betaCurrent).toFixed(1);
  gammaCorrectedId.innerHTML = parseFloat(gammaCurrent).toFixed(1);
  betaOffsetId.innerHTML = parseFloat(betaOffset).toFixed(2);
  gammaOffsetId.innerHTML = parseFloat(gammaOffset).toFixed(2);
  scrnOrId.innerHTML = scrnOr;
  devTypeId.innerHTML = devType;

  //bars
  vbartxt.innerHTML = parseFloat(betaCorrected).toFixed(0);
  hbartxt.innerHTML = parseFloat(gammaCorrected).toFixed(0);
  let betang = betaCorrected;
  if (betang > 0) {
    if (betang > 90) {
      betang = 90;
    }
    betang = (betang / 90) * 95;
    vbarb.style.height = betang + "px";
    vbart.style.height = "0px";
  } else {
    if (betang < -90) {
      betang = -90;
    }
    betang = (betang / 90) * -95;
    vbarb.style.height = "0px";
    vbart.style.height = betang + "px";
    vbart.style.top = 100 - betang + "px";
  }
  let gamang = gammaCorrected;
  if (gamang > 0) {
    if (gamang > 90) {
      gamang = 90;
    }
    gamang = (gamang / 90) * 95;
    hbarr.style.width = gamang + "px";
    hbarl.style.width = "0px";
  } else {
    if (gamang < -90) {
      gamang = -90;
    }
    gamang = (gamang / 90) * -95;
    hbarl.style.width = gamang + "px";
    hbarl.style.left = 100 - gamang + "px";
    hbarr.style.width = "0px";
  }

  //indicator color
  if (betang < centerTol && betang > -1 * centerTol && gamang < centerTol && gamang > -1 * centerTol) {
    indicator.style.borderColor = "var(--barcolor)";
    ud.style.background = "var(--barcolor)";
    lr.style.background = "var(--barcolor)";
    if (vibraSup && vibraOn) {
      window.navigator.vibrate(10);
    }
    if (soundOn) {
      audio.play();
    }
  } else {
    indicator.style.borderColor = "#FFF";
    ud.style.background = "#FFF";
    lr.style.background = "#FFF";
  }
}

//ORIENT-EVENT
function handleOrientation(event) {
  let orient = detectOrientation();
  let orient2 = detectOrientStr();
  scrnOr = orient2;
  maxX = container.clientWidth - indicator.clientWidth;
  maxY = container.clientHeight - indicator.clientHeight;
  //console.log(maxX, maxY);

  let absolute = event.absolute;
  let alpha = event.alpha; // In degree in the range [-360,360]
  betaCurrent = event.beta;

  //check for value here...?
  if (isNaN(betaCurrent) || betaCurrent === null) {
    console.log("not a number - no support");
    setNoSup();
  } else {
    setSup();
  }
  ///////////////////////////////////

  betaCorrected = betaCurrent * 1 - betaOffset; //0.97
  let beta = betaCurrent - betaOffset; // In degree in the range [-180,180]
  gammaCurrent = event.gamma;
  gammaCorrected = gammaCurrent * 1 - gammaOffset; //0.95
  let gamma = gammaCurrent - gammaOffset; // In degree in the range [-90,90]

  // To make computation easier we shift the range of
  // x and y to [0,180]
  //alpha += 90;
  beta += 90;
  gamma += 90;

  let toLeft = (maxX / 180) * gamma + 10 + "px";
  let toTop = (maxY / 180) * beta + 10 + "px";
  let device = deviceType();
  devType = device;

  //Landscape mobile
  if (orient === 1 && device === "mobile") {
    toLeft = (maxX / 180) * beta + 10 + "px";
    toTop = (maxY / 180) * gamma + 10 + "px";
  }

  //iOS Landscape
  let iOS = detectIOS();
  //alert(orient2);
  if (orient2 === "landscape") {
    if (iOS === 1) {
      //alert("hiii");
      toTop = (maxY / 180) * gamma + 10 + "px";
      toLeft = (maxX / 180) * beta + 10 + "px";
    }
  }
  //Portrait desktop
  if (orient === 2 && device === "desktop") {
    toLeft = (maxX / 180) * beta + 10 + "px";
    toTop = (maxY / 180) * gamma + 10 + "px";
  }

  indicator.style.top = toTop;
  indicator.style.left = toLeft;

  UpdateDataView();
}

function calibrate() {
  switchCal();
  betaOffset = 0;
  gammaOffset = 0;
  betaOffset = betaCurrent;
  gammaOffset = gammaCurrent;
  betaCorrected = 0;
  gammaCorrected = 0;
  indicator.style.top = maxY / 2 + 10 + "px";
  indicator.style.left = maxX / 2 + 10 + "px";
  indicator.style.borderColor = "var(--barcolor)";
  ud.style.background = "var(--barcolor)";
  lr.style.background = "var(--barcolor)";
  UpdateDataView();
}

function resOffset() {
  switchCal();
  betaOffset = 0;
  gammaOffset = 0;
  betaCorrected = betaCurrent;
  gammaCorrected = gammaCurrent;
  indicator.style.top = (maxY / 180) * (betaCurrent + 90) + 10 + "px";
  indicator.style.left = (maxX / 180) * (gammaCurrent + 90) + 10 + "px";
  indicator.style.borderColor = "#FFF";
  ud.style.background = "#FFF";
  lr.style.background = "#FFF";
  UpdateDataView();
}

function deviceType() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //console.log("mobile");
    return "mobile";
  } else {
    //console.log("desktop");
    return "desktop";
  }
}

function detectIOS() {
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    //console.log("mobile");
    return 1;
  } else {
    //console.log("desktop");
    return 0;
  }
}

function detectOrientStr() {
  //console.log(window.screen.orientation);

  if (window.matchMedia("(orientation: portrait)").matches) {
    // you're in PORTRAIT mode
    //output.innerHTML += "orientation: " + "portrait" + "\n";
    return "portrait";
  }

  if (window.matchMedia("(orientation: landscape)").matches) {
    //output.innerHTML += "orientation: " + "landscape" + "\n";
    return "landscape";
  }
}
function detectOrientation() {
  let orientation = screen.msOrientation || (screen.orientation || screen.mozOrientation || {}).type;

  if (orientation === "landscape-primary") {
    return 1;
  } else if (orientation === "landscape-secondary") {
    //"Mmmh... the screen is upside down!
    return 3;
  } else if (orientation === "portrait-secondary" || orientation === "portrait-primary") {
    //console.log("Mmmh... you should rotate your device to landscape");
    return 2;
  } else if (orientation === undefined) {
    //console.log("The orientation API isn't supported in this browser :(");
    return 4;
  }
}

window.addEventListener("deviceorientation", handleOrientation);

//////////////////////////////////////////////////////////
//               Interface
//////////////////////////////////////////////////////////

const menu = document.querySelector(".menu");
const txtBlock = document.querySelector(".txtBlock");
const datBlock = document.querySelector(".dat");
const inf = document.querySelector(".inf");

const calTxt = document.getElementById("calTxt");
const infTxt = document.getElementById("infTxt");
const menuTxt = document.getElementById("menuTxt");
//
const burger = document.querySelector(".burger");
const calbutt = document.querySelector(".calbutt");
const infbutt = document.querySelector(".infbutt");
const resbutt = document.querySelector(".resbutt");

function infDisp() {
  if (vibraOn && vibraSup) {
    window.navigator.vibrate(10);
  }
  if (infExp) {
    inf.style.display = "none";
    infExp = false;
  } else {
    inf.style.display = "inline";
    infExp = true;
  }
}

//Calibration UI
function switchCal() {
  inf.style.display = "none";
  infExp = false;
  if (vibraOn && vibraSup) {
    window.navigator.vibrate(10);
  }
  if (isCal) {
    calTxt.innerHTML = "Zero";
    resbutt.style.display = "none";
    calbutt.style.display = "inline";
    resTxt.style.display = "none";
    isCal = false;
  } else {
    resTxt.innerHTML = "Clear";
    resbutt.style.display = "inline";
    calbutt.style.display = "none";
    resTxt.style.display = "inline";
    isCal = true;
  }
}

//Menu UI
async function switchMenu() {
  //ask for permission on iOS
  if (DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === "function") {
    const permissionState = await DeviceOrientationEvent.requestPermission();
    if (permissionState === "granted") {
      // do nothing special if granted
    } else {
      let warnTXT = document.querySelector(".cltxt");
      warnTXT.innerHTML = "You have denied permission, so this app wont work. 😢<br><br>To give permission force-close your browser and try again.";
      supWarn.style.display = "inline";
    }
  }

  //haptic feedback on android if on
  if (vibraOn && vibraSup) {
    window.navigator.vibrate(10);
  }
  if (menuExp) {
    //burger.style.transform = "translate(-50%, 0%) rotate(0deg)";
    burger.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.7)";
    calbutt.style.transform = "translate(-50%, 0%) rotate(0deg)";
    resbutt.style.transform = "translate(-50%, 0%) rotate(0deg)";
    infbutt.style.transform = "translate(-50%, 0%) rotate(0deg)";

    burger.style.top = "0 0 10px rgba(0, 0, 0, 0.7)";
    calbutt.style.top = "translate(-50%, 0%) rotate(180deg)";
    infbutt.style.top = "translate(-50%, 0%) rotate(-180deg)";

    menu.style.top = "calc(100% - 102px)";
    menu.style.height = "80px";
    menu.style.width = "80px";
    txtBlock.style.display = "none";
    datBlock.style.display = "none";
    inf.style.display = "none";
    infExp = false;
    menuTxt.style.opacity = "0";
    calTxt.style.opacity = "0";
    infTxt.style.opacity = "0";
    resTxt.style.opacity = "0";
    menuExp = false;
  } else {
    //burger.style.transform = "translate(-50%, 0%) rotate(180deg)";
    burger.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.4)";
    calbutt.style.transform = "translate(-190%, 0%) rotate(0deg)";
    resbutt.style.transform = "translate(-190%, 0%) rotate(0deg)";
    infbutt.style.transform = "translate(90%, 0%) rotate(0deg)";

    menu.style.top = "calc(100% - 347px)";
    menu.style.height = "340px";
    menu.style.width = "300px";
    txtBlock.style.display = " inline";
    datBlock.style.display = "inline";
    menuTxt.style.opacity = "1";
    calTxt.style.opacity = "1";
    infTxt.style.opacity = "1";
    resTxt.style.opacity = "1";
    menuExp = true;
  }
}

switchMenu();
burger.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.7)";
calbutt.style.transform = "translate(-50%, 0%) rotate(0deg)";
resbutt.style.transform = "translate(-50%, 0%) rotate(0deg)";
infbutt.style.transform = "translate(-50%, 0%) rotate(0deg)";

burger.style.top = "0 0 10px rgba(0, 0, 0, 0.7)";
calbutt.style.top = "translate(-50%, 0%) rotate(180deg)";
infbutt.style.top = "translate(-50%, 0%) rotate(-180deg)";

menu.style.top = "calc(100% - 102px)";
menu.style.height = "80px";
menu.style.width = "80px";
txtBlock.style.display = "none";
datBlock.style.display = "none";
inf.style.display = "none";
infExp = false;
menuTxt.style.opacity = "0";
calTxt.style.opacity = "0";
infTxt.style.opacity = "0";
resTxt.style.opacity = "0";
menuExp = false;

//Vibra Setting
function VibraSwitch() {
  let clkOffs = vibSwitch.offsetLeft;
  if (clkOffs < 10) {
    if (vibraSup) {
      vibSwitch.style.left = "22px";
      vibSwitch.style.background = "var(--barcolor)";
      window.navigator.vibrate(10);
      vibraOn = true;
    }
  } else {
    vibSwitch.style.left = "5px";
    vibSwitch.style.background = "var(--redcolor)";
    vibraOn = false;
  }
}

//Sound Setting
function SoundSwitch() {
  if (soundOn) {
    soundOn = true;
    soundSwitch.style.left = "5px";
    soundSwitch.style.background = "var(--redcolor)";
    if (vibraOn && vibraSup) {
      window.navigator.vibrate(10);
    }
    soundOn = false;
  } else {
    soundSwitch.style.left = "22px";
    soundSwitch.style.background = "var(--barcolor)";
    audio.play();
    if (vibraOn && vibraSup) {
      window.navigator.vibrate(10);
    }
    soundOn = true;
  }
}
