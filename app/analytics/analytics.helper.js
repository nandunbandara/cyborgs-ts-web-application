'use strict'
angular.module('cts.analytics')

   .factory('Schedule',['$http',function ($http) {

       const scheduleFactory = {};

       scheduleFactory.getAllSchedules = function () {

           return $http.get('https://cyborgs-ts-analytics-service.herokuapp.com/schedules').then(function (res) {
               return res;
           })

       };

       scheduleFactory.getSchedule = function(data){

           return $http.get('https://cyborgs-ts-analytics-service.herokuapp.com/schedules/' + data).then(function (res) {
               return res;
           })

       };

       scheduleFactory.getScheduleByScheduleId = function(data){

           return $http.get('https://cyborgs-ts-analytics-service.herokuapp.com/schedules/' + data).then(function (res) {
               return res;
           })

       };

       scheduleFactory.getBuses = function(data){

           return $http.get('https://cyborgs-ts-analytics-service.herokuapp.com/buses').then(function (res) {
               return res;
           })

       };

       scheduleFactory.addSchedule = function (data) {

           return $http.post('https://cyborgs-ts-analytics-service.herokuapp.com/schedules', data).then(function (res) {
               return res;
           })

       };

       // scheduleFactory.updateSchedule = function (data) {
       //
       //     return $http.put('https://cyborgs-ts-analytics-service.herokuapp.com/schedules' + data.scheduleId , data).then(function (res) {
       //         return res;
       //     })
       //
       // };

       scheduleFactory.updateSchedule = (scheduleId,schedules) =>{

           return $http.put("https://cyborgs-ts-analytics-service.herokuapp.com/schedules/".concat(scheduleId), schedules).then(function (res) {

               return res;

           });
       };

       return scheduleFactory;


   }])

    .factory('Inspection',['$http',function ($http) {

        const inspectionFactory = {};

        inspectionFactory.getAllReports = function () {

            return $http.get('https://cyborgs-ts-analytics-service.herokuapp.com/inspections').then(function (res) {
                return res;
            })

        };

        inspectionFactory.getReportByInspector = function(data){

            return $http.get('https://cyborgs-ts-analytics-service.herokuapp.com/inspections/' + data).then(function (res) {
                return res;
            })

        };

        inspectionFactory.getReportByDate = function(data){

            return $http.get('https://cyborgs-ts-analytics-service.herokuapp.com/inspections/' + data).then(function (res) {
                return res;
            })

        };

        inspectionFactory.getReportById = function(data){

            return $http.get('https://cyborgs-ts-analytics-service.herokuapp.com/inspections/' + data).then(function (res) {
                return res;
            })

        };

        inspectionFactory.getInspectors = function () {

            return $http.get('https://cyborgs-ts-analytics-service.herokuapp.com/inspectors').then(function (res) {
                return res;
            })

        };

        inspectionFactory.getRoutes = function () {

            return $http.get('https://cyborgs-ts-analytics-service.herokuapp.com/routes').then(function (res) {
                return res;
            })

        };

        inspectionFactory.addInspection = function (data) {

            return $http.post('https://cyborgs-ts-analytics-service.herokuapp.com/inspections', data).then(function (res) {
                return res;
            })

        };

        // inspectionFactory.updateReport = function (data) {
        //
        //     return $http.put('https://cyborgs-ts-analytics-service.herokuapp.com/schedules' + data.reportId , data).then(function (res) {
        //         return res;
        //     })
        //
        // };

        // update the report when the details are given
        inspectionFactory.updateReport = (reportId,inspections) =>{

            return $http.put("https://cyborgs-ts-analytics-service.herokuapp.com/schedules/".concat(reportId), inspections).then(function (res) {

                return res;

            });
        };

        return inspectionFactory;


    }])