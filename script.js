document.addEventListener('contextmenu', event => event.preventDefault());

let desktopArea = document.querySelector('main');
let searchIcon = document.getElementById('search-icon');
let searchInput = document.getElementById('search-bar');
let dateDisplay = document.querySelector('.date');
let timeDisplay = document.querySelector('.hours');
let contextMenu = document.querySelector('.right-click');
let newFolderButton = document.querySelector('.new');
let createFolderMenu = document.querySelector('.folder');
let createShortcutButton = document.querySelector('.shortcut');



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

createShortcutButton.addEventListener('click',()=>{
    createShortcut('New Folder');
    createFolderMenu.classList.remove('visible');
    contextMenu.classList.remove('visible');
})
let createCount = 0;

let currentX = 20;
let currentY = 20;
let stepY = 80;
let stepX = 100;
let maxY = 593;

function nextPosition(){
    const position = {
        top: currentY,
        left: currentX
    }
    currentY += stepY;
    if(currentY > maxY){
        currentY = 20;
        currentX += stepX;
    }
    return position;
}

function createShortcut(name){
    const folder = document.createElement('div');
    const {top,left} = nextPosition();
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
    `;
    makedraggble(folder);
    desktopArea.appendChild(folder);
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
}}