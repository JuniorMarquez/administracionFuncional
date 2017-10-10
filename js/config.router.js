'use strict';
app.factory('MyService',function(){
return {
    data: {}
  };

});
/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {
          
          // $urlRouterProvider
          //     .otherwise('/app/dashboard-v1');
          // $stateProvider
          //     .state('app', {
          //         abstract: true,
          //         url: '/app',
          //         templateUrl: 'tpl/app.html'
          //     })
 
             $urlRouterProvider
              .otherwise('/app/dashboard-v1');
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'tpl/app.html'
              })
             
             

              
              .state('app.dashboard-v1', {
                  url: '/dashboard-v1',
                  templateUrl: 'tpl/app_dashboard_v1.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select','toaster']).then(
                              function(){
                                  return $ocLazyLoad.load(['js/controllers/chart.js',
                                                  'js/controllers/bootstrap.js']);
                              }
                          );
                      }]
                  }
                  })
              .state('app.dashboard-v1a', {
                  url: '/dashboard-v1a',
                  templateUrl: 'tpl/app_dashboard_v1a.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select','toaster']).then(
                              function(){
                                  return $ocLazyLoad.load(['js/controllers/chart.js',
                                                  'js/controllers/bootstrap.js']);
                              }
                          );
                      }]
                  }
                  })
              //  .state('app.capacitaciones', {
              //     url: '/capacitaciones',
              //     templateUrl: 'tpl/apps_capacitaciones.html',
              //     resolve: {
              //         deps: ['$ocLazyLoad',
              //           function( $ocLazyLoad ){
              //             return $ocLazyLoad.load(['ui.select','toaster','ngGrid']).then(
              //                 function(){
              //                     return $ocLazyLoad.load([
              //                       'js/controllers/chart.js',
              //                                     'js/controllers/bootstrap.js',
              //                                     'js/app/capacitaciones/capacitaciones.js'
              //                                     ]);
              //                 }
              //             );
              //         }]
              //     }

              // })
              .state('app.enlaces', {
                  url: '/enlaces',
                  templateUrl: 'tpl/apps_enlaces.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select','toaster','ngGrid']).then(
                              function(){
                                  return $ocLazyLoad.load([
                                    'js/controllers/chart.js',
                                                  'js/controllers/bootstrap.js',
                                                  'js/app/enlaces/enlaces.js'
                                                  ]);
                              }
                          );
                      }]
                  }
              })        
              .state('app.dashboard-v2', {
                  url: '/dashboard-v2',
                  templateUrl: 'tpl/app_dashboard_v2.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/chart.js']);
                    }]
                  }
              })

              .state('app.ui', {
                  url: '/ui',
                  template: '<div ui-view class="fade-in-up"></div>'
              })
              .state('app.ui.buttons', {
                  url: '/buttons',
                  templateUrl: 'tpl/ui_buttons.html'
              })
              .state('app.ui.icons', {
                  url: '/icons',
                  templateUrl: 'tpl/ui_icons.html'
              })
              .state('app.ui.grid', {
                  url: '/grid',
                  templateUrl: 'tpl/ui_grid.html'
              })
              .state('app.ui.widgets', {
                  url: '/widgets',
                  templateUrl: 'tpl/ui_widgets.html'
              })          
              .state('app.ui.bootstrap', {
                  url: '/bootstrap',
                  templateUrl: 'tpl/ui_bootstrap.html'
              })
              .state('app.ui.sortable', {
                  url: '/sortable',
                  templateUrl: 'tpl/ui_sortable.html'
              })
              .state('app.ui.portlet', {
                  url: '/portlet',
                  templateUrl: 'tpl/ui_portlet.html'
              })
              .state('app.ui.timeline', {
                  url: '/timeline',
                  templateUrl: 'tpl/ui_timeline.html'
              })
              .state('app.ui.tree', {
                  url: '/tree',
                  templateUrl: 'tpl/ui_tree.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('angularBootstrapNavTree').then(
                              function(){
                                 return $ocLazyLoad.load('js/controllers/tree.js');
                              }
                          );
                        }
                      ]
                  }
              })
              .state('app.ui.toaster', {
                  url: '/toaster',
                  templateUrl: 'tpl/ui_toaster.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('toaster').then(
                              function(){
                                 return $ocLazyLoad.load('js/controllers/toaster.js');
                              }
                          );
                      }]
                  }
              })
              .state('app.ui.jvectormap', {
                  url: '/jvectormap',
                  templateUrl: 'tpl/ui_jvectormap.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('js/controllers/vectormap.js');
                      }]
                  }
              })
              .state('app.ui.googlemap', {
                  url: '/googlemap',
                  templateUrl: 'tpl/ui_googlemap.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( [
                            'js/app/map/load-google-maps.js',
                            'js/app/map/ui-map.js',
                            'js/app/map/map.js'] ).then(
                              function(){
                                return loadGoogleMaps(); 
                              }
                            );
                      }]
                  }
              })
              .state('app.chart', {
                  url: '/chart',
                  templateUrl: 'tpl/ui_chart.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad){
                          return uiLoad.load('js/controllers/chart.js');
                      }]
                  }
              })
              // table
              .state('app.table', {
                  url: '/table',
                  template: '<div ui-view></div>'
              })
              .state('app.table.static', {
                  url: '/static',
                  templateUrl: 'tpl/table_static.html'
              })
              .state('app.table.datatable', {
                  url: '/datatable',
                  templateUrl: 'tpl/table_datatable.html',
              })
              .state('app.table.footable', {
                  url: '/footable',
                  templateUrl: 'tpl/table_footable.html'
              })
              .state('app.table.grid', {
                  url: '/grid',
                  templateUrl: 'tpl/table_grid.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('ngGrid').then(
                              function(){
                                  return $ocLazyLoad.load('js/controllers/grid.js');
                              }
                          );
                      }]
                  }
              })
    
              .state('app.form', {
                  url: '/form',
                  template: '<div ui-view class="fade-in"></div>',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad){
                          return uiLoad.load('js/controllers/form.js');
                      }]
                  }
              })

                 


              // .state('app.form.ajustes', {
              //     url: '/ajustes',
              //     templateUrl: 'tpl/form_ajustes.html'
              // })
              .state('app.form.elements', {
                  url: '/elements',
                  templateUrl: 'tpl/form_elements.html'
              })
              .state('app.form.validation', {
                  url: '/validation',
                  templateUrl: 'tpl/form_validation.html'
              })
              .state('app.form.wizard', {
                  url: '/wizard',
                  templateUrl: 'tpl/form_wizard.html'
              })
              //  .state('app.form.xeditable', {
              //     url: '/xeditable',
              //     templateUrl: 'tpl/form_xeditable.html',
              //     controller: 'XeditableCtrl',
              //     resolve: load(['xeditable','js/controllers/xeditable.js'])
              // })
               .state('app.form.xeditable', {
                  url: '/xeditable',
                  templateUrl: 'tpl/form_xeditable.html',
                  controller: 'XeditableCtrl',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('xeditable').then(
                              function(){
                                 return $ocLazyLoad.load('js/controllers/xeditable.js');
                              }
                          );
                      }]
                  }
              })
              .state('app.form.fileupload', {
                  url: '/fileupload',
                  templateUrl: 'tpl/form_fileupload.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('angularFileUpload').then(
                              function(){
                                 return $ocLazyLoad.load('js/controllers/file-upload.js');
                              }
                          );
                      }]
                  }
              })
              .state('app.form.imagecrop', {
                  url: '/imagecrop',
                  templateUrl: 'tpl/form_imagecrop.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('ngImgCrop').then(
                              function(){
                                 return $ocLazyLoad.load('js/controllers/imgcrop.js');
                              }
                          );
                      }]
                  }
              })
              .state('app.form.select', {
                  url: '/select',
                  templateUrl: 'tpl/form_select.html',
                  controller: 'SelectCtrl',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('ui.select').then(
                              function(){
                                  return $ocLazyLoad.load('js/controllers/select.js');
                              }
                          );
                      }]
                  }
              })
              .state('app.form.slider', {
                  url: '/slider',
                  templateUrl: 'tpl/form_slider.html',
                  controller: 'SliderCtrl',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('vr.directives.slider').then(
                              function(){
                                  return $ocLazyLoad.load('js/controllers/slider.js');
                              }
                          );
                      }]
                  }
              })
              .state('app.form.editor', {
                  url: '/editor',
                  templateUrl: 'tpl/form_editor.html',
                  controller: 'EditorCtrl',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('textAngular').then(
                              function(){
                                  return $ocLazyLoad.load('js/controllers/editor.js');
                              }
                          );
                      }]
                  }
              })
              // pages
               
              .state('app.page', {
                  url: '/page',
                  template: '<div ui-view class="fade-in-down"></div>'
              })
              .state('app.page.inicio', {
                  url: '/inicio',
                  templateUrl: 'tpl/page_inicio.html'
              })

            .state('app.page.profile', {
                  url: '/profile',
                  templateUrl: 'tpl/page_profile.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/signin.js',
                            'js/controllers/bootstrap.js',
                            'js/controllers/chart.js'] );
                      }]
                  }
              })

            .state('app.page.nomina', {
                  url: '/nomina',
                  templateUrl: 'tpl/page_nomina.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/signin.js',
                            'js/controllers/bootstrap.js',
                            'js/controllers/chart.js'] );
                      }]
                  }
              })

              // .state('app.page.profile', {
              //     url: '/profile',
              //     templateUrl: 'tpl/page_profile.html'
              // })
              .state('app.page.post', {
                  url: '/post',
                  templateUrl: 'tpl/page_post.html'
              })
              .state('app.page.search', {
                  url: '/search',
                  templateUrl: 'tpl/page_search.html'
              })
              .state('app.page.invoice', {
                  url: '/invoice',
                  templateUrl: 'tpl/page_invoice.html'
              })
              .state('app.page.price', {
                  url: '/price',
                  templateUrl: 'tpl/page_price.html'
              })
              .state('app.docs', {
                  url: '/docs',
                  templateUrl: 'tpl/docs.html'
              })
              // others
              .state('lockme', {
                  url: '/lockme',
                  templateUrl: 'tpl/page_lockme.html'
              })
              .state('access', {
                  url: '/access',
                  template: '<div ui-view class="fade-in-right-big smooth"></div>'
              })



                .state('access.ok', {
                  url: '/ok',
                  templateUrl: 'tpl/page_ok.html',
                  resolve: {

                    deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select','toaster']).then(
                              function(){
                                return $ocLazyLoad.load( ['js/controllers/signin.js',
                                  'js/controllers/chart.js',
                                'js/controllers/bootstrap.js'
                                                  ]);
                              }
                          );
                      }]
                      // deps: ['uiLoad',
                      //   function( uiLoad ){
                      //     return uiLoad.load( ['js/controllers/signin.js','js/controllers/bootstrap.js'] );
                      // }]
                  }
              })
              .state('access.signin', {
                  url: '/signin',
                  templateUrl: 'tpl/page_signin.html',
                  resolve: {

                    deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select','toaster']).then(
                              function(){
                                return $ocLazyLoad.load( ['js/controllers/signin.js',
                                  'js/controllers/chart.js',
                                'js/controllers/bootstrap.js'
                                                  ]);
                              }
                          );
                      }]
                      // deps: ['uiLoad',
                      //   function( uiLoad ){
                      //     return uiLoad.load( ['js/controllers/signin.js','js/controllers/bootstrap.js'] );
                      // }]
                  }
              })
              .state('access.signup', {
                  url: '/signup',
                  templateUrl: 'tpl/page_signup.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select','toaster']).then(
                              function(){
                                return $ocLazyLoad.load( ['js/controllers/signup.js',
                             'js/controllers/chart2.js',
                                'js/controllers/bootstrap.js'
                                                  ]);
                              }
                          );
                      }]


                      // deps: ['uiLoad',
                      //   function( uiLoad ){
                      //     return uiLoad.load( ['js/controllers/signup.js',
                      //        'js/controllers/chart.js',
                      //           'js/controllers/bootstrap.js'] );
                      // }]
                  }
              })
              .state('access.forgotpwd', {
                  url: '/forgotpwd',
                  templateUrl: 'tpl/page_forgotpwd.html'
              })
              .state('access.404', {
                  url: '/404',
                  templateUrl: 'tpl/page_404.html'
              })

              // fullCalendar
              .state('app.calendar', {
                  url: '/calendar',
                  templateUrl: 'tpl/app_calendar.html',
                  // use resolve to load other dependences
                  resolve: {
                      deps: ['$ocLazyLoad', 'uiLoad',
                        function( $ocLazyLoad, uiLoad ){
                          return uiLoad.load(
                            ['vendor/jquery/fullcalendar/fullcalendar.css',
                              'vendor/jquery/fullcalendar/theme.css',
                              'vendor/jquery/jquery-ui-1.10.3.custom.min.js',
                              'vendor/libs/moment.min.js',
                              'vendor/jquery/fullcalendar/fullcalendar.min.js',
                              'js/app/calendar/calendar.js']
                          ).then(
                            function(){
                              return $ocLazyLoad.load('ui.calendar');
                            }
                          )
                      }]
                  }
              })

              // mail
              .state('app.mail', {
                  abstract: true,
                  url: '/mail',
                  templateUrl: 'tpl/mail.html',
                  // use resolve to load other dependences
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/app/mail/mail.js',
                                               'js/app/mail/mail-service.js',
                                               'vendor/libs/moment.min.js'] );
                      }]
                  }
              })
              .state('app.mail.list', {
                  url: '/inbox/{fold}',
                  templateUrl: 'tpl/mail.list.html'
              })
              .state('app.mail.detail', {
                  url: '/{mailId:[0-9]{1,4}}',
                  templateUrl: 'tpl/mail.detail.html'
              })
              .state('app.mail.compose', {
                  url: '/compose',
                  templateUrl: 'tpl/mail.new.html'
              })

              .state('layout', {
                  abstract: true,
                  url: '/layout',
                  templateUrl: 'tpl/layout.html'
              })
              .state('layout.fullwidth', {
                  url: '/fullwidth',
                  views: {
                      '': {
                          templateUrl: 'tpl/layout_fullwidth.html'
                      },
                      'footer': {
                          templateUrl: 'tpl/layout_footer_fullwidth.html'
                      }
                  },
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/vectormap.js'] );
                      }]
                  }
              })
              .state('layout.mobile', {
                  url: '/mobile',
                  views: {
                      '': {
                          templateUrl: 'tpl/layout_mobile.html'
                      },
                      'footer': {
                          templateUrl: 'tpl/layout_footer_mobile.html'
                      }
                  }
              })
              .state('layout.app', {
                  url: '/app',
                  views: {
                      '': {
                          templateUrl: 'tpl/layout_app.html'
                      },
                      'footer': {
                          templateUrl: 'tpl/layout_footer_fullwidth.html'
                      }
                  },
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/tab.js'] );
                      }]
                  }
              })
              .state('apps', {
                  abstract: true,
                  url: '/apps',
                  templateUrl: 'tpl/layout.html'
              })
              .state('apps.note', {
                  url: '/note',
                  templateUrl: 'tpl/apps_note.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/app/note/note.js',
                                               'vendor/libs/moment.min.js'] );
                      }]
                  }
              })

              //  .state('app.form.select', {
              //     url: '/select',
              //     templateUrl: 'tpl/form_select.html',
              //     controller: 'SelectCtrl',
              //     resolve: {
              //         deps: ['$ocLazyLoad',
              //           function( $ocLazyLoad ){
              //             return $ocLazyLoad.load('ui.select').then(
              //                 function(){
              //                     return $ocLazyLoad.load('js/controllers/select.js');
              //                 }
              //             );
              //         }]
              //     }
              // })
// .state('apps.articulo', {
//                   url: '/articulo',
//                   templateUrl: 'tpl/apps_articuloes.html',
//                   resolve: {
//                       deps: ['uiLoad',
//                         function( uiLoad ){
//                           return uiLoad.load( ['js/app/articulo/articulo.js'] );
//                       }]
//                   }
//               })
.state('app.form.ajustes', {
                  url: '/ajustes',
                  templateUrl: 'tpl/form_ajustes.html',
                   resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select','toaster']).then(
                              function(){
                                  return $ocLazyLoad.load('js/app/ajustes/ajustes.js');
                              }
                          );
                      }]
                  }
                 
              })
              .state('app.nueva', {
                  url: '/nueva',
                  templateUrl: 'tpl/apps_nuevaSolicitud.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select','toaster','ngGrid']).then(
                              function(){
                                  return $ocLazyLoad.load([
                                    'js/app/solicitudesClientes/nuevaSolicitud.js',
                                    'js/controllers/chart.js',
                                    'js/controllers/bootstrap.js'
                                                  ]);
                              }
                          );
                      }]
                  }
              })
              .state('apps.todas', {
                  url: '/todas',
                  templateUrl: 'tpl/apps_solicitudesC.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select','toaster','ngGrid']).then(
                              function(){
                                  return $ocLazyLoad.load([
                                    'js/controllers/chart.js',
                                                  'js/controllers/bootstrap.js',
                                                  'js/app/solicitudesClientes/solicitudesC.js'
                                                  ]);
                              }
                          );
                      }]
                  }
              })
              .state('apps.solicitudes', {
                  url: '/solicitudes',
                  templateUrl: 'tpl/apps_solicitudes.html',
                   resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select','toaster']).then(
                              function(){
                                return $ocLazyLoad.load( ['js/app/solicitudes/solicitudes.js',
                                  'js/controllers/chart.js',
                                'js/controllers/bootstrap.js'
                                                  ]);
                              }
                          );
                      }]
                  }
              })
              .state('apps.facilitadores', {
                  url: '/facilitadores',
                  templateUrl: 'tpl/apps_facilitadores.html',
                   resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select','toaster']).then(
                              function(){
                                return $ocLazyLoad.load( [
                                  'js/controllers/chart2.js',
                                'js/controllers/bootstrap.js',
                                'js/app/facilitadores/facilitadores.js'
                                                  ]);
                              }
                          );
                      }]
                  }
                 
              })
              .state('apps.slides', {
                  url: '/slides',
                  templateUrl: 'tpl/apps_slides.html',
                   resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select','toaster']).then(
                              function(){
                                return $ocLazyLoad.load( [
                                  'js/controllers/chart2.js',
                                'js/controllers/bootstrap.js',
                                'js/app/slides/slides.js'
                                                  ]);
                              }
                          );
                      }]
                  }
                 
              })
              .state('app.agregarfac', {
                  url: '/agregarfac',
                  templateUrl: 'tpl/apps_agregarFacilitador.html',
                   resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select','toaster','angularFileUpload']).then(
                              function(){
                                return $ocLazyLoad.load( [
                                  'js/controllers/chart2.js',
                                'js/controllers/bootstrap.js',
                                'js/app/facilitadores/agregarfac.js',
                                'js/controllers/file-upload.js']);
                              }
                          );
                      }]
                  }
                  })
              .state('app.agregarslide', {
                  url: '/agregarslide',
                  templateUrl: 'tpl/apps_agregarSlide.html',
                   resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select','toaster','angularFileUpload']).then(
                              function(){
                                return $ocLazyLoad.load( [
                                  'js/controllers/chart2.js',
                                'js/controllers/bootstrap.js',
                                'js/app/slides/agregarslide.js',
                                'js/controllers/file-upload.js']);
                              }
                          );
                      }]
                  }
                  })
              .state('app.suscripciones', {
                  url: '/suscripciones',
                  templateUrl: 'tpl/app_suscripciones.html',
                   resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select','toaster']).then(
                              function(){
                                return $ocLazyLoad.load( [
                                  'js/controllers/chart2.js',
                                'js/controllers/bootstrap.js',
                                'js/app/suscripciones/suscripciones.js'
                                                  ]);
                              }
                          );
                      }]
                  }
                 
              })
        .state('app.agregarcap', {
                  url: '/agregarcap',
                  templateUrl: 'tpl/apps_agregarCapacitacion.html',
                   resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select','toaster','angularFileUpload']).then(
                              function(){
                                return $ocLazyLoad.load( [
                                  'js/controllers/chart2.js',
                                'js/controllers/bootstrap.js',
                                'js/app/capacitaciones/agregarcap.js',
                                'js/controllers/file-upload.js']);
                              }
                          );
                      }]
                  }
                  })
              .state('apps.capgestionar', {
                  url: '/gestionar',
                  templateUrl: 'tpl/apps_capacitaciones.html',
                   resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select','toaster','angularFileUpload']).then(
                              function(){
                                return $ocLazyLoad.load( [
                                  'js/controllers/chart2.js',
                                'js/controllers/bootstrap.js',
                                'js/app/capacitaciones/capacitaciones.js',
                                'js/controllers/file-upload.js']);
                              }
                          );
                      }]
                  }
                  })
                   .state('apps.caplistado', {
                  url: '/listado',
                  templateUrl: 'tpl/apps_listadoCapacitacines.html',
                   resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select','toaster','angularFileUpload']).then(
                              function(){
                                return $ocLazyLoad.load( [
                                  'js/controllers/chart2.js',
                                'js/controllers/bootstrap.js',
                                'js/app/capacitaciones/capacitaciones.js',
                                'js/controllers/file-upload.js']);
                              }
                          );
                      }]
                  }
                })
                   // ############################################
                   .state('app.agregarnot', {
                  url: '/agregarnot',
                  templateUrl: 'tpl/apps_agregarNoticia.html',
                   resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select','toaster','angularFileUpload']).then(
                              function(){
                                return $ocLazyLoad.load( [
                                  'js/controllers/chart2.js',
                                'js/controllers/bootstrap.js',
                                'js/app/noticias/agregarnot.js',
                                'js/controllers/file-upload.js']);
                              }
                          );
                      }]
                  }
                  })
              .state('apps.notgestionar', {
                  url: '/gestionarnot',
                  templateUrl: 'tpl/apps_noticias.html',
                   resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select','toaster','angularFileUpload']).then(
                              function(){
                                return $ocLazyLoad.load( [
                                  'js/controllers/chart2.js',
                                'js/controllers/bootstrap.js',
                                'js/app/noticias/noticias.js',
                                'js/controllers/file-upload.js']);
                              }
                          );
                      }]
                  }
                  })
                   .state('app.notlistado', {
                  url: '/listadonot',
                  templateUrl: 'tpl/apps_listadoNoticias.html',
                   resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select','toaster','angularFileUpload']).then(
                              function(){
                                return $ocLazyLoad.load( [
                                  'js/controllers/chart2.js',
                                'js/controllers/bootstrap.js',
                                'js/app/noticias/noticias2.js',
                                'js/controllers/file-upload.js']);
                              }
                          );
                      }]
                  }
                })
                   // ###############################################


                                      // ############################################
                   .state('app.agregarpub', {
                  url: '/agregarpub',
                  templateUrl: 'tpl/apps_agregarPublicacion.html',
                   resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select','toaster','angularFileUpload']).then(
                              function(){
                                return $ocLazyLoad.load( [
                                  'js/controllers/chart2.js',
                                'js/controllers/bootstrap.js',
                                'js/app/publicaciones/agregarpub.js',
                                'js/controllers/file-upload.js']);
                              }
                          );
                      }]
                  }
                  })
              .state('apps.pubgestionar', {
                  url: '/gestionarpub',
                  templateUrl: 'tpl/apps_publicaciones.html',
                   resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select','toaster','angularFileUpload']).then(
                              function(){
                                return $ocLazyLoad.load( [
                                  'js/controllers/chart2.js',
                                'js/controllers/bootstrap.js',
                                'js/app/publicaciones/publicaciones.js',
                                'js/controllers/file-upload.js']);
                              }
                          );
                      }]
                  }
                  })
                   .state('app.publistado', {
                  url: '/listadopub',
                  templateUrl: 'tpl/apps_listadoPublicaciones.html',
                   resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select','toaster','angularFileUpload']).then(
                              function(){
                                return $ocLazyLoad.load( [
                                //   'js/controllers/chart2.js',
                                // 'js/controllers/bootstrap.js',
                                'js/app/publicaciones/publicaciones2.js',
                                'js/controllers/file-upload.js']);
                              }
                          );
                      }]
                  }
                })
                   // ###############################################


              .state('apps.detallesSolicitud', {
                  url: '/detallesSolicitud',
                  templateUrl: 'tpl/apps_detallesSolicitud.html',
                   resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(['ui.select','toaster']).then(
                              function(){
                                return $ocLazyLoad.load( ['js/app/solicitudes/detallesSolicitud.js',
                                  'js/controllers/chart.js',
                                'js/controllers/bootstrap.js'
                                                  ]);
                              }
                          );
                      }]
                  }
                 
              })
              .state('apps.contact', {
                  url: '/contact',
                  templateUrl: 'tpl/apps_contact.html',
                   resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('ui.select').then(
                              function(){
                                  return $ocLazyLoad.load('js/app/contact/contact.js');
                              }
                          );
                      }]
                  }
              })
              .state('app.weather', {
                  url: '/weather',
                  templateUrl: 'tpl/apps_weather.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(
                              {
                                  name: 'angular-skycons',
                                  files: ['js/app/weather/skycons.js',
                                          'vendor/libs/moment.min.js', 
                                          'js/app/weather/angular-skycons.js',
                                          'js/app/weather/ctrl.js' ] 
                              }
                          );
                      }]
                  }
              })
              .state('music', {
                  url: '/music',
                  templateUrl: 'tpl/music.html',
                  controller: 'MusicCtrl',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load([
                            'com.2fdevs.videogular', 
                            'com.2fdevs.videogular.plugins.controls', 
                            'com.2fdevs.videogular.plugins.overlayplay',
                            'com.2fdevs.videogular.plugins.poster',
                            'com.2fdevs.videogular.plugins.buffering',
                            'js/app/music/ctrl.js', 
                            'js/app/music/theme.css'
                          ]);
                      }]
                  }
              })
                .state('music.home', {
                    url: '/home',
                    templateUrl: 'tpl/music.home.html'
                })
                .state('music.genres', {
                    url: '/genres',
                    templateUrl: 'tpl/music.genres.html'
                })
                .state('music.detail', {
                    url: '/detail',
                    templateUrl: 'tpl/music.detail.html'
                })
                .state('music.mtv', {
                    url: '/mtv',
                    templateUrl: 'tpl/music.mtv.html'
                })
                .state('music.mtvdetail', {
                    url: '/mtvdetail',
                    templateUrl: 'tpl/music.mtv.detail.html'
                })
                .state('music.playlist', {
                    url: '/playlist/{fold}',
                    templateUrl: 'tpl/music.playlist.html'
                })
      }
    ]
  );