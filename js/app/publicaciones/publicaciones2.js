'use strict';


app.controller('publicaciones2Ctrl', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', 'datepickerConfig', 'toaster', '$state',function($scope,$http, $filter,$modal, MyService,filterFilter, datepickerConfig,toaster,$state) {
   $scope.toaster = {
    title: 'Exito',
    type: 'success',
    text: 'Publicacion autorizada con exito',

    title2: 'Exito',
    type2: 'info',
    text2: 'Publicacion borrada con exito'   
  };
$scope.publicaciones = [];
    $scope.today = function() {
      $scope.fechaInicio = new Date();
    };
    // $scope.today();

    $scope.clear = function () {
      $scope.fechaFin = null;
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };
     $scope.open2 = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened2 = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      class: 'datepicker'
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = 'MM/dd/yyyy';
    // $scope.tbOptionsPendientes = {
    // filterText: ''};
    $scope.filter = '';
      $scope.tbOptionsPendientes = {
      bDestroy: true,
      pageLength: 150,
      data: []                                              
    };
    
    $scope.filter = '';
      $scope.tbOptions3 = {
      bDestroy: true,
      pageLength: 5,
      data: []                                        
    };

      $scope.tbOptionsAutorizadas= {
      bDestroy: true,
      pageLength: 150,
      data: []
                                                     
    };
   
 $scope.vigilante=MyService.data.contador;
    $scope.getPublicacion = function () {
      // alert("se ejecuta");
      $scope.publicaciones=null;
      // setTimeout(function() {
           $scope.vigilante=$scope.vigilante+1;
           MyService.data.contador=$scope.vigilante;
         $http.get('http://54.202.62.62:1346/publicacion/' ).success(function(respuesta){
      $scope.publicaciones = respuesta.results; 

        var bandera="";
        var bandera2="";
        $scope.publicacionesAutorizadas=[];
        $scope.publicas=[];
        $scope.privadas=[];
        $scope.pendientes=[];
        var date = new Date();
        var mes = date.getMonth();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var result = [];
        var result3 = [];
        var publicas = [];
        var privadas = [];
        var pendientes = [];
        $scope.fechaInicio=$filter('date')(new Date(firstDay),'dd/MM/yyyy');
        $scope.fechaFin=$filter('date')(new Date(lastDay),'dd/MM/yyyy');
        var conversations = $scope.publicaciones;
        var start_date =  Date.parse(firstDay);
        var end_date = Date.parse(lastDay);
        end_date=end_date+86400000;
        var identif=0;
        if ($scope.publicaciones && $scope.publicaciones.length > 0){
          for (var i=0;i < $scope.publicaciones.length;i++){
            var conversationDate1 =  $scope.publicaciones[i].createdAt;
            var conversationDate=Date.parse(conversationDate1);
              identif=$scope.publicaciones[i].id;  
            if (conversationDate ){
              if ( $scope.publicaciones[i].status == "activa"){
                result.push($scope.publicaciones[i]);
                }
             if ( $scope.publicaciones[i].status == "inactiva"){
              $scope.publicaciones[i].accion=" <button onclick=\"angular.element(this).scope().Aprobacion('" +identif +"')\"  class=\"btn btn-success btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Validar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                                  
                result3.push($scope.publicaciones[i]);
                }
            }
            $scope.publicacionesAutorizadas=result;
            $scope.publicacionesPendientes=result3;
          }
        }
        
        if ($scope.publicacionesAutorizadas){
        for (var i  = 0; i<$scope.publicacionesAutorizadas.length;i++){
          bandera = $scope.publicacionesAutorizadas[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.publicacionesAutorizadas[i].createdAtFormateada=bandera2;
          identif=$scope.publicacionesAutorizadas[i].id;  
   
          $scope.publicacionesAutorizadas[i].accion2="<button onclick=\"angular.element(this).scope().Borrado('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Borrar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
          }
        }
        if ($scope.publicacionesPendientes){
        for (var i  = 0; i<$scope.publicacionesPendientes.length;i++){
          bandera = $scope.publicacionesPendientes[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.publicacionesPendientes[i].createdAtFormateada=bandera2;
          identif=$scope.publicacionesPendientes[i].id; 
          $scope.publicacionesPendientes[i].accion="<button onclick=\"angular.element(this).scope().Aprobacion('" +identif +"')\"  class=\"btn btn-success btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Autorizar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
          $scope.publicacionesPendientes[i].accion2="<button onclick=\"angular.element(this).scope().Borrado('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Borrar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
          }
        }
   
        $scope.publicacionesAutorizadas=$scope.publicacionesAutorizadas.reverse();
        $scope.tbOptionsPendientes.data = $scope.publicacionesPendientes;
        $scope.tbOptionsPendientes.aaData = $scope.publicacionesPendientes;
        $scope.tbOptionsPendientes.aoColumns=[
          { mData: 'createdAtFormateada'},
          {mData:'titulo'},
          {mData:'accion'},
          {mData:'accion2'}


          ];

          $scope.tbOptionsAutorizadas.data = $scope.publicacionesAutorizadas;
          $scope.tbOptionsAutorizadas.aaData = $scope.publicacionesAutorizadas;
          $scope.tbOptionsAutorizadas.aoColumns=[
            { mData: 'createdAtFormateada'},
          {mData:'titulo'},
          {mData:'accion2'}
          ];
      });
 
// }, 100);
    };
    $scope.getPublicacion();

$scope.openBorrarPublicacion = function (item) {
    var item=[];
  var dato="";
  var datosCuenta="";
  var modalInstance = $modal.open({
    templateUrl: 'modalBorrarPublicacion.html',
    controller: 'ModalInstanceCtrl',
    size: 'lg',
    resolve: {

           dato: function  () {
            return item;
            // body...
          },
           datosCuenta: function  () {
            return datosCuenta;
            // body...
          },
          items: function () {
            return $scope.items;
          }
        }
      });
    modalInstance.result.then(function (selectedItem,timeout) {
      }, function () {
    });
     
  };



 $scope.openEdicionPublicacion = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
    MyService.data.idenPublicacion=item;
  var item=[];
  var dato="";
  var datosCuenta="";

    
      var modalInstance = $modal.open({
        templateUrl: 'modalEdicionNoticia.html',
        controller: 'ModalInstanceCtrl',
        size: 'md',
        resolve: {

           dato: function  () {
            return item;
            // body...
          },
           datosCuenta: function  () {
            return datosCuenta;
            // body...
          },
          items: function () {
            return $scope.items;
          }
        }
      });
      modalInstance.result.then(function (selectedItem,timeout) {
  
      }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };



 

 $scope.openPeticionSusPub= function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
    MyService.data.idenPublicacion=item;
  var item=[];
  var dato="";
  var datosCuenta="";

    
      var modalInstance = $modal.open({
        templateUrl: 'modalPeticionSusPub.html',
        controller: 'ModalInstanceCtrl',
        size: 'md',
        resolve: {

           dato: function  () {
            return item;
            // body...
          },
           datosCuenta: function  () {
            return datosCuenta;
            // body...
          },
          items: function () {
            return $scope.items;
          }
        }
      });
      modalInstance.result.then(function (selectedItem,timeout) {
          $scope.publicacionesPendientes.splice($scope.publicacionesPendientes.indexOf(selectedItem), 1);
      }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };


 $scope.Aprobacion = function (iden) {
  MyService.data.idenPublicacion=iden;
  $scope.openPeticionSusPub(iden);
};
$scope.Edicion = function (iden) {
  MyService.data.idenPublicacion=iden;
  $scope.openEdicionPublicacion(iden);
};
 $scope.Borrado = function (iden) {
  MyService.data.idenPublicacion=iden;
  $scope.openBorrarPublicacion();
};

}]);
