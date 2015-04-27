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

angular.module('travelAdmin', [
    'ngRoute',
    'ngCookies',
    'Menu',
    'Register',
    'Login',
    'ui.bootstrap',
    'Profile',
    'NewPackage',
    'newBus',
    'newHotel',
    'addBus',
    'addHotel'
]).config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
                .when('/myprofile', {
                    templateUrl: 'views/myProfile.html',
                    controller: 'Profile'
                })
                .when('/newpackage', {
                    templateUrl: 'views/package/newPackage.html',
                    controller: 'NewPackage'
                })
//                .when('/mainUser', {
//                    templateUrl: 'views/mainUser.html',
//                    controller: 'mainUser'
//                })
                .when('/main', {
                    templateUrl: 'views/main.html',
                    controller: 'Menu'
                })
                .when('/register', {
                    templateUrl: 'views/register.html',
                    controller: 'Register'
                })
                .otherwise({
                    redirectTo: '/main'
                });
    }]);