// Configura tus test para usarlos
global.window = global;
global.assert = require('chai').assert;
require('../src/data');
require('../src/drawnProfiles.js');
require('../src/posts.js');
require('./data.spec.js');