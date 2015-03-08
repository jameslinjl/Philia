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
    },

    updateActiveUser: function(userID, groupName, activityType, trueFalse ) {
      var ref = usersRef.child(userID);
      var user = $firebase(ref).$asObject();
      user[groupName][activityType] = trueFalse;
      user.$save();
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
    // temporary, get rid of this later
    // getGroupById: function(groupId) {
    //   var ref = groupRef.child(groupId).child('subgroups');
    //   return $firebase(ref).$asArray();
    // },
    getUserByType: function(groupId, listType) {
      var ref = groupRef.child(groupId).child(listType);
      return $firebase(ref).$asArray();
    },
    addUserToGroup: function(userID, groupName, listType) {
      var ref = groupRef.child(groupName).child(listType);
      var group = $firebase(ref).$asArray();

      if (group.$getRecord(userID) === null ) {
        group.$push(userID);
      }
    },
    removeUserFromGroup: function(userID, groupName, listType) {
      var ref = groupRef.child(groupName).child(listType);
      var group = $firebase(ref).$asArray();

      if (group.$getRecord(userID) !== null ) {
        group.$remove(userID);
      }
    }
  //   put: function()
  //   // getAllForUser: function(userID) {
  //   //   return $firebase(usersRef.child(userID).child('communities')).$asArray();
  //   // }
  // };

  };
});



