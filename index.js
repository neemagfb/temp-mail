import { fetchMessages, getMessage } from "./req_module.js";


var copyBtn = document.querySelector("#copyBtn"),
  genAnotherMail = document.querySelector("#genbtn"),
  eminp = document.querySelector("#prmpt"),
  emailList = ["somthing.one", 'somthing.two', 'somthing.three'],
  lastChosen,
  nowUsing;
let charList = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
  domainList = ["dpptd.com", "rteet.com"],
  lastDomUsed = '',
  lastRefreshTime,
  refreshTimer = document.querySelector("#refreshTimer");
  let rerate = 10;
  let refreshInterval;

function ramdomEmail(len) {
  let toReturn = "",
    finalDomToReturn = '';
  do {
    toReturn += charList[Math.floor(Math.random() * charList.length)];
    len--;
  } while (len > 0);
  toReturn += "@";

  do {
    finalDomToReturn = domainList[Math.floor(Math.random() * domainList.length)];
    console.log(finalDomToReturn);
  } while (lastDomUsed === finalDomToReturn)
  toReturn += finalDomToReturn;
  lastDomUsed = finalDomToReturn;
  return toReturn;
}

var genAFORNOWTEMP = ramdomEmail(5);
eminp.value = genAFORNOWTEMP;
var nowUsing = genAFORNOWTEMP;
eminp.addEventListener("input", (e) => {
  eminp.value = nowUsing;
});
/*
var mefetch = await fetchMessages(nowUsing);
clearInbox();
mefetch.forEach((data) => {
sendToInbox({
  email: nowUsing,
  id: data.id,
  title: data.subject,
  time: data.date,
  sender: data.from
});
});*/
checkInbox();

async function checkInbox() {
  let mefetchho = await fetchMessages(nowUsing);
  clearInbox();
  mefetchho.forEach(retdata => {
    sendToInbox({
      email: nowUsing,
      id: retdata.id,
      title: retdata.subject,
      time: retdata.date,
      sender: retdata.from
    });
  });
  
  if(mefetchho.length < 1) {
  document.querySelector(".inbox").innerHTML = `<span style="font-size: 30px; color: #02f006; cursor: wait;">
        nothing in the inbox, inbox automatically refresh in every 10 seconds
      </span>`;
  }
}

function clearInbox() {
  document.querySelector(".inbox").innerHTML = "";
}
function sendToInbox(mail, email) {
  var ele37 = document.createElement("div");
  ele37.classList.add("inboxMail");
  ele37.onclick = function() {
    getMessage(`${mail?.id ?? null}`, `${mail?.email}`);
  }
  var epe74 = document.createElement("span");
  epe74.classList.add("mailTitle");
  epe74.textContent = mail?.title ?? "Unknown Title";
  epe74.onclick = function() {
    getMessage(`${mail?.id ?? null}`, `${mail?.email}`);
  }
  ele37.appendChild(epe74);
  ele37.appendChild(document.createElement("br"));
  ele37.appendChild(document.createElement("br"));
  var ehi94 = document.createElement("span");
  ehi94.classList.add("sendBy");
  ehi94.textContent = mail?.sender ?? "Unknown Sender";
  ele37.appendChild(ehi94);
  ele37.appendChild(document.createElement("br"));
  var tme32 = document.createElement("span");
  tme32.classList.add("mailTime");
  tme32.textContent = mail?.time ?? "00/00/0000 | 24:00";
  ele37.appendChild(tme32);
  document.querySelector(".inbox").appendChild(ele37);
}

const cookieConsent = document.getElementById('cookie-consent');
try {
const acceptButton = document.getElementById('accept-cookies');

acceptButton.addEventListener('click', () => {
  // Simulate storing consent (replace with actual storage logic)
  localStorage.setItem('cookieConsentAccepted', true);
  cookieConsent.style.display = 'none';
}).catch();
// } catch {}

if (localStorage.getItem('cookieConsentAccepted')) {
  cookieConsent.style.display = 'none';
}
} catch (e) {console.log(e);}

copyBtn.addEventListener("click", () => {
  copyBtn.textContent = 'email address copied !..';
  copyBtn.style.cursor = "grabbing";
  copyBtn.disabled = true;
  try {
    eminp.select();
    eminp.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(eminp.value);
  } catch {}
  setTimeout(() => {
    copyBtn.textContent = 'COPY EMAIL ADDRESS';
    copyBtn.style.cursor = "grab";
    copyBtn.disabled = false;
  }, 1500);
});


let rateNewRef;
genAnotherMail.addEventListener("click", () => {
  let newMailAdd = ramdomEmail(5);
  eminp.value = newMailAdd;
  nowUsing = newMailAdd;
  if(rateNewRef) {
    clearTimeout(rateNewRef);
    console.log("rate limit hut");
  }
  rateNewRef = setTimeout(() => {
  clearInbox();
  checkInbox();
  clearTimeout(rateNewRef);
  clearInterval(refreshInterval);
  rerate = 11;
  refreshInterval = setInterval(() => {
  rerate--;
  if (rerate < 0) {
    rerate = 10;
    checkInbox();
  }
  refreshTimer.textContent = `Auto Refresh In ${rerate} sec.`;
}, 1001);

  console.log("success");
  }, 1800);
});

try {
document.querySelector('.refreshBtn').addEventListener('click', () => {
  if (lastRefreshTime+3000 > Date.now()) {
    return;
  }
  lastRefreshTime = Date.now();
  console.log(lastRefreshTime);
  
});
} catch {};

// auto refresh evbery 10 sec
refreshInterval = setInterval(() => {
  rerate--;
  if (rerate < 0) {
    rerate = 10;
    checkInbox();
  }
  refreshTimer.textContent = `Auto Refresh In ${rerate} sec.`;
}, 1001);

document.querySelector('.inboxMsgClosebutton').addEventListener("click", () => {
  document.querySelector(`.perEmail`).style.display = 'none';
});

function setCustom(email) {
  nowUsing = email ?? null;
  eminp.value = nowUsing;
}


var nameInp = document.querySelector("#name");
document.querySelector("#name").addEventListener("input", () => {
  if(!(/^[a-zA-Z0-9]+$/.test(nameInp.value))){
    var oldhdo = nameInp.value.replace(/[^a-zA-Z0-9]/g, "");
    nameInp.value = oldhdo;
  }
});

document.querySelector("#setCDomain").addEventListener("click", () => {
  var name = document.querySelector("#name").value;
  var domain = document.querySelector("#domain").value;
  if (!name || name.trim() === "") {
    document.querySelector("#name").focus();
    return;
  }
  document.querySelector(".customEmailDiv").style.display = "none";
  var email = name + "@" + domain;
setCustom(email);

if(rateNewRef) {
    clearTimeout(rateNewRef);
    console.log("rate limit hut");
  }
  rateNewRef = setTimeout(() => {
  clearInbox();
  checkInbox();
  clearTimeout(rateNewRef);
  clearInterval(refreshInterval);
  rerate = 11;
  refreshInterval = setInterval(() => {
  rerate--;
  if (rerate < 0) {
    rerate = 10;
    checkInbox();
  }
  refreshTimer.textContent = `Auto Refresh In ${rerate} sec.`;
}, 1001);

  console.log("success");
  }, 1800);
});

document.querySelector("#custombtn").addEventListener("click", () => {
  var ced =   document.querySelector(".customEmailDiv");
  if (ced.style.display == 'block') {
    return;
  }
  ced.style.display = "block";
});


