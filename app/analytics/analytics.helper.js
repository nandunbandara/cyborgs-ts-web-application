'use strict'
angular.module('cts.analytics')

    .factory('Schedule',['$http',function ($http) {

       const scheduleFactory = {};

       // Get all Bus Schedule
       scheduleFactory.getAllSchedules = function () {

           return $http.get('https://cyborgs-ts-analytics-service.herokuapp.com/schedules').then(function (res) {
               return res;
           })

       };

       // Get Schedules when Bus Number is Given
       scheduleFactory.getSchedule = function(data){

           return $http.get('https://cyborgs-ts-analytics-service.herokuapp.com/schedules/' + data).then(function (res) {
               return res;
           })

       };

       // Get a Schedule when Schedule ID is given
       scheduleFactory.getScheduleByScheduleId = function(data){

           return $http.get('https://cyborgs-ts-analytics-service.herokuapp.com/schedules/' + data).then(function (res) {
               return res;
           })

       };

       // Get All Buses
       scheduleFactory.getBuses = function(){

           return $http.get('https://cyborgs-ts-analytics-service.herokuapp.com/buses').then(function (res) {
               return res;
           })

       };

       // Add Bus Schedule
       scheduleFactory.addSchedule = function (data) {

           return $http.post('https://cyborgs-ts-analytics-service.herokuapp.com/schedules', data).then(function (res) {
               return res;
           })

       };

       // Update the Schedule when Schedule ID is Given
       scheduleFactory.updateSchedule = (scheduleId,schedules) =>{

           return $http.put("https://cyborgs-ts-analytics-service.herokuapp.com/schedules/".concat(scheduleId), schedules).then(function (res) {

               return res;

           });
       };

       return scheduleFactory;


   }])

    .factory('Inspection',['$http',function ($http) {

        const inspectionFactory = {};

        // Get All Report
        inspectionFactory.getAllReports = function () {

            return $http.get('https://cyborgs-ts-analytics-service.herokuapp.com/inspections').then(function (res) {
                return res;
            })

        };

        // Get Reports when Inspector ID is given
        inspectionFactory.getReportByInspector = function(data){

            return $http.get('https://cyborgs-ts-analytics-service.herokuapp.com/inspections/' + data).then(function (res) {
                return res;
            })

        };

        // Get Reports when Inspected Date is given
        inspectionFactory.getReportByDate = function(data){

            return $http.get('https://cyborgs-ts-analytics-service.herokuapp.com/inspections/' + data).then(function (res) {
                return res;
            })

        };

        // Get Reports when Report ID is given
        inspectionFactory.getReportById = function(data){

            return $http.get('https://cyborgs-ts-analytics-service.herokuapp.com/inspections/' + data).then(function (res) {
                return res;
            })

        };

        // Get All the Inspectors
        inspectionFactory.getInspectors = function () {

            return $http.get('https://cyborgs-ts-analytics-service.herokuapp.com/inspectors').then(function (res) {
                return res;
            })

        };

        // Get All Routes
        inspectionFactory.getRoutes = function () {

            return $http.get('https://cyborgs-ts-analytics-service.herokuapp.com/routes').then(function (res) {
                return res;
            })

        };

        // Add a Inspection Report
        inspectionFactory.addInspection = function (data) {

            return $http.post('https://cyborgs-ts-analytics-service.herokuapp.com/inspections', data).then(function (res) {
                return res;
            })

        };

        // Update the report when the details are given
        inspectionFactory.updateReport = (reportId,inspections) =>{

            return $http.put("https://cyborgs-ts-analytics-service.herokuapp.com/schedules/".concat(reportId), inspections).then(function (res) {

                return res;

            });
        };

        return inspectionFactory;


    }])