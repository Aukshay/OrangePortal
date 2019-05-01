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


//sidenav init
$(document).ready(function(){
    $('.sidenav').sidenav();
     $('.modal').modal();
     $('.tabs').tabs();
 });
 var fn, ln, pass, email, ph, user,userid;
 const txtemail = document.getElementById('txtemail');
 const txtpass = document.getElementById('txtpass');
 var pass = document.getElementById('pass');
 var conpass = document.getElementById('conpass');
 var loginbtn = document.getElementById('loginbtn');
 //var signupbtn = document.getElementById('signupbtn');
//auth functions
 loginbtn.addEventListener('click', e =>{
   const email = txtemail.value;
   const password = txtpass.value;
   const auth = firebase.auth();
   console.log(email, password);
   const promise = auth.signInWithEmailAndPassword(email,password);
   promise.catch(e => window.alert(e.message));

 });

 /* signupbtn.addEventListener('click', e =>{
   const email = modemail.value;
   const password = modpassword.value;
   const auth = firebase.auth();

   const promise = auth.createUserWithEmailAndPassword(email,password);
   promise.catch(e => window.alert(e.message));
   window.alert("Registration Successfull!");
 }); */
 function signout(){
   firebase.auth().signOut();



 }

 firebase.auth().onAuthStateChanged(firebaseUser => {
   if (firebaseUser) {
     console.log(firebaseUser);
     console.log(firebaseUser.uid);
     document.getElementById('preloader').style.display = "none";
     document.getElementById('acc').style.display="block";
     document.getElementById('accpic').style.display = "block";
     document.getElementById('loginbutton').style.display="none";
     document.getElementById('signupbtn').style.display="none";
       let dbRef = firebase.database().ref().child('users/' + firebaseUser.uid);
       dbRef.once('value').then(function(snapshot){
         $('#accpic').attr('src', snapshot.val().image);
         $('#profpic').attr('src', snapshot.val().image);
         document.getElementById('uname').innerHTML = snapshot.val().firstName +" "+ snapshot.val().lastName;
         document.getElementById('dispemail').innerHTML = snapshot.val().email;
         document.getElementById('dispcont').innerHTML = "Contact Number: " + snapshot.val().contact;
       });


   } else {
     console.log('not logged in');
      document.getElementById('acc').style.display="none";
     document.getElementById('loginbutton').style.display="inline-block";
     document.getElementById('signupbtn').style.display="inline-block";
     document.getElementById('preloader').style.display = "none";
     document.getElementById('accpic').style.display = "none";
   }
 });

 function tab2(){
   $('.tabs').tabs('select', 'test2');
 }
 function tab3(){
   if (pass.value === conpass.value) {
     $('.tabs').tabs('select', 'test3');
   } else {
     window.alert("Password didnt matched!");
   }

 }


 function readURL(input) {
         if (input.files && input.files[0]) {
             var reader = new FileReader();

             reader.onload = function (e) {
                 $('#dp').attr('src', e.target.result);
             }

             reader.readAsDataURL(input.files[0]);
         }
     }

     $("#filebutton").change(function(){
         readURL(this);
     });

function finish(){
  var file = document.getElementById('filebutton').files[0];

  var storageRef = firebase.storage().ref('img/' + file.name);

  var task = storageRef.put(file);


  task.on('state_changed',
    function progress(snapshot){
      var perc = (100* snapshot.bytesTransferred)/snapshot.totalBytes;
      var p = perc + '%';
      uploader.style.width = p;

    },
    function error(err){
      window.alert("LAFDOO!");
    },
    function complete(){
    //  uploader.style.display="none";
    M.toast({html: 'Image uploaded Succesfully'})
      task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        imgURL = downloadURL;
        console.log('File available at', imgURL);
        signup(imgURL);

      });
    });


  function signup(url){
    email = document.getElementById('email').value;
    pass = document.getElementById('conpass').value;
    var link = url;
    console.log(link);
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email,pass).then(function (){
        userid = firebase.auth().currentUser.uid;
        console.log(userid);
      }).then(function(){
        console.log("ye gandu fir pehle chala!");
        udata(userid, link);
      }).catch(e => window.alert(e.message));

  }

}




function udata(idid, catchlink){
  console.log("inside Udata");
  fn = document.getElementById('first_name').value;
  ln = document.getElementById('last_name').value;
  email = document.getElementById('email').value;
  ph = document.getElementById('phno').value;
  var fuserid = idid;
  var flink = catchlink;
//writing user data
  firebase.database().ref('users/' + fuserid ).set({
    firstName: fn,
    lastName: ln,
    contact: ph,
    email: email,
    image: flink
  }).then($('.tabs').tabs('select', 'test4'));



}
function tentclick(){
  window.location.href = "tenttest.html";
}

function waterclick(){
  window.location.href = "waterSupply/water.html";
}

function cateringclick(){
  window.location.href = "catering/catering.html";
}

function musicclick(){
  window.location.href = "music/music.html";
}

function decoclick(){
  window.location.href = "decoration/decoration.html";
}

function printclick(){
  window.location.href = "printing/printing.html";
}
