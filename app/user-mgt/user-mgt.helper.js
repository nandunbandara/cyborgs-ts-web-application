'use strict'

angular.module('cts.user-mgt.helper',[])

    .factory('Auth',['$http', 'AuthToken', '$q', function ($http, AuthToken, $q) {

        const authFactory = {};

        // Logs in the user when the correct credentials are given
        authFactory.login = (loginData) =>{

            // Authenticates the user by sending credentials to the backend
            return $http.post("https://cyborgs-ts-auth-service.herokuapp.com/users/authenticate", loginData).then( (response) => {

                AuthToken.setAuthToken(response.data.token);
                return response;

            });
        };

        // Logs out the user by removing the token from the session storage
        authFactory.logout =  () =>{

            AuthToken.setAuthToken();

        }

        // Authorize the user by using the token
        authFactory.getUserDetails =  () =>{

            if (AuthToken.getAuthToken()) {

                return $http.get("https://cyborgs-ts-auth-service.herokuapp.com/users/authorize");

            } else {

                $q.reject({ message: "Authentication token not set" });

            }
        };

        authFactory.isLoggedIn =  () =>{

            if (AuthToken.getAuthToken()) {

                return true;

            } else {

                return false;
            }
        }

        authFactory.signUp =  (signUpDetails) => {

            //add user by sending user details
            return $http.post("https://cyborgs-ts-auth-service.herokuapp.com/users/",signUpDetails).then( (response) =>{

                return response;

            });
        };

        authFactory.createPayementAccoutn = (accountDetails) =>{

            //create payement account by sending user id
            return $http.post("https://cyborgs-ts-payment-service.herokuapp.com/accounts/",accountDetails).then( (response) =>{

                return response;
            });
        };

        // Get all user details
        authFactory.getAllUsers = () =>{

            // Authenticates the user by sending credentials to the backend
            return $http.get("https://cyborgs-ts-auth-service.herokuapp.com/users/").then( (response) => {

                return response;

            });
        };

        // update the user when the details are given
        authFactory.update = (userId,userDetails) =>{

            // Authenticates the user by sending credentials to the backend
            return $http.put("https://cyborgs-ts-auth-service.herokuapp.com/users/".concat(userId), userDetails).then( (response) => {

                AuthToken.setAuthToken(response.data.token);
                return response;

            });
        };

        return authFactory;
    }])

    .factory('AuthToken',['$window', function ($window) {

        const tokenFactory = {};

        // Store the auth tokens in local storage
        tokenFactory.setAuthToken =  (token) =>{

            if (token) {

                return $window.sessionStorage.setItem('token',token);

            } else {

                $window.sessionStorage.clear();

            }
        }

        // Return auth token from the local storage
        tokenFactory.getAuthToken =  () =>{

            return $window.sessionStorage.getItem('token');

        }

        return tokenFactory;


    }])

    // Adding tokens into request headers
    .factory('AuthInterceptors', ['AuthToken', function(AuthToken){

        const authInterceptorsFactory = {};

        authInterceptorsFactory.request = (req) =>{

            const authToken = AuthToken.getAuthToken();

            if (authToken) {

                req.headers['x-access-token'] = authToken;

            }

            return req;
        }

        return authInterceptorsFactory;

    }])