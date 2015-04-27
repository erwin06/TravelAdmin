<?php

class Hotel {

    static function addHotel($userData,$data) {

        // Hotel Info
        $hotelName = $data->name;
        $hotelDetail = isset($data->detail) ? $data->detail : "";
        $rooms = $data->rooms;
        $cRooms = count($rooms);
        $iduser = $userData->userid;

        $values = "('$hotelName','$hotelDetail')";
        $result = Connection::getInstance()->insert("INSERT INTO hotel (name, detail, iduser) VALUES $values");

        if ($result["result"] == true) {
            $idhotel = $result['insert_id'];
            $rFields = "(idhotel,price,type,detail,count,status)";
            for ($i = 0; $i < $cRooms; $i++) {

                $room = $rooms[$i];
                $count = $room->count;
                $detail = isset($room->description) ? $room->description : "";
                $price = $room->price;
                $type = $room->type;
                $beds = $room->beds;

                $result = Connection::getInstance()->insert("INSERT INTO hotel_rooms $rFields "
                        . " VALUES ($idhotel, '$price', '$type', '$detail', $count, -1)");

                if ($result["result"] == true) {
                    $rbFields = "(idroom, type, count)";
                    $cBeds = count($beds);
                    $idRoom = $result["insert_id"];
                    for ($j = 0; $j < $cBeds; $j++) {
                        $type = $beds[$j]->type;
                        $countb = $beds[$j]->count;
                        if ($countb == 0)
                            continue;
                        $bValues = "($idRoom, $type, $countb)";
                        $result = Connection::getInstance()->insert("INSERT INTO hotel_rooms_beds $rbFields VALUES $bValues");
                    }

                    $response = new Response(true, "Operación exitosa");
                } else {
                    $response = new Response(false, __SERVERFAIL__);
                }
            }
        } else {
            $response = new Response(false, __SERVERFAIL__);
        }


        return $response->getResponse();
    }

    static function getHotelByUserId($data) {
        $userid = $data->userid;
        $filter = $data->filter;

        $select = array("idbus", "name", "detail", "servicetype", "price");
        $from = "bus";
        $where = "userid=$userid AND (name like '%$filter%' || detail like '%$filter%') AND servicetype IN (" . implode(",", $servicesType) . ")";
        $fields = null;
        $extra = "LIMIT 5";
        $result = Connection::getInstance()->selectPlus($select, $from, $where, $fields, $extra);

//        if ($result != null) {
        $response = new Response(true, "Datos", $result);
//        } else {
////            $response = new Response(false, __SERVERFAIL__);
//        }
        return $response->getResponse();
    }

}
