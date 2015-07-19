<?php

//session_start();
include("misc/logg.php");
include("misc/response.php");

include("controllers/Error.php");
include("controllers/Connection.php");
include("controllers/User.php");
include("controllers/Bus.php");
include("controllers/Hotel.php");

define("__SERVERFAIL__", "Ups! Hubo un problema en el servidor. Intente nuevamente más tarde"); 

// Obtengo los datos
$input = json_decode(file_get_contents("php://input"));
$operation = $input->operation ? $input->operation : "__";
$data = $input->data;


$messageReturn = null;

switch ($operation) {
    case 'singup':
        $messageReturn = User::add($data);
        break;
    case 'login':
        $messageReturn = User::login($data);
        break;
}
//var_dump($operation);
// Operaciones con validación
if ($messageReturn == null) {
    $userData = $input->userData;
    if (User::checkSession($userData)) {
        switch ($operation) {
            case 'getuser':
                $messageReturn = User::getUser($userData);
                break;
            case 'saveuserdata':
                $messageReturn = User::saveUserData($userData, $data);
                break;
            case 'addbus':
                $messageReturn = Bus::addBus($userData, $data);
                break;
            case 'getBusByUserId':
                $messageReturn = Bus::getBusByUserId($userData);
                break;
            case 'getBusById':
                $messageReturn = Bus::getBusById($userData, $data);
                break;
            case 'addhotel':
                $messageReturn = Hotel::addHotel($userData, $data);
                break;
        }
    } else {
        $messageReturn = Error::noLogged();
    }
}



if ($messageReturn == null) {
    $respo = new Response(false, "Operación no válida");
    $messageReturn = $respo->getResponse();
}

echo json_encode($messageReturn);

