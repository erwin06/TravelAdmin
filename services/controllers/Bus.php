<?php

class Bus {

    static function addBus($userData, $data) {
        $name = $data->name;
        $detail = $data->detail;
        $serviceType = $data->serviceType;
        $chairs = $data->chairs;
        $userid = $userData->userid;
        $price = $data->price;
        $values = "('$name','$detail',$serviceType,$userid,$price)";
        $result = Connection::getInstance()->insert("INSERT INTO bus (name, detail, servicetype, userid, price) VALUES $values");
        if ($result['result'] == true) {

            $busId = $result['insert_id'];
            $chairsCount = count($chairs);

            for ($i = 0; $i < $chairsCount; $i++) {

                $result = Connection::getInstance()->insert("INSERT INTO bus_row (idbus) VALUES ($busId)");
                $resultId = $result['insert_id'];
                $chair = $chairs[$i]->row;
                $count = count($chair);
                for ($j = 0; $j < $count; $j++) {
                    $item = $chair[$j];
                    $type = $item->type;
                    $chairNumber = $item->chairNumber;
                    $values = "($type,$chairNumber,$resultId)";
                    Connection::getInstance()->insert("INSERT INTO bus_rows_info (type, chairnumber, idrow) VALUES $values");
                }
            }
            $response = new Response(true, "Se agregó con éxito.");
        } else {
            $response = new Response(false, __SERVERFAIL__);
        }
        return $response->getResponse();
    }

    static function getBusByUserId($data) {
        $userid = $data->userid;
        $select = array("idbus", "name", "detail", "servicetype", "price");
        $from = "bus";
        $where = "userid=$userid";
        $fields = null;
        $result = Connection::getInstance()->selectPlus($select, $from, $where, $fields);
        $response = new Response(true, "Datos", $result);
        return $response->getResponse();
    }

    static function getBusById($userData, $data) {
        $userid = $userData->userid;
        $idBus = $data->idBus;
        $select = array("bus_row.idrow", "bus_rows_info.type", "bus_rows_info.chairnumber");
        $from = "bus, bus_row, bus_rows_info";
        $where = "userid = $userid AND bus.idbus = $idBus AND bus_row.idbus = $idBus AND bus_row.idrow = bus_rows_info.idrow";
        $fields = array("idrow", "type", "chairnumber");
        $result = Connection::getInstance()->selectPlus($select, $from, $where, $fields);
        $response = new Response(true, "Datos", $result);
        return $response->getResponse();
    }

}
