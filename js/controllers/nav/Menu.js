inApp.controller('Menu', function ($scope, $modal, $cookies, $http, $cookieStore, $location) {

    $scope.userData = {
        logged: false
    };
    
    $scope.notification = {
        messages: [
            {from: "Leonard", message: "Acá va un mensaje...", readed: false},
            {from: "Penny", message: "Acá va un mensaje...", readed: false},
            {from: "Rajesh", message: "Acá va un mensaje...", readed: false},
            {from: "Sheldon", message: "Acá va un mensaje...", readed: false},
            {from: "Howard", message: "Acá va un mensaje...", readed: false},
            {from: "Bernnadette", message: "Acá va un mensaje...", readed: false},
            {from: "Amy", message: "Acá va un mensaje...", readed: false},
        ]
    };
    
    $scope.getNotReaded = function(){
        var nCount = $scope.notification.messages.length;
        var notReaded = 0;
        for(var i = 0 ; i < nCount; i++){
            if(!$scope.notification.messages[i].readed)
                notReaded++;
        }
        
        return notReaded;
    };
    
    $scope.getNotificationClass = function(readed){
        if(!readed)
            return "bg-danger";
        return "";
    }
    
    /**
     * Checkeo si el usuario ya esta loggeado
     */
    if (existsVar($cookies.idSession)) {
        onLogin();
    }

    /**
     * Esta función abre el modal que contiene el formulario para registrarme
     */
    $scope.register = function () {
        $modal.open({
            templateUrl: 'views/modals/userRegister.html',
            controller: 'registerCntrl'
        });
    };

    /**
     * Esta función abre el modal que contiene el formulario para loggearme 
     */
    $scope.login = function () {
        var modalLogin = $modal.open({
            templateUrl: 'views/modals/login.html',
            controller: "Login"
        });
    };

    /**
     * Esta función abre el modal que contiene el mensaje
     */
    $scope.showMessage = function () {
        var modalLogin = $modal.open({
            templateUrl: 'views/modals/message.html'
        });
    };

    /**
     * Función que abre el modal que contiene el formulario para un nuevo 
     * paquete
     */
    $scope.newPackage = function () {
        $modal.open({
            templateUrl: 'views/modals/newPackage.html'
        });

    };

    /**
     * Función para deslogearme 
     */
    $scope.logOut = function () {
        confirm.warn('¿Está seguro que desea salir?', function (button) {
            if (button == confirm.buttons.aceptar) {
                var json = {
                    operation: 'logout',
                    userData: {
                        userid: $cookies.userid,
                        sessionid: $cookies.sessionid
                    }
                    
                };

                $http.post('services/index.php', json)
                        .success(function () {
                            $cookieStore.remove('userid');
                            $cookieStore.remove('sessionid');
                            $location.path('/main');
                        }).error(function () {
                    $cookieStore.remove('userid');
                    $cookieStore.remove('sessionid');
                    $location.path('/main');
                });
            }
        });
    };


    /**
     * Carga los datos de la sesión
     */
    function onLogin() {
        $scope.userData.logged = true;
        $scope.userData.name = $cookies.name;
    };

    $scope.isLogged = function () {
        if (existsVar($cookies.sessionid))
            return true;
        return false;
    };

    $scope.isProvider = function(){
        return $cookies.type == PROVIDER || $cookies.type == BOTH;
    };

    $scope.isCompany = function(){
        return $cookies.type == COMPANY || $cookies.type == BOTH;
    };

});



