document.addEventListener('contextmenu', event => event.preventDefault());

let main = document.querySelector('main');
let winBg = document.querySelector('.win-bg');
let searchIcon = document.getElementById('search-icon');
let searchInput = document.getElementById('search-bar');
let dateDisplay = document.querySelector('.date');
let timeDisplay = document.querySelector('.hours');
let contextMenu = document.querySelector('.right-click');
let newFolderButton = document.querySelector('.new');
let createFolderMenu = document.querySelector('.folder');
let createShortcutFolderButton = document.querySelector('.shortcut');
let createShortcutTextButton = document.querySelector('.shortcut-2');
let volumeRange = document.querySelector('.volumeRange');
let volumeIcon = document.querySelector('.volume-icon');
let notificationIcon = document.querySelector('.fa-message');
let notificationBar = document.querySelector('.notification-sidebar');
let notificationBox = document.querySelectorAll('div.box');
let brightnessIcon = document.querySelector('.brightness');
let brightnessRangeBox = document.querySelector('.brightnessBar');
let brightnessSlider = document.querySelector('#brightnessSlider');
let brightnessOverlay = document.getElementById('brightness-overlay');
let bgPreview = document.querySelector('.bg-preview');
let bgOption = document.querySelectorAll('.img-option');
let personalize = document.querySelector('.personalize');
let closeBtn = document.querySelector('.close');
let minimizeBtn = document.querySelector('.minimize');
let restoreBtn = document.querySelector('.restore');
let refreshBtn = document.querySelector('.refresh-btn')
let folderShortcut = document.querySelector('.folderShortcut');

searchIcon.addEventListener('click', () => {
    searchInput.focus();
});



function update() {
    let date = new Date();
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    let hour = date.getHours()
    let minutes = date.getMinutes()
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    month++;
    if (month < 10) month = "0" + month

    timeDisplay.innerHTML = `${hour}:${minutes}`
    dateDisplay.innerHTML = `${day}-${month}-${year}`
}

setInterval(update, 1000);

document.addEventListener('mousedown', (e) => {
    if (e.button === 2) {
        if (contextMenu.classList.contains('visible')) {
            contextMenu.classList.remove('visible');
            setTimeout(() => {
                showMenuAt(e.clientX, e.clientY);
            }, 300);
        } else {
            showMenuAt(e.clientX, e.clientY);
        }
    }
});

function showMenuAt(x, y) {
    contextMenu.style.top = `${y}px`;
    contextMenu.style.left = `${x}px`;
    contextMenu.classList.add('visible');
}

document.addEventListener('click', e => {
    if (contextMenu.classList.contains('visible') && !contextMenu.contains(e.target) && !createFolderMenu.contains(e.target)) {
        contextMenu.classList.remove('visible');
        createFolderMenu.classList.remove('visible');
    }
    if (!volumeRange.contains(e.target) && !volumeIcon.contains(e.target)) {
        volumeRange.style.opacity = '0';
    }
    if (notificationBar.classList.contains('show') && !notificationBar.contains(e.target) && !notificationIcon.contains(e.target)) {
        notificationBar.classList.remove('show');
    }
})


let hideTimeout;
newFolderButton.addEventListener('mouseover', e => {
    clearTimeout(hideTimeout);

    const rcRect = contextMenu.getBoundingClientRect();
    showCreateAt(rcRect.x + 150, e.clientY);
});


newFolderButton.addEventListener('mouseleave', () => {
    hideTimeout = setTimeout(() => {
        createFolderMenu.classList.remove('visible');
    }, 100);
});

createFolderMenu.addEventListener('mouseover', () => {
    clearTimeout(hideTimeout);
});

createFolderMenu.addEventListener('mouseleave', () => {
    hideTimeout = setTimeout(() => {
        createFolderMenu.classList.remove('visible');
    }, 100);
});
function showCreateAt(x, y) {
    createFolderMenu.style.top = `${y}px`;
    createFolderMenu.style.left = `${x}px`;
    createFolderMenu.classList.add('visible');
}

createShortcutFolderButton.addEventListener('click', () => {
    createShortcut('New Folder');
    createFolderMenu.classList.remove('visible');
    contextMenu.classList.remove('visible');
})

createShortcutTextButton.addEventListener('click', () => {
    createTextShortcut('new text document');
    createFolderMenu.classList.remove('visible');
    contextMenu.classList.remove('visible');
})
let createCount = 0;

let currentX = 3;
let currentY = 2;
let stepY = 80;
let stepX = 100;
let maxY = 520;

function nextPosition() {
    const position = {
        top: currentY,
        left: currentX
    }
    currentY += stepY;
    if (currentY > maxY) {
        currentY = 2;
        currentX += stepX;
    }
    return position;
}

function createShortcut(name) {
    const folder = document.createElement('div');
    folder.classList.add('folderShortcut');
    const { top, left } = nextPosition();
    folder.style.position = 'absolute';
    folder.style.left = `${left}px`;
    folder.style.color = 'white';
    folder.style.display = 'flex';
    folder.style.top = `${top}px`;
    folder.style.flexDirection = 'column';
    folder.style.alignItems = 'center';
    folder.style.justifyContent = 'center';
    folder.style.fontSize = '13px';
    folder.style.textAlign = 'center';
    folder.style.width = '100px';
    folder.style.height = '100px';
    folder.style.zIndex = '10660';
    folder.innerHTML = `
        <img class="fa-folder" src="https://cdn-icons-png.flaticon.com/512/3735/3735057.png" >
        <div class="folder-name">${name}</div>
        <input class="rename-input" type="text" style="display: none;" />
    `;
    makedraggble(folder);
    main.appendChild(folder);
    createCount++;
}

function createTextShortcut(name) {
    const folder = document.createElement('div');
    folder.classList.add('folderShortcut');
    const { top, left } = nextPosition();
    folder.style.position = 'absolute';
    folder.style.left = `${left}px`;
    folder.style.color = 'white';
    folder.style.display = 'flex';
    folder.style.top = `${top}px`;
    folder.style.flexDirection = 'column';
    folder.style.alignItems = 'center';
    folder.style.justifyContent = 'center';
    folder.style.fontSize = '13px';
    folder.style.textAlign = 'center';
    folder.style.width = '100px';
    folder.style.height = '100px';
    folder.style.zIndex = '10660';
    folder.innerHTML = `
        <img class="fa-folder" src="https://img.icons8.com/?size=256&id=21073&format=png" >
        <div class="folder-name">${name}</div>
        <input class="rename-input" type="text" style="display: none;" />
    `;
    makedraggble(folder);
    main.appendChild(folder);
    createCount++;
}

function makedraggble(el) {
    el.onmousedown = function (e) {
        e.preventDefault();
        let offSetX = e.clientX - el.getBoundingClientRect().left;
        let offSetY = e.clientY - el.getBoundingClientRect().top;
        function onMouseMove(ev) {
            el.style.left = ev.clientX - offSetX + 'px';
            el.style.top = ev.clientY - offSetY + 'px';
        }
        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp)
    }
}

// New draggable function that disables dragging if full-screen class is present
function makedraggbleWithFullScreenCheck(el) {
    el.onmousedown = function (e) {
        // If element has class 'personalize-box' and also 'full-screen', do not allow drag
        if (el.classList && el.classList.contains('personalize-box') && el.classList.contains('full-screen')) {
            return;
        }
        e.preventDefault();
        let offSetX = e.clientX - el.getBoundingClientRect().left;
        let offSetY = e.clientY - el.getBoundingClientRect().top;
        function onMouseMove(ev) {
            // Prevent drag if full-screen is added during drag
            if (el.classList && el.classList.contains('personalize-box') && el.classList.contains('full-screen')) {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                return;
            }
            el.style.left = ev.clientX - offSetX + 'px';
            el.style.top = ev.clientY - offSetY + 'px';
        }
        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp)
    }
}

volumeIcon.addEventListener('click', () => {
    if (volumeRange.style.opacity === '1') {
        volumeRange.style.opacity = '0';
    } else volumeRange.style.opacity = '1';
})

notificationIcon.addEventListener('click', () => {
    notificationBar.classList.toggle('show');

});


notificationBox.forEach(box => {
    box.addEventListener('click', () => {
        box.classList.toggle('active');
    });
});

brightnessIcon.addEventListener('click', () => {
    if (brightnessRangeBox.style.opacity === '1') {
        brightnessRangeBox.style.opacity = '0';
    } else brightnessRangeBox.style.opacity = '1';
})

brightnessSlider.addEventListener('input', () => {
    const value = brightnessSlider.value;
    console.log(value)
})

bgOption.forEach(option => {
    option.addEventListener('click', () => {
        let attr = option.getAttribute('data-src');

        winBg.style.opacity = 0.5;
        bgPreview.style.opacity = 0.5;
        const img = new Image();
        img.src = attr;
        img.onload = () => {
            bgPreview.src = attr;
            winBg.src = attr;
            winBg.style.opacity = 1;
            bgPreview.style.opacity = 1;
        }
    });
})

personalize.addEventListener('click', () => {
    const box = document.querySelector('.personalize-box');
    box.classList.toggle('hide');
    if (!box.classList.contains('full-screen')) {
        makedraggbleWithFullScreenCheck(box)
    }
})
closeBtn.addEventListener('click', () => {
    document.querySelector('.personalize-box').classList.remove('hide');
})
restoreBtn.addEventListener('click', () => {
    document.querySelector('.personalize-box').classList.toggle('full-screen');
})

refreshBtn.addEventListener('click', () => {
    if (document.querySelector('.folderShortcut')) {
        document.querySelectorAll('.folderShortcut').forEach(folder => {
            folder.style.opacity = 0;
            setTimeout(() => {
                folder.style.opacity = 1;
            }, 200);
        });
    }
})

main.addEventListener('dblclick', (e) => {
  if (e.target.classList.contains('folder-name')) {
    const folderEdit = e.target.closest('.folderShortcut');
    if (!folderEdit) return;

    const folderName = folderEdit.querySelector('.folder-name');
    const renameInput = folderEdit.querySelector('.rename-input');
    if (!folderName || !renameInput) return;

    renameInput.value = folderName.textContent;
    folderName.style.display = 'none';
    renameInput.style.display = 'inline-block';
    renameInput.focus();

    const handleBlur = () => {
      folderName.textContent = renameInput.value.trim() || 'Untitled';
      folderName.style.display = 'inline-block';
      renameInput.style.display = 'none';
      renameInput.removeEventListener('blur', handleBlur);
      renameInput.removeEventListener('keydown', handleKey);
    };

    const handleKey = (e) => {
      if (e.key === 'Enter') {
        renameInput.blur();
      }
    };

    renameInput.addEventListener('blur', handleBlur);
    renameInput.addEventListener('keydown', handleKey);
  }
});
