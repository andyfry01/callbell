var getSessionStorage = function() {
  var sessionInfo = {
    token: sessionStorage.getItem('token')
  }
  return sessionInfo
}

var fillBrandTemplate = function () {
  var source = document.getElementById('brand_template').innerHTML
  var template = Handlebars.compile(source)
  if ( getSessionStorage()) {
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
  console.log("hello from dashboard.js");
  fillBrandTemplate()

  // Buttons from dashboard page
  var editProfileButton = document.getElementById('edit_profile')
  var viewProfileButton = document.getElementById('view_profile')
  var browseProfilesButton = document.getElementById('browse_profiles')
  var viewLikesButton = document.getElementById('view_likes')
  var messagesButton = document.getElementById('messages')
  var paymentsButton = document.getElementById('payments')
  var contactButton = document.getElementById('contact')

  // Click handlers
  editProfileButton.addEventListener('click', function() {
    console.log('editProfileButton clicked!');
    window.location.replace("http://localhost:8080/pages/edit_profile.html")
  })
  viewProfileButton.addEventListener('click', function() {
    console.log('viewProfileButton clicked!');
    window.location.replace("http://localhost:8080/pages/profile.html")
  })
  browseProfilesButton.addEventListener('click', function() {
    console.log('browseProfilesButton clicked!');

  })
  viewLikesButton.addEventListener('click', function() {
    console.log('viewLikesButton clicked!');
  })
  messagesButton.addEventListener('click', function() {
    console.log('messagesButton clicked!');
  })
  paymentsButton.addEventListener('click', function() {
    console.log('paymentsButton clicked!');
  })
  contactButton.addEventListener('click', function() {
    console.log('contactButton clicked!');
  })

}
