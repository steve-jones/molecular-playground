var mol = require('./moleculeAPI.js');
var usr = require('./usersAPI.js');

mol.createMolecule(3, 'Sample Molecule', '/path/to/file/243', false);
mol.setApprovalStatus(11, true);

console.log('Done');