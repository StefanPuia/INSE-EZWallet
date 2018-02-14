function getQueryString(field, url) {
    var href = url ? url : window.location.href;
    var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    var string = reg.exec(href);
    return string ? string[1] : null;
};

function $(query) {
    return document.querySelector(query);
}

function jsonToQueryString(json) {
    return '?' + 
        Object.keys(json).map(function(key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
}

function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();

    $('#button-google-signin').style.display = 'none';
    $('#button-signout').style.display = '';

    signIn();
}
async function signOut() {
    await gapi.auth2.getAuthInstance().signOut();

    $('#button-google-signin').style.display = '';
    $('#button-signout').style.display = 'none';
}

async function callServer(fetchURL, method) {
    const token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;

    let el = $('#server-response');
    el.textContent = 'loading…';

    const fetchOptions = {
        credentials: 'same-origin',
        method: method,
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    };

    console.log(`${method} ${fetchURL}`);
    const response = await fetch(fetchURL, fetchOptions);
    if (!response.ok) {
        // handle the error
        el.textContent = "Server error:\n" + response.status;
        return;
    }

    // handle the response
    let data = await response.text();
    if(!data) {
	    data = "success";
	}

	console.log(data + '\n\n');
    el.textContent = data;
}

function getQueryString(field, url) {
    var href = url ? url : window.location.href;
    var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    var string = reg.exec(href);
    return string ? string[1] : null;
};

window.addEventListener('load', () => {
	if(typeof googleUser == 'undefined') {
		$('#button-google-signin').style.display = '';
    	$('#button-signout').style.display = 'none';
	}
	$('body').style.display = '';
})

function signIn() {
    let fetchURL = 'user/login';
    callServer(fetchURL, 'POST');
}

function getDetails() {
	const apiOptions = {
    	id: $('#user_id').checked,
    	fname: $('#user_fname').checked,
    	lname: $('#user_lname').checked,
    	email: $('#user_email').checked,
    	budget: $('#user_budget').checked,

    }
    let fetchURL = 'api/user/' + $('#userid').value + jsonToQueryString(apiOptions);
    callServer(fetchURL, 'GET');
}

function getBudget() {
	let fetchURL = 'api/budget/';
	callServer(fetchURL, 'GET');
}

function getOwnDetails() {
	const apiOptions = {
    	id: $('#user_id').checked,
    	fname: $('#user_fname').checked,
    	lname: $('#user_lname').checked,
    	email: $('#user_email').checked,
    	budget: $('#user_budget').checked,

    }
    let fetchURL = 'api/user/' + jsonToQueryString(apiOptions);
    callServer(fetchURL, 'GET');
}

function setBudget() {
	let fetchURL = 'api/budget/' + $('#user_input').value;
	callServer(fetchURL, 'POST');
}