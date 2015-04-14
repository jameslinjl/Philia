(function () { 'use strict';
  var services = angular.module('app.services');

  services.factory('UsersFactory', function($firebaseObject) {

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
        var ref = usersRef.child(userID);
        return $firebaseObject(ref);
      },

      // updateActiveUser: function(userID, groupName, activityType, trueFalse ) {
      //   var ref = usersRef.child(userID).child('groups').child(groupName).child(activityType);
      //   var activity = $firebaseObject(ref);
      //   console.log(activity);
      //   activity.$value = trueFalse;
      //   activity.$save();
      // },

      getActivityTypes: function(userID, groupName) {
        var ref = usersRef.child(userID).child('groups').child(groupName);
        var stuff =  $firebaseObject(ref);
        return stuff;
      }

    };
  });
})();
