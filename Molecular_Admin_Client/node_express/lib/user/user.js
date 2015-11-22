// # User Library for online list

var online = [];

exports.addonline = function(username) {
  var len = online.length;
  online[len] = username;

}
exports.checkonline = function(username) {
	if(username === undefined){
		return undefined;
	}
  	var existed = false;
      for(var id in online){
        if (online[id] === username){
          existed = true;
		return username;
        }
      }
	return undefined;
}
exports.deleteonline = function(username) {
	if(username === undefined){
		return undefined;
	}
      for(var id in online){
        if (online[id] === username){
          delete online[id];
	  return "deleted";
        }
      }
	return undefined;
}


exports.useronline = function(username, cb) {
  var len = online.length;
  for (var i = 0; i < len; i++) {
    
    if ( online[i] === username) {
        cb(undefined, username);
      return;
    }
  }
  cb('user not online');
}


exports.onlinelist = function(cb){

    cb(online);
}

exports.adminlist = function(cb){
  var adminlist= {};
  var id = 0;
  //fix later
    cb(adminlist);
}
