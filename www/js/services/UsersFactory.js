(function () { 'use strict';
  var services = angular.module('app.services');

  services.factory('UsersFactory', function($firebaseObject, GroupsFactory) {

    var usersRef = new Firebase('https://fiery-fire-2843.firebaseio.com/users');
    return {
      post: post, 
      get: get,
      getActivityTypes: getActivityTypes
    };


    function post(username, description) {
      console.log('Users.post called');
        var newUserRef = usersRef.$add({username: username, description: description});
      }

     function get(userID, authData) {
        var ref = usersRef.child(userID);
        var user = $firebaseObject(ref);
        user.$loaded().then(function(data) {
          if(data.uid === undefined) {
            put(authData);
            GroupsFactory.addGroupsToUser(authData.facebook.id, authData.facebook.displayName);
          }
        });

        return user;
      }

       function put(authData) {
        var ref = usersRef.child(authData.facebook.id);
        var user = $firebaseObject(ref);
        user.description = 'Hey! I\'m a new user!';
        user.uid = authData.facebook.id;
        user.name = authData.facebook.displayName;
        user.image = authData.facebook.cachedUserProfile.picture.data.url;
        user['groups'] = {'CFA' : {'Coffee' : false, 'Running' : false, 'Study' : false},
                          'Columbia' : {'Coffee' : false, 'Running' : false, 'Study' : false},
                          'AppNexus' : {'Coffee' : false, 'Running' : false, 'Study' : false}};
        user.$save();
      }

      function getActivityTypes(userID, groupName) {
        var ref = usersRef.child(userID).child('groups').child(groupName);
        var stuff =  $firebaseObject(ref);
        return stuff;
      }
  });
})();
