// Ejecuta tu test 
describe('Inicio Sesión', () => {
  it('nertwork debería ser un objeto global.', () => {
    assert.isObject(network);
  });

  it('Debería contener una función loginGoogle, para logear al usuario mediante Google, en el objeto global network.', () => {      
    assert.isFunction(network.loginGoogle);
  });

  it('Debería contener una función loginFacebook, para logear al usuario mediante Facebook, en el objeto global network.', () => {
    assert.isFunction(network.loginFacebook);
  });

  it('Debería no dejar que un usuario se registre con el mismo correo.', () => {});
  it('Debería guardar datos de usuario en DataBase.', () => {});
  it('Debería registrar usuarios nuevos a partir de un nombre, correo y contraseña.', () => {});
});

describe('Perfil', () => {
  it('Deberia mostrar datos de Usuario.', () => {});
  it('Deberia dejar que edite su perfil de usuario.', () => {});
  it('Deberia no dejar a usuario ingresar codigo en About me.', () => {});
  it('Deberia mostrar sus recetas favoritas.', () => {});
  it('Deberia mostrar sus lugares favoritas.', () => {});
});


describe('Post', () => {
  it('Debería mostrar datos de Usuario.', () => {});
  it('Debería dejar al usuario postear una entrada.', () => {});
  it('Debería no dejar al usuario ingresar codigo.', () => {});
  it('Debería dejar al usuario edita su entrada.', () => {});
  it('Debería dejar al usuario borrar su entrada.', () => {});
  it('Debería no dejar al usuario editar la entrada de alguien más.', () => {});
  describe('Filtros de lugares y recetas en el muro.', () => {
    it('Debería hacer un filtro que solo te muestre los comentarios tipo "Recetas".', () => {});
    it('Debería hacer un filtro que solo te muestre los comentarios tipo "Lugar".', () => {});
  });
});

