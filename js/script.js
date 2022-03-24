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
var greeting = greet();

const user_list = document.getElementById('user-list');
user_list.innerHTML = '<p>Loading...';

const user_details = document.getElementById('user-details');
user_details.innerHTML = '<p>Loading...';

/*
Display user list
*/
function displayUsers() {
    user_list.innerHTML = null;
    let user_nums = [];
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
        user_nums.push(i);
    }
    if (user_nums.length == 0) {
        user_list.innerHTML = '<p>No data found!';
        document.getElementById('user-head').innerHTML = null;
        user_details.innerHTML = '<p>No data found!';
    } else {
        viewDetails(user_nums[0]);
    }
}

/*
Display user details
*/
function viewDetails(user_num) {
    let user_head = document.getElementById('user-head');
    user_head.innerHTML = null;
    user_details.innerHTML = null;
    for (i in user_data) {
        document.getElementById(i).style.backgroundColor = null;
    }
    document.getElementById(user_num).style.backgroundColor = '#e4dfff';
    document.getElementById(user_num).scrollIntoView();
    user_head.scrollIntoView();
    //User details headline
    let avatar = document.createElement('section');
    avatar.setAttribute('id', 'avatar');
    let img = document.createElement('img');
    let img_src = user_data[user_num]['avatar'];
    img.setAttribute('src', img_src);
    avatar.appendChild(img);
    user_head.appendChild(avatar);
    let head_text = document.createElement('span');
    head_text.setAttribute('id', 'head-text');
    head_text.innerHTML = '<span id="greet">' + greeting +
        '!</span><br><span id="ud-name">' + user_data[user_num]['first_name'] + ' ' +
        user_data[user_num]['last_name'] + '</span>';
    user_head.appendChild(head_text);
    let del_user = document.createElement('section');
    del_user.setAttribute('id', 'del-user');
    del_user.innerHTML = '<button onclick="deleteUser(' + user_num + ')">Delete user</button>';
    user_head.appendChild(del_user);
    //User details
    let identification = document.createElement('section');
    identification.innerHTML = `<table>
        <tr>
            <td class="title">Profession:</td>
            <td class="value">${user_data[user_num]['employment']['title']}</td>
        </tr>
        <tr>
            <td class="title">UID:</td>
            <td class="value">${user_data[user_num]['uid']}</td>
        </tr>
        <tr>
            <td class="title">Username:</td>
            <td class="value">${user_data[user_num]['username']}</td>
        </tr>
        <tr>
            <td class="title">DOB:</td>
            <td class="value">${user_data[user_num]['date_of_birth']}</td>
        </tr>
        <tr>
            <td class="title">Password:</td>
            <td class="value">${user_data[user_num]['password']}</td>
        </tr>
        </table>`;
    user_details.appendChild(identification);
    let contact = document.createElement('section');
    contact.innerHTML = `<h4 class="section-headline">Contact Information</h4>
    <table>
        <tr>
            <td class="title">E-Mail:</td>
            <td class="value">${user_data[user_num]['email']}</td>
        </tr>
        <tr>
            <td class="title">Phone:</td>
            <td class="value">${user_data[user_num]['phone_number']}</td>
        </tr>
        <tr>
            <td class="title">Address:</td>
            <td class="value">${user_data[user_num]['address']['street_address']}, 
            ${user_data[user_num]['address']['street_name']}, 
            ${user_data[user_num]['address']['city']}, 
            ${user_data[user_num]['address']['state']}, 
            ${user_data[user_num]['address']['country']} - 
            ${user_data[user_num]['address']['zip_code']}</td>
        </tr>
    </table>`;
    user_details.appendChild(contact);
    let subscription = document.createElement('section');
    subscription.innerHTML = `<h4 class="section-headline">Subscription Information</h4>
    <table>    
        <tr>
            <td class="title">Plan:</td>
            <td class="value">${user_data[user_num]['subscription']['plan']}</td>
        </tr>
        <tr>
            <td class="title">Term:</td>
            <td class="value">${user_data[user_num]['subscription']['term']}</td>
        </tr>
        <tr>
            <td class="title">Payment method:</td>
            <td class="value">${user_data[user_num]['subscription']['payment_method']}</td>
        </tr>
        <tr>
            <td class="title">CC number:</td>
            <td class="value">${user_data[user_num]['credit_card']['cc_number']}</td>
        </tr>
        <tr>
            <td class="title">Staus:</td>
            <td class="value">${user_data[user_num]['subscription']['status']}</td>
        </tr>
    </table>`;
    user_details.appendChild(subscription);
}

/* 
Delete user
*/
function deleteUser(user_num) {
    delete user_data[user_num];
    displayUsers();
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