var biggestIndex = 1;
var selectedIcon = undefined;

function closeWindow(element) {
    if (element) element.style.display = "none";
}

function openWindow(element) {
    if (!element) return;
    element.style.display = "flex";
    biggestIndex++;
    element.style.zIndex = biggestIndex;
}

function handleWindowTap(element) {
    biggestIndex++;
    element.style.zIndex = biggestIndex;
    if (selectedIcon) {
        deselectIcon(selectedIcon);
    }
}

function addWindowTapHandling(element) {
    if(element) {
        element.addEventListener("mousedown", () => handleWindowTap(element));
    }
}

function selectIcon(element) {
    element.classList.add("selected");
    selectedIcon = element;
}

function deselectIcon(element) {
    if(element) {
        element.classList.remove("selected");
    }
    selectedIcon = undefined;
}

function unlockOS(e) {
    e.preventDefault();
    var welcomeScreen = document.querySelector("#welcome");
    closeWindow(welcomeScreen);
}

document.addEventListener("DOMContentLoaded", () => {
    var welcomeScreen = document.querySelector("#welcome");
    var welcomeScreenClose = document.querySelector("#welcomeclose");
    var welcomeScreenOpen = document.querySelector("#welcomeopen");
    
    var notesScreen = document.querySelector("#notes");
    var notesScreenClose = document.querySelector("#notesclose");
    var notesIcon = document.querySelector("#notesicon");

    if (welcomeScreen) {
        dragElement(welcomeScreen);
        addWindowTapHandling(welcomeScreen);
    }

    if (notesScreen) {
        dragElement(notesScreen);
        addWindowTapHandling(notesScreen);
    }

    if (notesIcon && notesScreen) {
        notesIcon.addEventListener("click", (e) => {
            openWindow(notesScreen);
        });
    }

    if (welcomeScreenClose && welcomeScreen) {
        welcomeScreenClose.addEventListener("click", (e) => {
            e.stopPropagation();
            closeWindow(welcomeScreen);
        });
    }

    if (welcomeScreenOpen && welcomeScreen) {
        welcomeScreenOpen.addEventListener("click", () => {
            openWindow(welcomeScreen);
        });
    }

    if (notesScreenClose && notesScreen) {
        notesScreenClose.addEventListener("click", (e) => {
            e.stopPropagation();
            closeWindow(notesScreen);
        });
    }
});

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var targetHeader = document.getElementById(elmnt.id + "header");
  
  if (targetHeader) {
    targetHeader.onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    if (e.target.className === "close" || e.target.className === "minimize" || e.target.className === "maximize") return;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
