/*
Fetch user data
*/
const url = 'https://run.mocky.io/v3/010e898c-a05c-4a0a-b947-2a65b5a267c5';
var user_data = null;
fetch(url)
    .then((response) => response.json(), (reject) => user_list.innerHTML = '<p>Unable to fetch data')
    .then((jsonData) => {
        user_data = jsonData;
        displayUsers();
    });

/*
Set preload contents
*/
const user_list = document.getElementById('user-list');
user_list.innerHTML = '<p>Loading...';

const user_details = document.getElementById('user-details');
var greeting = greet();
user_details.innerHTML = '<p>' + greeting + '!</p>';

/*
Display user list
*/
function displayUsers() {
    user_list.innerHTML = null;
    for (i in user_data) {
        let row = document.createElement('div');
        user_list.appendChild(row);
        row.innerHTML = '<span id="name">' + user_data[i]['first_name'] + ' ' + user_data[i]['last_name'] + '</span>' +
            ' ' + '<span id="un">' + user_data[i]['username'] + '</span> <br>' +
            '<span>' + user_data[i]['employment']['title'] + '</span> <br>' +
            '<span>' + user_data[i]['address']['country'] + '<span> <br>';

        row.setAttribute('id', i);
        row.setAttribute('class', 'rows');
        row.addEventListener('click', function() { viewDetails(row.id) });
    }
}

/*
Display user details
*/
function viewDetails(user_num) {
    user_details.innerHTML = null;
    //Greeting section
    let greet = document.createElement('div');
    greet.setAttribute('id', 'greet')
    user_details.appendChild(greet);
    greet.innerHTML = greeting + ' ' + user_data[user_num]['first_name'] + '!';
    //Name section
    let name_sec = document.createElement('section');
}

/*
Set greetings
*/
function greet() {
    let d = new Date();
    let h = d.getHours();
    if (h < 12) {
        return 'Good Morning'
    }
    if (h >= 12 && h < 17) {
        return 'Good Afternoon'
    }
    if (h >= 17) {
        return 'Good Evening'
    }
}