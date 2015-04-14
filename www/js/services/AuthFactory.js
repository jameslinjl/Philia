(function () {
  'use strict';
  var services = angular.module('app.services');

  services.factory('AuthFactory', function($firebaseAuth, CurrentUser, UsersFactory) {//, $cordovaOauth) {

    // the main firebase reference
    var authRef = new Firebase('https://fiery-fire-2843.firebaseio.com/auth');
    var authObj = $firebaseAuth(authRef);
    return {
      getAuthObj: function() {
        return $firebaseAuth(authRef);
      },
      login: function() {
            return authObj.$authWithOAuthPopup('facebook')
              .then(function(authData) {
                console.log(authData);
                var userId = authData.facebook.id;
                console.log(userId);
                var user = UsersFactory.get(userId);
                CurrentUser.user = user;
                CurrentUser.uid = userId;
                return authData;
            }).catch(function(error) {
              console.error('Authentication failed:', error);
            });

      }

    };
  });
})();