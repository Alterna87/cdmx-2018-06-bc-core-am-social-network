
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
      if (element.type == 'Receta') {
        typePost = 'restaurant';
        let ui = element.uid;
        let name = element.name;
        let photo = element.photo;
        let type = element.type;
        let images = element.images;
        let title = element.title.toUpperCase();
        let people = element.people;
        let ingredients = element.ingredients;
        let steps = element.steps;
  // let post = element.recipe;
          html += `<div class='col s12 m12 l12'>
        <section class='card'>
        <section class='card-image'>
        <a class='btn-floating right waves-effect waves-light red'>
        <i class='material-icons'>${typePost}</i>
        </a>
        <img src='${images}'>
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
        <h4>Porción Para: </h4>
        <p>${people} Personas</p>
        <h4>Ingredientes</h4>
        <p>${ingredients}</p>
        <h4>Procedimiento</h4>
        <p>${steps}</p>
      </section>
      <h4>Ranking</h4>
      <div id='ranking'>
          <div id='bar'>
              <div id= 'likes'> </div>
              <div id= 'dislikes'> </div>
          </div>
      </div>
      <div class= 'divider'></div>
      <div id= 'ranking-buttons'>
          <i class = 'waves-effect waves-red btn right material-icons' onclick='dislike();'>thumb_down</i>
          <i class = 'waves-effect waves-yellow btn right material-icons' onclick='like();'>thumb_up</i>
      </div>
        <section class='padding-buttons col s12'>
        <a class= 'waves-effect waves-light btn-small btn col s12 l4'><i class= 'material-icons left '>create</i>Editar</a><a class='waves-effect waves-light btn-small red btn-delete col s12 l4 offset-l2' data-message = '${key}'><i class='material-icons left'>delete</i>Borrar</a>
        </section>
        </section>
            </div>`;
      } else {
        typePost = 'place';
        let uid = element.uid;
        let name = element.name;
        let photo = element.photo;
        let type = element.type;
        let title = element.title;
        let address = element.address;
        let city = element.city;
        let genial = element.genial;
        let like = element.like;
    html += `<div class='row' id='place-format'>
                    <div class='col s12 m12 l12'>
                        <div class='card'>
                            <div class='card-image'>
                                <a class='btn-floating right waves-effect waves-light red'>
                                    <i class='material-icons'>place</i>
                                </a>
                                <img src='../images/laSazonTlalpn.jpg'>
                                <span class='card-title'>
                                    <h4 class='white-text'>${title}</h4>
                                </span>
                                <a id='favorite-place' class='btn-floating halfway-fab waves-effect waves-red'>
                                    <i class='material-icons'>favorite</i>
                                </a>
                            </div>
                            <div class='card-content'>
                                <h4>Ubicación</h4>
                                <p>${address}</p>
                                <h4>Ubicación</h4>
                                <p>${city}</p>
                                <h4>Descripción</h4>
                                <p>${genial}</p>
                                <h4>Ranking</h4>
                                <div id='ranking'>
                                    <div id='bar'>
                                        <div id='likes'> </div>
                                        <div id='dislikes'> </div>
                                    </div>
                                </div>
                                <div class='divider'></div>
                                <div id='ranking-buttons'>
                                    <i class='waves-effect waves-red btn right material-icons' onclick='dislike();''>thumb_down</i>
                                    <i class='waves-effect waves-yellow btn right material-icons' onclick='like();''>thumb_up</i>
                                </div>
                                <div class='divider'></div>
                                <p>¿Te gustó este lugar?</p>
                                <section class='padding-buttons col s12'>
                                <a class= 'waves-effect waves-light btn-small btn col s12 l4'><i class= 'material-icons left '>create</i>Editar</a><a class='waves-effect waves-light btn-small red btn-delete col s12 l4 offset-l2' data-message = '${key}'><i class='material-icons left'>delete</i>Borrar</a>
                                </section>
                                <div class='divider'></div>
                                <!--Desplegable para comentarios del post-->
                                <ul class='collapsible'>
                                    <li>
                                        <div class='collapsible-header'>
                                            <i class='material-icons'>chat</i>Opinar sobre este lugar</div>
                                        <div class='collapsible-body'>
                                            <span>
                                                <input placeholder='Escribe tu opinión...''>
                                                <a class="waves-effect waves-light btn right">
                                                    <i class="material-icons right">rate_review</i>Enviar</a>
                                            </span>
                                            <div class='divider'></div>
                                            <span>
                                                <i class='material-icons'>chat_bubble_outline</i>
                                                <p>
                                                    comentario: Me gustó mucho...
                                                </p>
                                            </span>
                                            <div class='divider'></div>
                                            <span>
                                                <i class='material-icons'>chat_bubble_outline</i>
                                                <p>
                                                    comentario: Me gustó mucho...
                                                </p>
                                            </span>
                                            <div class='divider'></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>`;
      }

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
  let formRecipe = document.getElementById('form-recipe');
  let formPlaces = document.getElementById('form-places');
  let user = firebase.auth().currentUser;
  let title = document.getElementById('input_text');
  // let image = document.getElementById('fileImage');
  let people = document.getElementById('count');
  let ingredients = document.getElementById('get-ingredients');
  let steps = document.getElementById('textarea2');
    let typePost = 'Receta';
  // Post Images

  let refImages = firebase.storage().ref();
  let imageup = image.files[0];
  let uploadImages = refImages.child('images/'+ imageup.name).put(imageup);
  uploadImages.on('state_changed', snapshot => {


  }, error =>{
    alert('No se cargo debidamente la imagen');
  },  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    uploadImages.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      firebase.database().ref('user/posts').push({
        ui: user.uid,
        name: user.displayName,
        photo: user.photoURL,
        images: downloadURL,
        type: 'Receta',
        title: title.value,
        people: people.value,
        ingredients: ingredients.value,
        steps: steps.value,
        like: 0
      });
    });


  });



  // modified by Francis
  title.value = '';
  people.value = '';
  ingredients.value = '';
  steps.value = '';
  formRecipe.style.display = 'none';
  formPlaces.style.display = 'none';
} ;

// Post formPlaces

const postsPlaces = () => {
  let formRecipe = document.getElementById('form-recipe');
  let formPlaces = document.getElementById('form-places');
  let user = firebase.auth().currentUser;
  let title = document.getElementById('input_places');
  // let image = document.getElementById('fileImage');
  let address = document.getElementById('input_address');
  let city = document.getElementById('input_city');
  let genial = document.getElementById('input_description');
  let typePost = 'Lugar';

  post.innerHTML = `<div class= 'col s12 m12 l12'>
      <div class = 'card'>
      <section class='card-image'>
      <a class='btn-floating right waves-effect waves-light red'>
      <i class='material-icons'>${typePost}</i>
      </a>
      <img src='../images/laSazonTlalpn.jpg'>
      <span class='card-title'>
        <h4 class='white-text'>${title}</h4>
        <a class="btn-floating halfway-fab waves-effect waves-light gray">
        <i class="material-icons grey">favorite</i>
        </a>
      </span>
      </section>
          <div class='card-content'>
              <h4>Ubicación</h4>
              <p>${address.value}</p>
              <h4>Descripción</h4>
              <p>${genial}</p>
              <h4>Ranking</h4>
              <div id="ranking">
                  <div id="bar">
                      <div id="likes"> </div>
                      <div id="dislikes"> </div>
                  </div>
              </div>
              <div class='divider'></div>
              <div id='ranking-buttons'>
                  <i class ='waves-effect waves-red btn right material-icons' onclick='dislike();'>thumb_down</i>
                  <i class = 'waves-effect waves-yellow btn right material-icons' onclick='like();'>thumb_up</i>
              </div>
              <div class='divider'></div>
              <p>¿Te gustó este lugar?</p>
              <div class='divider'></div>
              <!--Desplegable para comentarios del post-->
              <ul class='collapsible'>
                  <li>
                      <div class='collapsible-header'>
                          <i class='material-icons'>chat</i>Opinar sobre este lugar</div>
                      <div class='collapsible-body'>
                          <span>
                              <input placeholder='Escribe tu opinión...'>
                              <a class='waves-effect waves-light btn right'>
                                  <i class='material-icons right'>rate_review</i>Enviar</a>
                          </span>
                          <div class='divider'></div>
                          <span>
                              <i class='material-icons'>chat_bubble_outline</i>
                              <p>
                                  comentario: Me gustó mucho...
                              </p>
                          </span>
                          <div class='divider'></div>
                          <span>
                              <i class='material-icons'>chat_bubble_outline</i>
                              <p>
                                  comentario: Me gustó mucho...
                              </p>
                          </span>`;
                          firebase.database().ref('user/posts').push({
                            ui: user.uid,
                            name: user.displayName,
                            photo: user.photoURL,
                            type: 'Lugar',
                            title: title.value,
                            address: address.value,
                            city: city.value,
                            genial: genial.value,
                            like: 0
                          });

                          // modified by Francis
                          title.value = '';
                          address.value = '';
                          city.value = '';
                          genial.value = '';
                          formRecipe.style.display = 'none';
                          formPlaces.style.display = 'none';
};

// Post button
let btnpost = document.getElementById('btnpost');
let btnplace = document.getElementById('btnplace');

btnpost.addEventListener('click', postsRecipe);
btnplace.addEventListener('click', postsPlaces);
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
  formRecipe.style.display = 'none';
  formPlaces.style.display = 'block';
});

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
