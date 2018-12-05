// Client ID and API key from the Developer Console
var CLIENT_ID = '1055940468559-sft7n7el7jj9g0d2pmcgluc1jgjldn34.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCrGOmGSMm9UzP3ZSeCuqxU9xTn8J-COYk';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  }, function(error) {
    appendPre(JSON.stringify(error, null, 2));
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    listFiles();
    //getFile();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

/**
 * Print files.
 */
function listFiles() {
  gapi.client.drive.files.list({
    'pageSize': 10,
    'fields': "nextPageToken, files(id, name)"
  }).then(function(response) {
    appendPre('Files:');
    var files = response.result.files;
    if (files && files.length > 0) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        appendPre(file.name + ' (' + file.id + ')');
      }
    } else {
      appendPre('No files found.');
    }
  });
}


function printFile() {
  // var request = gapi.client.drive.file.list({
  //   q: "'15uMCEkVelEfWUmRUWFKEG8UEBfZOE_Un' in parents",
  //   'fields': "files(id, name, webContentLink, webViewLink)"
  // });
  // request.execute(function(resp) {
  //   console.log(resp);
  // })



  console.log("print");
  // var fileId = '1VGDwJ7bjAtALcQrwBDt1WwekJjLbatprL_OUqZzNA14';
  // var request = gapi.client.drive.files.get({
  //   'fileId': fileId,
  //   'supportsTeamDrives': true
  // });
  // console.log(request.result);
  // request.execute(function(resp) {
  //   console.log('Title: ' + resp.title);
  //   console.log('Description: ' + resp.description);
  //   console.log('MIME type: ' + resp.mimeType);
  // });


  gapi.client.request({
    'path': '/drive/v2/files/'+'1VGDwJ7bjAtALcQrwBDt1WwekJjLbatprL_OUqZzNA14',
    'method': 'GET',
    callback: function ( theResponseJS, theResponseTXT ) {
        var myToken = gapi.auth.getToken();
        var myXHR   = new XMLHttpRequest();
        myXHR.open('GET', theResponseJS.downloadUrl, true );
        myXHR.setRequestHeader('Authorization', 'Bearer ' + myToken.access_token );
        myXHR.onreadystatechange = function( theProgressEvent ) {
            if (myXHR.readyState == 4) {
//          1=connection ok, 2=Request received, 3=running, 4=terminated
                if ( myXHR.status == 200 ) {
//              200=OK
                    console.log( myXHR.response );
                }
            }
        }
        myXHR.send();
    }
});
}




function downloadFile(file, callback) {
  if (file.downloadUrl) {
    var accessToken = gapi.auth.getToken().access_token;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file.downloadUrl);
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xhr.onload = function() {
      callback(xhr.responseText);
    };
    xhr.onerror = function() {
      callback(null);
    };
    xhr.send();
  } else {
    callback(null);
  }



  // if (file.downloadUrl) {
  //   var accessToken = gapi.auth.getToken().access_token;
  //   var xhr = new XMLHttpRequest();
  //   xhr.open('GET', file.downloadUrl);
  //   xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
  //   xhr.onload = function() {
  //     callback(xhr.responseText);
  //   };
  //   xhr.onerror = function() {
  //     callback(null);
  //   };
  //   xhr.send();
  // } else {
  //   callback(null);
  // }
}