<?php

class Log {

    private $SECONDS_TO_ACTIVE = 432000;

    public function login($data) {
        $arr = array();
        $user = $data->user;
        $password = md5($data->password);

        $result = Connection::getInstance()->select("SELECT idUser, dateCreation, name, status, password FROM users WHERE email = '$user' AND password = '$password' AND status != 3 AND status != 4");

        if ($result['result'] == true) {

            $count = $result['resultCount'];

            // No encontró ningun usuario con esas caracteristicas
            if ($count == 0) {
                $arr['success'] = false;
                $arr['message'] = 'Email o contraseña incorrecta';
            } else {
                $resultData = $result['resultData'][0];
                $status = isset($resultData[3]) ? $resultData[3] : -1;
                $idUser = isset($resultData[0]) ? $resultData[0] : -1;
                /* if ($status == 2) {

                  $currentTime = Connection::getInstance()->select("select now();");
                  $currentTime = $currentTime["resultData"][0][0];

                  $ts1 = strtotime($currentTime);
                  $ts2 = strtotime($resultData[1]);
                  $interval = $ts1 - $ts2;
                  if ($interval >= $this->SECONDS_TO_ACTIVE) {
                  Connection::getInstance()->update("UPDATE users SET status=3 WHERE idUser = $idUser");
                  $arr['success'] = false;
                  $arr['message'] = 'Email o contraseña incorrecta';
                  $arr['interval'] = $interval;
                  } else {
                  $arr['success'] = true;
                  $arr['status'] = 2;
                  $days = intval(((($this->SECONDS_TO_ACTIVE - $interval) / 60) / 60) / 24);
                  $arr['message'] = "Recuerda que tienes que activar la cuenta desde tu Email. ";
                  if ($days == 0) {
                  $arr['message'] .= "Te queda menos de un día para hacerlo. Apúrate! :)";
                  } else if ($days == 1) {
                  $arr['message'] .= "Te queda un día para hacerlo. Apúrate! :)";
                  } else {
                  $arr['message'] .= "Te quedan " . $days . " para hacerlo. :)";
                  }
                  }
                  logg::loggInfo("Diferencia: ", "Login.LogIn");
                  } else {
                  $arr['success'] = true;
                  $arr['status'] = 1;
                  } */
                $arr['success'] = true;
                $arr['status'] = 1;
                // Inicio la sessión
//                if ($arr['success'] == true) {
                session_start();
                $_SESSION['idSession'] = md5(date("Y-m-d h:m:s"));
                $arr['idSession'] = $_SESSION['idSession'];
                $arr['name'] = $resultData[2];
                $arr['idUser'] = $idUser;
//            }
            }
        } else {
            $arr['success'] = false;
            $arr['message'] = 'Email o contraseña incorrecta';
        }

        return $arr;
    }

    public function logout() {
        session_destroy();
    }

}
