inApp.controller('NewPackage', function ($scope, $cookies, $modal, $location, $http) {

    /**
     * Checkeo que este loggeado
     */
    if (!existsVar($cookies.sessionid)) {
        $location.path('/main');
        return;
    }

    $scope.screen = {
        busSee: "all"
    };
    $scope.store = {
        selectedBuses: [],
        selectedHotels: []
    };

    $scope.newBus = function () {
        $modal.open({
            templateUrl: 'views/modals/newBus.html',
            controller: 'NewBus'
        });
    };

    $scope.newHotel = function () {
        $modal.open({
            templateUrl: 'views/modals/newHotel.html',
            controller: 'NewHotel'
        });
    };

    $scope.addBus = function () {
        var modalInstance = $modal.open({
            templateUrl: 'views/package/addBus.html',
            controller: 'AddBus'
        });
        modalInstance.result.then(function (item) {
            item.count = 1;
            $scope.store.selectedBuses.push(item);
        });

    };

    $scope.addHotel = function () {
        var modalInstance = $modal.open({
            templateUrl: 'views/package/addHotel.html',
            controller: 'AddHotel'
        });
        modalInstance.result.then(function (item) {
            item.count = 1;
            $scope.store.selectedHotels.push(item);
        });

    };

    $scope.delBus = function (idBus) {
        $scope.store.selectedBuses = $scope.store.selectedBuses.filter(function (item) {
            if (item.idbus == idBus)
                return false;
            return true;
        });
    };

    $scope.delHote = function (idhotel) {
        $scope.store.selectedHotels = $scope.store.selectedHotels.filter(function (item) {
            if (item.idhotel == idhotel)
                return false;
            return true;
        });
    };


//    $scope.store.sugBus = [
//        {detail: "Vivamus ullamcorper metus ut accumsan suscipit. Proin condimentum hendrerit leo, vitae finibus enim. In mollis velit orci, sit amet pretium ante sodales vel", idbus: "1", name: "Lorem", price: "765", servicetype: "1", count: 0},
//        {detail: "Cras eros dui, accumsan eget odio ac, dapibus eleifend velit. Phasellus congue interdum arcu ut pulvinar. Praesent imperdiet odio quam, euismod rutrum erat fringilla non", idbus: "2", name: "ipsum", price: "765", servicetype: "1", count: 0},
//        {detail: "Nulla ullamcorper, mi et fringilla dapibus, urna nibh sagittis massa, id rhoncus odio eros id quam. Suspendisse potenti. Aliquam ullamcorper nibh id sapien tempor eleifend.", idbus: "3", name: "dolor", price: "765", servicetype: "1", count: 0},
//        {detail: "Maecenas feugiat urna quis sodales tristique. Vivamus et gravida risus. Sed id quam dui. Fusce in lacus in lorem molestie pretium quis luctus augue. ", idbus: "4", name: "sit", price: "765", servicetype: "1", count: 0},
//        {detail: "Donec tristique metus iaculis ultrices vestibulum. Duis id massa at lorem vestibulum interdum. Ut venenatis magna non nunc luctus, viverra tempor leo semper.", idbus: "5", name: "amet", price: "765", servicetype: "1", count: 0},
//        {detail: "Aliquam erat volutpat. Nulla volutpat at ipsum ut imperdiet. Pellentesque viverra dapibus convallis. Maecenas consectetur fermentum est, vel ultrices libero imperdiet vel.", idbus: "6", name: "consectetur", price: "765", servicetype: "1", count: 0},
//        {detail: "Nulla sed fringilla lectus. Mauris pulvinar massa sed lacus ullamcorper, eu bibendum leo consectetur. Nullam et sagittis urna, nec dictum diam. Sed non risus vel leo congue consectetur. ", idbus: "7", name: "adipiscing", price: "765", servicetype: "1", count: 0},
//        {detail: "Vivamus ullamcorper metus ut accumsan suscipit. Proin condimentum hendrerit leo, vitae finibus enim. In mollis velit orci, sit amet pretium ante sodales vel", idbus: "1", name: "Lorem", price: "765", servicetype: "1", count: 0},
//        {detail: "Cras eros dui, accumsan eget odio ac, dapibus eleifend velit. Phasellus congue interdum arcu ut pulvinar. Praesent imperdiet odio quam, euismod rutrum erat fringilla non", idbus: "2", name: "ipsum", price: "765", servicetype: "1", count: 0},
//        {detail: "Nulla ullamcorper, mi et fringilla dapibus, urna nibh sagittis massa, id rhoncus odio eros id quam. Suspendisse potenti. Aliquam ullamcorper nibh id sapien tempor eleifend.", idbus: "3", name: "dolor", price: "765", servicetype: "1", count: 0},
//        {detail: "Maecenas feugiat urna quis sodales tristique. Vivamus et gravida risus. Sed id quam dui. Fusce in lacus in lorem molestie pretium quis luctus augue. ", idbus: "4", name: "sit", price: "765", servicetype: "1", count: 0},
//        {detail: "Donec tristique metus iaculis ultrices vestibulum. Duis id massa at lorem vestibulum interdum. Ut venenatis magna non nunc luctus, viverra tempor leo semper.", idbus: "5", name: "amet", price: "765", servicetype: "1", count: 0},
//        {detail: "Aliquam erat volutpat. Nulla volutpat at ipsum ut imperdiet. Pellentesque viverra dapibus convallis. Maecenas consectetur fermentum est, vel ultrices libero imperdiet vel.", idbus: "6", name: "consectetur", price: "765", servicetype: "1", count: 0},
//        {detail: "Nulla sed fringilla lectus. Mauris pulvinar massa sed lacus ullamcorper, eu bibendum leo consectetur. Nullam et sagittis urna, nec dictum diam. Sed non risus vel leo congue consectetur. ", idbus: "7", name: "adipiscing", price: "765", servicetype: "1", count: 0}
//    ];


//    $scope.store.sugHotel = [
//        {detail: "Vivamus ullamcorper metus ut accumsan suscipit. Proin condimentum hendrerit leo, vitae finibus enim. In mollis velit orci, sit amet pretium ante sodales vel", idhotel: "1", name: "Lorem", price: "765", servicetype: "1", count: 0},
//        {detail: "Cras eros dui, accumsan eget odio ac, dapibus eleifend velit. Phasellus congue interdum arcu ut pulvinar. Praesent imperdiet odio quam, euismod rutrum erat fringilla non", idhotel: "2", name: "ipsum", price: "765", servicetype: "1", count: 0},
//        {detail: "Nulla ullamcorper, mi et fringilla dapibus, urna nibh sagittis massa, id rhoncus odio eros id quam. Suspendisse potenti. Aliquam ullamcorper nibh id sapien tempor eleifend.", idhotel: "3", name: "dolor", price: "765", servicetype: "1", count: 0},
//        {detail: "Maecenas feugiat urna quis sodales tristique. Vivamus et gravida risus. Sed id quam dui. Fusce in lacus in lorem molestie pretium quis luctus augue. ", idhotel: "4", name: "sit", price: "765", servicetype: "1", count: 0},
//        {detail: "Donec tristique metus iaculis ultrices vestibulum. Duis id massa at lorem vestibulum interdum. Ut venenatis magna non nunc luctus, viverra tempor leo semper.", idhotel: "5", name: "amet", price: "765", servicetype: "1", count: 0},
//        {detail: "Aliquam erat volutpat. Nulla volutpat at ipsum ut imperdiet. Pellentesque viverra dapibus convallis. Maecenas consectetur fermentum est, vel ultrices libero imperdiet vel.", idhotel: "6", name: "consectetur", price: "765", servicetype: "1", count: 0},
//        {detail: "Nulla sed fringilla lectus. Mauris pulvinar massa sed lacus ullamcorper, eu bibendum leo consectetur. Nullam et sagittis urna, nec dictum diam. Sed non risus vel leo congue consectetur. ", idhotel: "7", name: "adipiscing", price: "765", servicetype: "1", count: 0},
//        {detail: "Vivamus ullamcorper metus ut accumsan suscipit. Proin condimentum hendrerit leo, vitae finibus enim. In mollis velit orci, sit amet pretium ante sodales vel", idhotel: "1", name: "Lorem", price: "765", servicetype: "1", count: 0},
//        {detail: "Cras eros dui, accumsan eget odio ac, dapibus eleifend velit. Phasellus congue interdum arcu ut pulvinar. Praesent imperdiet odio quam, euismod rutrum erat fringilla non", idhotel: "2", name: "ipsum", price: "765", servicetype: "1", count: 0},
//        {detail: "Nulla ullamcorper, mi et fringilla dapibus, urna nibh sagittis massa, id rhoncus odio eros id quam. Suspendisse potenti. Aliquam ullamcorper nibh id sapien tempor eleifend.", idhotel: "3", name: "dolor", price: "765", servicetype: "1", count: 0},
//        {detail: "Maecenas feugiat urna quis sodales tristique. Vivamus et gravida risus. Sed id quam dui. Fusce in lacus in lorem molestie pretium quis luctus augue. ", idhotel: "4", name: "sit", price: "765", servicetype: "1", count: 0},
//        {detail: "Donec tristique metus iaculis ultrices vestibulum. Duis id massa at lorem vestibulum interdum. Ut venenatis magna non nunc luctus, viverra tempor leo semper.", idhotel: "5", name: "amet", price: "765", servicetype: "1", count: 0},
//        {detail: "Aliquam erat volutpat. Nulla volutpat at ipsum ut imperdiet. Pellentesque viverra dapibus convallis. Maecenas consectetur fermentum est, vel ultrices libero imperdiet vel.", idhotel: "6", name: "consectetur", price: "765", servicetype: "1", count: 0},
//        {detail: "Nulla sed fringilla lectus. Mauris pulvinar massa sed lacus ullamcorper, eu bibendum leo consectetur. Nullam et sagittis urna, nec dictum diam. Sed non risus vel leo congue consectetur. ", idhotel: "7", name: "adipiscing", price: "765", servicetype: "1", count: 0}
//    ];



    $scope.selectBus = function (item) {
        if (!$scope.store.seletedBus)
            $scope.store.seletedBus = [];

        var count = $scope.store.seletedBus.length;
        for (var i = 0; i < count; i++) {
            if ($scope.store.seletedBus[i].idbus == item.idbus) {
                $scope.store.seletedBus[i].count++;
                return;
            }
        }

        item.count = 1;
        $scope.store.seletedBus.push(item);
    };

    $scope.removeBus = function (idbus) {
        $scope.store.seletedBus = $scope.store.seletedBus.filter(function (item) {
            if (item.idbus == idbus)
                return false;
            return true;
        });
    };

    var timeOutHotel;
//    $scope.searchBus = function () {
//        clearTimeout(timeOutHotel);
//        timeOutHotel = setTimeout(function () {
//            var filter = $scope.screen.filterHotel;
//            if (!filter)
//                filter = "";
//
//            var json = {
//                operation: 'getBusByUserId',
//                userData: {
//                    sessionid: $cookies.sessionid,
//                    userid: $cookies.userid
//                },
//                data: {
//                    userid: $cookies.userid,
//                    filter: filter
//                }
//            };
//
//            $http.post(__URL__, json).success(success).error(server_error);
//
//            function success(response) {
//                console.log(response);
//                if (response.success) {
//                    $scope.store.sugHotel = response.optional;
//                } else {
//                    errorManager.proccessError(response, $location, $cookies);
//                }
//            }
//        }, 300);
//
//    };

    $scope.selectHotel = function (item) {
        if (!$scope.store.seletedHotel)
            $scope.store.seletedHotel = [];

        var count = $scope.store.seletedHotel.length;
        for (var i = 0; i < count; i++) {
            if ($scope.store.seletedHotel[i].idHotel == item.idHotel) {
                $scope.store.seletedHotel[i].count++;
                return;
            }
        }

        item.count = 1;
        $scope.store.seletedBus.push(item);
    };

    $scope.removeHotel = function (idHotel) {
        $scope.store.seletedHotel = $scope.store.seletedHotel.filter(function (item) {
            if (item.idHotel == idHotel)
                return false;
            return true;
        });
    };

//    $scope.searchBus();
//    $scope.searchHotel();

});


