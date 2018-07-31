// side navbar iniatization with JQuery
$(document).ready(function () {
  $('.sidenav').sidenav();
});
// end of the navbar activation


// *********************************************** */
// Aqui empezo a codear Mir.

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
  const btnSave = document.getElementById('btn-save');
  const btnCancel = document.getElementById('btn-cancel');
  btnSave.addEventListener('click', saveNewAboutMe);
  btnCancel.addEventListener('click', cancelNewAboutMe);
  btnEditPerfil.style.display = 'none';
};
btnEditPerfil.addEventListener('click', editAboutMe);

// // Función del boton salvar el nuevo perfil
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
