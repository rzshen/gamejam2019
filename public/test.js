// index.js
angular.module('angularApp', [])
  .controller('testCtrl', function($scope, $http) {

   $scope.product = '';
   $scope.num1 = 2;
   $scope.num2 = 3;
   // $scope.formData = {
   // 		num1: $scope.num1,
   // 		num2 : $scope.num2	
   // }


  	angular.element(document).ready(function(){

  		socket.on('product', function(msg){
      		$scope.product = msg;
      		$scope.$apply();
  		});
  	});   	

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
	            // console.log(successResponse.data.product)
		        $scope.product = successResponse.data.product
	    	}, 
		    function errorCallback(failedResponse) { // optional
		            console.log(failedResponse);
		    });

	}

	$scope.multiplyNum1ByTwo = function(){

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


	$scope.get = function(){

		console.log("triggered grabProduct")
	    $http({
	        url: '/times2',
	        method: "GET",
	    	headers : { 'Content-Type': 'application/json' },
	    
	    })
	    .then(function successCallback(successResponse) {
	            // success
	            console.log(successResponse.data.product)
		        $scope.product = successResponse.data.product
		        $scope.publish(successResponse.data.product);
	    	}, 
		    function errorCallback(failedResponse) { // optional
		            console.log(failedResponse);
		    });
		
	}

	$scope.productForAll = function(){
		socket.emit('product', $scope.product)}

  })