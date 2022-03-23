const url = 'https://run.mocky.io/v3/010e898c-a05c-4a0a-b947-2a65b5a267c5';

const users = document.getElementById('user-list');
users.innerHTML = '<p>Loading...';

fetch(url)
    .then((response) => response.json(), (reject) => users.innerHTML = '<p>Unable to fetch data')
    .then((jsonData) => displayUsers(jsonData));

function displayUsers(jsonData) {
    users.innerHTML = '';
    for (i in jsonData) {
        let row = document.createElement('div');
        users.appendChild(row);
        row.innerHTML = '<span id="name">' + jsonData[i]['first_name'] + ' ' + jsonData[i]['last_name'] + '</span>' +
            ' ' + '<span id="un">' + jsonData[i]['username'] + '</span> <br>' +
            '<span>' + jsonData[i]['employment']['title'] + '</span> <br>' +
            '<span>' + jsonData[i]['address']['country'] + '<span> <br>';
        let view = document.createElement('button');
        view.innerHTML = 'View more';
        row.appendChild(view);

        let del = document.createElement('button');
        del.innerHTML = 'Delete user';
        row.appendChild(del);
    }
}