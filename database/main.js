var mol = require('./moleculeAPI.js');
var usr = require('./usersAPI.js');

mol.createMolecule(3, 'Sample Molecule', '/path/to/asdfasss/243', false, function(molID) {
	console.log(molID);
});

mol.setApprovalStatus(11, true);

console.log('Done');