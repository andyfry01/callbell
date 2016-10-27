window.onload = function() {
  console.log('hello from profile_view.js');

  var sessionData =  {
    email: sessionStorage.getItem('email'),
    token: sessionStorage.getItem('token')
  }

  if (sessionStorage.getItem('isHC')) {
    sessionData.isHC = true
  }
  if (sessionStorage.getItem('isClient')) {
    sessionData.isClient = true
  }

  var fillTemplate = function(data) {
    var source = document.getElementById('nurse_profile_template').innerHTML
    var template = Handlebars.compile(source)
    var html = template(data)
    var targetDiv = document.getElementById('profile-container')
    targetDiv.innerHTML = html
  }

  $.ajax({
    type: 'POST',
    data: { sessionData },
    crossDomain: true,
    url: 'http://localhost:3000/user/profile',
    success: function(data) {
      console.log('Data returned from API:');
      console.log(data);
      fillTemplate(data)
    }
  })

}
