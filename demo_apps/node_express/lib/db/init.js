var m = require('./')

console.log("Loading courses from .csv");

m.populateCoursesAndPrereqs(function(err, data) {
	if(err) {
		console.log("ERROR Database not initialized: " + err);
	}
	else {
		console.log("Database successfully initialized");
	}
});

m.populateStudents(function(err, data) {
	if(err) {
		console.log("ERROR Users not initialized: " + err);
	}
	else {
		console.log("Users successfully initialized");
	}
}); 