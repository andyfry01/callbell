window.onload = function() {
  console.log("hello from landingPageSignup.js");

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
    var formInfoLen = formInfo.length
    var buttonOptions = {
      HC: ['HC_signin', 'HC_signup'],
      client: ['client_signin', 'client_signup']
    }
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
    if (newUser.isHC === undefined) {
      if (newUser.isClient === undefined) {
        console.log("ERROR!!!");
      }
    }
    return newUser
  }

  // Converts object to JSON for sending to backend
  var convertToJSON = function(object) {
    return JSON.stringify(object)
  }

  // Adds an user to the DB, first parses inputs and then calls addUserAJAX
  var addNewUser = function(newUser, button){
    var profileInfo = buildUserObject(newUser, button)
    console.log(profileInfo);
    var profileInfoJSON = convertToJSON(profileInfo)
    console.log('the JSONified add user data now looks like this');
    console.log(profileInfoJSON);
    // addUserAJAX(profileInfoJSON)
  }

  // Authenticates user, first parses inputs and then calls authenticate
  var authenticateUser = function(user, button) {
    var profileInfo = buildUserObject(user, button)
    console.log(profileInfo);
    var profileInfoJSON = convertToJSON(profileInfo)
    console.log('the JSONified authenticate user data now looks like this');
    console.log(profileInfoJSON);
    // authenticate(profileInfoJSON)
  }


  // Writes user email to session storage for further steps in signup process
  var updateSessionStorage = function(userInfo) {
    sessionStorage.setItem('email', userInfo.email)
    sessionStorage.setItem('passHash', userInfo.password)
    return true;
  }

  var authenticate = function(profileInfo) {
    console.log(`authenticating ${profileInfo}`);
    if (profileInfo.isHC === true) {
      $.ajax({
        type: "POST",
        url: 'http://localhost:3000/authenticate',
        data: {
          profileInfo
        },
        crossDomain: true,
        success: function(response) {
          console.log('response', response);
        }
      }) // End AJAX
    } else if (profileInfo.isClient === true) {
      $.ajax({
        type: "POST",
        url: 'http://localhost:3000/authenticate',
        data: {
          profileInfo
        },
        crossDomain: true,
        success: function(response) {
          console.log('response', response);
        }
      }) // End AJAX
    } // End else/if
  }

  // Adds a user to the DB, different routes depending on if an HC/client is signing up
  var addUserAJAX = function(profileInfo) {

    if (profileInfo.isHC === true) {
      $.ajax({
        type: "POST",
        url: 'http://localhost:3000/HC/new',
        data: {
          profileInfo
        },
        crossDomain: true,
        success: function(response) {
          console.log('response', response);
          if (response) {
            updateSessionStorage(response)
            window.location.href="http://localhost:8080/pages/HC_signup.html"
          }
        }
      }) // End AJAX

    } else if (profileInfo.isClient === true) {
      $.ajax({
        type: "POST",
        url: 'http://localhost:3000/client/new',
        data: {
          profileInfo
        },
        crossDomain: true,
        success: function(response) {
          console.log('response', response);
          if (response) {
            updateSessionStorage(response)
            window.location.href="http://localhost:8080/pages/client_signup.html"
          }
        }
      }) // End AJAX
    } // End else/if
  } // End addUserAJAX



} // End onload fxn
