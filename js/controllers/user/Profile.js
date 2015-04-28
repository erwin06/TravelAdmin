angular.module('Profile', ['ngCookies', 'ui.bootstrap.modal']).controller('Profile', function ($scope, $cookies, $location, $http) {

    /**
     * Checkeo que este loggeado
     */
    if (!existsVar($cookies.sessionid)) {
        $location.path('/main');
        return;
    }


    $scope.edit = false;
    $scope.toEdit = {};

    $scope.userData = {};
    $scope.originalData = {};
    init();

    $scope.editName = function (check) {
        if (!check) {
            $scope.userData.main.name = $scope.originalData.main.name;
        }
        $scope.toEdit.name = false;
    };

    $scope.cancelEdit = function () {
        $scope.userData = copy($scope.originalData);
        $scope.edit = false;
    };

    $scope.saveData = function () {

        $scope.edit = false;
        $scope.toEdit.name = false;

        notification.info("Guardando información");
        $scope.userData.extra = $scope.userData.extra.filter(function (element) {
            if(element.deleted && !element.iduserextra)
                return false;
            return true;
        });
        var json = {
            operation: 'saveuserdata',
            userData: {
                sessionid: $cookies.sessionid,
                userid: $cookies.userid
            },
            data: {
                userid: $cookies.userid,
                data: $scope.userData
            }
        };

        console.log(json);

        $http.post(__URL__, json).success(function (response) {
            console.log(response);
            if (response.success) {
                $scope.userData = response.optional;
                $scope.originalData = copy(response.optional);
                alert.info(response.message,init);
            } else {
                errorManager.proccessError(response, $location, $cookies);
            }
        }).error(server_error);

    };

    $scope.saveNewData = function () {
        if (!$scope.userData.extra)
            $scope.userData.extra = [];
        $scope.userData.extra.push({
            fieldName: $scope.toEdit.newData.field,
            fieldValue: $scope.toEdit.newData.value,
            ispublic: $scope.toEdit.newData.visibility
        });

        $scope.toEdit.newData = {};
    };

    $scope.isDeleted = function (deleted) {
        if (deleted) {
            return 'label-deleted';
        }
    };


    $scope.getUserType = function(type){
        switch(parseInt(type)){
            case PROVIDER:
                return "Proveedor";
            case COMPANY:
                return "Empresa de Turismo";
            case BOTH:
                return "Proveedor & Empresa de Turismo";
        }
    }   

    function init() {

        notification.info("Cagando información...");

        var json = {
            operation: 'getuser',
            userData: {
                sessionid: $cookies.sessionid,
                userid: $cookies.userid
            },
            data: {
                userid: $cookies.userid
            }
        };
        var response = {
            optional: {
                main: {
                    name: "Homero Simpson",
                    email: "homero@simpson.com"
                }
            }
        }
        // $http.post(__URL__, json).success(function (response) {
        //     console.log(response);
        //     if (response.success) {
                $scope.userData = response.optional;
                $scope.originalData = copy(response.optional);
                alert.hide();
        //     } else {
        //         errorManager.proccessError(response, $location, $cookies);
        //     }
        // }).error(server_error);

    }

});