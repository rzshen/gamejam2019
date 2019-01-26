// index.js
angular.module('angularApp', [])

.controller('indexCtrl', function($scope) {
	
   // Initialize variables
   $scope.name1 = '';
   $scope.name2 = '';
   $scope.greeting1 = `Hello ${$scope.name1}`;
   $scope.greeting2 = `Hi ${$scope.name2}`;

})