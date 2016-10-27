window.onload = function() {
  console.log('hello from profile_view.js');
  console.log('looking for token/email and filling profile template');


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

  console.log('Session storage data:');
  console.log(sessionData);

  $.ajax({
    type: 'POST',
    data: { sessionData },
    crossDomain: true,
    url: 'http://localhost:3000/user/profile',
    success: function(data) {
      console.log('Data returned from API:');
      console.log(data);
    }
  })

}
