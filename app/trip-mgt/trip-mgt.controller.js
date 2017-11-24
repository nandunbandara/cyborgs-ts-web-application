'use strict'

angular.module('cts.trip-mgt.controller',[])

    .controller('tripCtrl', function (Trip) {

        const self = this;
        self.trips;
        self.isLoading = true;
        self.numberOfRecords =0;

        self.loggedUserId = sessionStorage.getItem('userId');

        self.tripDetails = () =>{

            Trip.getTripDtails( self.loggedUserId).then((response) => {

                self.trips = response.data.result;
                self.numberOfRecords =self.trips.length;
                self.isLoading = false;
                self.setDateFormat(self.trips);
            })
        }
        self.tripDetails();

        //set date format
        self.setDateFormat = (trips) =>{
            var i=0;

            for(i = 0; i< self.numberOfRecords ;i++){

                trips[i].journeyDate = trips[i].journeyDate.substring(0,10);
            }
        }


    })