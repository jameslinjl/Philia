'use strict';

angular.module('app.services', [])
.factory('Users', function($firebase) {

  var usersRef = new Firebase('https://fiery-fire-2843.firebaseio.com/users');
  return {
    // all: function() {
    //   console.log('Users.all called');
    //   return $firebase(usersRef).$asObject();
    // },
    post: function(username, description) {
      console.log('Users.post called');
      var newUserRef = usersRef.push({username: username, description: description});
    },
    get: function(userID) {
      console.log(userID);
      console.log('Users.get called');
      var ref = usersRef.child(userID);
      return $firebase(ref).$asObject();
    }
  };
})

.factory('Groups', function($firebase) {
  var groupRef = new Firebase('https://fiery-fire-2843.firebaseio.com/groups');
  // var usersRef = new Firebase('https://fiery-fire-2843.firebaseio.com/users');
  return {
    all: function() {
      return $firebase(groupRef).$asObject();
    },
    post: function(group) {
      groupRef.push(group);
    },
    getUserByType: function(groupId, listType) {
      var ref = groupRef.child(groupId).child(listType);
      return $firebase(ref).$asArray();
    },
  //   put: function()
  //   // getAllForUser: function(userID) {
  //   //   return $firebase(usersRef.child(userID).child('communities')).$asArray();
  //   // }
  // };
}});



