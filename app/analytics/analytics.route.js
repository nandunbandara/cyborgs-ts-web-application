'use strict';

angular.module('cts.analytics.route',[])

.config(($stateProvider, $urlRouterProvider)=>{

    $stateProvider

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