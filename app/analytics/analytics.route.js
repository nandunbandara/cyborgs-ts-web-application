'use strict';

angular.module('cts.analytics.route',[])

.config(($stateProvider, $urlRouterProvider)=>{

    $stateProvider

        .state('dashboard.analytics',{

            url:'/analytics',
            templateUrl:'app/analytics/templates/analytics-mgt.html',

        })

        .state('dashboard.schedule', {

        url:'/schedule',
        templateUrl: 'app/analytics/templates/schedule-mgt.html',
        controller: 'scheduleController as schedule'

        })

        .state('dashboard.inspection', {

        url:'/inspection',
        templateUrl: 'app/analytics/templates/inspection-mgt.html',
        controller: 'inspectionController as inspection'

    })

})