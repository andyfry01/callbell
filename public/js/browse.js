var getSessionStorage = function() {
  var sessionInfo = {
    token: sessionStorage.getItem('token')
  }
  return sessionInfo
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
  console.log('target div is');
  console.log(targetDiv);
  targetDiv.innerHTML = html
}

var convertToJSON = function(object) {
  return JSON.stringify(object)
}

var fillProfileTemplates = function(profileData) {

  console.log('profileData');
  console.log(profileData);
  var source = document.getElementById('profile_overview_template').innerHTML
  var template = Handlebars.compile(source)
  console.log('template');
  console.log(template);
  var html = template({profiles: profileData})
  console.log("html");
  console.log(html);
  var targetDiv = document.getElementById('profile_overview_container')
  console.log("targetDiv");
  console.log(targetDiv);
  targetDiv.innerHTML = html
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
      fillProfileTemplates(response.results)
    }
  })
}

window.onload = function() {
  console.log('hello from browse.js');
  fillBrandTemplate()
  showProfileOverviews()
}
