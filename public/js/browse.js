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
      console.log('response');
      console.log(response);
    }

  })
}

window.onload = function() {
  console.log('hello from browse.js');
  fillBrandTemplate()
  showProfileOverviews()
}
