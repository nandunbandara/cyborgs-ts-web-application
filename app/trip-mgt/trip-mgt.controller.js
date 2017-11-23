'use strict'

angular.module('cts.trip-mgt.controller',[])

    .controller('tripCtrl', function (Trip) {

        const self = this;

        // self.tripDetails = () =>{
        //
        //     Trip.getTripDtails(userId).then((response) => {
        //         console.log(response);
        //     })
        // }

       // self.tripDetails();

        self.trips = [{

          "journeyId":"1",
            "startPoint":"Menikhinna",
            "endPoint":"Malabe",
            "distance":"96",
            "joureyDate":"2017-11-17",
            "busNumber":"CP-NA-4353"
        }];

    })