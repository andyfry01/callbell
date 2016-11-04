var getUserInfo = function() {
  console.log('gettin user info');
  var data = {
    sessionData: getSessionStorage()
  }
  var dataJSON = convertToJSON(data)
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/user/profile',
    data: { data: dataJSON },
    crossDomain: true,
    success: function(response) {
      console.log('response from user/profile');
      console.log(response);
      fillTemplate(response)
    }
  })
}

// Parses inputs from the signup form and passes them into an object, which is in turn
// sent to the backend
var buildUserInfoObject = function(formInfo, button) {

  var userInfo = {}

  var formInfoLen = formInfo.length
  for (var i = 0; i < formInfoLen; i++) {
    userInfo[formInfo[i].id] = formInfo[i].value
  }
  return userInfo
}

var convertToJSON = function(object) {
  return JSON.stringify(object)
}

var getSessionStorage = function() {
  var sessionInfo = {
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
    url: 'http://localhost:3000/user/update',
    data: { data: dataJSON },
    crossDomain: true,
    success: function(response) {
      console.log('response from backend', response);
    }
  })
}

var fillTemplate = function(data) {
  if (data.profile.isHC) {
    var source = document.getElementById('HC_edit_template').innerHTML
  }
  if (data.profile.isClient) {
    var source = document.getElementById('client_edit_template').innerHTML
  }
  var template = Handlebars.compile(source)
  var html = template(data)
  var targetDiv = document.getElementById('edit_profile_container')
  targetDiv.innerHTML = html
}


window.onload = function() {
  console.log('hello from edit_profile.js');

  getUserInfo()


  // Submit button
  var submitBtn = document.getElementsByClassName("signupFormButton")[0].addEventListener("click", function(e) {
    e.preventDefault()
    var formInfo = document.getElementById("signupForm").elements
    var button = this.id
    var userInfo = buildUserInfoObject(formInfo, button)
    postUserInfo(userInfo)
  })


} // End window.onload
