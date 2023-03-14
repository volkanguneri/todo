// SELECTORS
const toggleIcon = document.getElementById('toggleIcon');
const inputButton = document.querySelectorAll('.button');
const formElement = document.getElementById('createTodoForm');
const inputText = document.getElementById('formInputText');
const displayText = document.querySelectorAll('.display-text');
const deleteBtns = document.querySelectorAll('.delete-button');
const activeBtns = document.querySelectorAll('.active-button');
const allBtns = document.querySelectorAll('.all');
const completedBtns = document.querySelectorAll('.completed');
const clearCompletedBtn = document.getElementById('clearCompleted');
const container = document.getElementById('container');
const bgImage = document.getElementById('bgImage');
const inputs = document.querySelectorAll('.input');
const body = document.body;


// FUNCTIONS

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


// Displays light or dark scheme according to hour (light in the day, dark in the night)

// function nightDay() {
//     const date = new Date();
//     const hour = date.getHours();
//     if (hour > 7 || hour < 17) {
//         body.classList.toggle('light-theme');
//         lightMode()
//     } else {
//         darkMode()
//     }
// };

// nightDay();

// Creates new tasks 

function createNewTask() {
    const inputValue = inputText.value;

    const newInput = document.createElement('li');
    newInput.classList.add('input');
    newInput.setAttribute('draggable', 'true');
    newInput.addEventListener('dragstart', dragStart);

    const button = document.createElement('button');
    button.classList.add('button');
    newInput.appendChild(button);

    const displayText = document.createElement('div');
    displayText.classList.add('display-text');
    displayText.textContent = inputValue;
    newInput.appendChild(displayText);

    const deleteButton = document.createElement('img');
    deleteButton.setAttribute('src', 'images/icon-cross.svg');
    deleteButton.setAttribute('alt', 'delete button');
    deleteButton.classList.add('delete-button');
    newInput.appendChild(deleteButton);

    container.appendChild(newInput);

    inputText.value = '';
};

// displays that task is completed

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

// Deletes task
function deleteBtn(button) {
    const container = button.parentElement.parentElement;
    container.remove();
}

function displayActiveTasks() {
    const inputs = document.querySelectorAll('.input');
    inputs.forEach(input => {
        const doneInputs = input.firstElementChild.classList.contains('focus');
        doneInputs ? input.style.display = 'none' : input.style.display = "flex";
    });
};

function displayAllTasks() {
    allBtns.forEach(e => {
        const inputs = document.querySelectorAll('.input');
        inputs.forEach(input => {
            input.style.display = 'flex';
        });
    });
};

function displayCompletedTasks() {
    const inputs = document.querySelectorAll('.input');
    inputs.forEach(e => {
        const activeInputs = !e.firstElementChild.classList.contains('focus');
        activeInputs ? e.style.display = 'none' : e.style.display = "flex";
    });
};


// Adds "dragging" class to new inputs created dynamicly so that they can also be dragged

function dragStart(event) {
    event.currentTarget.classList.add('dragging');
}

// Identifies the element on which the cursor is, to be used for drag event listener down

function getDragAfterElement(container, y) {
    const draggebleElements = [...container.querySelectorAll('.input:not(.dragging)')];

    return draggebleElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        // console.log(offset)
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
};


// EVENT LISTENERS

toggleIcon.addEventListener('click', e => {
    body.classList.toggle('light-theme');
    colorChange()
});


// Adds a single event listener to the parent element so that functions work with every element dynamicly 

container.addEventListener('click', e => {
    e.preventDefault();

    // Checks if the clicked element is a done, delete or a text button to execute the function required. to avoid an eventual bug. 
    e.target && e.target.matches('.button') ? doneBtn(e.target) : null;
    e.target && e.target.matches('.delete-button') ? deleteBtn(e.target) : null;
    e.target && e.target.matches('.display-text') ? doneTxt(e.target) : null;
});

// When the page is loaded, every tasks active or completed are displayed

window.addEventListener('load', e => {
    displayAllTasks();
});

// Filtering tasks according their all, active or completed status
// For practical reasons concerning css code i have created two all buttons, one of them is displayed none on mobile screen and visible on desktop vice-versa. Same for active and completed buttons

allBtns.forEach(e => {
    e.addEventListener('click', i => {
        i.preventDefault();
        displayAllTasks();
    });
});

activeBtns.forEach(e => {
    e.addEventListener('click', i => {
        i.preventDefault();
        displayActiveTasks();
        allBtns.forEach(button => {
            button.classList.contains('active') ? button.classList.remove('active') : null;
        });
    });
});

completedBtns.forEach(e => {
    e.addEventListener('click', i => {
        i.preventDefault();
        displayCompletedTasks();
        allBtns.forEach(button => {
            button.classList.contains('active') ? button.classList.remove('active') : null;
        });
    });
});

// Clear Completed button clears completed tasks

clearCompletedBtn.addEventListener('click', e => {
    const inputs = document.querySelectorAll('.input');
    inputs.forEach(e => {
        const doneInputs = e.firstElementChild.classList.contains('focus');
        doneInputs ? e.remove() : null;
    });
});

// Submit Event Listener

formElement.addEventListener('submit', e => {
    e.preventDefault();
    createNewTask();
});

// Drag eventlistener alows to drag and drop 

inputs.forEach(draggeble => {
    draggeble.addEventListener('dragstart', () => {
        draggeble.classList.add('dragging');
    });
    draggeble.addEventListener('dragend', () => {
        draggeble.classList.remove('dragging');
    });
});

container.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector('.dragging');
    container.append(draggable);
    if (afterElement == null) {
        container.appendChild(draggable);
    } else {
        container.insertBefore(draggable, afterElement);
    };
});
