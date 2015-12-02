var app = angular.module('nomade', [
  'jcs-autoValidate'
]);

app.controller('nomadeCtrl', function($scope, $http) {
  $scope.formModel = {};
  $scope.enviando = false;

  $scope.onSubmit = function() {
    console.log("formulario enviado");
    console.log($scope.formModel);
    $scope.enviando = true;

    $http.post('https://sheetsu.com/apis/d12adf03', $scope.formModel).
      success(function (data) {
        console.log('registrado com sucesso');
        $scope.enviando = false;
      }).error(function (data) {
        console.log('houve uma falha no registro');
        $scope.enviando = false;
      })
  };

});
