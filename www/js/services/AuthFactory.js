(function () {
  'use strict';
  var services = angular.module('app.services');

  services.factory('AuthFactory', function($q, $firebaseAuth, CurrentUser, UsersFactory) {//, $cordovaOauth) {

    // the main firebase reference
    var authRef = new Firebase('https://fiery-fire-2843.firebaseio.com/auth');
    var authObj = $firebaseAuth(authRef);
    return {
      getAuthObj: function() {
        return $firebaseAuth(authRef);
      },
      login: function() {
        var d = $q.defer();

        authObj.$authWithOAuthPopup('facebook')
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
            d.reject();
          });


        return d.promise;

        // function isAuthenticated() {
        //   var d = $q.defer();

        //   $http.get(baseURL + 'session')
        //     .success(success)
        //     .error(error);

        //   function success(data) {
        //     var isLoggedIn = data.data.user_id !== null;
        //     CurrentService.loggedIn = isLoggedIn;
        //     d.resolve(isLoggedIn);
        //     $broadcast('user:updated');
        //     console.log('broadcast');
        //   }

        //   function error() {
        //     logger.warn('Can not make call to authentication server');
        //     d.reject();
        //   }

        //   return d.promise;
        // }


            // return authObj.$authWithOAuthPopup('facebook')
            //   .then(function(authData) {
            //     console.log(authData);
            //     var userId = authData.facebook.id;
            //     console.log(userId);
            //     var user = UsersFactory.get(userId);
            //     CurrentUser.user = user;
            //     CurrentUser.uid = userId;
            //     CurrentUser.loggedIn = true;
            //     CurrentUser.user.image = authData.facebook.cachedUserProfile.picture.data.url;
            //     return authData;
            // }).catch(function(error) {
            //   console.error('Authentication failed:', error);
            // });

      }

    };
  });
})();