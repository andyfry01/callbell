window.onload = function() {
  console.log("hello from index.js");

  // Submit btn, form
  var formInfo = document.getElementById("signupForm").elements

  var submitBtn = document.getElementById("submit").addEventListener("click", function(e) {
    e.preventDefault()
    postUserInfo(formInfo)
  })


  // Posts user info to DB
  var postUserInfo = function(formInfo) {
    console.log("hi from postUserInfo");

    var userInfo = {}

    var formInfoLen = formInfo.length
    for (var i = 0; i < formInfoLen; i++) {
      userInfo[formInfo[i].id] = formInfo[i].value
    }
    console.log(userInfo);

    var user = new Object()
    user.firstName = userInfoArr[0]
    user.lastName = userInfoArr[1]
    user.location = userInfoArr[3]
    user.primaryLang = userInfoArr[4]
    user.secondaryLang = userInfoArr[5]

    console.log(user);

    // Ajax request once userInfoArr has been populated with form info
    $.ajax({
      type: "POST",
      url: 'http://localhost:3000/HC/new',
      data: {
        user
      },
      dataType: 'JSON',
      success: function(response) {
        console.log('response', response);
        if (response) {
          window.location.href='http://en.wikipedia.org'
        }
      }
    });
  }

} // End onload fxn

// Post endpoint for spreadsheet
// POST https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}:append
