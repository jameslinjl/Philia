var count = 0;

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $firebase) {
  var ref = new Firebase("https://fiery-fire-2843.firebaseio.com/users");
  var sync = $firebase(ref);

  $scope.users = sync.$asArray();

  $scope.addUser = function(username, description) {
    $scope.users.$add({username: username, description: description, userID: count});
    count++;
  }

})

// .controller('ChatsCtrl', function($scope, Chats) {
//   $scope.chats = Chats.all();
//   $scope.remove = function(chat) {
//     Chats.remove(chat);
//   }
// })

// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })

.controller('FriendsCtrl', function($scope, $firebase) {
  var ref = new Firebase("https://fiery-fire-2843.firebaseio.com/users");
  var sync = $firebase(ref);

  $scope.users = sync.$asArray();
})

.controller('FriendDetailCtrl', function($scope, $firebase, $stateParams) {

  var ref = new Firebase("https://fiery-fire-2843.firebaseio.com/users");
  var userList = $firebase(ref).$asArray();

  userList.$loaded().then(function(userList) {
    $scope.user = userList[$stateParams.userID];
  });
});

// .controller('AccountCtrl', function($scope) {
//   $scope.settings = {
//     enableFriends: true
//   };
// });
