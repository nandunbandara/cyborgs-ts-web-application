'use strict';

angular.module('cts', [
    'cts.routes',
    'cts.core',
    'cts.dashboard',
    'cts.analytics',
    'cts.user-mgt',
    'cts.payment-mgt',


])

    .config(function($httpProvider){

        // Pushing auth interceptor into httpProvider
        $httpProvider.interceptors.push('AuthInterceptors');
    })

    .run(function ($rootScope, $location, Auth, $window) {

        $rootScope.$on('$stateChangeStart', function (event, toState,) {

            if(!Auth.isLoggedIn()){

                    if(toState.url == '/') {

                        $location.path('/');

                    }else if(toState.url == '/signup'){

                        $location.path('/signup');
                    }

                    else{

                        $location.path('/login');
                    }
            } else {

                Auth.getUserDetails().then(function (response) {

                    if (response){

                        $rootScope.user = response.data;

                        if(toState.name == 'login'){

                            $location.path('/dashboard/feed');
                        }

                        if (toState.permissions) {

                            console.log(toState.url);

                            if ($rootScope.user) {

                                if($rootScope.user.permission != toState.permissions[0] && $rootScope.user.permission == "transport manager") {

                                    $location.path("/dashboard/feed");

                                } else if ($rootScope.user.permission == toState.permissions[0] && $rootScope.user.permission == "admin") {

                                    $location.path("/dashboard/feed");


                                }else {

                                    $location.path('/dashboard/feed');
                                }
                            }

                        }

                    }else{

                        $location.path('/login');
                    }

                })
            }
        })
    })