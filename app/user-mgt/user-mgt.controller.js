'use strict'

angular.module('cts.user-mgt.controller', [])

    .controller('loginCtrl', function(Auth, $mdToast, $timeout, $window, $location) {

        const self = this;

        self.errorMessage = null;

        self.formData = {
            username: "",
            password: ""
        };

        self.isVisibleSignUp = false;

        self.isLoding = false;


        self.doLogin =  (loginData) => {

            self.isVisibleSignUp = true;
            self.isLoding = true;

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
                    if (self.parseToken(response.data.token).permission == "Admin") {

                        $location.path('/dashboard/feed');

                    } else if (self.parseToken(response.data.token).permission == "Foreign passenger") {

                        $location.path('/dashboard/feed');

                    }else if (self.parseToken(response.data.token).permission == "Driver") {

                        $location.path('/dashboard/feed');

                    }else if (self.parseToken(response.data.token).permission == "Transport manager") {

                        $location.path('/dashboard/feed');

                    }else if (self.parseToken(response.data.token).permission == "Inspector") {

                        $location.path('/dashboard/feed');

                    }
                    else if (self.parseToken(response.data.token).permission == "Local passenger") {

                        $location.path('/dashboard/feed');

                    }

                }).catch( (err) => {
                    self.isLoding = false;
                    self.isVisibleSignUp = false;
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
                    .position('bottom right')
                    .theme(theme)
                    .hideDelay(1500)
                    .parent('toastParent')
            );
        }

        self.visiblityOfLogin = (formValidity) =>{

            if(formValidity && !self.isLoding) {
                return false;
            }
            else{
                return true;
            }
        }

    })

    .controller('signUpCtrl', function(Auth, $location, $mdToast) {

        const self = this;

        self.userTypies = [
            {"type":"Foreign passenger"},
            {"type":"Local passenger"}
        ];

        self.isLoding = false;

        self.user = {
            "name":"",
            "email":"",
            "type":"",
            "contact":"",
            "password":"",
            "expiryDate":""
        }

        //sign up
        self.doSignUp =  (signUpDetails) => {

            self.isLoding = true;

            //validate and save
            if( self.isContactNumber(signUpDetails.contact) ){

                self.setExpiryDate(self.user.type);

                Auth.signUp(signUpDetails).then( (response) => {

                    if(response.data.success == true){

                        var accountDetails = {
                            "account":{
                                "userId":response.data.userId
                            }
                        }

                        //create payement account
                        Auth.createPayementAccoutn(accountDetails).then((res) =>{

                            if(res.data.success == false){

                                self.showToast('success-toast', response.data.message);
                                $location.path('/signup');
                            }
                        })

                        self.showToast('success-toast', response.data.message);
                        $location.path('/login');

                    }else{
                        self.isLoding = false;
                        self.showToast('error-toast',response.data.message);

                    }

                })


            }

        }

        // validate contact number
        self.isContactNumber =  (contactNumber) => {

          if(contactNumber.length == 10){
              return true;
          }

        }

        self.showToast = (type, message) =>{

            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('bottom right')
                    .theme(type)
                    .hideDelay(1500)
                    .parent('userForm')

            );

        }

        self.showLogin =  ()=>{

            $location.path('/login');
        }

        //set expiry date
        self.setExpiryDate = (passengerType)=>{

            var localPassengerExpirayDate = 24;
            var ForeignPassengerExpiryDate = 3;


            var CurrentDate = new Date();

            if(passengerType == "Local passenger"){

                self.user.expiryDate =  new Date(CurrentDate.setMonth(CurrentDate.getMonth() + localPassengerExpirayDate));

            }else if(passengerType == "Foreign passenger"){

                self.user.expiryDate =  new Date(CurrentDate.setMonth(CurrentDate.getMonth() + ForeignPassengerExpiryDate));
            }


        }

        self.visiblityOfsignUp = (formValidity) =>{

            if(formValidity && !self.isLoding && self.isContactNumber(self.user.contact)) {
                return false;
            }
            else{
                return true;
            }
        }

    })

    .controller('userCtrl', function (Auth ,$mdToast) {

        const self = this;

        self.isLoding =false;

        self.users;


        self.userModel = {
            "name":"",
            "email":"",
            "type":"",
            "contact":"",
            "password":"",
            "expiryDate":""
        }

        //add new user
        self.addNewUser = (userDetails)=>{

            self.isLoding =true;

            Auth.signUp(userDetails).then((response) =>{

                if(response.data.success == 'true'){

                    self.isLoding =false;
                    self.showToast('success-toast', response.data.message);

                    //reset page
                    self.userForm.$setPristine();
                    self.userForm.$setUntouched();
                    console.log('fsdfsdf');

                }else{

                    self.isLoding =false;
                    self.showToast('error-toast',response.data.message);
                }



            })
        }

        //fill view user table
        self.showAllUsers = () => {

            Auth.getAllUsers().then((response) => {

               self.users = response.data.message.result;

            })
        }

        self.showAllUsers();

        self.resetForm = () => {

            self.userModel.name = "";
            self.userModel.email = "";
            self.userModel.type = "";
            self.userModel.contact = "";
            self.userModel.password = "";
            self.userModel.expiryDate = "";
            console.log('sdfsfsfsfsdfd');
        }

        self.showToast = (type, message) =>{

            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('bottom right')
                    .theme(type)
                    .hideDelay(1500)
                    .parent('userForm')

            );

        }

        // validate contact number
        self.isContactNumber =  (contactNumber) => {

            if(contactNumber.length == 10){
                return true;
            }

        }

        self.visiblityOfSave = (formValidity) =>{

            if(formValidity && !self.isLoding && self.isContactNumber(self.userModel.contact)) {

                return false;
            }
            else{

                return true;
            }
        }
    })