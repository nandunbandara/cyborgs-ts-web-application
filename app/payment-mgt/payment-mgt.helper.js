'use strict'

angular.module('cts.payment-mgt')

    .factory('Payment',['$http', function ($http) {

        const payementFactory = {};


        payementFactory.getAccountDetails = (userId) =>{

            // Get logged user details by sending user ID
            return $http.get("https://cyborgs-ts-payment-service.herokuapp.com/accounts/".concat(userId)).then( (response) => {

                return response;

            });
        };

        return payementFactory;
    }])