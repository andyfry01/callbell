// Retrieves token from session storage
var getSessionStorage = function() {
  return sessionStorage.getItem('token')
}

var fillBrandTemplate = function () {
  var source = document.getElementById('brand_template').innerHTML
  var template = Handlebars.compile(source)
  if ( getSessionStorage() ) {
    var html = template({target: 'http://localhost:8080/pages/dashboard.html'})
  } else {
    var html = template({target: 'http://localhost:8080/pages/index.html'})
  }
  var targetDiv = document.getElementById('brand_container')
  console.log('target div is');
  console.log(targetDiv);
  targetDiv.innerHTML = html
}

window.onload = function() {
  console.log("hello from landingPageSignup.js");

  fillBrandTemplate()

  // Submit btns for client/HC professional, input form for username/password
  var formInfo = document.getElementById("signupForm").elements

  var HCSignup = document.getElementById("HC_signup").addEventListener("click", function(e) {
    e.preventDefault()
    var button = this.id
    addNewUser(formInfo, button)
  })

  var clientSignup = document.getElementById("client_signup").addEventListener("click", function(e) {
    e.preventDefault()
    var button = this.id
    addNewUser(formInfo, button)
  })

  var HCSignin = document.getElementById("HC_signin").addEventListener("click", function(e) {
    e.preventDefault()
    var button = this.id
    authenticateUser(formInfo, button)
  })

  var clientSignin = document.getElementById("client_signin").addEventListener("click", function(e) {
    e.preventDefault()
    var button = this.id
    authenticateUser(formInfo, button)
  })

  // Parses the inputs from the form and puts them into an object
  var buildUserObject = function(formInfo, button) {
    var newUser = {}
    var buttonOptions = {
      HC: ['HC_signin', 'HC_signup'],
      client: ['client_signin', 'client_signup']
    }
    // Grabs email and password from form (first two items in form elements array)
    for (var i = 0; i <= 1; i++) {
      newUser[formInfo[i].id] = formInfo[i].value
    }
    for (var option in buttonOptions) {
      for (var i = 0; i < buttonOptions[option].length; i++) {
        if (button === buttonOptions[option][i]) {
          if (option === 'HC') {
            newUser.isHC = true
          }
          if (option === 'client') {
            newUser.isClient = true
          }
        }
      }
    }
    return newUser
  }

  // Converts object to JSON for sending to backend
  var convertToJSON = function(object) {
    return JSON.stringify(object)
  }

  // Adds an user to the DB, first parses inputs and then calls addUser
  var addNewUser = function(newUser, button){
    var profileInfo = buildUserObject(newUser, button)
    var profileInfoJSON = convertToJSON(profileInfo)
    addUser(profileInfoJSON, redirect)
  }

  // Authenticates user, first parses inputs and then calls authenticate
  var authenticateUser = function(user, button) {
    var profileInfo = buildUserObject(user, button)
    var profileInfoJSON = convertToJSON(profileInfo)
    authenticate(profileInfoJSON, redirect)
  }

  // Writes token to session storage
  var updateSessionStorage = function(data) {
    sessionStorage.setItem('token', data.tokenObj.token)
    return true;
  }

  // Makes request to authenticate route, updates session storage with token and redirects to
  // the dashboard if login is successful. Otherwise alerts an error message
  var authenticate = function(profileInfo, next) {
    console.log(`authenticating username and password`);
    $.ajax({
      type: "POST",
      url: 'http://localhost:3000/authenticate',
      data: { profile: profileInfo },
      crossDomain: true,
      statusCode: {
        406: function(response) {
          alert("We're sorry, that email or password were incorrect.")
        },
        200: function(response) {
          updateSessionStorage(response)
          next('login')
        }
      }
    }) // End AJAX
  }

  // Adds a user to the DB. Makes request to user/new and redirects to edit_profile if
  // request is successful. If user already exists, alerts error message.
  var addUser = function(profileInfo, next) {
    console.log('profileInfo being sent to BE');
    console.log(profileInfo);
    $.ajax({
      type: "POST",
      url: 'http://localhost:3000/user/new',
      data: { profile: profileInfo },
      crossDomain: true,
      statusCode: {
        409: function(response) {
          console.log(response);
          alert('A user with that email already exists in our system, did you mean to log in?')
        },
        201: function(response) {
          updateSessionStorage(response)
          next('signup')
        }
      }
    }) // End AJAX
  } // End addUser

  var redirect = function(path) {
    if (path === 'login') {
      window.location.replace("http://localhost:8080/pages/dashboard.html")
    }
    if (path === 'signup') {
      window.location.replace("http://localhost:8080/pages/edit_profile.html")
    }
  }


} // End onload fxn
