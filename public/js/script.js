// index.js
// angular.module('angularApp', [])
//   .controller('indexCtrl', function($scope, $http) {

//    $scope.product = '';
//    $scope.num1 = 2;
//    $scope.num2 = 3;
//    // $scope.formData = {
//    //     num1: $scope.num1,
//    //     num2 : $scope.num2  
//    // }
   
//     $scope.multiply = function () {
//       console.log("triggered multiply")
//       $http({
//           url: '/',
//           method: "POST",
//         headers : { 'Content-Type': 'application/json' },
//         data:{
//           "data": {
//             "num1": $scope.num1,
//             "num2": $scope.num2
//           }
//         }
//       })
//       .then(function successCallback(successResponse) {
//               // success
//             $scope.product = successResponse.data.product
//         }, 
//         function errorCallback(failedResponse) { // optional
//                 console.log(failedResponse);
//         });

//   }

//   $scope.grabProduct = function(){

//     console.log("triggered grabProduct")
//       $http({
//           url: '/product',
//           method: "POST",
//         headers : { 'Content-Type': 'application/json' },
//         data:{
//       }
//       })
//       .then(function successCallback(successResponse) {
//               // success
//             $scope.numberPlayer = successResponse.data.product
//         }, 
//         function errorCallback(failedResponse) { // optional
//                 console.log(failedResponse);
//         });
    
//   }
   

//   })


  function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds; 

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
        }
    };
    // we don't want to wait a full second before the timer starts
    timer();
    setInterval(timer, 1000);
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
   