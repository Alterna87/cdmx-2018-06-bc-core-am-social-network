const profileuser = user => {
  let name = document.getElementById('name');
  let email = document.getElementById('email');
  let icon = document.getElementById('iconuser');
  icon.innerHTML = `<img class='circle' src='${user.photoURL}'>`;
  name.innerHTML = user.displayName;
  email.innerHTML = `<span class='white-text email'>${user.email}</span>`;
};
const logout = () => {
  firebase.auth().signOut();
  location.href = '../index.html';
};

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    let user = firebase.auth().currentUser;
    if (user !== null) {
      profileuser(user);
      adduser(user);
      // Reference
      // child_added:
      // child_changed:
      // child_remove:
    }
  } else {
  }
});
const adduser = usuario => {
  let database = firebase.database();
  const addUser = (uid, name) => {
    let conected = userConnect.push({
      uid: uid,
      name: name
    });
  };

  const getpost = () => {
    let html = '';
    firebase
      .database()
      .ref('user/posts')
      .on('value', snapshot => {
        snapshot.forEach(e => {
          let element = e.val();
          let title = element.title;
          let post = element.post;
          // Pinto los post que se obtiene en la base de datos
          html += `<li><h2>${title}</h2></li>
<li>${post}</li>`;
        });
        post.innerHTML = html;
      });
  };

  const posts = () => {
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
    firebase
      .database()
      .ref(`user/posts`)
      .push({
        ui: user.uid,
        name: user.displayName,
        photo: user.photoURL,
        title: titlePost,
        post: massagepost
      });
    // termina modifico mir
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
};
