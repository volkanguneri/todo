// SELECTORS
const toggleIcon = document.getElementById('toggleIcon');
const inputButton = document.querySelectorAll('.button');
const formElement = document.getElementById('createTodoForm');
const inputText = document.getElementById('formInputText');
const displayText = document.querySelectorAll('.display-text');
const deleteBtns = document.querySelectorAll('.delete-button');
const activeBtns = document.querySelectorAll('.active');
const allBtns = document.querySelectorAll('.all');
const completedBtns = document.querySelectorAll('.completed');
const clearCompletedBtn = document.getElementById('clearCompleted');
const inputSection = document.getElementById('inputSection');
const bgImage = document.getElementById('bgImage');
const picture = document.getElementById('picture');
const inputs = document.querySelectorAll('.input');
const body = document.body;


// Functions
function lightMode() {
    toggleIcon.src = "images/icon-moon.svg";
    bgImage.src = "images/bg-mobile-light.jpg";
    picture.firstElementChild.srcset = "images/bg-desktop-light.jpg";
};

function darkMode() {
    toggleIcon.src = "images/icon-sun.svg";
    bgImage.src = "images/bg-mobile-dark.jpg";
    picture.firstElementChild.srcset = "images/bg-desktop-dark.jpg";
};


function colorChange() {
    body.classList.contains("light-theme") ? lightMode() : darkMode();
};

// function nightDay() {
//     const date = new Date();
//     const hour = date.getHours();
//     if (hour > 5 || hour < 20) {
//         body.classList.toggle('light-theme');
//         lightMode()
//     } else {
//         darkMode()
//     }
// };

// nightDay();

// when a task is done
function doneBtn(button) {
    const inputText = button.nextElementSibling;
    if (inputText.style.textDecoration === 'line-through') {
        inputText.style.textDecoration = '';
        inputText.style.color = '';
    } else {
        inputText.style.textDecoration = 'line-through';
        inputText.style.color = 'hsl(234, 11%, 52%)';
    };

    button.classList.toggle('focus');
};

function doneTxt(text) {
    const inputText = text;

    if (inputText.style.textDecoration === 'line-through') {
        inputText.style.textDecoration = '';
        inputText.style.color = '';
    } else {
        inputText.style.textDecoration = 'line-through';
        inputText.style.color = 'hsl(234, 11%, 52%)';
    };

    text.previousElementSibling.classList.toggle('focus');
};


function deleteBtn(button) {
    const container = button.parentElement.parentElement;
    container.remove();
}

function displayActiveTasks() {
    const inputs = document.querySelectorAll('.input');
    inputs.forEach(e => {
        const doneInputs = e.firstElementChild.classList.contains('focus');
        if (doneInputs) {
            e.style.display = 'none';
        } else {
            e.style.display = "flex";
        };
    });
};

function displayAllTasks() {
    allBtns.forEach(e => {
        const inputs = document.querySelectorAll('.input');
        inputs.forEach(i => {
            i.style.display = 'flex';
        });
    });
};

function displayCompletedTasks() {
    const inputs = document.querySelectorAll('.input');
    inputs.forEach(e => {
        const activeInputs = !e.firstElementChild.classList.contains('focus');
        if (activeInputs) {
            e.style.display = 'none';
        } else {
            e.style.display = "flex";
        };
    });
};

function createInput() {
    const inputValue = inputText.value;

    const newInput = document.createElement('div');
    newInput.setAttribute('class', 'input');
    newInput.setAttribute('draggable', 'true');
    newInput.innerHTML = `
    <button class="button"></button>
    <div class="display-text">${inputValue}</div>
    <div><img src="images/icon-cross.svg" alt="delete button" class="delete-button"></div>
    `;
    inputSection.append(newInput);

    inputText.value = '';
};


// EVENT LISTENERS
toggleIcon.addEventListener('click', (e) => {
    body.classList.toggle('light-theme');
    colorChange()
});


// Add a single event listener to the parent element so that functions work with ever element added dynamicly 
inputSection.addEventListener('click', (e) => {
    e.preventDefault();
    // Check if the clicked element is a done button, delete button or text
    if (e.target && e.target.matches('.button')) {
        doneBtn(e.target);
    }
    if (e.target && e.target.matches('.delete-button')) {
        deleteBtn(e.target);
    }
    if (e.target && e.target.matches('.display-text')) {
        doneTxt(e.target);
    }
});

allBtns.forEach(e => {
    e.addEventListener('click', i => {
        i.preventDefault();
        displayAllTasks()
    });
});

activeBtns.forEach(e => {
    e.addEventListener('click', i => {
        i.preventDefault();
        displayActiveTasks();
    });
});

completedBtns.forEach(e => {
    e.addEventListener('click', i => {
        i.preventDefault();
        displayCompletedTasks()
    });
});


clearCompletedBtn.addEventListener('click', e => {
    const inputs = document.querySelectorAll('.input');
    inputs.forEach(e => {
        const doneInputs = e.firstElementChild.classList.contains('focus');
        if (doneInputs) {
            e.remove();
        }
    });
});

formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    createInput()
});
