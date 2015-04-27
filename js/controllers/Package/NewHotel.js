angular.module('newHotel', ['ui.bootstrap.modal']).controller('newHotel', function ($scope, $http, $cookies, $modalInstance, $location) {

    var _autoIncr = 0;
    $scope.screen = {
        beds: [
            {type: MATRIMONIAL, name: "Matrimonial", count: 0},
            {type: SIMPLE, name: "Simple", count: 0}
        ]
    };

    $scope.data = {
        rooms: [],
        roomType: COMMON
    };

    $scope.addRom = function () {

        if (!$scope.data.price) {
            alert.warn("Agrege el precio a la habitación.");
            return;
        }

        var rOk;
        var rCount = $scope.screen.beds.length;
        for (var i = 0; i < rCount; i++) {
            if ($scope.screen.beds[i].count > 0) {
                rOk = true;
                break;
            }
        }

        if (!rOk) {
            alert.warn("Debe agregar al menos una cama a la habitación");
            return;
        }


        // Agrego
        $scope.data.rooms.push({
            id: _autoIncr++,
            beds: copy($scope.screen.beds),
            description: $scope.data.roomDetail,
            count: 1,
            price: $scope.data.price,
            type: $scope.data.roomType
        });
        // Limpio
        $scope.data.roomName = "";
        for (var i = 0; i < rCount; i++) {
            $scope.screen.beds[i].count = 0;
        }
        $scope.data.roomDetail = "";
        $scope.data.price = "";


    };

    $scope.getRoomType = function (id) {
        switch (parseInt(id)) {
            case SUIT:
                return "Suit";
            case COMMON:
                return "Común";
        }
    };

    $scope.delRoom = function (id) {
        $scope.data.rooms = $scope.data.rooms.filter(function (element) {
            if (element.id == id) {
                return false;
            }
            return true;
        });

    };

    $scope.saveHotel = function () {

        console.log($scope.data);

//        notification.info("Guardando datos");
//
        var data = $scope.data;
        var nRooms = [];
        var rooms = $scope.data.rooms;
        var cRooms = rooms.length;
        for (var i = 0; i < cRooms; i++) {
            
            var beds = rooms[i].beds;
            var cBeds = beds.length;
            var nBeds = [];
            for (var j = 0; j < cBeds; j++) {
                var bed = beds[j];
                if (bed.count > 0) {
                    nBeds.push({
                        count: bed.count,
                        type: bed.type
                    });
                }
            }
            var room = rooms[i];
            nRooms.push({
                count: room.count,
                name: room.name
            });

        }

        var json = {
            operation: 'addhotel',
            userData: {
                sessionid: $cookies.sessionid,
                userid: $cookies.userid
            },
            data: {
                name: data.hotelName,
                detail: data.hotelDetail,
                rooms: rooms
            }
        };

        console.log(json);
        console.log(JSON.stringify(json));
//
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