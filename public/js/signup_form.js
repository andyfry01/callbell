window.onload = function() {
  console.log('hello from signup_form.js');

  // Signup form
  var formInfo = document.getElementById("signupForm").elements

  // Submit button
  var submitBtn = document.getElementById("submit").addEventListener("click", function(e) {
    console.log('posting info?');
    e.preventDefault()
    var userInfo = parseInputs(formInfo)
    postUserInfo(userInfo)
  })

  var postUserInfo = function(userInfo) {
    console.log(userInfo)
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/client/signup',
      data: {
        sessionInfo: getSessionStorage(),
        userInfo
      },
      crossDomain: true,
      success: function(response) {
        console.log('response from backend', response);
      }
    })
  }

  var getSessionStorage = function() {
    var sessionInfo = {
      email: sessionStorage.getItem('email'),
      password: sessionStorage.getItem('passHash')
    }
    return sessionInfo
  }

  // Parses inputs from the signup form and passes them into an object, which is in turn
  // sent to the backend
  var parseInputs = function(formInfo) {
    var userInfo = {}
    var formInfoLen = formInfo.length
    for (var i = 0; i < formInfoLen; i++) {
      userInfo[formInfo[i].id] = formInfo[i].value
    }
    return userInfo
  }


} // End window.onload
