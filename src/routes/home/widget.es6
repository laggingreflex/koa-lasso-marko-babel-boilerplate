var socket = io.connect();

import { defineWidget } from 'marko-widgets';
module.exports = defineWidget({
  onClick: () => {
    console.log('emiting data...');
    socket.emit('data');
  }
});

import angular from 'angular';
var app = angular.module('app', []);
app.controller('app', $scope => {
  console.log('Angular controller initialized');
  socket.on('data', function(data) {
    console.log('received data:', data);
    $scope.data = data;
    $scope.$apply();
  });
});
angular.bootstrap(document, ['app']);
