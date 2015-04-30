(function () {
  'use strict';
  var services = angular.module('app.services');

  services.factory('GroupsFactory', function($firebaseObject, _, $timeout, $firebaseUtils) {
    var groupRef = new Firebase('https://fiery-fire-2843.firebaseio.com/groups');

    return {
      all: function() {
        return $firebaseObject(groupRef);
      },
      post: function(group) {
        groupRef.$add(group);
      },

      getUserByTypes: function(groupId, listType) {
        var ref = groupRef.child(groupId).child(listType);
        console.log(ref);
        return $firebaseObject(ref);
      },

      getMembersOfGroup: function(groupID) {
        return $firebaseObject(groupRef.child(groupID));
      },
      updateActiveGroup: function(userID, groupName, activityType, trueFalse) {
        var ref = groupRef.child(groupName).child(userID).child(activityType); //Columbia
        var activity = $firebaseObject(ref);

        activity.$value = trueFalse;
        activity.$save();
      }
    };
  });

})();