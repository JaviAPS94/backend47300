const form = document.getElementById('cookieForm');

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key]=value);
    // {
    //     name: 'Alex',
    //     email: 'alex@gmail.com'
    // }
    fetch('/cookie', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => result.json()).then(json => console.log(json));
});

const getCookie = () => {
    console.log(document.cookie)
}