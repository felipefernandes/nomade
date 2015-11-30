var app = angular.module('nomade', []);

app.controller('nomadeCtrl', function($scope, $http) {
  $scope.formModel = {};


  $scope.onSubmit = function() {
    console.log("formulario enviado");
    console.log($scope.formModel);

    $http.post('https://sheetsu.com/apis/d12adf03', $scope.formModel).
      success(function (data) {
        console.log('registrado com sucesso');
      }).error(function (data) {
        console.log('houve uma falha no registro');
      })


  };

});
