inApp.controller('NewBus', function ($scope, $http, $cookies, $modalInstance, $location) {

    var indexChair = 1;
    var _id = 0;

    $scope.data = {
        newTypeChairs: [],
        allChairs: []
    };

    $scope.screen = {
        showHelp: false
    };

    $scope.addChair = function () {
        $scope.data.newTypeChairs.push({
            type: SIT
        });
    };

    $scope.addSpace = function () {
        $scope.data.newTypeChairs.push({
            type: SPACE
        });
    };

    $scope.addRow = function () {
        var countChairs = $scope.data.newTypeChairs.length;
        var rowObject = {};
        rowObject.id = _id++;
        rowObject.row = [];
        for (var i = 0; i < countChairs; i++) {
            var type = $scope.data.newTypeChairs[i].type;
            var cha;
            type == SIT ? cha = indexChair++ : cha = -1;
            rowObject.row.push({
                type: type,
                chairNumber: cha
            });
        }
        $scope.data.allChairs.push(rowObject);
    };

    function reloadNumbers() {
        indexChair = 1;
        var count = $scope.data.allChairs.length;
        for (var i = 0; i < count; i++) {


            var rowObject = $scope.data.allChairs[i];
            var row = rowObject.row;
            var l = row.length;
            for (var j = 0; j < l; j++) {
                if (row[j].type == SIT) {
                    row[j].chairNumber = indexChair++;
                }
            }
        }
    }

    $scope.delRow = function (id) {
        $scope.data.allChairs = $scope.data.allChairs.filter(function (element) {
            if (element.id == id) {
                return false;
            }
            return true;
        });

        reloadNumbers();
    };

    $scope.delChairs = function () {
        $scope.data.newTypeChairs = [];
    };

    $scope.saveBus = function () {
        
        notification.info("Guardando datos");

        var data = $scope.data;
        var json = {
            operation: 'addbus',
            userData: {
                sessionid: $cookies.sessionid,
                userid: $cookies.userid
            },
            data: {
                name: data.name,
                detail: data.detail,
                serviceType: data.serviceType,
                chairs: data.allChairs, 
                userid: $cookies.userid,
                price: data.price
            }
        };

        $http.post(__URL__, json).success(success).error(server_error);

        function success(response) {
            console.log(response);
            if (response.success) {
                alert.info(response.message, $modalInstance.close);
            } else {
                errorManager.proccessError(response, $location, $cookies);
            }
        }

    };
});