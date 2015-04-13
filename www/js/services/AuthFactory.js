(function () {
  'use strict';
  var services = angular.module('app.services');

  services.factory('AuthFactory', function($firebaseAuth) {//, $cordovaOauth) {

    // the main firebase reference
    var authRef = new Firebase('https://fiery-fire-2843.firebaseio.com/auth');
    var uid;

    return {
      // return an authentication object to the controller
      getAuthObj: function() {
        return $firebaseAuth(authRef);
      },

      setUser: function(userId) {
        uid = userId;
        console.log(uid);
      },

      getUid: function() {
        return uid;
      },

      login: function(authObj) {

        // experimental ionic/cordova version

        // return $cordovaOauth.facebook('1604951066416652', ['email']).then(function(result) {
        //   authObj.$authWithOAuthToken('facebook', result.access_token).then(function(authData) {
        //     return authData;
        //     console.log(JSON.stringify(authData));
        //   }, function(error) {
        //         console.error("ERROR: " + error);
        //   });
        //   }, function(error) {
        //       console.log("ERROR: " + error);
        //   });



            // only browser version

            return authObj.$authWithOAuthPopup('facebook').then(function(authData) {
              return authData;
            }).catch(function(error) {
              console.error("Authentication failed:", error);
            });

      }

    };
  });







})();