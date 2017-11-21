'use strict'

angular.module('cts.user-mgt.helper',[])

    .factory('Auth', ($http, $q)=>{

        const authFactory = {};

        // Logs in the user when the correct credentials are given
        authFactory.login = function (loginData) {

            // Authenticates the user by sending credentials to the backend
            return $http.post("https://cyborgs-ts-auth-service.herokuapp.com/users/authenticate", loginData).then(function (response) {

                return response;

            });
        };


        return authFactory;
    })