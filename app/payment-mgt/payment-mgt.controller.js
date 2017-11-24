'use strict'

angular.module('cts.payment-mgt', [])

    .controller('paymentCtrl', function (Payment) {

        const self = this;
        self.isLoding = true;

        //get logged user datails from session storage
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
                    self.isLoding = false;
                    self.userAccount.accountNumber = response.data.result[0].accountNumber;
                    self.userAccount.balance = response.data.result[0].balance;
                    self.userAccount.validity = response.data.result[0].validity;
                    self.userAccount.expiryDate = self.loggedUserExpiryDate;
                })
        }
        self.initAccoutnDetails(self.loggedUserId);
    })

    .controller('topUpCtrl', function (Payment, $window, $state) {

        const self = this;
        self.payment = {

            amount: "",
            paymentMethod: "",
            cardHolderName: $window.sessionStorage.getItem('name'),
            cardNumber: "",
            cardExp: "",
            cardCVV: ""

        }
        self.successMessage = null;
        self.errorMessage = null;
        self.go = $state.go.bind($state);
        self.spinnerActivated = false;

        self.proceedPayment = function () {
            self.spinnerActivated = true;

            let payload = {

                card: {

                    cardNumber: self.payment.cardNumber,
                    expDate: self.payment.cardExp
                }
            }

            Payment.validateCard(payload).then((response) => {
                self.spinnerActivated  = false;

                if (response.data.message == 'valid') {
                    self.spinnerActivated = true;

                    let updatePayload = {

                        account: {

                            userId: $window.sessionStorage.getItem('userId'),
                            updateType: "top-up",
                            amount: self.payment.amount
                        }
                    }

                    Payment.updateBalance(updatePayload).then((response) => {

                        if (response.data.success) {

                            self.successMessage = "Payment made successfully!";
                            self.errorMessage = null;
                            self.go("dashboard.payment");
                        }

                    })

                } else if (response.data.message == 'invalid') {

                    self.spinnerActivated = false;
                    self.successMessage = null;
                    self.errorMessage = "Entered card is invalid!";

                }
            }).catch((response) => {


            })

        }

    })