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

            //add user by sending user details
            return $http.post("https://cyborgs-ts-auth-service.herokuapp.com/users/",signUpDetails).then( (response) =>{

                return response;

            });
        };

        authFactory.createPayementAccoutn = (userId) =>{

            //create payement account by sending user id
            return $http.post("https://cyborgs-ts-auth-service.herokuapp.com/accounts".concat(userId)).then( (response) =>{

                return response;
            });
        };

        return authFactory;
    })