window.onload = function() {
  console.log("hello from dashboard.js");

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
    window.location.href= "http://localhost:8080/pages/edit_profile_HC.html"
  })
  viewProfileButton.addEventListener('click', function() {
    console.log('viewProfileButton clicked!');
    window.location.href= "http://localhost:8080/pages/profile.html"
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
