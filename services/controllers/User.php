<?php

class User {

    /**
     * 2015-01-27
     * Crea un usuario
     * @param type $data
     * @return type
     */
    static function add($data) {

        $name = $data->name ? $data->name : "";
        $password = $data->password ? $data->password : "";
        $password2 = $data->password2 ? $data->password2 : "";
        $email = $data->email ? $data->email : "";
        $type = $data->type;

        if ($name == "" || $email == "" || $password2 == "" || $password2 == "") {
            $response = new Response(false, "Faltan Datos");
        } else {
            if (User::hasEmail($email)) {
                $response = new Response(false, "Ya existe un email registrado");
            } else if ($password != $password2) {
                $response = new Response(false, "Las contraseñas no concuerdan");
            } else {
                $password = md5($password);
                $result = Connection::getInstance()->insert("INSERT INTO user (name,password,email,creationdate,status, type) VALUES ('$name', '$password', '$email', now(), 1, $type)");
                if ($result["result"]) {
                    $response = new Response(true, "Usuario creado!");
                } else {
                    $response = new Response(false, "Ups! Hubo un problema inesperado. Intente nuevamente más tarde");
                }
            }
        }

        return $response->getResponse();
    }

    static function hasEmail($email) {
        return Connection::getInstance()->moreThanOne("SELECT * FROM user WHERE email = '$email'");
    }

    static function login($data) {
        $email = $data->email;
        $password = md5($data->password);

        $select = array("iduser", "name", "email", "type");
        $where = "email='$email' AND password='$password'";
        $table = "user";
        $result = Connection::getInstance()->selectPlus($select, $table, $where);

        if ($result != null) {
            $sessionid = md5(date("Y-m-d h:m:s"));
            $result = $result[0];
            $result['sessionid'] = $sessionid;
            $userid = $result['iduser'];

            Connection::getInstance()->update("UPDATE $table SET sessionid='$sessionid' WHERE iduser=$userid");
            $response = new Response(true, "Ingreso correcto", $result);
        } else {
            $response = new Response(false, "E-Mail o contraseña incorrecto");
        }

        return $response->getResponse();
    }

    /**
     * Checkea si un usuario tiene una session activa
     * @param type $userdata
     * @return boolean
     */
    static function checkSession($userdata) {
        $userid = $userdata->userid;
        $sessionid = $userdata->sessionid;
        $result = Connection::getInstance()->select("SELECT * FROM user WHERE iduser = '$userid' AND sessionid = '$sessionid'");

        if ($result['result'] == true) {
            $count = $result['resultCount'];
            if ($count > 0) {
                return true;
            }
        }
        return false;
    }

    static function getUser($data) {
        $userid = $data->userid;
        $select = array('iduser', 'name', 'email', 'type');
        $from = 'user';
        $where = "iduser=$userid";
        $arr = Connection::getInstance()->selectPlus($select, $from, $where);
        if ($arr != null) {
            $newArr = array();
            $newArr["main"] = $arr[0];
            $select = array('iduserextra', 'iduser', 'fieldName', 'fieldValue', 'ispublic');
            $extra = Connection::getInstance()->selectPlus($select, "user_extra", $where);
            $newArr["extra"] = $extra;

            $response = new Response(true, "Usuario obtenido", $newArr);
        } else {
            $response = new Response(false, "Ups! Hubo un problema inesperado");
        }

        return $response->getResponse();
    }

    static function saveuserdata($userData, $data) {
        $userid = $userData->userid;
        $main = $data->data->main;
        $extra = $data->data->extra;

        $name = $main->name;

        $updateResult = Connection::getInstance()->update("UPDATE user SET name='$name' WHERE iduser=$userid");
        if ($updateResult['result'] == true) {

            $extraCount = count($extra);

            for ($i = 0; $i < $extraCount; $i++) {
                $item = $extra[$i];
//                var_dump($item);
                $isDeleted = isset($item->deleted) ? true : false;
                $itemId = isset($item->iduserextra) ? $item->iduserextra : -1;
                // Borro uno
                if ($isDeleted) {
                    Connection::getInstance()->update("DELETE FROM user_extra WHERE iduserextra=$itemId");
                } else if ($itemId == -1) { // Agrego uno
                    $fieldName = $item->fieldName;
                    $fieldValue = $item->fieldValue;
                    $ispublic = $item->ispublic;
                    $values = "($userid,'$fieldName','$fieldValue',1,$ispublic)";
                    Connection::getInstance()->insert("INSERT INTO user_extra (iduser, fieldName, fieldValue, status, ispublic) VALUES $values ");
                } else {

                    $fieldName = $item->fieldName;
                    $fieldValue = $item->fieldValue;
                    $ispublic = $item->ispublic;
                    $set = "fieldName='$fieldName', fieldValue='$fieldValue', ispublic='$ispublic'";
                    Connection::getInstance()->insert("UPDATE user_extra SET $set WHERE iduserextra=$itemId");
                }
            }

            $response = new Response(true, "Datos guardados correctamente");
        } else {
            $response = new Response(false, "Ups! Hubo un problema inesperado");
        }

        return $response->getResponse();
    }

    static function changePassword($data, $userData) {
        $userid = $userData->userid;
        $currentPass = md5($data->currentPass);
        $newPass = $data->newPass;
        $newPass2 = $data->newPass2;
        if (Connection::getInstance()->moreThanOne("SELECT * FROM user WHERE idUser='$userid' AND pass='$currentPass'")) {

            if ($newPass == $newPass2) {
                $newPass = md5($newPass);
                $result = Connection::getInstance()->update("UPDATE user SET pass='$newPass' WHERE idUser='$userid'");
                if ($result['result'] == true) {
                    if ($result['affected_rows'] > 0) {
                        $response = new Response(true, "Cambio exitoso!");
                    } else {
                        $response = new Response(false, "Hubo un problema en el servidor. Intente nuevamente más tarde");
                    }
                } else {
                    $response = new Response(false, "Hubo un problema en el servidor. Intente nuevamente más tarde");
                }
            } else {
                $response = new Response(false, "Las contraseñas no coinciden");
            }
        } else {
            $response = new Response(false, "Contraseña incorrecta");
        }

        return $response->getResponse();
    }

}
