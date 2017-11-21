'use strict';

angular.module('cts.dashboard.route', [])

.config(($stateProvider, $urlRouterProvider)=>{
    $urlRouterProvider
        .otherwise('/');

    $stateProvider
        .state('dashboard',{
            url:'/dashboard',
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'dashboardCtrl as dash'
        })

        .state('dashboard.feed',{
            url:'/feed',
            templateUrl: 'app/dashboard/feed.html',
            controller: 'feedCtrl as feed'
        })

})