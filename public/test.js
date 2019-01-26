// index.js
angular.module('angularApp', [])
  .controller('indexCtrl', function($scope, $http) {

   $scope.product = '';
   $scope.num1 = 2;
   $scope.num2 = 3;
   // $scope.formData = {
   // 		num1: $scope.num1,
   // 		num2 : $scope.num2	
   // }
   	console.log($scope)
   	$scope.multiply = function () {
   		console.log("triggered multiply")
	    $http({
	        url: '/product',
	        method: "POST",
	    	headers : { 'Content-Type': 'application/json' },
	    	data:{
					"data": {
						"num1": $scope.num1,
						"num2": $scope.num2
					}
				}
	    })
	    .then(function successCallback(successResponse) {
	            // success
		        $scope.product = successResponse.data.product
	    	}, 
		    function errorCallback(failedResponse) { // optional
		            console.log(failedResponse);
		    });

	}

	$scope.grabProduct = function(){

		console.log("triggered grabProduct")
	    $http({
	        url: '/times2',
	        method: "POST",
	    	headers : { 'Content-Type': 'application/json' },
	    	data:{
	    			"num1":$scope.num1
				}
	    })
	    .then(function successCallback(successResponse) {
	            // success
		        $scope.product = successResponse.data.product
	    	}, 
		    function errorCallback(failedResponse) { // optional
		            console.log(failedResponse);
		    });
		
	}
   

  })