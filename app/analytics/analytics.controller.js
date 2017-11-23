'use strict'
angular.module('cts.analytics', [])

    .controller('scheduleController', function (Schedule, $mdToast, $scope, $mdDialog, $timeout, $q) {

        const self = this;

        self.scheduleModel = {

            startTime : "",
            endTime : "",
            busNumber : ""

        };

        self.schedules = [];
        self.selected = [];

        self.limitOptions = [5, 10, 15];

        self.query = {
            order: 'busNumber',
            limit: 5,
            page: 1
        };

        self.results = [];
        self.scheduleM = {};

        self.searchSchedules = function(data){

            Schedule.getSchedule(data).then(function(res){

                self.results = res.data;
                console.log(res.data);

            }, err => {

                console.error(err);

            });
        };

        self.loadAllSchedules = function () {

            Schedule.getAllSchedules().then(function (res) {

                self.schedules = res.data;
                console.log(self.schedules);

            });

        };

        self.loadAllSchedules();

        self.addSchedule = function (scheduleDetails){

            Schedule.addSchedule(scheduleDetails).then(function (res) {

                if (res.data.success) {

                    self.schedules.push(scheduleDetails);

                    self.scheduleModel = {

                        scheduleId : "",
                        startTime : "",
                        endTime : "",
                        busNumber : ""

                    };

                    self.selected = [];
                    $scope.scheduleForm.$setPristine();
                    $scope.scheduleForm.$setUntouched();
                    self.showToast('success-toast', res.data.message);

                }
                else {

                    self.showToast('error-toast', res.data.message);

                }
            });

        };

        self.updateSchedule = function(schedule){
            Schedule.updateSchedule(schedule).then(function(res) {

                if(res.data.success) {

                    self.loadAllSchedules();
                    self.showToast('success-toast', res.data.message);
                    self.updateSchedule = {};
                }
                else {

                    self.showToast('error-toast', res.data.message);

                }




            });
        };

        self.showToast = function(type, message){

            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('bottom')
                    .theme(type)
                    .hideDelay(1500)
                    .parent('scheduleForm')
            );

        }

    })


    
