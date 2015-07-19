angular.module('Login', ['ngCookies', 'ui.bootstrap.modal']).controller('Login', function ($scope, $http, $modalInstance, $cookies, $location) {

    $scope.data = {};

    /**
     * Funcion para loggearse
     */
    $scope.login = function () {

        var json = {
            operation: 'login',
            data: {
                email: $scope.data.userMail,
                password: $scope.data.passMail
            }
        };

        notification.info("Ingresando...");

        $cookies.sessionid = "1234";
        $cookies.userid = "1";
        $cookies.type = COMPANY;
        if($scope.data.userMail == "a@a"){
            $cookies.type = PROVIDER;
        }
        alert.hide();
        $modalInstance.close();
        $location.path('/myprofile');

        // $http.post(__URL__, json)
        //         .success(function (response) {
        //             console.log(response);
        //             if (response.success) {
        //                 $cookies.sessionid = response.optional.sessionid;
        //                 $cookies.userid = response.optional.iduser;
        //                 $cookies.type = response.optional.type;
        //                 alert.hide();
        //                 $modalInstance.close();
        //                 $location.path('/myprofile');
        //             } else {
        //                 errorManager.proccessError(response, $location, $cookies);
        //             }
        //         }).error(server_error);
    };
});

