'use strict'

angular.module('cts.trip-mgt.route', [])

    .config(($stateProvider, $urlRouterProvider)=>{
        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state('dashboard.trip',{
                url:'/trip',
                templateUrl: 'app/trip-mgt/main-view.html',
                controller: 'tripCtrl as trip'
            })
    })