import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = "form-data";

updateFormPage();

form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onSubmit);

function onInput({ target: { name, value }}) {
    const storage = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    storage[name] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
}

function onSubmit(event) {
    event.preventDefault();
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!data.message || !data.email) {
        return
    };
    console.log(data);
    localStorage.removeItem(STORAGE_KEY);
    updateFormPage();
}

function updateFormPage() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    Object.entries(data || { email: '', message: '' }).forEach(([name, value]) => {
        form.elements[name].value = value;
    });
}
