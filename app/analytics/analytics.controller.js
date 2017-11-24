'use strict'
angular.module('cts.analytics', [])

    .controller('scheduleController', function (Schedule, $mdToast, $scope, $mdDialog, $timeout, $q) {

        const self = this;

        self.scheduleModel = {

            scheduleId: "",
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
        self.buses = [];
        self.isLoadingScheduleTable = true;


        self.searchSchedulesByBusNumber = function(data){

            Schedule.getSchedule(data).then(function(res){

                self.results = res.data;
                console.log(res.data);

            }, err => {

                console.error(err);

            });
        };

        self.getBuses = function(){

            Schedule.getBuses().then(function(res){

                self.buses = res.data;
                console.log(res.data);

            }, err => {

                console.error(err);

            });
        };

        self.loadAllSchedules = function () {

            Schedule.getAllSchedules().then(function (res) {

                self.schedules = res.data.message.result;
                self.isLoadingScheduleTable = false;


            });

        };

        self.loadAllSchedules();

        self.addSchedule = function (scheduleDetails){

            Schedule.addSchedule(scheduleDetails).then(function (res) {

                if (res.data.success) {

                    //self.schedules.push(scheduleDetails);

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

        self.getScheduleById = function(data){

            Schedule.getScheduleByScheduleId(data).then(function(res){

                self.updateSchedule = res.data;
                console.log(self.updateSchedule);;

            }, err => {

                console.error(err);

            });
        };

        /*self.updateSchedule = function(schedule){
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
        };*/

        //show selected reminder on edit window
        self.showScheduleOnEditMode = (schedule,ev) => {

            self.selectedSchedule = schedule;
            $mdDialog
                .show({

                    controller: popUpController,
                    templateUrl: 'app/analytics/templates/edit-schedule.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen:true

                })
                .then(() =>{

                })
        };

        //controller for manage popups
        function popUpController ($scope) {

            //init the selected schedule
            $scope.scheduleModel = angular.copy(self.selectedSchedule);
            //$scope.userModel.expiryDate = new Date(self.selectedSchedule.expiryDate);


            $scope.isEditMode = false;
            $scope.editButtonTitle = 'Update';
            $scope.isLoading = false;
            //$scope.minDate = new Date();

            //update the user
            $scope.Update = () => {

                if( !$scope.isEditMode ){

                    $scope.isEditMode = true;
                    $scope.editButtonTitle = 'Save';

                }else{
                    $scope.isLoading = true;
                    Schedule.updateSchedule($scope.scheduleModel.scheduleId, $scope.scheduleModel).then((res) =>{

                        if(res.data.success){

                            self.showToast('success-toast', res.data.message.message);
                            $scope.isEditMode = false;
                            $scope.editButtonTitle = 'Update';
                            self.loadAllSchedules();
                            //close the window
                            $mdDialog.cancel();
                        }
                        else{

                            self.showToast('error-toast', res.data.message.message);

                        }
                    })

                }
            }

            //cancel
            $scope.cancel = () => {

                $mdDialog.cancel();
            }
        }

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

    .controller('inspectionController', function (Inspection, $mdToast, $scope, $mdDialog, $timeout, $q) {

        const self = this;

        self.inspectionModel = {

            reportId: "",
            inspectionDate : "",
            ticketCount : "",
            inspectorId : "",
            routeNumber : ""

        };

        self.inspections = [];
        self.selected = [];
        self.isLoadingInspectionTable = true;

        self.limitOptions = [5, 10, 15];

        self.query = {
            order: 'reportId',
            limit: 5,
            page: 1
        };

        self.results = [];
        self.inspectionM = {};
        self.inspector = [];

        self.getReportByInspector = function(data){

            Inspection.getReportByInspector(data).then(function(res){

                self.results = res.data;
                console.log(res.data);

            }, err => {

                console.error(err);

            });
        };

        self.getReportByDate = function(data){

            Inspection.getReportByDate(data).then(function(res){

                self.results = res.data;
                console.log(res.data);

            }, err => {

                console.error(err);

            });
        };

        self.getInspectors = function(){

            Inspection.getInspectors().then(function(res){

                self.inspector = res.data;
                console.log(res.data);

            }, err => {

                console.error(err);

            });
        };

        self.getRoutes = function(){

            Inspection.getRoutes().then(function(res){

                self.results = res.data;
                console.log(res.data);

            }, err => {

                console.error(err);

            });
        };

        self.loadAllInspections = function () {

            Inspection.getAllReports().then(function (res) {

                self.inspections = res.data.message.result;
                self.isLoadingInspectionTable = false;

            });

        };

        self.loadAllInspections();

        self.addInspection = function (inspectionDetails){

            Inspection.addInspection(inspectionDetails).then(function (res) {

                if (res.data.success) {

                    //self.inspections.push(inspectionDetails);

                    self.inspectionModel = {

                        reportId: "",
                        inspectionDate : "",
                        ticketCount : "",
                        inspectorId : "",
                        routeNumber : ""

                    };

                    self.selected = [];
                    // $scope.inspectionForm.$setPristine();
                    // $scope.inspectionForm.$setUntouched();
                    self.showToast('success-toast', res.data.message);

                }
                else {

                    self.showToast('error-toast', res.data.message);

                }
            });

        };

        self.getReportById = function(data){

            Inspection.getReportById(data).then(function(res){

                self.updateReport = res.data;
                console.log(self.updateReport);;

            }, err => {

                console.error(err);

            });
        };

        self.updateReport = function(inspection){

            Inspection.updateReport(inspection).then(function(res) {

                if(res.data.success) {

                    self.loadAllInspections();
                    self.showToast('success-toast', res.data.message);
                    self.updateReport = {};
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
                    .parent('inspectionForm')
            );

        }

    })


    
