'use strict';

/* Controllers */

  // bootstrap controller
  app.controller('AccordionDemoCtrl', ['$scope', function($scope) {
    $scope.oneAtATime = true;

         $scope.nacionalidades = [
        { name: 'V'},
        { name: 'E'}
        
        ];
    $scope.groups = [
      {
        title: 'Accordion group header - #1',
        content: 'Dynamic group body - #1'
      },
      {
        title: 'Accordion group header - #2',
        content: 'Dynamic group body - #2'
      }
    ];

    $scope.items = ['item 1', 'Item 2', 'Item 3'];
    $scope.addItem = function() {
      var newItemNo = $scope.items.length + 1;
      $scope.items.push("<button tooltip=\"Ver detalles\" tooltip-placement=\"bottom\" onclick=\"angular.element(this).scope().openDetalles('')\"  class=\"btn btn-info btn-xs\" > <i class=\"fa fa-eye text\"></i></button>  <button onclick=\"angular.element(this).scope().openConfirmEliminar('')\"  class=\"btn btn-danger btn-xs\" tooltip=\"Eliminar\" tooltip-placement=\"left\"> <i class=\"fa fa-trash-o text\"></i></button>" + newItemNo);
    };

    $scope.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };
  }])
  ; 
  app.controller('AlertDemoCtrl', ['$scope', function($scope) {
    $scope.alerts = [
      { type: 'success', msg: 'Well done! You successfully read this important alert message.' },
      { type: 'info', msg: 'Heads up! This alert needs your attention, but it is not super important.' },
      { type: 'warning', msg: 'Warning! Best check yo self, you are not looking too good...' }
    ];

    $scope.addAlert = function() {
      $scope.alerts.push({type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.'});
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  }])
  ; 
  app.controller('ButtonsDemoCtrl', ['$scope', function($scope) {
    $scope.singleModel = 1;

    $scope.radioModel = 'Middle';

    $scope.checkModel = {
      left: false,
      middle: true,
      right: false
    };
  }])
  ; 
  app.controller('CarouselDemoCtrl', ['$scope', function($scope) {
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
      slides.push({
        image: 'img/c' + slides.length + '.jpg'
        // text: ['Carousel text #0','Carousel text #1','Carousel text #2','Carousel text #3'][slides.length % 4]
      });
    };
    for (var i=0; i<4; i++) {
      $scope.addSlide();
    }
  }])
  ; 
  app.controller('DropdownDemoCtrl', ['$scope', function($scope) {
    $scope.items = [
      'The first choice!',
      'And another choice for you.',
      'but wait! A third!'
    ];

    $scope.status = {
      isopen: false
    };

    $scope.toggled = function(open) {

    };

    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
  }])
  ;

  app.controller('ModalInstanceCtrl', ['$scope', '$http', '$modalInstance', 'items', 'MyService', '$filter','$modal','dato','datosCuenta','toaster', '$state',function($scope, $http, $modalInstance, items, MyService,$filter,$modal,dato,datosCuenta,toaster,$state) {



 $scope.okBorrarSuscripcion = function (item,timeout) { 
      var dato="";
      dato = MyService.data.idenSuscripcion;
      $http.delete('http://54.202.62.62:1346/suscripcion/'+dato).success(function(data) {
              $modalInstance.close();
               $scope.popSuscripcionBorrada();
          }); 
    };
     $scope.okBorrarNoticia = function (item,timeout) { 
      var dato="";
      dato = MyService.data.idenNoticia;
      $http.delete('http://54.202.62.62:1346/noticia/'+dato).success(function(data) {
              $modalInstance.close();
               $scope.popSuscripcionBorrada();
          }); 
    };
    $scope.okBorrarPublicacion= function (item,timeout) { 
      var dato="";
      dato = MyService.data.idenPublicacion;
      $http.delete('http://54.202.62.62:1346/publicacion/'+dato).success(function(data) {
              $modalInstance.close();
               $scope.popPublicacionBorrada();
          }); 
    };

     var result = [];

    $scope.nacionalidades = ['V','E'];
  $scope.anos=[];
        for (var i = 0; i < 88; ++i)
          {
            result.push(i+1930);
           $scope.anos=result;
        };
        $scope.anos=$scope.anos.reverse();

    $http.get('http://54.202.62.62:1346/emailcorporativo').then(function (resp) {
    $scope.listadoEmailCorporativo = resp.data.results;
  });

      $http.get('http://54.202.62.62:1346/equipodirectivo').then(function (resp) {
    $scope.listadoDirectiva = resp.data.results;
  });
  
   $http.get('http://54.202.62.62:1346/tipocapacitacion').then(function (resp) {
    $scope.listadoTiposCapacitaciones = resp.data.results;
  });
    $http.get('http://54.202.62.62:1346/tiponoticia').then(function (resp) {
    $scope.listadoTiposNoticias = resp.data.results;
  });

     $http.get('http://54.202.62.62:1346/tipopublicacion').then(function (resp) {
    $scope.listadoTiposPublicaciones = resp.data.results;
  });

   $http.get('http://54.202.62.62:1346/areaconocimiento').then(function (resp) {
    $scope.areasConocimiento = resp.data.results;
  });
      $http.get('http://54.202.62.62:1346/obligacion').then(function (resp) {
    $scope.obligaciones = resp.data.results;
  });
    var user=[];
    var dato="";
    var datosCuenta={};
    datosCuenta.tipo=MyService.tipo;
    $scope.item={};
    $scope.item.tipo=MyService.tipo;
    $scope.item.letra=MyService.letra;
    $scope.filter={};
    $scope.filter = '';
      
      $scope.filter = '';
      $scope.tbOptions3 = {
      bDestroy: true,
      pageLength: 5,
      data: []                                              
    };
    
    $scope.filter = '';
      $scope.tbOptions4 = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
    };

$scope.consultarContenido=function(item){
  var item=[];
  var identificador = MyService.data.idenContenido;
  $scope.datosContenido={};
  $http.get('http://54.202.62.62:1346/contenido/'+identificador).success(function(respuesta){        
    item=respuesta;
    $scope.item=item;
  });
  item=$scope.item;
  $scope.item=item;
};
$scope.consultaSuscripcion=function(item){
  var item=[];
  var identificador = MyService.data.idenSuscripcion;
  $scope.datosContenido={};
  $http.get('http://54.202.62.62:1346/suscripcion/'+identificador).success(function(respuesta){        
    item=respuesta;
    $scope.item=item;
  });
  item=$scope.item;
  $scope.item=item;
};
$scope.consultaNoticia=function(item){
  var item=[];
  var identificador = MyService.data.idenNoticia;
  $scope.datosContenido={};
  $http.get('http://54.202.62.62:1346/noticia/'+identificador).success(function(respuesta){        
    item=respuesta;
    $scope.item=item;
  });
  item=$scope.item;
  $scope.item=item;
};
$scope.consultaPublicacion=function(item){
  var item=[];
  var identificador = MyService.data.idenPublicacion;
  $scope.datosContenido={};
  $http.get('http://54.202.62.62:1346/publicacion/'+identificador).success(function(respuesta){        
    item=respuesta;
    $scope.item=item;
  });
  item=$scope.item;
  $scope.item=item;
};
$scope.consultarContenido=function(item){
  var item=[];
  var identificador = MyService.data.idenContenido;
  $scope.datosContenido={};
  $http.get('http://54.202.62.62:1346/contenido/'+identificador).success(function(respuesta){        
    item=respuesta;
    $scope.item=item;
  });
  item=$scope.item;
  $scope.item=item;
};

$scope.consultarContenido();
    $scope.okNuevoContenido = function(item){
    item.idCapacitacion=MyService.data.identificadorItem;
    $http.post('http://54.202.62.62:1346/contenido/', item).success(function(data) {
              $modalInstance.close();
              $scope.popNuevoContenido();
          });

    // $state.go('access.ok');
};

$scope.okContacto= function (item) {
  var configAct = {};
      configAct.direccion=item.direccion;
      configAct.telefono1=item.telefono1;
      configAct.telefono2=item.telefono2;
      configAct.telefonoMovil=item.telefonoMovil;
      configAct.instagram=item.instagram;
      configAct.twitter=item.twitter;
      configAct.facebook=item.facebook;
      configAct.contactoLineal=item.contactoLineal;
      configAct.emailContacto=item.emailContacto;
      var iden = MyService.data.idContacto;
      $http.put('http://54.202.62.62:1346/contacto/'+MyService.data.idContacto , configAct);       
      $modalInstance.close();
    };
$scope.entrar2=function(item){
  var iden = MyService.data.idContacto;
  var datosContacto=[];
  $http.get('http://54.202.62.62:1346/contacto').success(function(respuesta){
        $scope.contacto = respuesta.results[0];
        datosContacto.direccion=respuesta.results[0].direccion; 
        datosContacto.telefono1=respuesta.results[0].telefono1; 
        datosContacto.telefono2=respuesta.results[0].telefono2;
        datosContacto.telefonoMovil=respuesta.results[0].telefonoMovil;
        datosContacto.instagram=respuesta.results[0].instagram;  
        datosContacto.facebook=respuesta.results[0].facebook; 
        datosContacto.twitter=respuesta.results[0].twitter; 
        datosContacto.contactoLineal=respuesta.results[0].contactoLineal; 
        datosContacto.emailContacto=respuesta.results[0].emailContacto; 
        
        
    });
 
  $scope.item=datosContacto;
   
};
$scope.borrarObligacion=function(item){
   var idObligacion=item.id;
      $http.delete('http://54.202.62.62:1346/obligacion/'+idObligacion , item)
      $modalInstance.dismiss('cancel');
};    
$scope.borrarArea=function(item){
   var idArea=item.id;
      $http.delete('http://54.202.62.62:1346/areaConocimiento/'+idArea , item)
      $modalInstance.dismiss('cancel');
};


$scope.borrarEmail=function(item){
   var idEmail=item.id;
      $http.delete('http://54.202.62.62:1346/emailcorporativo/'+idEmail , item)
      $modalInstance.dismiss('cancel');
};
$scope.borrarTipoCapacitacion=function(item){
   var idCapacitacion=item.id;
      $http.delete('http://54.202.62.62:1346/tipocapacitacion/'+idCapacitacion , item)
      $modalInstance.dismiss('cancel');
};
$scope.borrarTipoNoticia=function(item){
   var idNoticia=item.id;
      $http.delete('http://54.202.62.62:1346/tiponoticia/'+idNoticia , item)
      $modalInstance.dismiss('cancel');
};
$scope.borrarTipoPublicacion=function(item){
   var iPublicacion=item.id;
      $http.delete('http://54.202.62.62:1346/tipopublicacion/'+iPublicacion , item)
      $modalInstance.dismiss('cancel');
};


$scope.borrarDirectiva=function(item){
   var idDirectiva=item.id;
      $http.delete('http://54.202.62.62:1346/equipodirectivo/'+idDirectiva , item)
      $modalInstance.dismiss('cancel');
};
$scope.borrarComite=function(item){
   var idComite=item.id;
      $http.delete('http://54.202.62.62:1346/comite/'+idComite , item)
      $modalInstance.dismiss('cancel');
};


   $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    }; 

    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [250, 500, 1000],
        pageSize: 250,
        currentPage: 1
    }; 
   
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
 
    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions
    };
  


    $scope.mensajeBorrado="Al borrar este profesional, se perderá de manera permanente toda la información referente al mismo, está seguro de querer borrarlo?";
    $scope.mensajeBorradoProfesional="Al borrar este profesional, se perderá de manera permanente toda la información referente al mismo, está seguro de querer borrarlo?";

  

    $scope.okNuevaSolicitud = function (item) {
      item.estado="Pendiente";
      $http.post('http://54.202.62.62:1346/solicitud/' ,item);  
      $modalInstance.close();
      $state.go('app.dashboard-v1');
      };
 

    $scope.okDirectiva = function (item) {

      item.idUsuario=MyService.data.idUsuario;
      $http.post('http://54.202.62.62:1346/equipodirectivo/' ,item);       
      $modalInstance.close();
    };
    $scope.okComite = function (item) {

      item.idUsuario=MyService.data.idUsuario;
      $http.post('http://54.202.62.62:1346/comite/' ,item);       
      $modalInstance.close();
    };
    $scope.okEmail = function (item) {

      item.idUsuario=MyService.data.idUsuario;
      $http.post('http://54.202.62.62:1346/emailcorporativo/' ,item);       
      $modalInstance.close();
    };
 
 $scope.okTipoCapacitacion = function (item) {

      item.idUsuario=MyService.data.idUsuario;
      $http.post('http://54.202.62.62:1346/tipocapacitacion/' ,item);       
      $modalInstance.close();
    };
    $scope.okTipoPublicacion= function (item) {

      item.idUsuario=MyService.data.idUsuario;
      $http.post('http://54.202.62.62:1346/tipopublicacion/' ,item);       
      $modalInstance.close();
    };
    $scope.okTipoNoticia = function (item) {

      item.idUsuario=MyService.data.idUsuario;
      $http.post('http://54.202.62.62:1346/tiponoticia/' ,item);       
      $modalInstance.close();
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
      }, function () {
    });
     
  };;
  // var indiceItems =0;
  // var identifItems =0;
  //   // $scope.tbOptionsContenido = {
    //   bDestroy: true,
    //   pageLength: 150,
    //   data: []                     
    // };
// $scope.consultaItems=function(){
//  var result3 = [];
//     $scope.itemsContenido=[];
//     var indiceItems = MyService.data.identificadorItem;
//     $http.get('http://54.202.62.62:1346/contenido/?idCapacitacion='+indiceItems).then(function (resp) {
//     $scope.itemsContenido = resp.data.results;
//       for (var i  = 0; i<$scope.itemsContenido.length;i++){
//         identifItems=$scope.itemsContenido[i].id;  
//         $scope.itemsContenido[i].acciones="<button onclick=\"angular.element(this).scope().Edicion('" +identifItems +"')\"  class=\"btn btn-info btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Editar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i><button onclick=\"angular.element(this).scope().Borrado('" +identifItems +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Borrar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
//         result3.push($scope.itemsContenido[i]);
//         $scope.itemsContenidoV=result3;
//         $scope.tbOptionsContenido.data = $scope.itemsContenidoV;
//         $scope.tbOptionsContenido.aaData = $scope.itemsContenidoV;
//         $scope.tbOptionsContenido.aoColumns=[
//           {mData:'descripcion'},
//           {mData:'acciones'} 
//           ];
//       };

//     }); 
// };

$scope.okAprobacion = function (item) {
    var identificador = MyService.data.idenSuscripcion;
    var suscripcionAct={};
    suscripcionAct.status="validada";  
    suscripcionAct.anoDeEgresoEspecialidad=item.anoDeEgresoEspecialidad;
    $http.put('http://54.202.62.62:1346/suscripcion/'+identificador, suscripcionAct);
    $modalInstance.close();
    setTimeout(function() { 
      $http.get('http://54.202.62.62:1346/suscripcion/' ).success(function(respuesta){
      $scope.suscripciones = respuesta.results; 
        MyService.data.suscripciones=$scope.suscripciones;
    });}, 300);
   
    $scope.popAprobacion();

 };
 $scope.okAprobacionNoticia = function (item) {
    var identificador = MyService.data.idenNoticia;
    var noticiaAct={};
    noticiaAct.status="activa";  
    $http.put('http://54.202.62.62:1346/noticia/'+identificador, noticiaAct);
    $modalInstance.close();  
    $scope.popAprobacionNoticia();

 };
  $scope.okAprobacionPublicacion = function (item) {
    var identificador = MyService.data.idenPublicacion;
    var publicacionAct={};
    publicacionAct.status="activa";  
    $http.put('http://54.202.62.62:1346/publicacion/'+identificador, publicacionAct);
    $modalInstance.close();  
    $scope.popAprobacionPublicacion();

 };
 $scope.okEdicion = function (item) {
    var identificador = MyService.data.idenContenido;
    var contenidoAct={};
    contenidoAct.descripcion=item.descripcion;
    $http.put('http://54.202.62.62:1346/contenido/'+identificador, contenidoAct).success(function(data) {
              $modalInstance.close();
              $scope.popEdicion();
          });
 };

$scope.okAreaConocimiento= function (item) {
      item.idUsuario=MyService.data.idUsuario;
      $http.post('http://54.202.62.62:1346/areaConocimiento/' ,item);       
      $modalInstance.close();
    };

$scope.okObligacion= function (item) {

      item.idUsuario=MyService.data.idUsuario;
      $http.post('http://54.202.62.62:1346/obligacion/' ,item);       
      $modalInstance.close();
    };
$scope.setActividad1=function(){
  MyService.data.tipoActividad="privada";
};
$scope.setActividad2=function(){
  MyService.data.tipoActividad="publica";
};
$scope.okActividad = function (item) {

      item.idUsuario=MyService.data.idUsuario;
      item.tipo=MyService.data.tipoActividad;
      $http.post('http://54.202.62.62:1346/evento/' ,item);
      MyService.data.eventoNuevo=item;
         $scope.popNuevoEvento();       
      $modalInstance.close();
    };
    $scope.okEditarActividad = function (item) {

      item.idUsuario=MyService.data.idUsuario;
      item.tipo=MyService.data.tipoActividad;
      $http.put('http://54.202.62.62:1346/evento/'+item.id ,item);       
      $modalInstance.close();
   $scope.popEditEvento();
     setTimeout(function() {
        $state.go('app.dashboard-v1');
      }, 900);
    };

 
 $scope.okMensaje = function (item) {
      item.idSolicitud=MyService.data.idSolicitud;
      item.autor="miembro";
      item.idUsuario=MyService.data.idUsuario;
      item.avatar="img/avatarMiembro.png";
      $http.post('http://54.202.62.62:1346/mensaje/' ,item);       
      $modalInstance.close();
  };
    $scope.toaster = {
    title: 'Exito',
    type: 'success',
    text: 'Suscripcion aceptada con éxito',


    type3: 'info',
    text3: 'Contenido editado con éxito',
    title3: 'Información',
    
    type4: 'success',
    text4: 'Articulo agregado con exito',
    title4: 'Exito',
    
    type5: 'info',
    text5: 'Articulo editado con exito',
    title5: 'Información',
    
    type6: 'info',
    text6: 'Estado de preñéz registrado con exito',
    title6: 'Información',
    
    type7: 'warning',
    text7: 'El estado de preñez de este articulo se ha anulado',
    title7: 'Cuidado',

    type8: 'info',
    text8: 'Item de Contenido borrado con exito',
    title8: 'Información',

typeSB: 'info',
    textSB: 'Suscripcion borrada con Exito',
    titleSB: 'Información',
    typePB: 'info',
    textPB: 'Publicacion borrada con Exito',
    titlePB: 'Información',

    typeAN: 'success',
    textAN: 'Noticia Activada con Exito',
    titleAN: 'Éxito',
    typeAP: 'success',
    textAP: 'Publicacion Activada con Exito',
    titleAP: 'Éxito',

    type9: 'info',
    text9: 'Actividad editada con exito',
    title9: 'Información',
    type10: 'success',
    text10: 'Actividad agregada con exito',
    title10: 'Éxito',

     type11: 'success',
    text11: 'Contenido agregado con exito',
    title11: 'Éxito',
  };
      $scope.popAprobacion = function(){
    toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
  };
        $scope.popAprobacionNoticia = function(){
    toaster.pop($scope.toaster.typeAN, $scope.toaster.titleAN, $scope.toaster.textAN);
  };
   $scope.popAprobacionPublicacion = function(){
    toaster.pop($scope.toaster.typeAP, $scope.toaster.titleAP, $scope.toaster.textAP);
  };
   $scope.popNuevoEvento = function(){
    toaster.pop($scope.toaster.type10, $scope.toaster.title10, $scope.toaster.text10);
  };
   $scope.popNuevoContenido = function(){
    toaster.pop($scope.toaster.type11, $scope.toaster.title11, $scope.toaster.text11);
  };
   $scope.popEditEvento = function(){
    toaster.pop($scope.toaster.type9, $scope.toaster.title9, $scope.toaster.text9);
  };
  $scope.popEdicion = function(){
    toaster.pop($scope.toaster.type3, $scope.toaster.title3, $scope.toaster.text3);
  };
  $scope.popBorrado = function(){
    toaster.pop($scope.toaster.type8, $scope.toaster.title8, $scope.toaster.text8);
  };
   $scope.popSuscripcionBorrada = function(){
    toaster.pop($scope.toaster.typeSB, $scope.toaster.titleSB, $scope.toaster.textSB);
  };
    $scope.okBorrarContenido = function (item,timeout) { 
      var dato="";
      dato = MyService.data.idenContenido;
      $http.delete('http://54.202.62.62:1346/contenido/'+dato).success(function(data) {
              $modalInstance.close();
               $scope.popBorrado();
          }); 
    };
    
   
    $scope.okConfirmCapacitacion = function (item) { 
      var idCapacitacion=MyService.data.identificador;
      $http.delete('http://54.202.62.62:1346/capacitacion/'+idCapacitacion , item)
      $scope.items = null;
      $scope.item = null; 
      $modalInstance.close();
    };
     $scope.okConfirmFacilitador = function (item) { 
      var idFacilitador=MyService.data.identificadorFacilitador;
      $http.delete('http://54.202.62.62:1346/facilitador/'+idFacilitador , item)
      $scope.items = null;
      $scope.item = null; 
      $modalInstance.close();
    };
     $scope.okConfirmSlide = function (item) { 
      var idSlide=MyService.data.identificadorSlide;
      $http.delete('http://54.202.62.62:1346/slide/'+idSlide , item)
      $scope.items = null;
      $scope.item = null; 
      $modalInstance.close();
    };

    $scope.okConfirm2 = function (item) { 
     var idEspecialidad=MyService.data.identificador;
      $http.delete('http://54.202.62.62:1346/especialidad/'+idEspecialidad, item)
      $scope.item = null;
      $scope.items = null;
      $modalInstance.close();
    };


    $scope.ok = function (item) {
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
$scope.item={};
$scope.dato=[];
$scope.dato = dato;
$scope.item.datosCuenta=datosCuenta;




  }]);

  
  app.controller('ModalDemoCtrl', ['$scope', '$modal', '$log', function($scope, $modal, $log) {
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function (item) {
      var identificador =item.id;
      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: 'lg',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  }])
  ; 
  app.controller('PaginationDemoCtrl', ['$scope', '$log', function($scope, $log) {
    $scope.totalItems = 64;
    $scope.currentPage = 4;

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
      $log.info('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;
  }])
  ; 
  app.controller('PopoverDemoCtrl', ['$scope', function($scope) {
    $scope.dynamicPopover = 'Hello, World!';
    $scope.dynamicPopoverTitle = 'Title';
  }])
  ; 
  app.controller('ProgressDemoCtrl', ['$scope', function($scope) {
    $scope.max = 200;

    $scope.random = function() {
      var value = Math.floor((Math.random() * 100) + 1);
      var type;

      if (value < 25) {
        type = 'success';
      } else if (value < 50) {
        type = 'info';
      } else if (value < 75) {
        type = 'warning';
      } else {
        type = 'danger';
      }

      $scope.showWarning = (type === 'danger' || type === 'warning');

      $scope.dynamic = value;
      $scope.type = type;
    };
    $scope.random();

    $scope.randomStacked = function() {
      $scope.stacked = [];
      var types = ['success', 'info', 'warning', 'danger'];

      for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
          var index = Math.floor((Math.random() * 4));
          $scope.stacked.push({
            value: Math.floor((Math.random() * 30) + 1),
            type: types[index]
          });
      }
    };
    $scope.randomStacked();
  }])
  ; 
  app.controller('TabsDemoCtrl', ['$scope', function($scope) {
    $scope.tabs = [
      { title:'Dynamic Title 1', content:'Dynamic content 1' },
      { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
    ];
  }])
  ; 
  app.controller('RatingDemoCtrl', ['$scope', function($scope) {
    $scope.rate = 7;
    $scope.max = 10;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };
  }])
  ; 
  app.controller('TooltipDemoCtrl', ['$scope', function($scope) {
    $scope.dynamicTooltip = 'Hello, World!';
    $scope.dynamicTooltipText = 'dynamic';
    $scope.htmlTooltip = 'I\'ve been made <b>bold</b>!';
  }])
  ; 
  app.controller('TypeaheadDemoCtrl', ['$scope', '$http','MyService','$state', '$filter', 'filterFilter',function($scope, $http, MyService, $state,$filter,filterFilter) {
    $scope.selected = undefined;

    $scope.items = null;
 
    $scope.item=null;
    $scope.selectItem2 = function(item){ 

    MyService.data.luz = 'on';
    
    $http.get('http://54.202.62.62:1346/articulo/?idUsuario='+MyService.data.idUsuario).then(function (resp) {
      $scope.items2 = resp.data.results;
    });
  
    $scope.group = item.categoria;
    // $scope.group.selected = true;
    $scope.filter = item.categoria;

      // alert ("dato: " +item.sexo);
      var identificador =item.id;
      var numero =item.barcode;
      var nombre =item.nombre;
      MyService.data.hembra = nombre;
      MyService.data.numero = numero;
      MyService.data.identificador = identificador;
      MyService.data.articulo = item;
   
 $scope.state = $state;
 // alert("estamos en "+$scope.state);
        $state.go('apps.articulo');
   $scope.sap=MyService.data.sap;
 
      };

   $scope.getLocation = function(val) {
      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: val,
          sensor: false
        }
      }).then(function(res){
        var addresses = [];
        angular.forEach(res.data.results, function(item){
          addresses.push(item.formatted_address);
        });
        return addresses;
      });
    };
  }])
  ; 
  app.controller('DatepickerDemoCtrl', ['$scope', function($scope) {
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    // $scope.disabled = function(date, mode) {
    //   return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    // };

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
    $scope.format = $scope.formats[0];
  }])
  ; 
  app.controller('TimepickerDemoCtrl', ['$scope', function($scope) {
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
      hstep: [1, 2, 3],
      mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
      $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
      var d = new Date();
      d.setHours( 14 );
      d.setMinutes( 0 );
      $scope.mytime = d;
    };

    $scope.changed = function () {
      //console.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function() {
      $scope.mytime = null;
    };
  }]);