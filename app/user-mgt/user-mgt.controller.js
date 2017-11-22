'use strict'

angular.module('cts.user-mgt.controller', [])

    .controller('loginCtrl', function(Auth, $mdToast, $timeout, $window, $location) {

        const self = this;

        self.errorMessage = null;

        self.formData = {
            username: "",
            password: ""
        };


        self.doLogin =  (loginData) => {

            if (loginData) {

                Auth.login(loginData).then( (response) =>{

                    //store user details in session storage
                    $window.sessionStorage.setItem('email',self.parseToken(response.data.token).email);
                    $window.sessionStorage.setItem('expiryDate',self.parseToken(response.data.token).expiryDate);
                    $window.sessionStorage.setItem('name',self.parseToken(response.data.token).name);
                    $window.sessionStorage.setItem('permission',self.parseToken(response.data.token).permission);
                    $window.sessionStorage.setItem('userId',self.parseToken(response.data.token).userId);

                    //show messages
                    if (response.data.success === true) {

                        self.showLoginToast(response.data.message, 'success-toast')

                    } else if (response.data.success === false) {

                        self.showLoginToast(response.data.message, 'error-toast');

                    }

                    //redirect user
                    if (self.parseToken(response.data.token).permission == "admin") {

                        $location.path('/dashboard/feed');

                    } else if (self.parseToken(response.data.token).permission == "foreign passenger") {

                        $location.path('/dashboard/feed');

                    }else if (self.parseToken(response.data.token).permission == "driver") {

                        $location.path('/dashboard/feed');

                    }else if (self.parseToken(response.data.token).permission == "transport manager") {

                        $location.path('/dashboard/feed');

                    }else if (self.parseToken(response.data.token).permission == "inspector") {

                        $location.path('/dashboard/feed');

                    }
                    else if (self.parseToken(response.data.token).permission == "local passenger") {

                        $location.path('/dashboard/feed');

                    }

                }).catch( (err) => {

                    self.showLoginToast("Could not authenticate user", 'error-toast')
                })
            }
        }

        self.parseToken = (token)=>{

            let base64Url = token.split('.')[1];
            let base64 = base64Url.replace('-','+').replace('_','/');
            return JSON.parse($window.atob(base64));

        }

        self.showSignUp =  () => {

            $location.path('/signup');
        }

        self.showLoginToast =  (message, theme) => {

            $mdToast.show(

                $mdToast.simple()
                    .textContent(message)
                    .position('bottom')
                    .theme(theme)
                    .hideDelay(1500)
                    .parent('toastParent')
            );
        }

    })

    .controller('signUpCtrl', function (Auth, $location, $mdToast) {

        const self = this;

        self.userTypies = [
            {"type":"Foreign passenger"},
            {"type":"Local passenger"}
        ];

        //sign up
        self.doSignUp =  (signUpDetails) => {

            //validate and save
            if( self.isContactNumber(signUpDetails.contact) ){

                Auth.signUp(signUpDetails).then( (response) => {

                    if(response.data.success == true){

                        //create payement account


                        self.showToast('success-toast', response.data.message);
                        $location.path('/login');

                    }else{

                        self.showLoginToast(response.data.message, 'error-toast');

                    }

                })


            }

        }

        //validation

        // validate contact number
        self.isContactNumber = function (contactNumber) {

          if(contactNumber.length == 10){
              return true;
          }

        }

        self.showToast = function(type, message){

            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('bottom')
                    .theme(type)
                    .hideDelay(1500)
                    .parent('userForm')

            );

        }

        self.showLogin = function () {

            $location.path('/login');
        }

    })