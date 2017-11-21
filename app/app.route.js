'use strict';

angular.module('cts.routes', [
    'ui.router',
    'cts.dashboard.route',
    'cts.analytics.route',
    'cts.trip-mgt.route',
    'cts.user-mgt.route',
    'cts.payment-mgt.route'

])

.config(($stateProvider, $urlRouterProvider)=>{
    $urlRouterProvider
        .otherwise('/');

    $stateProvider
        .state('home',{
            url:'/',
            templateUrl: 'app/core/home.html'
        })
})
