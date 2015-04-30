(function () {
  'use strict';
  var services = angular.module('app.services');

  services.factory('AuthFactory', function($q, $firebaseAuth, CurrentUser, UsersFactory, $cordovaOauth) {//, $cordovaOauth) {

    // the main firebase reference
    var authRef = new Firebase('https://fiery-fire-2843.firebaseio.com/auth');
    return {
      login: login
    };

    function login(email) {
      var auth = $firebaseAuth(authRef);
      var d = $q.defer();

      var email = 'daniel.sadik@gmail.com';

      $cordovaOauth.facebook('1604951066416652', email)
        .then(function(result) {
          console.log(result);
          auth.$authWithOAuthToken('facebook', result.access_token)
          .then(function(authData) {
            var userID = authData.facebook.id;
            var user = UsersFactory.get(userID);
            CurrentUser.user = user;
            CurrentUser.uid = userID;
            CurrentUser.loggedIn = true;
            console.log(user);
            d.resolve(user);
          })
          .catch(function(error) {
            d.reject(error);
          });
        }).catch(function(error){
          d.reject(error);
        });
      return d.promise;
    }

  });
})();