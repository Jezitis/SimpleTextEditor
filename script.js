// Declare variables

const DEFAULT_TEXT = 'Press the "EDIT" button to start';
const TEXT_CONTAINER = document.querySelector('.text-container');
const PREVIOUS_VERSION_LIST = document.querySelector('.load');
const EDIT = document.querySelector('.btn__edit');
const LOAD = document.querySelector('.btn__load');
const SAVE = document.querySelector('.btn__save');
const CANCEL = document.querySelector('.btn__cancel');
const LOAD_LINKS = document.querySelector('.load');

//Event Listeners

LOAD.addEventListener('click', openLoadMenu);
EDIT.addEventListener('click', editDocument);
SAVE.addEventListener('click', saveChanges);
CANCEL.addEventListener('click', cancelChanges);
LOAD_LINKS.addEventListener('click', loadItem);

//functions

function loadItem(e){

    if(e.target.className == 'load__link') {
        confirm('Do you want to load this version? All unsaved changes will be deleted');
        if(confirm) {
            e.preventDefault;
            TEXT_CONTAINER.innerHTML = localStorage.getItem(e.target.innerHTML);
            localStorage.setItem('lastState', TEXT_CONTAINER.innerHTML);
        }
    }   
};

function getLastState() {
    return localStorage.getItem('lastState');
}

function getVersionList() {
    return localStorage.getItem('allVersions');
}

function cancelChanges() {

    TEXT_CONTAINER.innerHTML = localStorage.getItem('lastState');

    TEXT_CONTAINER.setAttribute('contenteditable', false);
    EDIT.removeAttribute('disabled');
    LOAD.removeAttribute('disabled');
    SAVE.setAttribute('disabled', true);
    CANCEL.setAttribute('disabled', true);

};

function saveChanges() {

    addNewDocumentVersion();

    localStorage.setItem('lastState', TEXT_CONTAINER.innerHTML);
    localStorage.setItem('allVersions', PREVIOUS_VERSION_LIST.innerHTML);

    TEXT_CONTAINER.setAttribute('contenteditable', false);
    EDIT.removeAttribute('disabled');
    SAVE.setAttribute('disabled', true);
    CANCEL.setAttribute('disabled', true);
    
};

function addNewDocumentVersion() {

    let dateStamp = new Date().toLocaleString();
    let itemVersion = `<li class="load__item">
                        <a href="#" class="load__link">${dateStamp}</a>
                    </li>`
    ;

    localStorage.setItem(dateStamp, TEXT_CONTAINER.innerHTML);
    PREVIOUS_VERSION_LIST.insertAdjacentHTML("afterbegin", itemVersion);
}

function editDocument() {

    if (localStorage.getItem('lastState') == DEFAULT_TEXT) {
        TEXT_CONTAINER.innerHTML = '';
    };

    TEXT_CONTAINER.setAttribute('contenteditable', true);
    EDIT.setAttribute('disabled', true);
    SAVE.removeAttribute('disabled');
    CANCEL.removeAttribute('disabled');   
};

function openLoadMenu() {

    PREVIOUS_VERSION_LIST.classList.toggle('load--open');
};

// logic

TEXT_CONTAINER.innerHTML = getLastState();
PREVIOUS_VERSION_LIST.innerHTML = getVersionList();

if (TEXT_CONTAINER.innerHTML.length == 0) {
    TEXT_CONTAINER.innerHTML = DEFAULT_TEXT;
};

localStorage.setItem('lastState', TEXT_CONTAINER.innerHTML);