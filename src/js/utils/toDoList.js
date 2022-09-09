export class ToDoList {
    constructor(element) {
        this.element = element;
        this.editElement = {};
        this.input = null;
        this.list = null;
        this.options = {
            input: '.js-input',
            list: '.js-list'
        };

        this.classes = {
            listItem: 'js-list-item',
            editButton: 'js-edit-button',
            removeButton: 'js-remove-button',
            completeCheckbox: 'js-complete',
            complete: 'is-complete'
        };

        this.data = JSON.parse(localStorage.getItem('todos')) || [];
        this.init();
    }

    init() {
        const { input, list } = this.options;

        if (this.element && typeof this.element === 'string') {
            this.element = document.querySelector(this.element);

            this.input = document.querySelector(input);
            this.list = document.querySelector(list);

        }

        this.createList();
        this.addEvents();
    }

    addEvents() {
        if (this.element) {
            this.element.addEventListener('submit', e => {
                e.preventDefault();
                if (Object.keys(this.editElement).length) {
                    this.editElement.text = this.input.value;
                    this.data = this.data.map(element => element.id === this.editElement.id ? this.editElement : element);
                } else {
                    const task = { id: this.createUid(), text: this.input.value, complete: false }
                    this.data.unshift(task);
                }

                this.updateStorage();
                this.createList();
                this.input.value = '';
                this.editElement = {};
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
            this.editElement = {};
        }

        if (target.classList.contains(editButton)) {
            this.editElement = this.data.find(element => element.id === listElement.dataset.uid);
            this.input.value = this.editElement.text;
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
            <li class="list__item js-list-item ${element.complete ? this.classes.complete : ""}" data-uid="${element.id}">
                <div class="card">
                    <h2 class="card__title"><span>${index + 1}. </span>${element.text}</h2>
                    <div class="card__actions">
                        <div class="card__complete">
                            <input type="checkbox" class="js-complete" id="${element.id}" ${element.complete ? "checked" : ""}/>
                            <label for="${element.id}">Complete mark</label>
                        </div>
                        <button class="card__edit js-edit-button">
                            edit
                        </button>
                        <button class="card__remove js-remove-button">
                            remove
                        </button>
                    </div>
                </div>
            </li>`;
            this.list.insertAdjacentHTML('beforeend', item)
        }
    }

    createList() {
        this.list.innerHTML = '';
        this.data.forEach((data, index) => {
            this.createElement(data, index)
        })
    }
}
