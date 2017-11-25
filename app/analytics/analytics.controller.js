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

        // Get Schedule By Bus Number
        self.searchSchedulesByBusNumber = function(data){

            Schedule.getSchedule(data).then(function(res){

                self.results = res.data;
                console.log(res.data);

            }, err => {

                console.error(err);

            });
        };

        // Get All the buses
        self.getBuses = function(){

            Schedule.getBuses().then(function(res){

                self.buses = res.data;
                console.log(res.data);

            }, err => {

                console.error(err);

            });
        };

        // Get all the schedule
        self.loadAllSchedules = function () {

            Schedule.getAllSchedules().then(function (res) {

                self.schedules = res.data.message.result;
                self.isLoadingScheduleTable = false;


            });

        };

        self.loadAllSchedules();

        // Add a schedule for a bus
        self.addSchedule = function (scheduleDetails){

            Schedule.addSchedule(scheduleDetails).then(function (res) {

                if (res.data.success) {

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

        // Get Schedule By Schedule ID
        self.getScheduleById = function(data){

            Schedule.getScheduleByScheduleId(data).then(function(res){

                self.updateSchedule = res.data;
                console.log(self.updateSchedule);;

            }, err => {

                console.error(err);

            });
        };

        // Show selected schedule on edit window
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

        // Controller for manage popups
        function popUpController ($scope) {

            //init the selected schedule
            $scope.scheduleModel = angular.copy(self.selectedSchedule);

            $scope.isEditMode = false;
            $scope.editButtonTitle = 'Update';
            $scope.isLoading = false;

            $scope.Update = () => {

                if( !$scope.isEditMode ){

                    $scope.isEditMode = true;
                    $scope.editButtonTitle = 'Save';

                }else{
                    $scope.isLoading = true;
                    Schedule.updateSchedule($scope.scheduleModel.scheduleId, $scope.scheduleModel).then((res) =>{

                        if(res.data.success){

                            self.showToast('success-toast', "Successfully Updated!");
                            $scope.isEditMode = false;
                            $scope.editButtonTitle = 'Update';
                            self.loadAllSchedules();
                            //close the window
                            $mdDialog.cancel();
                        }
                        else{

                            self.showToast('error-toast', "Update Fail!");

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
        self.numberOfRecords = 0;

        self.limitOptions = [5, 10, 15];

        self.query = {
            order: 'reportId',
            limit: 5,
            page: 1
        };

        self.results = [];
        self.inspectionM = {};
        self.inspector = [];

        // Get Report By Inspector ID
        self.getReportByInspector = function(data){

            Inspection.getReportByInspector(data).then(function(res){

                self.results = res.data;
                console.log(res.data);

            }, err => {

                console.error(err);

            });
        };

        // Get Report By ID
        self.getReportByDate = function(data){

            Inspection.getReportByDate(data).then(function(res){

                self.results = res.data;
                console.log(res.data);

            }, err => {

                console.error(err);

            });
        };

        // Get All Inspectors
        self.getInspectors = function(){

            Inspection.getInspectors().then(function(res){

                self.inspector = res.data;
                console.log(res.data);

            }, err => {

                console.error(err);

            });
        };

        // Get All the routes
        self.getRoutes = function(){

            Inspection.getRoutes().then(function(res){

                self.results = res.data;
                console.log(res.data);

            }, err => {

                console.error(err);

            });
        };

        // Get All inspections
        self.loadAllInspections = function () {

            Inspection.getAllReports().then(function (res) {

                self.inspections = res.data.message.result;
                self.isLoadingInspectionTable = false;
                self.numberOfRecords = self.inspections.length;
                self.setDateFormat(self.inspections);

            });

        };

        // Set date format
        self.setDateFormat = (inspections) =>{
            var i=0;

            for(i = 0; i< self.numberOfRecords ;i++){

                inspections[i].inspectionDate = inspections[i].inspectionDate.substring(0,10);

            }
        }

        self.loadAllInspections();

        // Add inspection report
        self.addInspection = function (inspectionDetails){

            Inspection.addInspection(inspectionDetails).then(function (res) {

                if (res.data.success) {

                    self.inspectionModel = {

                        reportId: "",
                        inspectionDate : "",
                        ticketCount : "",
                        inspectorId : "",
                        routeNumber : ""

                    };

                    self.selected = [];
                    self.showToast('success-toast', res.data.message);

                }
                else {

                    self.showToast('error-toast', res.data.message);

                }
            });

        };

        // Get Report by Report ID
        self.getReportById = function(data){

            Inspection.getReportById(data).then(function(res){

                self.updateReport = res.data;
                console.log(self.updateReport);;

            }, err => {

                console.error(err);

            });
        };

        //show selected inspection on edit window
        self.showInspectionOnEditMode = (inspection,ev) => {

            self.selectedInspection = inspection;
            $mdDialog
                .show({

                    controller: popUpController,
                    templateUrl: 'app/analytics/templates/edit-inspection.html',
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
            $scope.inspectionModel = angular.copy(self.selectedInspection);

            $scope.isEditMode = false;
            $scope.editButtonTitle = 'Update';
            $scope.isLoading = false;

            $scope.Update = () => {

                if( !$scope.isEditMode ){

                    $scope.isEditMode = true;
                    $scope.editButtonTitle = 'Save';

                }else{
                    $scope.isLoading = true;
                    Inspection.updateReport($scope.inspectionModel.reportId, $scope.inspectionModel).then((res) =>{

                        if(res.data.success){

                            self.showToast('success-toast', "Successfully Updated!");
                            $scope.isEditMode = false;
                            $scope.editButtonTitle = 'Update';
                            self.loadAllInspections();
                            //close the window
                            $mdDialog.cancel();
                        }
                        else{

                            self.showToast('error-toast', "Update Fail!");

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
                    .parent('inspectionForm')
            );

        }

    })

    .controller('analyticsController', function () {
        const self = this;

        //set loged user type
        self.isAdmin = false;
        self.isInspector = false;

        self.loggedUserType = sessionStorage.getItem('permission');
        console.log(self.loggedUserType);

        self.setLogedUserType = (type) => {

            if( type == 'Admin'){

                self.isAdmin = true;
                self.isInspector = false;

            }else if( type == 'Inspector'){

                self.isAdmin = false;
                self.isInspector = true;
            }
        }
        self.setLogedUserType(self.loggedUserType);
    })


    
