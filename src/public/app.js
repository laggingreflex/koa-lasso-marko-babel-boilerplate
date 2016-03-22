var socket = io.connect();
var app = angular.module('app', []);
app.controller('app', controller);

function controller($scope) {
  console.log('Angular controller initialized');
  $scope.loadData = function() {
    socket.emit('data');
  };
  socket.on('data', function(data){
    console.log(data);
    $scope.data = data;
    $scope.$apply();
  });
}
