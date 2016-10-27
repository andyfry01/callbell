window.onload = function() {
  console.log('hello from signup_form.js');

  // Signup form
  var formInfo = document.getElementById("signupForm").elements

  // Submit button
  var submitBtn = document.getElementsByClassName("signupFormButton")[0].addEventListener("click", function(e) {
    e.preventDefault()
    var button = this.id
    var userInfo = buildUserInfoObject(formInfo, button)
    postUserInfo(userInfo)
  })

  // Parses inputs from the signup form and passes them into an object, which is in turn
  // sent to the backend
  var buildUserInfoObject = function(formInfo, button) {

    var userInfo = {}

    var formInfoLen = formInfo.length
    for (var i = 0; i < formInfoLen; i++) {
      userInfo[formInfo[i].id] = formInfo[i].value
    }
    if (button === 'HC_submit') {
      userInfo.isHC = true
    }
    if (button === 'client_submit') {
      userInfo.isClient = true
    }
    return userInfo
  }

  var convertToJSON = function(object) {
    return JSON.stringify(object)
  }

  var getSessionStorage = function() {
    var sessionInfo = {
      email: sessionStorage.getItem('email'),
      token: sessionStorage.getItem('token')
    }
    return sessionInfo
  }

  var postUserInfo = function(userInfo) {
    console.log(userInfo)
    var data = {
      sessionInfo: getSessionStorage(),
      userInfo
    }
    var dataJSON = convertToJSON(data)
    console.log('this is the data were sendin');
    console.log(dataJSON);
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/user/signup',
      data: { data: dataJSON },
      crossDomain: true,
      success: function(response) {
        console.log('response from backend', response);
      }
    })
  }

} // End window.onload
