(function () {
  'use strict';
  var controllers = angular.module('app.controllers');

  controllers.controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthFactory, CurrentUser) {
    console.log('loaded');

    $scope.loggedIn = false;


    $scope.login= function() {

      console.log(AuthFactory.login());

      AuthFactory.login().then(function(data) {
        console.log('hi');
        console.log(CurrentUser.user);
        $state.go('home.groups');
      })
      .catch(function(error) {
        console.log(error);
        var alertPopup = $ionicPopup.alert({
          title: 'Login Failed!',
          template: 'Please check your credentials and try again'
        });

      })
      ;
    };

  });
})();


