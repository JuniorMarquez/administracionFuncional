'use strict';

app.controller('CapacitacionesCtrl', ['$scope', '$state','$http', '$filter', '$modal', 'MyService', 'filterFilter', 'toaster','$timeout', 'FileUploader', function($scope,  $state ,$http, $filter,$modal, MyService, filterFilter, toaster,$timeout, FileUploader) {


var uploader = $scope.uploader = new FileUploader({
        url: 'js/controllers/noticias/upload.php'

    });
    // FILTERS

    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
          // alert("nombre archivo: " +item.name);
          MyService.data.nombreImagen=item.name;
            return this.queue.length < 10;

        }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };

    console.info('uploader', uploader);









 $scope.nivel=MyService.data.nivel;
  var dato="";
  var datosCuenta="";
  $scope.toaster = {
        
    type3: 'info',
    text3: 'Capacitacion borrada con éxito',
    title3: 'Información',
    
    type4: 'success',
    text4: 'Capacitacion agregada con exito',
    title4: 'Exito',
    
    type5: 'info',
    text5: 'capacitacion editada con exito',
    title5: 'Información',
    
    type6: 'info',
    text6: 'Estado de preñéz registrado con exito',
    title6: 'Información',
    
    type7: 'warning',
    text7: 'El estado de preñez de este consultor se ha anulado',
    title7: 'Cuidado',

    type8: 'info',
    text8: 'Tipo de capacitacion borrada con exito',
    title8: 'Información',
  };

  $scope.filter = '';
  $scope.mensajePrenez = 'Registrar / anular estado de preñéz del consultor';
    
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
    $scope.estados = ['activo','inactivo'];
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
 $scope.add = function () {
    $scope.item.itemsContenido.push({ 
      contenido: "",
      contenidoPlaceholder:"Contenido..."
    });
  };
 
//   $scope.carga = function(){
//     $http.get('http://54.202.62.62:1346/tipoCapacitacion/').then(function (resp) {
//       $scope.tiposCapacitaciones = resp.data.results;
//     });
//       $scope.item=null;
//   };
//   $scope.capacitaciones=[];
//  $scope.cargaCapacitaciones=function(){
//   $http.get('http://54.202.62.62:1346/capacitacion/').then(function (resp) {
//       $scope.capacitaciones = resp.data.results;
//       // alert("tamaño capacitaciones: "+$scope.capacitaciones.length);
//         });
// };

$scope.cargaCapacitaciones();
$scope.carga();

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
        $scope.items.splice($scope.items.indexOf(selectedItem), 1);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
   $scope.openConfirmBorrarCapacitacion = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalConfirmBorrarCapacitacion.html',
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
  $scope.openConfirm2 = function (item) {
    var identificador=item.id;
    MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalConfirm2.html',
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
       $scope.tiposCapacitaciones.splice($scope.tiposCapacitaciones.indexOf(item), 1);
        $scope.item = null;  
        // $scope.items = null;  
        $scope.pop8();
        
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
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

  // $scope.createTipoCapacitacion = function(){
  //   var tipoCapacitacion = {nombre: 'Nuevo tipo de capacitacion'};          
  //   tipoCapacitacion.nombre = $scope.checkItem(tipoCapacitacion, $scope.tiposCapacitaciones, 'nombre');
  //   tipoCapacitacion.idUsuario = MyService.data.idUsuario;
  //   $scope.tiposCapacitaciones.push(tipoCapacitacion);
  // };

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

  // $scope.deleteTipoCapacitacion = function(item){
  //   $http.delete('http://54.202.62.62:1346/tipoCapacitacion/'+item.id , item)
  //   $scope.tiposCapacitaciones.splice($scope.tiposCapacitaciones.indexOf(item), 1);
  // };

  // $scope.selectTipoCapacitacion = function(item){   
  //   MyService.data.tipoCapacitacion=item.nombre;
  //   angular.forEach($scope.tiposCapacitaciones, function(item) {
  //     item.selected = false;
  //     $scope.item=[];
  //   });
  //   $scope.items=null;
  //     $http.get('http://54.202.62.62:1346/areaconocimiento/').then(function (resp) {
  //     $scope.areasConocimiento = resp.data.results;
  //   });
  //   $scope.tipoCapacitacion = item;
  //   $scope.tipoCapacitacion.selected = true;
  //   $scope.filter = item.nombre;
  //   $scope.items.length=0;
  //   $scope.item=null;
  // };

  // $scope.selectAreaConocimiento = function(item){  
  // $scope.cargaCapacitaciones(); 
  //   MyService.data.areaConocimiento=item.nombre;
  //   angular.forEach($scope.areasConocimiento, function(item) {
  //     item.selected = false;
  //     $scope.item=[];
  //     $scope.itemsContenido=[];
  //   });
  //   $scope.items=[];
  //   $scope.areaConocimiento = item;
  //   $scope.areaConocimiento.selected = true;
  //   $scope.filter2 = item.nombre;
  //      for (var i = 0; i < $scope.capacitaciones.length; ++i) {
  //       if ($scope.capacitaciones[i].area == $scope.filter2){
  //       $scope.items.push($scope.capacitaciones[i]);
  //     }
  //   }    
  // };
  // var indiceItems =0;
  // var identifItems =0;
  //   $scope.tbOptionsContenido = {
  //      paging:   false,
  //      // ordering: false,
  //       searching: false,
  //   ordering: false,
  //     bDestroy: true,
  //      info:     false,
  //     // pageLength: 150,
  //     data: []                     
  //   };
  // $scope.cargaItems=function(){
  //   var result3 = [];
  //   $scope.itemsContenido=[];
  //   var indiceItems = MyService.data.identificadorItem; 
  //   $http.get('http://54.202.62.62:1346/contenido/?idCapacitacion='+indiceItems).then(function (resp) {
  //   $scope.itemsContenido = resp.data.results;
  //     for (var i  = 0; i<$scope.itemsContenido.length;i++){
  //       identifItems=$scope.itemsContenido[i].id;  
  //       $scope.itemsContenido[i].acciones="<button onclick=\"angular.element(this).scope().Edicion('" +identifItems +"')\"  class=\"btn btn-info btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Editar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i><button onclick=\"angular.element(this).scope().Borrado('" +identifItems +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Borrar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
  //       result3.push($scope.itemsContenido[i]);
  //       $scope.itemsContenidoV=result3;
  //       $scope.tbOptionsContenido.data = $scope.itemsContenidoV;
  //       $scope.tbOptionsContenido.aaData = $scope.itemsContenidoV;
  //       $scope.tbOptionsContenido.aoColumns=[
  //         {mData:'descripcion'},
  //         {mData:'acciones'} 
  //         ];
  //     };
  //      // alert("tamaño: "+$scope.itemsContenidoV.length);
  //   }); 
  // };  
  
  $scope.selectItem = function(item){   
  $scope.itemsContenidoV=[]; 
    $scope.alerts=null;
    var identificadorItem=item.id;
    var titulo =item.titulo;
    var subtitulo =item.subtitulo;
    MyService.data.titulo = titulo;
    MyService.data.identificadorItem = identificadorItem;
    // alert("indice: "+identificadorItem);
    angular.forEach($scope.items, function(item) {
      item.selected = false;
      item.editing = false;
      });

    $scope.item = item;
    $scope.item.selected = true;
    $scope.cargaCapacitaciones();
     var pas = item.id;
    $scope.capacitacionesFiltrados = $scope.capacitaciones.filter(function (capacitacion) {
      return (capacitacion.idcapacitacion == pas );
      });
    var indice = item.id;

    setTimeout(function() {
   // $scope.cargaItems();

    }, 500);
    
  };

$scope.openBorrar = function (item) {
    var item=[];
  var dato="";
  var datosCuenta="";
  var modalInstance = $modal.open({
    templateUrl: 'modalBorrar.html',
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
      // $scope.cargaItems();
      $scope.item.selected = false;
      }, function () {
    });
     
  };

// $scope.agregarContenido = function (item) {
//       var modalInstance = $modal.open({
//         templateUrl: 'modalNuevoContenido.html',
//         controller: 'ModalInstanceCtrl',
//         size: 'lg',
//         resolve: {
//            dato: function  () {
//             return item;
//             // body...
//           },
//            datosCuenta: function  () {
//             return datosCuenta;
//             // body...
//           },
//           items: function () {
//             return $scope.items;
//           }
//         }
//       });
//     modalInstance.result.then(function (selectedItem) {
//       $scope.selected = selectedItem;
//       // $scope.cargaItems();
//     }, function () {
      
//       // $log.info('Modal dismissed at: ' + new Date());
//     });
//   };

 // $scope.openEdicion = function (item) {
 //    // var identificador=item.id;
 //    // MyService.data.identificador = identificador;
 //  MyService.data.idenContenido=item;
 //  var item=[];
 //  var dato="";
 //  var datosCuenta="";

    
 //      var modalInstance = $modal.open({
 //        templateUrl: 'modalEdicion.html',
 //        controller: 'ModalInstanceCtrl',
 //        size: 'md',
 //        resolve: {

 //           dato: function  () {
 //            return item;
 //            // body...
 //          },
 //           datosCuenta: function  () {
 //            return datosCuenta;
 //            // body...
 //          },
 //          items: function () {
 //            return $scope.items;
 //          }
 //        }
 //      });
 //      modalInstance.result.then(function (selectedItem,timeout) {
 //       // setTimeout(function() {
 //         // $scope.cargaItems();
 //       // }, 1000);
 //      }, function () {

 //      // $log.info('Modal dismissed at: ' + new Date());
 //    });
 //  };



 $scope.Edicion = function (iden) {
  MyService.data.idenContenido=iden;
  $scope.openEdicion(iden);
};
 $scope.Borrado = function (iden) {
  MyService.data.idenContenido=iden;
  $scope.openBorrar(iden);
};

  // $scope.deleteItem = function(item){
  //   $http.delete('http://54.202.62.62:1346/capacitacion/'+item.id , item)
  //   $scope.items.splice($scope.items.indexOf(item), 1);
  //   $scope.item = $filter('orderBy')($scope.items, 'titulo')[0];
  //   if($scope.item) $scope.item.selected = true;
  // };

  // $scope.deleteCapacitacion = function(capacitacion){
  //   $http.delete('http://54.202.62.62:1346/capacitacion/'+capacitacion.id , capacitacion)
  //   $scope.capacitacionesFiltrados.splice($scope.capacitaciones.indexOf(capacitacion), 1);
  //   $scope.capacitacion = $filter('orderBy')($scope.capacitaciones, 'titulo')[0];
  //   if($scope.capacitacion) $scope.capacitacion.selected = true;
  // };

  // $scope.createItem = function(){
  //   var item = {
  //     titulo:'titulo',
  //     avatar:'img/avatar.png',
  //     mensajeNuevo:"Presione \"Editar\" para ingresar datos",
  //     // idEstablecimiento: MyService.data.idEstablecimiento,
  //     // nivel:2
  //   };
    
  //   $scope.items.push(item);
  //   $scope.selectItem(item);
  //   $scope.item.editing = true;
  //   $scope.item.tipoCapacitacion = MyService.data.tipoCapacitacion;
  //   $scope.item.mensajeNuevo=null;
  //   $scope.item.idUsuario = MyService.data.idUsuario;
  //   $http.get('http://54.202.62.62:1346/tipoCapacitacion/').then(function (resp) {
  //   $scope.tiposCapacitaciones = resp.data.results;
  //   }); 
  // };

  // $scope.editItem = function(item){
  //   if(item && item.selected){
  //     item.editing = true;
  //   }
  // };

//   $scope.doneEditingCapacitacion = function(item){
//     // $scope.items.length=0;
//     // $scope.areasConocimiento=null;
//     // $scope.tiposCapacitaciones=null;
//     // $scope.capacitaciones.length=0;
//     item.editing = false;
//     $scope.item.selected = true;
//       // $http.get('http://54.202.62.62:1346/capacitacion/').then(function (resp) {
//       // $scope.capacitaciones = resp.data.results;
//       // });
//     // $scope.carga();
//     // $scope.cargaCapacitaciones();
//     var capacitacionAct = {};
//     MyService.data.idenCapacitacion=item.id;
    
// $scope.areasConocimiento=[];
// $scope.items=[];
// $scope.item=[];
// $scope.tiposCapacitaciones=[];
// $scope.carga();
//     capacitacionAct.titulo=item.titulo;
//     capacitacionAct.subtitulo=item.subtitulo;
//     capacitacionAct.status=item.status;
//     capacitacionAct.codigo=item.codigo;
//     capacitacionAct.area=item.area;
//     capacitacionAct.tipoCapacitacion=item.tipoCapacitacion;
//     capacitacionAct.tipoObligacion=item.tipoObligacion;
//     capacitacionAct.img=MyService.data.nombreImagen
//     capacitacionAct.itemsContenido=item.itemsContenido;
    
//     capacitacionAct.idUsuario=item.idUsuario;
//  $scope.items.splice($scope.items.indexOf(item), 1);
//     if (MyService.data.idenCapacitacion){
//       $scope.pop4();
//       $http.put('http://54.202.62.62:1346/capacitacion/'+MyService.data.idenCapacitacion , capacitacionAct)
//     }
//     else {
//       $scope.pop3();;
//       $http.post('http://54.202.62.62:1346/capacitacion/', capacitacionAct)
//     }
//     $scope.cargaCapacitaciones();
    
//   };

}]);
