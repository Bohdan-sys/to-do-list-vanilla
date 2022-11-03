export class ToDoList {
    constructor(element) {
        this.element = element;
        this.input = null;
        this.inputDate = null;
        this.submitButton = null;
        this.content = null;
        this.sortButton = null;
        this.list = null;
        this.options = {
            input: '.js-input',
            inputDate: '.js-input-date',
            content: '.js-content',
            submitButton: '.js-submit-button',
            sortButton: '.js-list-control',
            list: '.js-list'
        };

        this.classes = {
            listItem: 'js-list-item',
            editButton: 'js-edit-button',
            removeButton: 'js-remove-button',
            completeCheckbox: 'js-complete',
            complete: 'is-complete',
            hidden: 'is-hidden'
        };
        this.editElement = {};
        this.data = JSON.parse(localStorage.getItem('todos')) || [];
        this.sorted = false;
        this.init();
    }

    init() {
        const { input, submitButton, content, sortButton, list, inputDate } = this.options;

        if (this.element && typeof this.element === 'string') {
            this.element = document.querySelector(this.element);
            this.input = this.element.querySelector(input);
            this.inputDate = this.element.querySelector(inputDate);
            this.submitButton = this.element.querySelector(submitButton);
            this.content = document.querySelector(content);
            this.sortButton = this.content.querySelector(sortButton);
            this.list = this.content.querySelector(list);
        }

        this.createList();
        this.checkContentState();
        this.addEvents();
    }

    addEvents() {
        if (this.element) {
            this.element.addEventListener('submit', e => {
                e.preventDefault();
                if (Object.keys(this.editElement).length) {
                    this.editElement.text = this.input.value;
                    this.editElement.deadline = this.inputDate.value;
                    this.data = this.data.map(element => element.id === this.editElement.id ? this.editElement : element);
                    this.submitButton.textContent = 'Create!';
                } else {
                    const task = { id: this.createUid(), text: this.input.value, deadline: this.inputDate.value, complete: false };
                    this.data.push(task);
                }
                this.sortData();
                this.updateStorage();
                this.createList();
                this.checkContentState();
                this.element.reset();
                this.editElement = {};
            });
        }

        if (this.sortButton) {
            this.sortButton.addEventListener('click', () => {
                this.sorted = !this.sorted;
                this.sortData();
                this.updateStorage();
                this.createList();
            });
        }

        if (this.list) {
            this.list.addEventListener('click', this.action.bind(this));
        }
    }

    action(e) {
        const { listItem, editButton, removeButton, completeCheckbox } = this.classes;
        const target = e.target;
        const listElement = target.closest(`.${listItem}`);

        if (target.classList.contains(removeButton)) {
            this.data = this.data.filter(item => item.id !== listElement.dataset.uid);
            this.updateStorage();
            this.createList();
            this.checkContentState();
            this.editElement = {};
        }

        if (target.classList.contains(editButton)) {
            this.editElement = this.data.find(element => element.id === listElement.dataset.uid);
            this.input.value = this.editElement.text;
            this.inputDate.value = this.editElement.deadline;
            this.submitButton.textContent = 'Edit!'
        }

        if (target.classList.contains(completeCheckbox)) {
            this.data = this.data.map(element => {
                if (element.id === listElement.dataset.uid) {
                    element.complete = target.checked;
                }
                return element;
            });
            this.updateStorage();
            this.createList();
        }
    }

    updateStorage() {
        localStorage.setItem('todos', JSON.stringify(this.data));
    }

    createUid() {
        return Math.random().toString(36).replace('0.', '');
    }

    createElement(element, index) {
        if (this.list) {
            const item = `
            <li class="content__list-item js-list-item ${element.complete ? this.classes.complete : ""}" data-uid="${element.id}">
                <div class="card">
                    <div class="card__number-wrapper">
                        <span class="card__number">${index + 1}</span>
                    </div>
                        <h2 class="card__title">${element.text}</h2>
                    <div class="card__actions">
                        <div class="card__complete">
                            <input type="checkbox" class="js-complete" id="${element.id}" ${element.complete ? "checked" : ""}/>
                            <label for="${element.id}">${element.complete ? "Unmark as complete" : "Mark as complete"}</label>
                        </div>
                        <button class="card__edit js-edit-button">
                            edit
                        </button>
                        <button class="card__remove js-remove-button">
                            remove
                        </button>
                    </div>
                    <span class="card__time">
                        Deadline: 
                        ${new Date(element.deadline).toLocaleString("uk-UK", 
                    { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }
                        )}
                    </span>
                </div>
            </li>`;
            this.list.insertAdjacentHTML('beforeend', item)
        }
    }

    createList() {
        this.list.innerHTML = '';
        this.checkContentState();
        this.data.forEach((data, index) => this.createElement(data, index));
    }

    checkContentState() {
        const { hidden } = this.classes;
        this.data.length ? this.content.classList.remove(hidden) : this.content.classList.add(hidden);
    }

    sortData() {
        this.data.sort((a, b) => this.sorted ? new Date(b.deadline) - new Date(a.deadline) : new Date(a.deadline) - new Date(b.deadline));
    }
}
