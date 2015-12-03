var mol = require('./moleculeAPI.js');
var usr = require('./usersAPI.js');

mol.getMolecule(6, function(callback) {
	console.log(callback[0]);
});

usr.getUser('jcalabro', function(callback) {
	console.log(callback[0]);
});

console.log('Done');