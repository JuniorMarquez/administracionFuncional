'use strict';

/* Controllers */

app
  // Flot Chart controller 
  .controller('FlotChartDemoCtrl', ['$scope', '$http','$modal','MyService','$state','$filter','datepickerConfig','toaster',function($scope,$http,$modal,MyService,$state,$filter,datepickerConfi,toaster) {
      if (typeof MyService.data.email==="undefined"){
  $state.go('access.signin');
}
  $scope.toaster = {
    title: 'Exito',
    type: 'success',
    text: 'Datos de cuenta actualizados con exito',
  };
  $scope.filter = '';
if ($scope.app.status=="pendiente"){$scope.vigilante="no"};
if ($scope.app.status=="actualizado"){$scope.vigilante="si"};
  $scope.pop = function(){
    toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
  };
    $scope.item={};
        var result = [];
        var bandera="";
        var bandera2="";
        var identif="";
  $http.get('http://54.202.62.62:1346/mensaje').then(function (resp) {
    $scope.mensajes = resp.data.results;
 if ($scope.mensajes){
        for (var i  = 0; i<$scope.mensajes.length;i++){
          bandera = $scope.mensajes[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.mensajes[i].createdAtFormateada=bandera2;
           identif=$scope.mensajes[i].id;  
             $scope.mensajes[i].accion2="<button onclick=\"angular.element(this).scope().Borrado('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Borrar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
          
          identif=$scope.mensajes[i].id;  
    }
        }



  });
  $http.get('http://54.202.62.62:1346/obligacion').then(function (resp) {
    $scope.obligaciones = resp.data.results;
  });
   $http.get('http://54.202.62.62:1346/equipodirectivo').then(function (resp) {
    $scope.listadoDirectiva = resp.data.results;
  });


 $scope.nacionalidades = ['V','E'];

        $scope.anos=[];
        for (var i = 0; i < 88; ++i)
          {
            result.push(i+1930);
           $scope.anos=result;
        };

      var dato="";
  var datosCuenta="";
  $scope.nombre=MyService.data.nombre;
$scope.consultaSuscripcionDeArchivo=function(){
  var item2=[];
  var elemento=[];
  // var identificador = MyService.data.idensuscripcion;
  $scope.datosSuscripcionesDeArchivo={};
  $http.get('js/controllers/suscripcion.json').success(function(respuesta){        
    item2=respuesta.results;
    $scope.item2=item2;
      setTimeout(function() {
    for (var i = 0; i < $scope.item2.length; ++i)
      
          {
    elemento=$scope.item2[i];
          
              // alert("elemento:"+elemento.primerNombre);
            $http.post('http://54.202.62.62:1346/suscripcion/',elemento);
            
           
          // a=a+1;
           // $scope.anos=result;
        };
         }, 100);
      // alert("array:"+$scope.item2[2].primerNombre);
  });
  item2=$scope.item2;
  $scope.item2=item2;
  // alert("si");

};
$scope.cargador=function()
{
  $scope.consultaSuscripcionDeArchivo();
  // alert("array:" +$scope.item2[2].primerNombre);

};
$scope.cargaInicial=function  () {
 var totalSuscripciones=0;
 var totalCapacitacion=0;
 var totalInstagram=0;
  var totalTwitter=0;
 var totalFacebook=0;
 var totalFooter=0;
 var totalPendientes=0;
  var totalIncompany=0
 var totalValidados=0;
 var pendientes=0;
 var agenda = 0;
    $http.get('http://54.202.62.62:1346/suscripcion').then(function (resp) {
    $scope.suscripciones = resp.data.results;
 var numero = $scope.suscripciones.length;
 var letra = "";
 $scope.total= numero;
 for (var i = 0;i<$scope.suscripciones.length;i++){

 if(typeof($scope.suscripciones[i].cuentaI) != "undefined"){totalInstagram=totalInstagram+1;}
  if(typeof($scope.suscripciones[i].cuentaT) != "undefined"){totalTwitter=totalTwitter+ 1;}
 if(typeof($scope.suscripciones[i].telefono) != "undefined" || typeof($scope.suscripciones[i].movil) != "undefined"){agenda=agenda+1;}
 if(typeof($scope.suscripciones[i].cuentaF) != "undefined"){totalFacebook=totalFacebook+1;}
    if ($scope.suscripciones[i].tipo=='Odontologo'){
      totalSuscripciones=totalSuscripciones+1;
        // letra=$scope.suscripciones[i].primerNombre.charAt(0);
        // if (letra=="A"){
        //   $scope.agenda[indA]=$scope.suscripciones[i];indA=indA+1;
        // }
    }    
    if ($scope.suscripciones[i].tipoSuscripcion=='footer'){totalFooter=totalFooter+1};
    if ($scope.suscripciones[i].tipoSuscripcion=='capacitacion'){totalCapacitacion=totalCapacitacion+1;} 
        if ($scope.suscripciones[i].tipoSuscripcion=='incompany'){totalIncompany=totalIncompany+1;} 
    if ($scope.suscripciones[i].status=='pendiente'){totalPendientes=totalPendientes+1;}    
     if ($scope.suscripciones[i].status=='validada'){totalValidados=totalValidados+1;}  
 }
  $scope.totalPendientes=totalPendientes;
 $scope.totalSuscripciones=totalSuscripciones;
 $scope.totalCapacitacion=totalCapacitacion;
  $scope.totalFacebook=totalFacebook;
    $scope.totalTwitter=totalTwitter;
   $scope.totalInstagram=totalInstagram;
 $scope.totalFooter=totalFooter;
  $scope.totalIncompany=totalIncompany;
 $scope.totalValidados=totalValidados;
 $scope.app.porcentajeOdontologos=(totalValidados/totalSuscripciones)*100;
 $scope.agenda=agenda;
  });
};

$scope.cargaInicial();



$scope.guardar = function(item){
    $scope.pop();
    item.status='actualizado';
    $http.put('http://54.202.62.62:1346/suscripcion/'+MyService.data.idUsuario, item)
    $state.go('app.dashboard-v1');
};
  $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();
    $scope.totalSuscripciones=0;
    $scope.consultores=[];
    $scope.cargaSuscripciones = function(){
      $http.get('http://54.202.62.62:1346/suscripcion/').then(function (resp) {
        $scope.suscripciones = resp.data.results;
        // for (var i=0;i<$scope.consultores.length;++i){
        //   if($scope.consultores[i].sexo=='Macho'){
        //     $scope.consultores.push($scope.consultores[i]);
        //   }
        // }
        $scope.totalSuscripciones=$scope.suscripciones.length;
      });
    };
  // $scope.cargaSuscripciones();
  $scope.openContacto = function () {

// var dato="";
      var datosCuenta="";
      var item={};
//     $scope.item={};
    // $http.get('http://54.202.62.62:1346/configuracion').success(function(respuesta){
    //     $scope.configuracion = respuesta.results[0];
    //     $scope.item.mision=respuesta.results[0].mision; 
    // });
    // setTimeout(function() {    
    //   datosCuenta=$scope.item;
    //   $scope.item.datosCuenta=datosCuenta;
    //   MyService.data.mision=$scope.item.mision;
    // }, 300);
    // $scope.item.datosCuenta=datosCuenta;
    // setTimeout(function() {  
        // $scope.item.mision=MyService.data.mision;
       
        // var item=[];
        // item=$scope.item;
        //  // alert ("hola"+item.mision);
        //  // var datosCuenta=[];
        //  datosCuenta=item;
        //  alert(""+datosCuenta.mision);
        var modalInstance = $modal.open({
        templateUrl: 'modalContacto.html',
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
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
   });

};

    $scope.openListadoTiposCapacitaciones = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalListadoTiposCapacitaciones.html',
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
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };
   $scope.openListadoTiposNoticias = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalListadoTiposNoticias.html',
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
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };


   $scope.openListadoTiposPublicaciones = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalListadoTiposPublicaciones.html',
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
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

    $scope.openEmail = function (item) {

      var modalInstance = $modal.open({
        templateUrl: 'modalEmail.html',
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
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };
    $scope.openElectoral = function (item) {

      var modalInstance = $modal.open({
        templateUrl: 'modalElectoral.html',
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
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };





  $scope.openDirectiva = function (item) {

      var modalInstance = $modal.open({
        templateUrl: 'modalDirectiva.html',
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
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


  $scope.openComite = function (item) {

      var modalInstance = $modal.open({
        templateUrl: 'modalComite.html',
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
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };



  $scope.openTipoCapacitacion= function (item) {

      var modalInstance = $modal.open({
        templateUrl: 'modalTipoCapacitacion.html',
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
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.openTipoNoticia= function (item) {

      var modalInstance = $modal.open({
        templateUrl: 'modalTipoNoticia.html',
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
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
$scope.openTipoPublicacion= function (item) {

      var modalInstance = $modal.open({
        templateUrl: 'modalTipoPublicacion.html',
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
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };



    $scope.openListadoDirectiva = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalListadoDirectiva.html',
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
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };
   $scope.openListadoEmail = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalListadoEmail.html',
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
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

   $scope.openListadoElectoral = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalListadoElectoral.html',
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
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

    $scope.openListadoComite = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalListadoComite.html',
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
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

    $scope.openListadoAreasConocimiento = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalListadoAreasConocimiento.html',
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
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.openAreaConocimiento = function (item) {

      var modalInstance = $modal.open({
        templateUrl: 'modalAreaConocimiento.html',
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
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


  // Municipios 

    $scope.openListadoObligaciones = function (item) {
    // var identificador=item.id;
    // MyService.data.identificador = identificador;
      var modalInstance = $modal.open({
        templateUrl: 'modalListadoObligaciones.html',
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
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.openObligacion = function (item) {

      var modalInstance = $modal.open({
        templateUrl: 'modalObligacion.html',
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
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

   // Fin municipios 


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


    $scope.d = [ [1,12],[2,11],[3,12],[4,8],[5,7.5],[6,7],[7,6.8],[8,7],[9,7.2],[10,7] ];

    $scope.d0_1 = [ [0,7],[1,6.5],[2,12.5],[3,7],[4,9],[5,6],[6,11],[7,6.5],[8,8],[9,7] ];

    $scope.d0_2 = [ [0,4],[1,4.5],[2,7],[3,4.5],[4,3],[5,3.5],[6,6],[7,3],[8,4],[9,3] ];

    $scope.d1_1 = [ [10, 120], [20, 70], [30, 70], [40, 60] ];

    $scope.d1_2 = [ [10, 50], [20, 60], [30, 90], [40, 35] ];

    $scope.d1_3 = [ [10, 80], [20, 40], [30, 30], [40, 20] ];

    $scope.d2 = [];

    for (var i = 0; i < 20; ++i) {
      $scope.d2.push([i, Math.sin(i)]);
    }   

    $scope.d3 = [ 
      { label: "iPhone5S", data: 40 }, 
      { label: "iPad Mini", data: 10 },
      { label: "iPad Mini Retina", data: 20 },
      { label: "iPhone4S", data: 12 },
      { label: "iPad Air", data: 18 }
    ];

    $scope.refreshData = function(){
      $scope.d0_1 = $scope.d0_2;
    };

    $scope.getRandomData = function() {
      var data = [],
      totalPoints = 150;
      if (data.length > 0)
        data = data.slice(1);
      while (data.length < totalPoints) {
        var prev = data.length > 0 ? data[data.length - 1] : 50,
          y = prev + Math.random() * 10 - 5;
        if (y < 0) {
          y = 0;
        } else if (y > 100) {
          y = 100;
        }
        data.push(y);
      }
      // Zip the generated y values with the x values
      var res = [];
      for (var i = 0; i < data.length; ++i) {
        res.push([i, data[i]])
      }
      return res;
    }
 function activate() {
       $scope.filter = '';
    

    };
 
  }]);