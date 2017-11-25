'use strict'

angular.module('cts.payment-mgt')

    .factory('Payment',['$http', function ($http) {

        const paymentFactory = {};

        paymentFactory.getAccountDetails = (userId) =>{

            // Get logged user details by sending user ID
            return $http.get("https://cyborgs-ts-payment-service.herokuapp.com/accounts/".concat(userId)).then( (response) => {

                return response;

            });
        };

        paymentFactory.validateCard = (payload) => {

            // validate card when details are given
            return $http.post('https://cyborgs-ts-payment-service.herokuapp.com/cards/validate', payload).then((response) => {

                return response;

            })
        }

        paymentFactory.updateBalance = (payload) => {

            // update the account balance when details are given
            return $http.put('https://cyborgs-ts-payment-service.herokuapp.com/accounts/balance', payload).then((response) => {

                return response;
            })

        }

        return paymentFactory;
    }])