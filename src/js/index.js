const drawlogin = () => {
  let login = document.getElementById('login');
  // Draw inputs in Index
  login.innerHTML = `
<h5 id='titulos2'>
Sign in
</h5>
<input class='validate col s10 m8 l6 offset-s1 offset-m2 offset-l3' type='text' placeholder='Email...' id='email'>
<input class='validate col s10 m8 l6 offset-s1 offset-m2 offset-l3' type='password' placeholder='Password...' id='password'>
<div class="row">
<a id='sesion' class="waves-effect waves-light btn-large col s10 m8 l6 offset-s1 offset-m2 offset-l3">Iniciar Sesión</a>
</div>
<div class="row">
<a id='sesionGoogle' class="waves-effect red darken-4 btn-large col s10 m8 l6 offset-s1 offset-m2 offset-l3">Google</a>
</div>
<div class="row">
<a id='sesionFacebook' class="waves-effect indigo darken-3 btn-large col s10 m8 l6 offset-s1 offset-m2 offset-l3">
    facebook
</a>
</div>
`;
};


window.onload = drawlogin();

// Entrar a la Database
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    let user = firebase.auth().currentUser;
    if (user != null) {
      let email_id = user.email;
      location.href = ('views/view1.html');
    }
  } else {

  }
});

const getdata =()=> {
const mail = document.getElementById('email');
const password = document.getElementById('password');
const nick = document.getElementById('nick');

firebase.auth().signInWithEmailAndPassword(mail.value, password.value).catch(error=> {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  alert("Error "+ errorMessage);
  // ...
});

  firebase
    .auth()
    .signInWithEmailAndPassword(mail, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Error " + errorMessage);
      // ...
    });
};


let sesion = document.getElementById("sesion");
sesion.addEventListener("click",getdata);
let google = document.getElementById('sesionGoogle');
google.addEventListener('click', event => {
network.loginGoogle();
    });
let facebook = document.getElementById('sesionFacebook');
  facebook.addEventListener('click', event => {
  network.loginFacebook();
      });
