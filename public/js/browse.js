var getSessionStorage = function() {
  var sessionInfo = {
    token: sessionStorage.getItem('token')
  }
  return sessionInfo
}

var addLinkListener = function() {
  var profileLinks = document.getElementsByClassName('profile_link')
  for (var i = 0; i < profileLinks.length; i++) {
    profileLinks[i].addEventListener('click', function(e) {
      console.log(e.path[3].id);
    })
  }
}

var getUserProfile = function(profileID) {
  var data = {
    sessionData: getSessionStorage(),
    id: profileID
  }
  var dataJSON = convertToJSON(data)

  $.ajax({
    type: 'POST',
    data: { data: dataJSON },
    crossDomain: true,
    statusCode: {
      406: function(response) {
        alert("Sorry, we had a problem loading that profile, please try again.")
      },
      200: function(response) {

      }
    }

  })
}

var fillBrandTemplate = function () {
  var source = document.getElementById('brand_template').innerHTML
  var template = Handlebars.compile(source)
  if (getSessionStorage()) {
    var html = template({target: 'http://localhost:8080/pages/dashboard.html'})
  } else {
    var html = template({target: 'http://localhost:8080/pages/index.html'})
  }
  var targetDiv = document.getElementById('brand_container')
  targetDiv.innerHTML = html
}

var convertToJSON = function(object) {
  return JSON.stringify(object)
}

var fillProfilesTemplate = function(profileData, next) {
  var source = document.getElementById('profile_overview_template').innerHTML
  var template = Handlebars.compile(source)
  var html = template({profiles: profileData})
  var targetDiv = document.getElementById('profile_overview_container')
  targetDiv.innerHTML = html
  next()
}

var showProfileOverviews = function() {
  console.log('showProfileOverviews is firing');
  var data = {
    page: 1,
    sessionData: getSessionStorage()
  }
  var jsonData = convertToJSON(data)
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/user/browse',
    crossDomain: true,
    data: {data: jsonData},
    success: function(response) {
      fillProfilesTemplate(response.results, addLinkListener)
    }
  })
}

window.onload = function() {
  console.log('hello from browse.js');
  fillBrandTemplate()
  showProfileOverviews()
}
