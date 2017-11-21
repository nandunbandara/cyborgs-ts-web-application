'use strict';

angular.module('cts.dashboard',[])

.controller('dashboardCtrl', function($mdSidenav){

    let self = this;

    self.openUserSideBar = function() {
        $mdSidenav('right').toggle();
    };

})

.controller('feedCtrl', function(){

    const self = this;


})