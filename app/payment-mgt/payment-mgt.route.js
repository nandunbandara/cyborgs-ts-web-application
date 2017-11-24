'use strict';

angular.module('cts.payment-mgt.route',[])

.config(($stateProvider, $urlRouterProvider)=>{
    $urlRouterProvider
        .otherwise('/');


    $stateProvider
        .state('dashboard.payment',{
            url:'/payments',
            templateUrl: 'app/payment-mgt/main-view.html',
            controller: 'paymentCtrl as payment'
        })
})