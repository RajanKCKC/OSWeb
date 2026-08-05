var biggestIndex = 1;
var selectedIcon = undefined;

function closeWindow(element) {
    if (element) element.style.display = "none";
    removeTaskbarItem(element);
}

function openWindow(element) {
    if (!element) return;
    element.style.display = "flex";
    biggestIndex++;
    element.style.zIndex = biggestIndex;
    addTaskbarItem(element);
}

function toggleMaximize(element) {
    if (!element) return;

    if (element.classList.contains("maximized")) {
        element.classList.remove("maximized");
        element.style.top = element.dataset.prevTop || "100px";
        element.style.left = element.dataset.prevLeft || "100px";
        element.style.width = element.dataset.prevWidth || "";
        element.style.height = element.dataset.prevHeight || "";
    } else {
        element.dataset.prevTop = element.style.top || "";
        element.dataset.prevLeft = element.style.left || "";
        element.dataset.prevWidth = element.style.width || "";
        element.dataset.prevHeight = element.style.height || "";

        element.classList.add("maximized");
    }
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

function toggleMinimize(element) {
    if (!element) return;
    element.style.display = "none";

}

function addTaskbarItem(element) {
    var taskbarApps = document.querySelector("#taskbarApps");
    if (!taskbarApps) return;
    if (document.querySelector("#taskbar-" + element.id)) return;

    var titleEl = element.querySelector(".window-title");
    var title = titleEl ? titleEl.innerText : element.id;

    var item = document.createElement("p");
    item.id = "taskbar-" + element.id;
    item.innerText = title;
    item.style.margin = "0";
    item.style.cursor = "pointer";
    item.style.padding = "4px 10px";
    item.style.borderRadius = "6px";
    item.style.backgroundColor = "rgba(255,255,255,0.4)";

    item.addEventListener("click", () => {
        if (element.style.display === "none") {
            openWindow(element);
        } else {
            biggestIndex++;
            element.style.zIndex = biggestIndex;
        }
    });

    taskbarApps.appendChild(item);
}

function removeTaskbarItem(element) {
    var item = document.querySelector("#taskbar-" + element.id);
    if (item) item.remove();
}

document.addEventListener("DOMContentLoaded", () => {
    var welcomeWindow = document.querySelector("#welcome");
    var welcomeClose = document.querySelector("#welcomeclose");
    var welcomeOpen = document.querySelector("#welcomeopen");
    var welcomeMaximize = document.querySelector("#maximize");
    var welcomeMinimize = document.querySelector("#minimize");

    var calculatorWindow = document.querySelector("#calculator");
    var calculatorClose = document.querySelector("#calculatorclose");
    var calculatorIcon = document.querySelector("#calculatoricon");
    var calculatorMaximize = document.querySelector("#calculatormaximize");
    var calculatorMinimize = document.querySelector("#calculatorminimize");

    var notesWindow = document.querySelector("#notes");
    var notesClose = document.querySelector("#notesclose");
    var notesIcon = document.querySelector("#notesicon");
    var notesMaximize = document.querySelector("#notesmaximize");
    var notesMinimize = document.querySelector("#notesminimize");

    var minecraftWindow = document.querySelector("#minecraft");
    var minecraftClose = document.querySelector("#minecraftclose");
    var minecraftIcon = document.querySelector("#minecrafticon");
    var minecraftMaximize = document.querySelector("#minecraftmaximize");
    var minecraftMinimize = document.querySelector("#minecraftminimize");


    var solitaireWindow = document.querySelector("#solitaire");
    var solitaireClose = document.querySelector("#solitaireclose");
    var solitaireIcon = document.querySelector("#solitaireicon");
    var solitaireMaximize = document.querySelector("#solitairemaximize");
    var solitaireMinimize = document.querySelector("#solitaireminimize");

    var googleWindow = document.querySelector("#google");
    var googleClose = document.querySelector("#googleclose");
    var googleIcon = document.querySelector("#googleicon");
    var googleMaximize = document.querySelector("#googlemaximize");
    var googleMinimize = document.querySelector("#googleminimize");

    var paintWindow = document.querySelector("#paint");
    var paintClose = document.querySelector("#paintclose");
    var paintIcon = document.querySelector("#painticon");
    var paintMaximize = document.querySelector("#paintmaximize");
    var paintMinimize = document.querySelector("#paintminimize");

    var calendarWindow = document.querySelector("#calendar");
    var calendarClose = document.querySelector("#calendarclose");
    var calendarIcon = document.querySelector("#calendaricon");
    var calendarMaximize = document.querySelector("#calendarmaximize");
    var calendarMinimize = document.querySelector("#calendarminimize");

    var mapWindow = document.querySelector("#map");
    var mapClose = document.querySelector("#mapclose");
    var mapIcon = document.querySelector("#mapicon");
    var mapMaximize = document.querySelector("#mapmaximize");
    var mapMinimize = document.querySelector("#mapminimize");

    var quizWindow = document.querySelector("#quiz");
    var quizClose = document.querySelector("#quizclose");
    var quizIcon = document.querySelector("#quizicon");
    var quizMaximize = document.querySelector("#quizmaximize");
    var quizMinimize = document.querySelector("#quizminimize");

    var todoWindow = document.querySelector("#todo");
    var todoClose = document.querySelector("#todoclose");
    var todoIcon = document.querySelector("#todoicon");
    var todoMaximize = document.querySelector("#todomaximize");
    var todoMinimize = document.querySelector("#todominimize");

    var tictactoeWindow = document.querySelector("#tictactoe");
    var tictactoeClose = document.querySelector("#tictactoeclose");
    var tictactoeIcon = document.querySelector("#tictactoeicon");
    var tictactoeMaximize = document.querySelector("#tictactoemaximize");
    var tictactoeMinimize = document.querySelector("#tictactoeminimize");

    var qrWindow = document.querySelector("#qr");
    var qrClose = document.querySelector("#qrclose");
    var qrIcon = document.querySelector("#qricon");
    var qrMaximize = document.querySelector("#qrmaximize");
    var qrMinimize = document.querySelector("#qrminimize");

    [welcomeWindow, notesWindow, minecraftWindow, solitaireWindow, googleWindow, paintWindow, calculatorWindow, calendarWindow, mapWindow, quizWindow, todoWindow, tictactoeWindow, qrWindow].forEach((windowElement) => {
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

    if (notesMinimize && notesWindow) {
        notesMinimize.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMinimize(notesWindow);
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

    if (minecraftMinimize && minecraftWindow) {
        minecraftMinimize.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMinimize(minecraftWindow);
        });
    }

    if (solitaireIcon && solitaireWindow) {
        solitaireIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            selectIcon(solitaireIcon);
            openWindow(solitaireWindow);
        });
    }

    if (solitaireClose && solitaireWindow) {
        solitaireClose.addEventListener("click", (e) => {
            e.stopPropagation();
            closeWindow(solitaireWindow);
        });
    }

    if (solitaireMinimize && solitaireWindow) {
        solitaireMinimize.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMinimize(solitaireWindow);
        });
    }

    if (welcomeMaximize && welcomeWindow) {
        welcomeMaximize.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMaximize(welcomeWindow);
        });
    }

    if (minecraftMaximize && minecraftWindow) {
        minecraftMaximize.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMaximize(minecraftWindow);
        });
    }

    if (notesMaximize && notesWindow) {
        notesMaximize.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMaximize(notesWindow);
        });
    }

    if (solitaireMaximize && solitaireWindow) {
        solitaireMaximize.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMaximize(solitaireWindow);
        });
    }

    if (welcomeMinimize && welcomeWindow) {
        welcomeMinimize.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMinimize(welcomeWindow);
        });
    }

    if (calculatorIcon && calculatorWindow) {
        calculatorIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            selectIcon(calculatorIcon);
            openWindow(calculatorWindow);
        });
    }

    if (calculatorClose && calculatorWindow) {
        calculatorClose.addEventListener("click", (e) => {
            e.stopPropagation();
            closeWindow(calculatorWindow);
        });
    }

    if (calculatorMinimize && calculatorWindow) {
        calculatorMinimize.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMinimize(calculatorWindow);
        });
    }

    if (calculatorMaximize && calculatorWindow) {
        calculatorMaximize.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMaximize(calculatorWindow);
        });
    }

    if (googleIcon && googleWindow) {
        googleIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            selectIcon(googleIcon);
            openWindow(googleWindow);
        });
    }

    if (googleClose && googleWindow) {
        googleClose.addEventListener("click", (e) => {
            e.stopPropagation();
            closeWindow(googleWindow);
        });
    }

    if (googleMinimize && googleWindow) {
        googleMinimize.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMinimize(googleWindow);
        });
    }

    if (googleMaximize && googleWindow) {
        googleMaximize.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMaximize(googleWindow);
        });
    }

    if (paintIcon && paintWindow) {
        paintIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            selectIcon(paintIcon);
            openWindow(paintWindow);
        });
    }

    if (paintClose && paintWindow) {
        paintClose.addEventListener("click", (e) => {
            e.stopPropagation();
            closeWindow(paintWindow);
        });
    }

    if (paintMinimize && paintWindow) {
        paintMinimize.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMinimize(paintWindow);
        });
    }

    if (paintMaximize && paintWindow) {
        paintMaximize.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMaximize(paintWindow);
        });
    }

    if (calendarIcon && calendarWindow) {
        calendarIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            selectIcon(calendarIcon);
            openWindow(calendarWindow);
        });
    }

    if (calendarClose && calendarWindow) {
        calendarClose.addEventListener("click", (e) => {
            e.stopPropagation();
            closeWindow(calendarWindow);
        });
    }

    if (calendarMinimize && calendarWindow) {
        calendarMinimize.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMinimize(calendarWindow);
        });
    }

    if (calendarMaximize && calendarWindow) {
        calendarMaximize.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMaximize(calendarWindow);
        });
    }

    if (mapIcon && mapWindow) {
        mapIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            selectIcon(mapIcon);
            openWindow(mapWindow);
        });
    }

    if (mapClose && mapWindow) {
        mapClose.addEventListener("click", (e) => {
            e.stopPropagation();
            closeWindow(mapWindow);
        });
    }

    if (mapMinimize && mapWindow) {
        mapMinimize.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMinimize(mapWindow);
        });
    }

    if (mapMaximize && mapWindow) {
        mapMaximize.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMaximize(mapWindow);
        });
    }

    if (quizIcon && quizWindow) {
        quizIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            selectIcon(quizIcon);
            openWindow(quizWindow);
        });
    }

    if (quizClose && quizWindow) {
        quizClose.addEventListener("click", (e) => {
            e.stopPropagation();
            closeWindow(quizWindow);
        });
    }

    if (quizMinimize && quizWindow) {
        quizMinimize.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMinimize(quizWindow);
        });
    }

    if (quizMaximize && quizWindow) {
        quizMaximize.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMaximize(quizWindow);
        });
    }

    if (todoIcon && todoWindow) {
        todoIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            selectIcon(todoIcon);
            openWindow(todoWindow);
        });
    }

    if (todoClose && todoWindow) {
        todoClose.addEventListener("click", (e) => {
            e.stopPropagation();
            closeWindow(todoWindow);
        });
    }

    if (todoMinimize && todoWindow) {
        todoMinimize.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMinimize(todoWindow);
        });
    }

    if (todoMaximize && todoWindow) {
        todoMaximize.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMaximize(todoWindow);
        });
    }

    if (tictactoeIcon && tictactoeWindow) {
        tictactoeIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            selectIcon(tictactoeIcon);
            openWindow(tictactoeWindow);
        });
    }

    if (tictactoeClose && tictactoeWindow) {
        tictactoeClose.addEventListener("click", (e) => {
            e.stopPropagation();
            closeWindow(tictactoeWindow);
        });
    }

    if (tictactoeMinimize && tictactoeWindow) {
        tictactoeMinimize.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMinimize(tictactoeWindow);
        });
    }

    if (tictactoeMaximize && tictactoeWindow) {
        tictactoeMaximize.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMaximize(tictactoeWindow);
        });
    }

    if (qrIcon && qrWindow) {
        qrIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            selectIcon(qrIcon);
            openWindow(qrWindow);
        });
    }

    if (qrClose && qrWindow) {
        qrClose.addEventListener("click", (e) => {
            e.stopPropagation();
            closeWindow(qrWindow);
        });
    }

    if (qrMinimize && qrWindow) {
        qrMinimize.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMinimize(qrWindow);
        });
    }

    if (qrMaximize && qrWindow) {
        qrMaximize.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMaximize(qrWindow);
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
