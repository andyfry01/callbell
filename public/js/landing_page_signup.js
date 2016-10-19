window.onload = function() {
  console.log("hello from landingPageSignup.js");

  // Submit btns for client/HC professional, input form for username/password
  var formInfo = document.getElementById("signupForm").elements

  var HCSubmitBtn = document.getElementById("HC_submit").addEventListener("click", function(e) {
    e.preventDefault()
    addNewHC(formInfo)
  })

  var clientSubmitBtn = document.getElementById("client_submit").addEventListener("click", function(e) {
    e.preventDefault()
    addNewClient(formInfo)
  })

  // Adds an HC to the DB, first parses inputs and then calls addUserAJAX
  var addNewHC = function(newUser){
    var profileInfo = parseInputs(newUser)
    profileInfo.isHC = true
    console.log(profileInfo);
    addUserAJAX(profileInfo)
  }

  // Adds a client to the DB, first parses inputs and then calls addUserAJAX
  var addNewClient = function(newUser){
    var profileInfo = parseInputs(newUser)
    profileInfo.isClient = true
    console.log(profileInfo);
    addUserAJAX(profileInfo)
  }


  // Parses the inputs from the form and puts them into an object, which is then fed to the
  // backend server
  var parseInputs = function(formInfo) {
    var newUser = {}
    var formInfoLen = formInfo.length
    for (var i = 0; i < formInfoLen; i++) {
      newUser[formInfo[i].id] = formInfo[i].value
    }
    return newUser
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
          if (response === 'OK') {
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
          if (response === "OK") {
            window.location.href="http://localhost:8080/pages/client_signup.html"
          }
        }
      }) // End AJAX
    } // End else/if
  } // End addUserAJAX


} // End onload fxn
