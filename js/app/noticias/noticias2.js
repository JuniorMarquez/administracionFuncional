'use strict';


app.controller('noticias2Ctrl', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', 'datepickerConfig', 'toaster', '$state',function($scope,$http, $filter,$modal, MyService,filterFilter, datepickerConfig,toaster,$state) {
   $scope.toaster = {
    title: 'Exito',
    type: 'success',
    text: 'Noticia autorizada con exito',

    title2: 'Exito',
    type2: 'info',
    text2: 'Noticia borrada con exito'   
  };
$scope.noticias = [];
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
    $scope.getNoticias = function () {
      // alert("se ejecuta");
      $scope.noticias=null;
      // setTimeout(function() {
           $scope.vigilante=$scope.vigilante+1;
           MyService.data.contador=$scope.vigilante;
         $http.get('http://54.202.62.62:1346/noticia/' ).success(function(respuesta){
      $scope.noticias = respuesta.results; 

        var bandera="";
        var bandera2="";
        $scope.noticiasAutorizadas=[];
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
        var conversations = $scope.noticias;
        var start_date =  Date.parse(firstDay);
        var end_date = Date.parse(lastDay);
        end_date=end_date+86400000;
        var identif=0;
        if ($scope.noticias && $scope.noticias.length > 0){
          for (var i=0;i < $scope.noticias.length;i++){
            var conversationDate1 =  $scope.noticias[i].createdAt;
            var conversationDate=Date.parse(conversationDate1);
              identif=$scope.noticias[i].id;  
            if (conversationDate ){
              if ( $scope.noticias[i].status == "activa"){
                result.push($scope.noticias[i]);
                }
             if ( $scope.noticias[i].status == "inactiva"){
              $scope.noticias[i].accion=" <button onclick=\"angular.element(this).scope().Aprobacion('" +identif +"')\"  class=\"btn btn-success btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Validar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                                  
                result3.push($scope.noticias[i]);
                }
            }
            $scope.noticiasAutorizadas=result;
            $scope.noticiasPendientes=result3;
          }
        }
        
        if ($scope.noticiasAutorizadas){
        for (var i  = 0; i<$scope.noticiasAutorizadas.length;i++){
          bandera = $scope.noticiasAutorizadas[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.noticiasAutorizadas[i].createdAtFormateada=bandera2;
          identif=$scope.noticiasAutorizadas[i].id;  
   
          $scope.noticiasAutorizadas[i].accion2="<button onclick=\"angular.element(this).scope().Borrado('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Borrar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
          }
        }
        if ($scope.noticiasPendientes){
        for (var i  = 0; i<$scope.noticiasPendientes.length;i++){
          bandera = $scope.noticiasPendientes[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.noticiasPendientes[i].createdAtFormateada=bandera2;
          identif=$scope.noticiasPendientes[i].id; 
          $scope.noticiasPendientes[i].accion="<button onclick=\"angular.element(this).scope().Aprobacion('" +identif +"')\"  class=\"btn btn-success btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Autorizar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
          $scope.noticiasPendientes[i].accion2="<button onclick=\"angular.element(this).scope().Borrado('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Borrar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
          }
        }
   
        $scope.noticiasAutorizadas=$scope.noticiasAutorizadas.reverse();
        $scope.tbOptionsPendientes.data = $scope.noticiasPendientes;
        $scope.tbOptionsPendientes.aaData = $scope.noticiasPendientes;
        $scope.tbOptionsPendientes.aoColumns=[
          { mData: 'createdAtFormateada'},
          {mData:'titulo'},
          {mData:'accion'},
          {mData:'accion2'}


          ];

          $scope.tbOptionsAutorizadas.data = $scope.noticiasAutorizadas;
          $scope.tbOptionsAutorizadas.aaData = $scope.noticiasAutorizadas;
          $scope.tbOptionsAutorizadas.aoColumns=[
            { mData: 'createdAtFormateada'},
          {mData:'titulo'},
          {mData:'accion2'}
          ];
      });
 
// }, 100);
    };
    $scope.getNoticias();

$scope.openBorrarNoticia = function (item) {
    var item=[];
  var dato="";
  var datosCuenta="";
  var modalInstance = $modal.open({
    templateUrl: 'modalBorrarNoticia.html',
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



 $scope.openEdicionNoticia = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
    MyService.data.idenMiembro=item;
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



 

 $scope.openPeticionSusNot = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
    MyService.data.ideNoticia=item;
  var item=[];
  var dato="";
  var datosCuenta="";

    
      var modalInstance = $modal.open({
        templateUrl: 'modalPeticionSusNot.html',
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
          $scope.noticiasPendientes.splice($scope.noticiasPendientes.indexOf(selectedItem), 1);
      }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };


 $scope.Aprobacion = function (iden) {
  MyService.data.idenNoticia=iden;
  $scope.openPeticionSusNot(iden);
};
$scope.Edicion = function (iden) {
  MyService.data.idenNoticia=iden;
  $scope.openEdicionNoticia(iden);
};
 $scope.Borrado = function (iden) {
  MyService.data.idenNoticia=iden;
  $scope.openBorrarNoticia();
};

}]);
