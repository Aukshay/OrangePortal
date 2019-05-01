// Initialize Firebase
var config = {
  apiKey: "AIzaSyBUlrJssTUNtGEVK7LxtKihE6fLqfXqAqU",
  authDomain: "orangeportal-c9ac3.firebaseapp.com",
  databaseURL: "https://orangeportal-c9ac3.firebaseio.com",
  projectId: "orangeportal-c9ac3",
  storageBucket: "orangeportal-c9ac3.appspot.com",
  messagingSenderId: "638466128886"
};
  firebase.initializeApp(config);

  var submitButton = document.getElementById('submitButton');
  var uname = document.getElementById('uname');
  var uemail = document.getElementById('uemail');
  var rate = document.getElementById('test5');
  var feedback = document.getElementById('fb')


  function submit(){
    var username = uname.value;
    var useremail = uemail.value;
    var fb = feedback.value;
    console.log(rate.value);
    firebase.database().ref("Feedback").push({
      useremail: username ,
      username: useremail,
      userthoughts: fb
    });
    window.alert("Thank you for your Feedback!");
  }

  
