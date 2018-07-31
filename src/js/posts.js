//Aquí comente estas lineas porque las pase al drawnProfile.js

const profileuser = (user)=> {
  let name = document.getElementById('name');
  let email = document.getElementById('email');
  let icon = document.getElementById('iconuser');
  icon.innerHTML = `<img class='circle' src='${user.photoURL}'>`;
  name.innerHTML = user.displayName;
  email.innerHTML = `<span class='white-text email'>${user.email}</span>`;
};
const logout = () => {
  firebase.auth().signOut();
  location.href = ('../index.html');
};

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    let user = firebase.auth().currentUser;
    if (user !== null) {
      profileuser(user);
      adduser(user);
      // En la siguiente linea hizo cambios Mir
      dbaseRef(user);
      // Reference

    // child_added:
    // child_changed:
    // child_remove:
    }
  } else {
  }
});
const adduser = (usuario)=> {
  let database = firebase.database();
  let user = {
    uid: usuario.uid,
    name: usuario.displayName,
    mail: usuario.email,
    photo: usuario.photoURL,
  };

  firebase.database().ref(`user/${user.uid}`).set(user);
};
// Function for update post
const getpost = ()=> {
  let html = '';
  let user = firebase.auth().currentUser;
  firebase.database().ref('user/posts').on('value', snapshot => {
    snapshot.forEach(event => {
      let element = event.val();
      let title = element.title;
      let photo = element.photo;
      // console.log(title);
      let post = element.post;
      // let post = element.posts;
      html += `<ul class ='collection'><li class = 'collection-item avatar'>
      <img src='${photo}' class='circle'>
      <span class = 'title'>${title}</span>
<p></p>${post}</li></ul>`;
    });
    post.innerHTML = html;
  });
};

const posts = () => {
  let user = firebase.auth().currentUser;
  let post = document.getElementById('post');
  let title = document.getElementById('title');
  let massage = document.getElementById('recipe');
  let titlePost = title.value;
  // console.log(titlePost);
  let massagepost = massage.value;
  // console.log(massagepost);
  // Pinto en una tabla los post
  post.innerHTML += `<ul class='collection'><li class='collection-item avatar'><span class='title'>${titlePost}</span>
<p>${massagepost}</p></li></ul>`;
  firebase.database().ref('user/posts').push({
    ui: user.uid,
    name: user.displayName,
    photo: user.photoURL,
    title: titlePost,
    post: massagepost
  });
  getpost();
  title.value = '';
  massage.value = '';
};

window.onload = getpost();
// Post button
let btnpost = document.getElementById('btnpost');

btnpost.addEventListener('click', posts);
// Button logout
let unsesion = document.getElementById('logout');
unsesion.addEventListener('click', logout);
