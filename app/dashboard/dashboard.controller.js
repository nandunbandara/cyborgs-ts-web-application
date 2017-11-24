'use strict';

angular.module('cts.dashboard',[])

.controller('dashboardCtrl', function($mdSidenav,$location,$timeout, Auth){

    let self = this;

    self.logedUser = sessionStorage.getItem('name');
    self.permission = sessionStorage.getItem('permission');

    self.openUserSideBar = function() {
        $mdSidenav('right').toggle();
    };

    // Logout function for dashboard button
    self.logout = function () {

        self.isLoading = true;
        $timeout(function () {

            Auth.logout();
            $location.path('/login');
            self.isLoading = false;

        },2000)



    }

})

.controller('feedCtrl', function(){

    const self = this;



})