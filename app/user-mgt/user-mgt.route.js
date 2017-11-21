'use strict';

angular.module('cts.user-mgt.route',[])

.config(($stateProvider, $urlRouterProvider)=>{
    $urlRouterProvider
        .otherwise('/');

    $stateProvider
        .state('login',{
            url:'/login',
            templateUrl: 'app/user-mgt/templates/login.html',
            controller: 'loginCtrl as login'
        })
})