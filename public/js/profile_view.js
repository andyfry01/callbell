var convertToJSON = function(object) {
  return JSON.stringify(object)
}

var getSessionStorage = function() {
  var sessionInfo = {
    token: sessionStorage.getItem('token')
  }
  return sessionInfo
}

var fillTemplate = function(data) {
  var source = document.getElementById('nurse_profile_template').innerHTML
  var template = Handlebars.compile(source)
  var html = template(data)
  var targetDiv = document.getElementById('profile-container')
  targetDiv.innerHTML = html
}

var requestProfile = function(){
  var data = {
    sessionData: getSessionStorage()
  }
  var dataJSON = convertToJSON(data)
  $.ajax({
    type: 'POST',
    data: { data: dataJSON },
    crossDomain: true,
    url: 'http://localhost:3000/user/profile',
    success: function(data) {
      fillTemplate(data)
    }
  })
}

window.onload = function() {

  console.log('hello from profile_view.js');

  requestProfile()
}
