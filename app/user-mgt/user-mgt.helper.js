'use strict'

angular.module('cts.user-mgt.helper',[])

    .factory('Auth', ($http, $q)=>{

        const authFactory = {};

        // Logs in the user when the correct credentials are given
        authFactory.login =  (loginData) => {

            // Authenticates the user by sending credentials to the backend
            return $http.post("https://cyborgs-ts-auth-service.herokuapp.com/users/authenticate", loginData).then( (response) => {

                return response;

            });
        };

        authFactory.signUp =  (signUpDetails) => {
    //https://cyborgs-ts-auth-service.herokuapp.com/users/
            //add user by sending user details
            return $http.post("http://localhost:9801/users",signUpDetails).then( (response) =>{
console.log(response);
                return response;

            });
        };

        authFactory.createPayementAccoutn = (accountDetails) =>{

            //create payement account by sending user id
            return $http.post("https://cyborgs-ts-payment-service.herokuapp.com/accounts/",accountDetails).then( (response) =>{

                return response;
            });
        };

        return authFactory;
    })