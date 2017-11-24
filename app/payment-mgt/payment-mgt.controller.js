'use strict'

angular.module('cts.payment-mgt', [])

    .controller('paymentCtrl', function (Payment) {

        const self = this;
        self.loggedUserId = sessionStorage.getItem('userId');
        self.loggedUserExpiryDate = sessionStorage.getItem('expiryDate')

        self.userAccount={
            "accountNumber":"",
            "balance":"",
            "validity":"",
            "expiryDate":"",
        };


        //init user account details
        self.initAccoutnDetails = (userId) => {

                Payment.getAccountDetails(userId).then((response) =>{

                    self.userAccount.accountNumber = response.data.result[0].accountNumber;
                    self.userAccount.balance = response.data.result[0].balance;
                    self.userAccount.validity = response.data.result[0].validity;
                    self.userAccount.expiryDate = self.loggedUserExpiryDate;
                })
        }
        self.initAccoutnDetails(self.loggedUserId);
    })