document.addEventListener("DOMContentLoaded", function(event) {
  var config = {
    apiKey: "AIzaSyDqbK0hgiSJdYnKjE0EzuI-BDR0FB-SubA",
    authDomain: "book-manager-653cb.firebaseapp.com",
    databaseURL: "https://book-manager-653cb.firebaseio.com",
    storageBucket: "book-manager-653cb.appspot.com"
  };

  firebase.initializeApp(config);

  var os = platform.os.family;
  var database = firebase.database();
  var oriUrl = window.location.host;

  var downloadBtn = document.querySelector(".download-url");
  var linuxBtn = document.querySelector(".linux-os");
  var windowsBtn = document.querySelector(".windows-os");
  var macBtn = document.querySelector(".mac-os");

  var linuxDownloadUrl =
    "https://github.com/bdTechies/book-manager/releases/download/v1.0.0/book-manager_1.0.0_amd64.deb";
  var macDownloadUrl =
    "https://github.com/bdTechies/book-manager/releases/download/v1.0.0/book-manager_1.0.0.dmg";
  var windowsDownloadUrl =
    "https://github.com/bdTechies/book-manager/releases/download/v1.0.0/book-manager_1.0.0.exe";
  var defaultDownloadUrl =
    "https://github.com/bdTechies/book-manager/releases/tag/v1.0.0";

  var windowsOsNameList = ["Cygwin", "Windows 98;", "Windows "];
  var macOsNameList = ["Mac OS X", "Macintosh", "Mac", "OS X"];
  var linuxOsNameList = [
    "CentOS",
    "Debian",
    "Fedora",
    "FreeBSD",
    "Gentoo",
    "Haiku",
    "Kubuntu",
    "Linux Mint",
    "OpenBSD",
    "Red Hat",
    "SuSE",
    "Ubuntu",
    "Xubuntu",
    "hpwOS",
    "webOS ",
    "webOS",
    "Tizen",
    "Linux"
  ];

  function checkOsName(name, group) {
    switch (group) {
      case "linux":
        idx = linuxOsNameList.findIndex(function(osName) {
          return name === osName;
        });
        return idx > -1 ? true : false;
      case "mac":
        idx = macOsNameList.findIndex(function(osName) {
          return name === osName;
        });
        return idx > -1 ? true : false;
      default:
        idx = windowsOsNameList.findIndex(function(osName) {
          return name === osName;
        });
        return idx > -1 ? true : false;
    }
  }

  function addDownloadData(url) {
    var now = new Date();
    var downloadedOn = now.toISOString();
    var data = {
      osName: os,
      downloadedOn: downloadedOn
    };
    var downloadList = database.ref("/downloads").push();
    if (url.indexOf("127.0.0.1") === -1 && url.indexOf("localhost") === -1) {
      downloadList.set(data);
    }
  }

  switch (true) {
    case checkOsName(os, "linux"):
      downloadBtn.href = linuxDownloadUrl;
      windowsBtn.classList.remove("active-btn");
      macBtn.classList.remove("active-btn");
      linuxBtn.className += " active-btn";
      break;
    case checkOsName(os, "windows"):
      downloadBtn.href = windowsDownloadUrl;
      linuxBtn.classList.remove("active-btn");
      macBtn.classList.remove("active-btn");
      windowsBtn.className += " active-btn";
      break;
    case checkOsName(os, "mac"):
      downloadBtn.href = macDownloadUrl;
      linuxBtn.classList.remove("active-btn");
      windowsBtn.classList.remove("active-btn");
      macBtn.className += " active-btn";
      break;
    default:
      downloadBtn.removeAttribute('download');
      downloadBtn.href = defaultDownloadUrl;
      linuxBtn.classList.remove("active-btn");
      macBtn.classList.remove("active-btn");
      windowsBtn.classList.remove("active-btn");
      break;
  }

  linuxBtn.addEventListener("click", function() {
    downloadBtn.href = linuxDownloadUrl;
    windowsBtn.classList.remove("active-btn");
    macBtn.classList.remove("active-btn");
    linuxBtn.className += " active-btn";
  });

  windowsBtn.addEventListener("click", function() {
    downloadBtn.href = windowsDownloadUrl;
    linuxBtn.classList.remove("active-btn");
    macBtn.classList.remove("active-btn");
    windowsBtn.className += " active-btn";
  });

  macBtn.addEventListener("click", function() {
    downloadBtn.href = macDownloadUrl;
    linuxBtn.classList.remove("active-btn");
    windowsBtn.classList.remove("active-btn");
    macBtn.className += " active-btn";
  });

  downloadBtn.addEventListener("click", function() {
    addDownloadData(oriUrl);
    ga("send", "event", "Download Analytics", "download", os);
  });
});
