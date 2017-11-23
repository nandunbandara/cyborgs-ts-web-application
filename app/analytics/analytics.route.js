'use strict';

angular.module('cts.analytics.route',[])

.config(($stateProvider, $urlRouterProvider)=>{

    $stateProvider

        .state('login', {

        url:'/schedule',
        templateUrl: 'app/analytics/templates/schedule-mgt.html',
        controller: 'scheduleController as schedule'

        })

})