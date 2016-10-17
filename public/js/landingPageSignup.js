window.onload = function() {
  console.log("hello from index.js");

  // Submit btn, form
  var formInfo = document.getElementById("signupForm").elements

  var HCSubmitBtn = document.getElementById("HC_submit").addEventListener("click", function(e) {
    e.preventDefault()
    addNewHC(formInfo)
  })

  var clientSubmitBtn = document.getElementById("client_submit").addEventListener("click", function(e) {
    e.preventDefault()
    addNewClient(formInfo)
  })


  var addNewHC = function(newUser){
    var profileInfo = parseInputs(newUser)
    profileInfo.isHC = true
    console.log(profileInfo);
    addUserAJAX(profileInfo)
  }

  var addNewClient = function(newUser){
    var profileInfo = parseInputs(newUser)
    profileInfo.isClient = true
    console.log(profileInfo);
    addUserAJAX(profileInfo)
  }


  // User signup AJAX
  var parseInputs = function(formInfo) {
    console.log(formInfo);

    var newUser = {}

    var formInfoLen = formInfo.length
    for (var i = 0; i < formInfoLen; i++) {
      newUser[formInfo[i].id] = formInfo[i].value
    }
    console.log(newUser);
    return newUser
  }

  var addUserAJAX = function(profileInfo) {

    if (profileInfo.isHC === true) {
      $.ajax({
        type: "POST",
        url: 'http://localhost:3000/HC/new',
        data: {
          profileInfo
        },
        dataType: 'JSON',
        success: function(response) {
          console.log('response', response);
        }
      })
    } else if (profileInfo.isClient === true) {
      $.ajax({
        type: "POST",
        url: 'http://localhost:3000/client/new',
        data: {
          profileInfo
        },
        dataType: 'JSON',
        success: function(response) {
          console.log('response', response);
        }
      })
    }
  }


} // End onload fxn
