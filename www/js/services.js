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
      var newUserRef = usersRef.$add({username: username, description: description});
    },
    get: function(userID) {
      console.log(userID);
      console.log('Users.get called');
      var ref = usersRef.child(userID);
      return $firebase(ref).$asObject();
    },

    updateActiveUser: function(userID, groupName, activityType, trueFalse ) {
      console.log(activityType);
      console.log(trueFalse);
      var ref = usersRef.child(userID).child('groups').child(groupName).child(activityType);
      var activity = $firebase(ref).$asObject();
      console.log(activity);
      activity.$value = trueFalse;
      activity.$save();
    },

    getActivityTypes: function(userID, groupName) {
      var ref = usersRef.child(userID).child('groups').child(groupName);
      var stuff =  $firebase(ref).$asObject();
      return stuff;
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
      groupRef.$add(group);
    },
    // temporary, get rid of this later
    // getGroupById: function(groupId) {
    //   var ref = groupRef.child(groupId).child('subgroups');
    //   return $firebase(ref).$asArray();
    // },
    getUserByType: function(groupId, listType) {
      var ref = groupRef.child(groupId).child(listType);
      console.log(ref);
      return $firebase(ref).$asObject();
    },

    updateActiveGroup: function(userID, groupName, activityType, trueFalse) {
      console.log(groupName);
      var ref = groupRef.child(groupName).child(activityType);
      var group = $firebase(ref).$asObject();
      console.log(group);
      console.log(group[userID]);


      console.log(userID);
      if (trueFalse && group[userID] === undefined ) {
        group[userID] = 1;
      }
      else if (!trueFalse && group[userID] !== undefined) {
        group[userID] = null;

      }

      group.$save();
    }


    // updateActiveGroup: function(userID, groupName, activityType, trueFalse) {
    //   console.log(groupName);
    //   var ref = groupRef.child(groupName).child(activityType);
    //   var group = $firebase(ref).$asArray();
    //   console.log(group);

    //   if (trueFalse && group.$getRecord(userID) === null ) {
    //       group.push(userID);
    //   }
    //   else if (!trueFalse && group.$getRecord(userID) !== null) {
    //     group.$remove(userID);

    //   }
    // }

    // addUserToGroup: function(userID, groupName, listType) {
    //   var ref = groupRef.child(groupName).child(listType);
    //   var group = $firebase(ref).$asArray();


    // },
    // removeUserFromGroup: function(userID, groupName, listType) {
    //   var ref = groupRef.child(groupName).child(listType);
    //   var group = $firebase(ref).$asArray();

    //   if (group.$getRecord(userID) !== null ) {
    //     group.$remove(userID);
    //   }
    // }
  //   put: function()
  //   // getAllForUser: function(userID) {
  //   //   return $firebase(usersRef.child(userID).child('communities')).$asArray();
  //   // }
  // };

  };
});



