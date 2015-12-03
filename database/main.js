var mol = require('./moleculeAPI.js');
var usr = require('./usersAPI.js');

mol.getMolecule(12, function(molData) { console.log(molData); });

console.log('Done');