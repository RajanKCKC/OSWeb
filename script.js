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
    if (element) {
        element.addEventListener("mousedown", () => handleWindowTap(element));
    }
}

function selectIcon(element) {
    element.classList.add("selected");
    selectedIcon = element;
}

function deselectIcon(element) {
    if (element) {
        element.classList.remove("selected");
    }
    selectedIcon = undefined;
}

document.addEventListener("DOMContentLoaded", () => {
    var welcomeWindow = document.querySelector("#welcome");
    var welcomeClose = document.querySelector("#welcomeclose");
    var welcomeOpen = document.querySelector("#welcomeopen");

    var notesWindow = document.querySelector("#notes");
    var notesClose = document.querySelector("#notesclose");
    var notesIcon = document.querySelector("#notesicon");

    var minecraftWindow = document.querySelector("#minecraft");
    var minecraftClose = document.querySelector("#minecraftclose");
    var minecraftIcon = document.querySelector("#minecrafticon");

    [welcomeWindow, notesWindow, minecraftWindow].forEach((windowElement) => {
        if (windowElement) {
            dragElement(windowElement);
            addWindowTapHandling(windowElement);
        }
    });

    if (welcomeOpen && welcomeWindow) {
        welcomeOpen.addEventListener("click", () => openWindow(welcomeWindow));
    }

    if (welcomeClose && welcomeWindow) {
        welcomeClose.addEventListener("click", (e) => {
            e.stopPropagation();
            closeWindow(welcomeWindow);
        });
    }

    if (notesIcon && notesWindow) {
        notesIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            selectIcon(notesIcon);
            openWindow(notesWindow);
        });
    }

    if (notesClose && notesWindow) {
        notesClose.addEventListener("click", (e) => {
            e.stopPropagation();
            closeWindow(notesWindow);
        });
    }

    if (minecraftIcon && minecraftWindow) {
        minecraftIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            selectIcon(minecraftIcon);
            openWindow(minecraftWindow);
        });
    }

    if (minecraftClose && minecraftWindow) {
        minecraftClose.addEventListener("click", (e) => {
            e.stopPropagation();
            closeWindow(minecraftWindow);
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
