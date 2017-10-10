'use strict';

app.controller('FacilitadoresCtrl', ['$scope', '$state','$http', '$filter', '$modal', 'MyService', 'filterFilter', 'toaster','$timeout',  function($scope,  $state ,$http, $filter,$modal, MyService, filterFilter, toaster,$timeout) {
 $scope.nivel=MyService.data.nivel;
  var dato="";
  var datosCuenta="";
  $scope.toaster = {
        
    type3: 'info',
    text3: 'El profesional ha sido borrado',
    title3: 'Información',
    
    type4: 'success',
    text4: 'Profesional agregado con exito',
    title4: 'Exito',
    
    type5: 'info',
    text5: 'Profesional editado con exito',
    title5: 'Información',
    
    type6: 'info',
    text6: 'Estado de preñéz registrado con exito',
    title6: 'Información',
    
    type7: 'warning',
    text7: 'El estado de preñez de este consultor se ha anulado',
    title7: 'Cuidado',

    type8: 'info',
    text8: 'Especialidad borrada con exito',
    title8: 'Información',
  };

  $scope.filter = '';
  $scope.mensajePrenez = 'Registrar / anular estado de preñéz del consultor';
   

$scope.cargaFacilitadores=function () {
    $http.get('http://54.202.62.62:1346/facilitador/').then(function (resp) {
      $scope.items = resp.data.results;
      // alert("aqui");
       for (var i = 0; i < $scope.items.length; ++i) {
        
        $scope.items[i].img2="js/controllers/uploads/facilitadores/uploads/"+$scope.items[i].img;
        $scope.items[i].img=$scope.items[i].img2;
      
    }    
      $scope.item = null;  
    });
};



$scope.cargaFacilitadores();

  $scope.today = function() {
    $scope.fechaNacimiento = new Date();
  };
 

  $scope.clear = function () {
    $scope.fechaNacimiento = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
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

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    class: 'datepicker'
  };

  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = 'shortDate';
    $scope.nacionalidades = ['V','E'];

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
  $scope.pop2 = function(){
    toaster.pop($scope.toaster.type3, $scope.toaster.title3, $scope.toaster.text3);
  };
  $scope.pop3 = function(){
    toaster.pop($scope.toaster.type4, $scope.toaster.title4, $scope.toaster.text4);
  };
  $scope.pop4 = function(){
    toaster.pop($scope.toaster.type5, $scope.toaster.title5, $scope.toaster.text5);
  };
  $scope.pop8 = function(){
    toaster.pop($scope.toaster.type8, $scope.toaster.title8, $scope.toaster.text8);
  };
  $scope.pop6 = function(){
    if ($scope.item.prenez == true){
      toaster.pop($scope.toaster.type6, $scope.toaster.title6, $scope.toaster.text6);
      }
    if ($scope.item.prenez == false){
      toaster.pop($scope.toaster.type7, $scope.toaster.title7, $scope.toaster.text7);
      }
  };    
  $scope.pop = function(){
    if ($scope.item.estado == true){
      toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
    }
    if ($scope.item.estado == false){
      toaster.pop($scope.toaster.type2, $scope.toaster.title2, $scope.toaster.text2);
    }
  };


 
  $scope.openConfirm = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalConfirm.html',
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
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
        $scope.item = null;  
        $scope.pop2();
         $scope.facilitadores.splice($scope.facilitadores.indexOf(item), 1);
        $scope.items.splice($scope.items.indexOf(selectedItem), 1);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


   $scope.openConfirmBorrarFacilitador = function (item) {
    var identificador=item.id;
    MyService.data.identificadorFacilitador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalConfirmBorrarFacilitador.html',
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
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
        $scope.item = null;  
        $scope.pop2();
        $scope.items.splice($scope.items.indexOf(selectedItem), 1);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

 $scope.deleteItem = function(item){
    $http.delete('http://54.202.62.62:1346/facilitador/'+item.id , item)
    $scope.items.splice($scope.items.indexOf(item), 1);
    $scope.item = $filter('orderBy')($scope.items, 'primerNombre')[0];
    if($scope.item) $scope.item.selected = true;
  };

  $scope.deleteprofesional = function(profesional){
    $http.delete('http://54.202.62.62:1346/facilitador/'+profesional.id , profesional)
    $scope.profesionalesFiltrados.splice($scope.profesionales.indexOf(profesional), 1);
    $scope.profesional = $filter('orderBy')($scope.profesionales, 'nombres')[0];
    if($scope.profesional) $scope.profesional.selected = true;
  };




  $scope.disabled = undefined;
  $scope.searchEnabled = undefined;

  $scope.enable = function() {
    $scope.disabled = false;
  };

  $scope.disable = function() {
    $scope.disabled = true;
  };

  $scope.enableSearch = function() {
    $scope.searchEnabled = true;
  }

  $scope.disableSearch = function() {
    $scope.searchEnabled = false;
  }

  $scope.clear = function() {
    $scope.person.selected = undefined;
    $scope.address.selected = undefined;
    $scope.country.selected = undefined;
  };



  $scope.checkItem = function(obj, arr, key){
    var i=0;
    angular.forEach(arr, function(item) {
      if(item[key].indexOf( obj[key] ) == 0){
        var j = item[key].replace(obj[key], '').trim();
        if(j){
          i = Math.max(i, parseInt(j)+1);
        }else{
          i = 1;
        }
      }
    });
    return obj[key] + (i ? ' '+i : '');
  };





  $scope.selectItem = function(item){    
    $scope.alerts=null;
    var identificador =item.id;
    var primerNombre =item.primerNombre;
    var primerApellido =item.primerApellido;
    MyService.data.primerNombre = primerNombre;
    MyService.data.identificador = identificador;
    angular.forEach($scope.items, function(item) {
      item.selected = false;
      item.editing = false;
      });
    $scope.item = item;
    $scope.item.selected = true;

    var pas = item.id;

    setTimeout(function() {}, 500);
    
  };



  $scope.editItem = function(item){
    if(item && item.selected){
      item.editing = true;
    }
  };

  $scope.doneEditingFacilitador = function(item){
    item.editing = false;
    var facilitadorAct= {};
    MyService.data.idenFacilitador= item.id;
    facilitadorAct.nombre=item.nombre;
    facilitadorAct.idEstablecimiento=item.idEstablecimiento;
    facilitadorAct.idUsuario=item.idUsuario;
    facilitadorAct.idUsuarioAct=MyService.data.idUsuario;
    item.id=null;
    facilitadorAct.selected=item.selected;
    facilitadorAct.editing=item.editing;
    if (MyService.data.idenFacilitador){
      $http.put('http://54.202.62.62:1346/facilitador/'+MyService.data.idenFacilitador, facilitadorAct)
    }
    else {
      $http.post('http://54.202.62.62:1346/facilitador/', facilitadorAct)
    }
    $scope.items = null;
    $scope.item = null;
    $scope.ingredientes = null;
 
  };


  $scope.doneEditingFacilitador = function(item){
    var facilitadorAct = {};
    MyService.data.idenFacilitador=item.id;
    

    facilitadorAct.primerNombre=item.primerNombre;
    facilitadorAct.segundoNombre=item.segundoNombre;
    facilitadorAct.primerApellido=item.primerApellido;
    facilitadorAct.segundoApellido=item.segundoApellido;
    facilitadorAct.nacionalidad=item.nacionalidad;

    facilitadorAct.fechaNacimiento=item.fechaNacimiento;
    facilitadorAct.sexo=item.sexo;
    facilitadorAct.estadoCivil=item.estadoCivil;
    facilitadorAct.identificacion=item.identificacion;
    





    facilitadorAct.cuentaI=item.cuentaI;
    facilitadorAct.cuentaF=item.cuentaF;
    // facilitadorAct.avatar='img/avatar.png';
    facilitadorAct.direccion=item.direccion;

    facilitadorAct.email=item.email;
    facilitadorAct.telefono=item.telefono;
    facilitadorAct.movil=item.movil;

    facilitadorAct.nivel=item.nivel;
    facilitadorAct.status=item.status;

    facilitadorAct.idUsuario=item.idUsuario;

    if (MyService.data.idenFacilitador){
      $scope.pop4();
      $http.put('http://54.202.62.62:1346/facilitador/'+MyService.data.idenFacilitador , facilitadorAct)
    }
    else {
      $scope.pop3();;
      $http.post('http://54.202.62.62:1346/facilitador/', facilitadorAct)
    }
    $http.get('http://54.202.62.62:1346/facilitadores/').then(function (resp) {
      $scope.facilitadores = resp.data.results;
    });
    $http.get('http://54.202.62.62:1346/facilitador/').then(function (resp) {
      $scope.app.states = resp.data.results;
    });

    $scope.profesionales = null;

    item.editing = false;
  };

}]);
