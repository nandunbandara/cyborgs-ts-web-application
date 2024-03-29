'use strict';

angular.module('cts.routes', [
    'ui.router',
    'cts.dashboard.route',
    'cts.analytics.route',
    'cts.trip-mgt.route',
    'cts.trip-mgt.controller',
    'cts.user-mgt.route',
    'cts.user-mgt.controller',
    'cts.payment-mgt.route',
    'cts.user-mgt.helper',
    'cts.trip-mgt.helper'

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
