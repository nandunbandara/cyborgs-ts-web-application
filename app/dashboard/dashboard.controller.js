'use strict';

angular.module('cts.dashboard',[])

.controller('dashboardCtrl', function($mdSidenav,$location,$timeout, Auth){

    let self = this;

    self.logedUser = sessionStorage.getItem('name');
    self.permission = sessionStorage.getItem('permission');

    //type
    self.isPassenger=false;
    self.isAdmin=false;
    self.isTrManager=false;

    //chnage user type
    self.setLogedUserType = (type) => {

        if(type == 'Admin'){

            self.isAdmin = true;
            self.isPassenger = false;
            self.isTrManager = false;

        }else if(type == 'Foreign passenger' || type == 'Local passenger'){

            self.isPassenger = true;
            self.isAdmin = true;
            self.isTrManager = false;

        }else {

            self.isAdmin = false;
            self.isPassenger = false;
            self.isTrManager = true;
        }
    }
    self.setLogedUserType(self.permission);


    self.openUserSideBar = function() {
        $mdSidenav('right').toggle();
    };

    // Logout function for dashboard button
    self.logout =  () =>{

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