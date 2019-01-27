// index.js
angular.module('angularApp', [])
  .controller('indexCtrl', function($scope, $http) {

  	var socket = io();
   
   	$scope.lowestCount = '';
   	$scope.currCount = '';

   	angular.element(document).ready(function(){

  		socket.on('opponentSolve', function(msg){
  			$scope.lowestCount = msg.lowestCount;
  			$scope.leadingUser = msg.user.name;
  			console.log("lowest count stored:" + msg.lowestCount)
			$scope.$apply();
  		});
  		
  	});   	
   	// $scope.getLowestCount = function(){
   		
   	// 	$http({
	   //      url: '/getLowestCount',
	   //      method: "GET",
	   //  	headers : { 'Content-Type': 'application/json' },
	    
	   //  })
	   //  .then(function successCallback(successResponse) {
	   //          // success
	   //          console.log(successResponse.data.lowestCount)
		  //       // $scope.product = successResponse.data.product
		  //       // $scope.publish(successResponse.data.product);
		  //       $scope.lowestCount = successResponse.data.lowestCount;
	   //  	}, 
		  //   function errorCallback(failedResponse) { // optional
		  //           console.log(failedResponse);
		  //   });

   	// }

  })

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    var fiveMinutes = 60 * 5,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};


// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


   