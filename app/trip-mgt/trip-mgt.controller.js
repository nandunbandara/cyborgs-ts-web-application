'use strict'

angular.module('cts.trip-mgt.controller',[])

    .controller('tripCtrl', function (Trip) {

        const self = this;
        self.trips;
        self.isLoading = true;

        self.loggedUserId = sessionStorage.getItem('userId');

        self.tripDetails = () =>{

            Trip.getTripDtails( self.loggedUserId).then((response) => {

                self.trips = response.data.result;
                self.isLoading = false;
            })
        }
        self.tripDetails();


    })