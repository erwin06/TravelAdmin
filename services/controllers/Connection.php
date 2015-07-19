<?php

/**
 * 2015-01-27
 */
class Connection {

    static private $instancia = null;
    private static $mysqli = null;

    /**
     * 2015-01-27
     */
    private function __construct($servidor, $usuario, $password, $basedatos) {
        self::$mysqli = new mysqli($servidor, $usuario, $password, $basedatos);
        self::$mysqli->set_charset("utf8");
    }

    /**
     * 2015-01-27
     */
    static public function getInstance() {
        if (self::$instancia == null) {
            self::$instancia = new Connection("127.0.0.1", "root", "", "traveladmin");
        }
        return self::$instancia;
    }

    /**
     * 2015-01-27
     */
    public function insert($query) {
        logg::loggInfo($query, "Insert");
        $result = self::$mysqli->query($query);
        $arr = array();
        $arr['result'] = $result;
        if ($result == true) {
            $arr['insert_id'] = self::$mysqli->insert_id;
        }
        return $arr;
    }

    /**
     * 2015-01-27
     */
    public function update($query) {
        logg::loggInfo($query, "Update");
        $result = self::$mysqli->query($query);
        $arr = array();
        $arr['result'] = $result;
        $arr['affected_rows'] = self::$mysqli->affected_rows;
        return $arr;
    }

    /**
     * 2015-01-27
     */
    public function select($query) {
        logg::loggInfo($query, "Select");
        $arr = array();
        $arr['result'] = false;
        if ($result = self::$mysqli->query($query)) {
            $arr['result'] = true;
            $arr['resultData'] = array();
            while ($fila = $result->fetch_row()) {

                array_push($arr['resultData'], $fila);
            }
            $arr['resultCount'] = count($arr['resultData']);
        }

        return $arr;
    }

    /**
     * 2015-01-27
     */
    public function moreThanOne($query) {
        $result = Connection::getInstance()->select($query);
        if ($result['result'] == true) {
            $count = $result['resultCount'];
            // No encontró ningun usuario con esas caracteristicas
            if ($count > 0) {
                return true;
            }
        }
        return false;
    }

    /**
     * 2015-01-27
     */
    public function selectPlus($select, $from, $where = null, $fields = null, $extra = null) {

        $selectString = implode(",", $select);
        $response = null;
        $selectC = count($select);
        $arr = array();
        if ($extra == null)
            $extra = '';
        if ($where != null) {
            $result = Connection::getInstance()->select("SELECT " . $selectString . " FROM " . $from . " WHERE " . $where . " " . $extra);
        } else {
            $result = Connection::getInstance()->select("SELECT " . $selectString . " FROM " . $from . " " . $extra);
        }

        if ($result['result'] == true) {
            $count = $result['resultCount'];
            if ($count > 0) {
                $resultData = $result['resultData'];
                if ($fields != null) {
                    for ($i = 0; $i < $count; $i++) {
                        for ($j = 0; $j < $selectC; $j++) {
                            $arr[$i][$fields[$j]] = $resultData[$i][$j];
                        }
                    }
                } else {
                    for ($i = 0; $i < $count; $i++) {
                        for ($j = 0; $j < $selectC; $j++) {
                            $arr[$i][$select[$j]] = $resultData[$i][$j];
                        }
                    }
                }
            }

            $response = $arr;
        }

        return $response;
    }
    
    public function insertPlus($table, $values, $fields = null){
        
        $values = implode(",", $values);
        if($fields){
            $fields = implode("','", $fields);
            echo "INSERT INTO '$table' ($fields) VALUES ($values)";
            return Connection::getInstance()->insert("INSERT INTO $table ($fields) VALUES ($values)");
        } else {
            echo "INSERT INTO '$table' ('$values')";
            return Connection::getInstance()->insert("INSERT INTO $table ($values)");
        }
        
    }
    

}
