const drawlogin = () => {
  let login = document.getElementById('login');
  // Draw inputs in Index
  // cambios de mir en este inner.html
  login.innerHTML = `
<h5 id='titulos2'>
Sign in
</h5>
<div class="row">
<a id='sesionGoogle' class="waves-effect red darken-4 btn-large col s10 m8 l7 offset-s1 offset-m2 offset-l2">Google</a>
</div>
<div class="row">
<a id='sesionFacebook' class="waves-effect indigo darken-3 btn-large col s10 m8 l7 offset-s1 offset-m2 offset-l2">
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

const getdata = ()=> {
  const mail = document.getElementById('email');
  const password = document.getElementById('password');
  const nick = document.getElementById('nick');

  firebase.auth().signInWithEmailAndPassword(mail.value, password.value).catch(error=> {
  // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert('Error ' + errorMessage);
  // ...
  });

  firebase
    .auth()
    .signInWithEmailAndPassword(mail, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert('Error ' + errorMessage);
      // ...
    });
};


let sesion = document.getElementById('sesion');
// comento esto mir
// sesion.addEventListener("click",getdata);
let google = document.getElementById('sesionGoogle');
google.addEventListener('click', event => {
  network.loginGoogle();
});
let facebook = document.getElementById('sesionFacebook');
facebook.addEventListener('click', event => {
  network.loginFacebook();
});
