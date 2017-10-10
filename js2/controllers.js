'use strict';
angular.module('paginaPrincipal', []).controller('unicoCtrl',['$scope','$http',function($scope,$http) {$scope.horario="hola";
 $scope.congiguracion=[];

 $http.get('http://54.202.62.62:1346/contacto').success(function(respuesta){
 		$scope.contacto = respuesta.results[0];
        $scope.direccion=$scope.contacto.direccion;
        $scope.telefono1=$scope.contacto.telefono1;
        $scope.telefono2=$scope.contacto.telefono2;
        $scope.instagram=$scope.contacto.instagram;
        $scope.facebook=$scope.contacto.facebook;
        $scope.twitter=$scope.contacto.twitter;
        $scope.telefonoMovil=$scope.contacto.telefonoMovil;
        $scope.contactoLineal=$scope.contacto.contactoLineal;
        $scope.emailContacto=$scope.contacto.emailContacto;
        });
//  $http.get('http://54.202.62.62:1346/electoral').success(function(respuesta){
//  		$scope.electoral = respuesta.results;
//       });
// $http.get('http://54.202.62.62:1346/directiva').success(function(respuesta){
//  		$scope.directiva = respuesta.results;
//       });
// $http.get('http://54.202.62.62:1346/comite').success(function(respuesta){
//  		$scope.comite = respuesta.results;
//       });
// $http.get('http://54.202.62.62:1346/deporte').success(function(respuesta){
//  		$scope.deporte = respuesta.results;
//       });
 


}]);