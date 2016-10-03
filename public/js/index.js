window.onload = function() {
  console.log("hello from index.js");

  // Submit btn, form
  var formInfo = document.getElementById("signupForm").elements

  var submitBtn = document.getElementById("submit").addEventListener("click", function() {
    postUserInfo(formInfo)
  })


  // Posts user info to Google Sheets spreadsheet
  var postUserInfo = function(formInfo) {
    console.log("hi from postUserInfo");

    var formInfoLen = formInfo.length
    var userInfoArr = []

    for (var i = 0; i < formInfoLen; i++) {
      userInfoArr.push(formInfo[i].value)
    }

    // Ajax request once userInfoArr has been populated with form info
    $.ajax({
      type: "POST",
      url: 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadSheetID + '/values/Sheet1!A1:P1?:append',
      data: {
        'values': userInfoArr
      },
      success: function(response) {
        console.log('response', response);
      }
    });
  }

} // End onload fxn

// Post endpoint for spreadsheet
// POST https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}:append
