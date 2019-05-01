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
  var database = firebase.database();
  var stype;
  var fn, ln, s_n, s_add, ph, strUser;
  var x = 0;
  var imgURL;

  const txtemail = document.getElementById('email');
  const txtpassword = document.getElementById('pass');

  const modemail = document.getElementById('emailmodal');
  const modpassword = document.getElementById('passmodal');

  var loginbtn = document.getElementById('loginbtn');
  var signup = document.getElementById('signup');

var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('filebutton');
var subButton = document.getElementById('submitButton');

loginbtn.addEventListener('click', e =>{
  const email = txtemail.value;
  const password = txtpassword.value;
  const auth = firebase.auth();
  console.log(email, password);
  const promise = auth.signInWithEmailAndPassword(email,password);
  promise.catch(e => window.alert(e.message));

});

signup.addEventListener('click', e =>{
  const email = modemail.value;
  const password = modpassword.value;
  const auth = firebase.auth();

  const promise = auth.createUserWithEmailAndPassword(email,password);
  promise.catch(e => window.alert(e.message));
  window.alert("Registration Successfull!");
});

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
    document.getElementById('wel').innerHTML = "Welcome " + txtemail.value;
    document.getElementById('overlay').style.display= "none";

  } else {
    console.log('not logged in');
  }
});

function logout(){
  firebase.auth().signOut();
  document.getElementById('overlay').style.display= "block";
}

fileButton.addEventListener('change', function(e) {
  var file = e.target.files[0];

  var storageRef = firebase.storage().ref('img/' + file.name);

  var task = storageRef.put(file);


  task.on('state_changed',
    function progress(snapshot){
      var perc = (100* snapshot.bytesTransferred)/snapshot.totalBytes;
      var p = perc + '%';
      uploader.style.width = p;

    },

    function error(err){

    },
    function complete(){
    //  uploader.style.display="none";
    M.toast({html: 'Image uploaded Succesfully'})
      task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        imgURL = downloadURL;
        console.log('File available at', imgURL);

      });
      uploader.style.display= "none";
      subButton.style.display="block";
    },




  );


})

function show(){
   fn = document.getElementById('first_name').value;
   ln = document.getElementById('last_name').value;
   s_n = document.getElementById('s_name').value;
   s_add = document.getElementById('s_add').value;
   ph = document.getElementById('cont_no').value;
   e = document.getElementById("selector");
   strUser = e.options[e.selectedIndex].text;
   var link = imgURL;

    if (strUser == "Tent Service") {
      stype = "Services/Tent";
      console.log(stype);
    }else if (strUser == "Water Supply") {
      stype = "Services/WaterSupply";
      console.log(stype);
    }else if (strUser == "Catering") {
      stype = "Services/Catering";
      console.log(stype);
    }else if (strUser == "Music") {
      stype = "Services/Music";
      console.log(stype);
    }else if (strUser == "Printing") {
      stype = "Services/Printing";
      console.log(stype);
    }else if(strUser == "Decoration"){
      stype = "Services/Decoration";
      console.log(stype);
    }else {
     x = 1;
   }

   if (x == 1) {
     window.alert("Please select a Category");
     x = 0;
   } else {
     firebase.database().ref(stype).push({
       firstName: fn,
       lastName: ln,
       shopname: s_n,
       address: s_add,
       contact: ph,
       image: link
     });
   }
}

function redirect(){
  window.location.href = "index.html";

}
