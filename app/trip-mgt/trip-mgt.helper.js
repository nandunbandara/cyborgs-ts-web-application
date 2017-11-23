'use strict'

angular.module('cts.trip-mgt.helper',[])

    .factory('Trip',['$http', function ($http) {

        const tripFactory = {};

        tripFactory.getTripDtails = (userId) =>{

            // Authenticates the user by sending credentials to the backend
            return $http.get("https://cyborgs-ts-auth-service.herokuapp.com/trips/".concat(userId)).then( (response) => {

                    return response;
            });
        }

        return tripFactory;
    }])