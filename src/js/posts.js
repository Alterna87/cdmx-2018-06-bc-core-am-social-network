
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


const adduser =(usuario)=> {
let database = firebase.database();
let user = {
  uid: usuario.uid,
  name: usuario.displayName,
  mail: usuario.email,
  photo: usuario.photoURL
}
firebase.database().ref(`user/${usuario.uid}`).set(user);
}

// Function for update post
window.onload = getpost = ()=> {
let html = '';
let user = firebase.auth().currentUser;
firebase.database().ref('user/posts').on('value', snapshot => {
      snapshot.forEach(event => {
      let key = event.key;
      let element = event.val();

      let ui = element.uid;
      let name = element.name;
      let photo = element.photo;
      let type = element.type;
      if (type == 'Recetas') {
        typePost = 'restaurant';
      } else {
        typePost = 'place';
      }
      let title = element.title.toUpperCase();
      let people = element.people;
      let ingredients = element.ingredients;
      let steps= element.steps;

      // let post = element.posts;

      html += `<div class='col s12 m12 l12'>
      <section class='card'>
      <section class='card-image'>
      <a class='btn-floating right waves-effect waves-light red'>
      <i class='material-icons'>${typePost}</i>
      </a>
      <img src='../images/pozoleblanco.jpg'>
      <span class='card-title'>
          <h4 class='white-text'>${title}</h4>
          <a class="btn-floating halfway-fab waves-effect waves-light gray">
          <i class="material-icons grey">favorite</i>
          </a>
      </span>
    </section>
      <section class='card-content col m12'>
      <ul class="collection">
      <li class='collection-item avatar'>
      <img src=${photo} class='circle'>
      <p>${name}</p></li></ul>
      <h4>Ingredientes</h4>
      <p>${ingredients}</p>
      <h4>Procedimiento</h4>
      <p>${steps}</p>
      <h4>Ranking</h4>
      <p>¿Te gustó este lugar?</p>
      </section>
      <section class='padding-buttons col s12'>
      <a class="waves-effect waves-light btn-small btn col s12 l4"><i class="material-icons left ">create</i>Editar</a><a class='waves-effect waves-light btn-small red btn-delete col s12 l4 offset-l2' data-message = '${key}'><i class="material-icons left">delete</i>Borrar</a>
      </section>
      </section>
          </div>`;

    post.innerHTML = html;
    if(post != ''){
      let elementsDelete = document.getElementsByClassName('btn-delete');
      for (let i = 0; i < elementsDelete.length; i++) {
        console.log(elementsDelete[i]);
        elementsDelete[i].addEventListener('click', e => {
          let key = e.target;
          let keyDataDelete = key.getAttribute("data-message");
          let refPostDelete = firebase.database().ref('user/posts').child(keyDataDelete);
          refPostDelete.remove();
        });
      };
    };
  });
});
}


const postsRecipe = () => {
  let choosePost = document.getElementById('choose-post');
  let formRecipe = document.getElementById('form-recipe');
  let formPlaces = document.getElementById('form-places');
  let user = firebase.auth().currentUser;
  let title = document.getElementById('input_text');
  let image = document.getElementById('fileImage');
  let people = document.getElementById('count');
  let ingredients = document.getElementById('get-ingredients');
  let steps = document.getElementById('textarea2');
    // Drawning posts
post.innerHTML = `<ul class ='collection'><li class = 'collection-item avatar'>
<img src='${user.photoURL}' class='circle'>
<span class = 'title'>${user.displayName}</span>
<p><b>${title.value} <b><br>
<b>Porción para </b>${people.value} Personas<br>
<b>Ingredientes </b>${ingredients.value}<br>
<b>Pasos </b>${steps.value}<br>
  </p>
</li></ul>`;
firebase.database().ref(`user/posts`).push({
    ui: user.uid,
    name: user.displayName,
    photo: user.photoURL,
    type: choosePost.value,
    title: title.value,
    people: people.value,
    ingredients: ingredients.value,
    steps: steps.value
  });



  // modified by Francis
  title.value = '';
  people.value = '';
  ingredients.value ='';
  steps.value = '';
  formRecipe.style.display ='none';
  formPlaces.style.display = 'none';
};


// Post button
let btnpost = document.getElementById('btnpost');
let btnplace = document.getElementById('btnplace');

btnpost.addEventListener('click', postsRecipe);
// Button logout
let unsesion = document.getElementById('logout');
unsesion.addEventListener('click', logout);
// modified by Francis
// Event of Choose post

let chooseRecipe = document.getElementById('add-recipe');
let choosePlaces = document.getElementById('add-place');
chooseRecipe.addEventListener('click', e => {
let formRecipe = document.getElementById('form-recipe');
let formPlaces = document.getElementById('form-places');
  formRecipe.style.display ='block';
  formPlaces.style.display = 'none';
});
choosePlaces.addEventListener('click', e => {
  let formRecipe = document.getElementById('form-recipe');
  let formPlaces = document.getElementById('form-places');
  formRecipe.style.display ='none';
  formPlaces.style.display = 'block';
});

const uploadimages =()=>{
let refImages = firebase.storage().ref();
let imageup = image.files[0];
let uploadImages = refImages.child('images/'+ imageup.name).put(imageup);
uploadImages.on('state_changed', snapshot => {

}, error =>{

},  () => {
let imageURL = uploadImages.snapshot.downloadURL;
});
}

const createNode =(url)=> {

}

let ingredientSelected = document.getElementById('ingredients');
ingredientSelected.addEventListener('change', e => {
  let ingredients = document.getElementById('get-ingredients');
  ingredients.value += `${ingredientSelected.value}, `;
});


//modified by Francis
  // With jQuery
  $(document).ready(function(){
    $('select').formSelect();
  });
  $(document).ready(function() {
    $('input#input_text, input#input_places, input#input_address,  input#input_city, input#input_description, extarea#textarea2').characterCounter();
  });
