var ModuleRegister = angular.module('Register', []).controller('Register', function ($scope, $cookies, $http, $location) {

    $scope.conf = {
        type: 1
    };

    $scope.data = {};

    $scope.register = function () {

        if ($scope.data.password != $scope.data.password2) {
            alert.error("Las contraseñas no coinciden");
            return;
        }

        var json = {
            operation: 'singup',
            data: {
                name: $scope.data.name,
                password: $scope.data.password,
                password2: $scope.data.password2,
                email: $scope.data.email,
                type: $scope.data.type == 'p' ? PROVIDER : COMPANY
            }, userData: {
            }
        };


        $http.post(__URL__, json).success(function (data) {
            if (data.success) {
                $scope.data = {};
                alert.info(data.message);
            } else {
                errorManager.proccessError(data, $location, $cookies);
            }
        }).error(function (data) {
            alert.error(messages.server.fail_connection);
        });

    };



















});

