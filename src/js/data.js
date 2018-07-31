
window.network = {
  loadFirebase:  () => {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAaMEeTfLhwDTFiUWVNbJp39Q3eYDQgT14",
        authDomain: "red-social-4ed2d.firebaseapp.com",
        databaseURL: "https://red-social-4ed2d.firebaseio.com",
        projectId: "red-social-4ed2d",
        storageBucket: "red-social-4ed2d.appspot.com",
        messagingSenderId: "704831096005"
    };
firebase.initializeApp(config);
  },
  // Sing In with Google
  loginGoogle: () => {
    // Verify if User exists
    if (!firebase.auth().currentUser) {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    let token = result.credential.accesstoken;
    let user = result.user;
    location.href = ('views/view1.html');
  }).catch(error => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
      // Verify if is same user
      if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('Intenta con otro correo');
      }
    });

} else {
  firebase.auth().signOut();
}
},
// Login with Facebook
loginFacebook: () => {
  // Verify if User exists
  if (!firebase.auth().currentUser) {
  let provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('public_profile');
  firebase.auth().signInWithPopup(provider).then(result => {
  // This gives you a Facebook Access Token. You can use it to access the Google API.
  let token = result.credential.accesstoken;
  let user = result.user;
  console.log(user);
  location.href = ('views/view1.html');
}).catch(error => {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // The email of the user's account used.
    let email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    let credential = error.credential;
    // Verify if is same user
    if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('Intenta con otra cuenta');
    }
  });

} else {
firebase.auth().signOut();
}

},

createUser : ()=>{


}
};
network.loadFirebase();
