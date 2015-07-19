inApp.controller('AddHotel', function ($scope, $modalInstance) {


    $scope.store = {};

    $scope.store.hotels = [
        {detail: "Vivamus ullamcorper metus ut accumsan suscipit. Proin condimentum hendrerit leo, vitae finibus enim. In mollis velit orci, sit amet pretium ante sodales vel", idhotel: "1", name: "Lorem", price: "765", servicetype: "1", count: 2},
        {detail: "Cras eros dui, accumsan eget odio ac, dapibus eleifend velit. Phasellus congue interdum arcu ut pulvinar. Praesent imperdiet odio quam, euismod rutrum erat fringilla non", idhotel: "2", name: "ipsum", price: "765", servicetype: "1", count: 0},
        {detail: "Nulla ullamcorper, mi et fringilla dapibus, urna nibh sagittis massa, id rhoncus odio eros id quam. Suspendisse potenti. Aliquam ullamcorper nibh id sapien tempor eleifend.", idhotel: "3", name: "dolor", price: "765", servicetype: "1", count: 0},
        {detail: "Maecenas feugiat urna quis sodales tristique. Vivamus et gravida risus. Sed id quam dui. Fusce in lacus in lorem molestie pretium quis luctus augue. ", idhotel: "4", name: "sit", price: "765", servicetype: "1", count: 0},
        {detail: "Donec tristique metus iaculis ultrices vestibulum. Duis id massa at lorem vestibulum interdum. Ut venenatis magna non nunc luctus, viverra tempor leo semper.", idhotel: "5", name: "amet", price: "765", servicetype: "1", count: 0},
        {detail: "Aliquam erat volutpat. Nulla volutpat at ipsum ut imperdiet. Pellentesque viverra dapibus convallis. Maecenas consectetur fermentum est, vel ultrices libero imperdiet vel.", idhotel: "6", name: "consectetur", price: "765", servicetype: "1", count: 0},
        {detail: "Nulla sed fringilla lectus. Mauris pulvinar massa sed lacus ullamcorper, eu bibendum leo consectetur. Nullam et sagittis urna, nec dictum diam. Sed non risus vel leo congue consectetur. ", idhotel: "7", name: "adipiscing", price: "765", servicetype: "1", count: 0},
        {detail: "Vivamus ullamcorper metus ut accumsan suscipit. Proin condimentum hendrerit leo, vitae finibus enim. In mollis velit orci, sit amet pretium ante sodales vel", idhotel: "8", name: "Lorem", price: "765", servicetype: "1", count: 0},
        {detail: "Cras eros dui, accumsan eget odio ac, dapibus eleifend velit. Phasellus congue interdum arcu ut pulvinar. Praesent imperdiet odio quam, euismod rutrum erat fringilla non", idhotel: "9", name: "ipsum", price: "765", servicetype: "1", count: 0},
        {detail: "Nulla ullamcorper, mi et fringilla dapibus, urna nibh sagittis massa, id rhoncus odio eros id quam. Suspendisse potenti. Aliquam ullamcorper nibh id sapien tempor eleifend.", idhotel: "10", name: "dolor", price: "765", servicetype: "1", count: 0},
        {detail: "Maecenas feugiat urna quis sodales tristique. Vivamus et gravida risus. Sed id quam dui. Fusce in lacus in lorem molestie pretium quis luctus augue. ", idhotel: "11", name: "sit", price: "765", servicetype: "1", count: 0},
        {detail: "Donec tristique metus iaculis ultrices vestibulum. Duis id massa at lorem vestibulum interdum. Ut venenatis magna non nunc luctus, viverra tempor leo semper.", idhotel: "12", name: "amet", price: "765", servicetype: "1", count: 0},
        {detail: "Aliquam erat volutpat. Nulla volutpat at ipsum ut imperdiet. Pellentesque viverra dapibus convallis. Maecenas consectetur fermentum est, vel ultrices libero imperdiet vel.", idhotel: "13", name: "consectetur", price: "765", servicetype: "1", count: 0},
        {detail: "Nulla sed fringilla lectus. Mauris pulvinar massa sed lacus ullamcorper, eu bibendum leo consectetur. Nullam et sagittis urna, nec dictum diam. Sed non risus vel leo congue consectetur. ", idhotel: "14", name: "adipiscing", price: "765", servicetype: "1", count: 0}
    ];
    
    
    $scope.close = function(item){
        $modalInstance.close(item);
    };

});