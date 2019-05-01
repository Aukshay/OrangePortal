
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
var json;
var value;






async function asyncCall(){

  let dbRef = firebase.database().ref().child('Services/Printing');
    const snapshot = await dbRef.once('value');
    json = snapshot.val();
    var app = new Vue({
      el: '#app',
      data: {
       movies: {}
     },
     methods:{

     },
     created(){
       dbRef.on('value', (snapshot)=>{
        this.movies = (snapshot.val());
       })
     }
    });
  document.getElementById('overlay').style.display = "none";
  //  console.log(json);



}

asyncCall();




 //dbRef.once('value', snap => {
  //  json = "[" + JSON.stringify(snap.val(), null, 3) + "]";


//      console.log(json);
  //});


//  console.log(json);
