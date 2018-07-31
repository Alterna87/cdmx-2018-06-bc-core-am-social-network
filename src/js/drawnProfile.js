
// side navbar iniatization with JQuery
$(document).ready(function() {
  $('.sidenav').sidenav();
});

// activation of side down panel display
$(document).ready(function() {
  $('#flip').click(function() {
    $('#panel').slideToggle('slow');
  });
});

// activation of collapsible and expanded accordion for coments and opinions
$(document).ready(function() {
  $('.collapsible').collapsible();
});

// actication of collapsible add buttons to show the format for places, photos and recipes
$(document).ready(function() {
  $('add-photo').click(function() {
    $('photo-format').slideToggle('slow');
  });
});

$(document).ready(function() {
  $('add-place').click(function() {
    $('place-format').slideToggle('slow');
  });
});

$(document).ready(function() {
  $('add-recipe').click(function() {
    $('recipe-format').slideToggle('slow');
  });
});

// like and dislike bar functions
let likes = 0;
let dislikes = 0;

// document.getElementById('dislike').addEventListener('click', dislike);
// document.getElementById('like').addEventListener('click', like);

const like = () => {
  likes++;
  calculateBar();
};

const dislike = () => {
  dislikes++;
  calculateBar();
};

const calculateBar = () => {
  let total = likes + dislikes;
  let totalLikesAverage = (likes / total) * 100;
  let totalDisLikesAverage = (dislikes / total) * 100;
  document.getElementById('likes').style.width =
    totalLikesAverage.toString() + '%';
  document.getElementById('dislikes').style.width =
    totalDisLikesAverage.toString() + '%';
};

// ******************************************************/
// Aqui codear mir

// llamdo del DOM
const btnEditPerfil = document.getElementById('btn-edit');
let editDescription = document.getElementById('perfil');
let databaseRef;
// let userDescription;
let userDescriptionFb;

// Función para retomar id de usuario
const dbaseRef = (user) => {
  databaseRef = firebase.database().ref(`perfil/${user.uid}`);
  databaseRef.on('value', (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    if (data) {
      getPerfilFirebase();
    } else {
      userDescriptionFb = 'Usuario sin About Me';
      sendPerfilFirebase(databaseRef, userDescriptionFb);
    }
  });
};

// funcion para agregar about me en firebase
const sendPerfilFirebase = (databaseRef, userDescriptionFb) => {
  databaseRef.set({
    AboutMe: userDescriptionFb,
  });
  getPerfilFirebase();
};

// Función para leer perfil de firabase
const getPerfilFirebase = () => {
  databaseRef.on('value', (snapshot) => {
    const data = snapshot.val();
    for (var key in data) {
      userDescriptionFb = data[key];
    }
    perfilLogin(userDescriptionFb);
  });
};

// Función para rellenar perfil de usuario
const perfilLogin = (userDescriptionFb) => {
  editDescription.innerHTML = userDescriptionFb;
};


// Función del boton editar perfil
const editAboutMe = () => {
  editDescription.innerHTML = `
    <p id = descrition-original>${userDescriptionFb}</p>
    <input id = "n-descripcion" type = "text" class = "validate">
    <label for = "descripcion"></label>
    <a id = "btn-save" href = "#">
      <i class = "material-icons ">done</i>
    </a>
    <a id = "btn-cancel" href = "#">
    <i class = "material-icons">cancel</i>
    </a>
  `;
  // Cambios
  const btnSave = document.getElementById('btn-save');
  const btnCancel = document.getElementById('btn-cancel');
  btnSave.addEventListener('click', saveNewAboutMe);
  btnCancel.addEventListener('click', cancelNewAboutMe);
  btnEditPerfil.style.display = 'none';
};

// ******************************************************/
// Aqui codear mir
btnEditPerfil.addEventListener('click', editAboutMe);

// Función del boton salvar el nuevo perfil
const saveNewAboutMe = () => {
  let newDescription = document.getElementById('n-descripcion').value;
  // Validando que no se admitan etiquetas html
  for (let i = 0; i < newDescription.length; i++) {
    let letterDescrip = newDescription[i].charCodeAt();
    if (letterDescrip === 60 || letterDescrip === 62) {
      swal('Ooops,no puedes usar los signos "<" ">"');
      btnEditPerfil.style.display = 'block';
      return perfilLogin(userDescriptionFb);
    }
  };
  sendPerfilFirebase(databaseRef, newDescription);

  btnEditPerfil.style.display = 'block';
};

const cancelNewAboutMe = () => {
  perfilLogin(userDescriptionFb);
  btnEditPerfil.style.display = 'block';
};
// ******************************************************/
// Aqui dejo de codear mir
