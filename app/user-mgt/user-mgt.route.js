'use strict';

angular.module('cts.user-mgt.route',[])

.config(($stateProvider, $urlRouterProvider)=>{
    $urlRouterProvider
        .otherwise('/');

    /*
        Enable below lines when need
     */

    // $stateProvider
    //     .state('',{
    //         url:'',
    //         templateUrl: '',
    //         controller: ''
    //     })
})