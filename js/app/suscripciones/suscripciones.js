'use strict';



app.controller('SuscripcionesCtrl', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', 'datepickerConfig', 'toaster', '$state',function($scope,$http, $filter,$modal, MyService,filterFilter, datepickerConfig,toaster,$state) {
   $scope.toaster = {
    title: 'Exito',
    type: 'success',
    text: 'Suscripcion aprobada con exito',

    title2: 'Exito',
    type2: 'success',
    text2: 'Suscripción borrada con exito'   
  };
$scope.suscripciones = [];
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
    $scope.tbOptionsPendientes = {
    filterText: ''};
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

      $scope.tbOptionsFooter = {
      bDestroy: true,
      pageLength: 150,
      data: []
                                                     
    };
   
      $scope.tbOptionsCapacitacion = {
      bDestroy: true,
      pageLength: 150,
      data: []
                                                     
    };

      $scope.tbOptionsIncompany = {
      bDestroy: true,
      pageLength: 150,
      data: []
                                                     
    };

 // $scope.vigilante=MyService.data.contador;
    $scope.getSuscripciones = function () {
      $scope.suscripciones=null;
     
          $http.get('http://54.202.62.62:1346/suscripcion/').then(function (resp) {
      $scope.suscripciones= resp.data.results;


        var bandera="";
        var bandera2="";
        $scope.suscripcionesValidadas=[];
        $scope.footer=[];
        $scope.capacitacion=[];
        $scope.incompany=[];
        var date = new Date();
        var mes = date.getMonth();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var result = [];
        var result3 = [];
        var footer = [];
        var capacitacion = [];
        var incompany = [];
        $scope.fechaInicio=$filter('date')(new Date(firstDay),'dd/MM/yyyy');
        $scope.fechaFin=$filter('date')(new Date(lastDay),'dd/MM/yyyy');
        var conversations = $scope.suscripciones;
        var start_date =  Date.parse(firstDay);
        var end_date = Date.parse(lastDay);
        end_date=end_date+86400000;
        var identif=0;
        if ($scope.suscripciones && $scope.suscripciones.length > 0){
          for (var i=0;i < $scope.suscripciones.length;i++){
            var conversationDate1 =  $scope.suscripciones[i].createdAt;
            var conversationDate=Date.parse(conversationDate1);
              identif=$scope.suscripciones[i].id;  
            if (conversationDate ){
              if ( $scope.suscripciones[i].status == "validada"){
               
                result.push($scope.suscripciones[i]);
                }
             if ( $scope.suscripciones[i].status == "pendiente"){
              $scope.suscripciones[i].accion=" <button onclick=\"angular.element(this).scope().Aprobacion('" +identif +"')\"  class=\"btn btn-success btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Aceptar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                                  
                result3.push($scope.suscripciones[i]);
                }
            }
            $scope.suscripcionesValidadas=result;
            $scope.suscripcionesPendientes=result3;
          }
        }
        
        if ($scope.suscripcionesValidadas){
        for (var i  = 0; i<$scope.suscripcionesValidadas.length;i++){
          bandera = $scope.suscripcionesValidadas[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.suscripcionesValidadas[i].createdAtFormateada=bandera2;
          identif=$scope.suscripcionesValidadas[i].id;  
      //      if(typeof($scope.suscripcionesValidadas[i].especialidad) == "undefined"){
      //   $scope.suscripcionesValidadas[i].especialidad="ODONTOLOGÍA GENERAL";
      // }
          if ($scope.suscripcionesValidadas[i].nombres){
          $scope.suscripcionesValidadas[i].nombreCompleto=$scope.suscripcionesValidadas[i].nombres+" "+$scope.suscripcionesValidadas[i].apellidos;
          }
        //   if ($scope.suscripcionesValidadas[i].letra=="a"){
        //    $scope.suscripcionesValidadas[i].accion="";                                               
        //    if ($scope.suscripcionesValidadas[i].status){
        // // $scope.suscripcionesValidadas[i].accion="<button onclick=\"angular.element(this).scope().Edicion('" +identif +"')\"  class=\"btn btn-info btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Editar Status</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
        //  $scope.suscripcionesValidadas[i].accion="";                        
         
        //    } 
        //   }
           
          $scope.suscripcionesValidadas[i].accion2="<button onclick=\"angular.element(this).scope().Borrado('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Borrar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
          }
        }
        if ($scope.suscripcionesPendientes){
        for (var i  = 0; i<$scope.suscripcionesPendientes.length;i++){
          bandera = $scope.suscripcionesPendientes[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.suscripcionesPendientes[i].createdAtFormateada=bandera2;
          identif=$scope.suscripcionesPendientes[i].id; 
          // $scope.suscripcionesPendientes[i].accion="<button onclick=\"angular.element(this).scope().Aprobacion('" +identif +"')\"  class=\"btn btn-success btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Validar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
          $scope.suscripcionesPendientes[i].accion2="<button onclick=\"angular.element(this).scope().Borrado('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Borrar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
          }
        }

        for (var i  = 0; i<$scope.suscripcionesValidadas.length;i++){
          if($scope.suscripcionesValidadas[i].tipoSuscripcion == "footer"){
            footer.push($scope.suscripcionesValidadas[i]);
          }
          if($scope.suscripcionesValidadas[i].tipoSuscripcion == "capacitacion"){
            capacitacion.push($scope.suscripcionesValidadas[i]);
          }
          if($scope.suscripcionesValidadas[i].tipoSuscripcion == "incompany"){
            incompany.push($scope.suscripcionesValidadas[i]);
          }

            $scope.footer=footer;
            $scope.capacitacion=capacitacion;
            $scope.incompany=incompany;
            }     
        $scope.suscripcionesValidadas=$scope.suscripcionesValidadas.reverse();
        $scope.tbOptionsPendientes.data = $scope.suscripcionesPendientes;
        $scope.tbOptionsPendientes.aaData = $scope.suscripcionesPendientes;
        $scope.tbOptionsPendientes.aoColumns=[
          { mData: 'createdAtFormateada'},
          { mData:'tipoSuscripcion'},
          { mData: 'email'},
          { mData: 'telefono'},
          { mData: 'accion' },
          { mData: 'accion2' }   
          ];

          $scope.tbOptionsFooter.data = $scope.footer;
          $scope.tbOptionsFooter.aaData = $scope.footer;
          $scope.tbOptionsFooter.aoColumns=[
            { mData:'createdAtFormateada'},
            {mData:'nombre'},
            {mData:'email'},
            { mData: 'telefono'},
            // { mData: 'accion' },   
            { mData: 'accion2' }   
            ];
          $scope.tbOptionsCapacitacion.data = $scope.capacitacion;
          $scope.tbOptionsCapacitacion.aaData = $scope.capacitacion;
          $scope.tbOptionsCapacitacion.aoColumns=[
            { mData:'createdAtFormateada'},
            { mData: 'nombreCompleto'},
            { mData: 'email'},
            { mData: 'telefono' },
            { mData: 'accion2' }   
            ];
          $scope.tbOptionsIncompany.data = $scope.incompany;
          $scope.tbOptionsIncompany.aaData = $scope.incompany;
          $scope.tbOptionsIncompany.aoColumns=[
            { mData:'createdAtFormateada'},
            { mData: 'nombreEmpresa'},
            { mData: 'personaContacto'},
            { mData: 'email'},
            { mData: 'telefono' },
            { mData: 'accion2' }   
            ];
        });

    };
    $scope.getSuscripciones();

$scope.openBorrarSuscripcion = function (item) {
    var item=[];
  var dato="";
  var datosCuenta="";
  var modalInstance = $modal.open({
    templateUrl: 'modalBorrarSuscripcion.html',
    controller: 'ModalInstanceCtrl',
    size: 'sm',
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
        $scope.getSuscripciones();
    });
     
  };



 $scope.openEdicion = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
    MyService.data.idenMiembro=item;
  var item=[];
  var dato="";
  var datosCuenta="";

    
      var modalInstance = $modal.open({
        templateUrl: 'modalEdicion.html',
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
  $scope.getSuscripciones();
      }, function () {
        $scope.getSuscripciones();
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };



 

 $scope.openPeticionSusIn = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
    // MyService.data.idenSuscripcion=item;
  var item=[];
  var dato="";
  var datosCuenta="";

    
      var modalInstance = $modal.open({
        templateUrl: 'modalPeticionSusIn.html',
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
         $scope.getSuscripciones();
          // $scope.suscripcionesPendientes.splice($scope.suscripcionesPendientes.indexOf(selectedItem), 1);
      }, function () {
        $scope.getSuscripciones();
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

$scope.openPeticionSusCap= function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
    // MyService.data.idenSuscripcion=item;
  var item=[];
  var dato="";
  var datosCuenta="";

    
      var modalInstance = $modal.open({
        templateUrl: 'modalPeticionSusCap.html',
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
         $scope.getSuscripciones();
          // $scope.suscripcionesPendientes.splice($scope.suscripcionesPendientes.indexOf(selectedItem), 1);
      }, function () {
        $scope.getSuscripciones();
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };
$scope.openPeticionSusFoo = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
    // MyService.data.idenSuscripcion=item;
  var item=[];
  var dato="";
  var datosCuenta="";

    
      var modalInstance = $modal.open({
        templateUrl: 'modalPeticionSusFoo.html',
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
setTimeout(function() {$scope.getSuscripciones();}, 500);
         
        // $scope.getSuscripciones();
        //   $scope.suscripcionesPendientes.splice($scope.suscripcionesPendientes.indexOf(selectedItem), 1);
      }, function () {
        $scope.getSuscripciones();
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };





 $scope.Aprobacion = function (iden) {
  MyService.data.idenSuscripcion=iden;
var item=[];
  $http.get("http://54.202.62.62:1346/suscripcion/"+iden).success(function(respuesta){        
    item=respuesta;
 if (item.tipoSuscripcion=="incompany"){$scope.openPeticionSusIn(iden);};
  if (item.tipoSuscripcion=="capacitacion"){$scope.openPeticionSusCap(iden);};
  if (item.tipoSuscripcion=="footer"){$scope.openPeticionSusFoo(iden);};
  });
 
};
$scope.Edicion = function (iden) {
  MyService.data.idenMiembro=iden;
  $scope.openEdicion(iden);
};
 $scope.Borrado = function (iden) {
  MyService.data.idenSuscripcion=iden;
  $scope.openBorrarSuscripcion();
};

}]);
