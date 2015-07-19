'use strict';

// CONST
var __URL__ = 'services/index.php';
var PROVIDER = 1;
var COMPANY = 2;
var BOTH = 3;

var PRIVATE = 1;
var PUBLIC = 2;

var SUIT = 1;
var EXECUTIVE = 2;
var COMMON = 3;

var SIT = 1;
var SPACE = 2;

var MATRIMONIAL = 1;
var SIMPLE = 2;

var inApp = angular.module('travelAdmin', [
    'ngRoute',
    'ngCookies',
    'ui.bootstrap',
    'ui.bootstrap.modal'
    // 'Menu',
    // 'Register',
    // 'Login',
    // 'ui.bootstrap',
    // 'Profile',
    // 'NewPackage',
    // 'newBus',
    // 'newHotel',
    // 'addBus',
    // 'addHotel',
    // 'SearchPackage'
]).config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
                .when('/myprofile', {
                    templateUrl: 'views/myProfile.html'
                })
                .when('/newpackage', {
                    templateUrl: 'views/package/newPackage.html',
                    controller: 'NewPackage'
                })
                .when('/searchPackage', {
                    templateUrl: 'views/package/searchPackage.html',
                    controller: 'SearchPackage'
                })
                .when('/main', {
                    templateUrl: 'views/main.html',
                    controller: 'Menu'
                })
                .when('/register', {
                    templateUrl: 'views/register.html'
                })
                .otherwise({
                    redirectTo: '/main'
                });
    }]);