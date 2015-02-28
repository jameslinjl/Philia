var count = 0;

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Users) {
  $scope.addUser = function(username, description) {
    Users.post(username, description);
  };
})

.controller('FriendsCtrl', function($scope, $firebase, Users) {
  var refAsObject = Users.all();
  refAsObject.$bindTo($scope, 'users');
})

.controller('FriendDetailCtrl', function($scope, $firebase, $stateParams, Users) {
  var user_id = $stateParams.userID;  
  var userRef = Users.get(user_id);
  userRef.$bindTo($scope, 'user');
});

// .controller('ChatsCtrl', function($scope, Chats) {
//   $scope.chats = Chats.all();
//   $scope.remove = function(chat) {
//     Chats.remove(chat);
//   }
// })

// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })





// .controller('AccountCtrl', function($scope) {
//   $scope.settings = {
//     enableFriends: true
//   };
// });
