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

        .state('signUp',{
            url:'/signup',
            templateUrl: 'app/user-mgt/templates/sign-up.html',
            controller: 'signUpCtrl as signUp'
        })

        .state('test',{
            url:'/test',
            templateUrl: 'app/user-mgt/templates/user-mgt.html',
            controller: ''
        })

})