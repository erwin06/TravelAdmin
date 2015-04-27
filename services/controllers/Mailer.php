<?php
/**
 * @internal Audit trail
 * (AAAA-MM-DD) Autor: Modificación --------------------------------------------
 * (2014-05-21) Agustín Cignetti: Se completa la función setContentFromFile ----
 * (2014-06-06) Agustín Cignetti: Se agrega la posibilidad de enviar un arreglo
 * con arreglos de información en la función setContentFromFile, en ese caso se
 * procesa el cuerpo mientras exista información y se reemplazan los valores, se
 * agrega también la posibilidad de pasar un template compuesto por 3 partes ---
 */

/**
 * Descripción: Clase utilizada para el envío de mails desde un servidor
 * utilizando la función mail de php
 *
 * @package    DeveloperNotifier
 * @subpackage Mailer
 * @author     Agustín Cignetti <agustin.cignetti@sondeos.com.ar>
 * @version    1.1.0
 *
 * @internal Fecha de creación:   2014-05-19
 * @internal Ultima modificación: 2014-06-06
 */

class Mailer {

    /**
     * Variable que contiene el nombre de quien envía
     * @var string
     */
    private $_senderName;

    /**
     * Contiene el mail del remitente
     * @var string
     */
    private $_senderMail;

    /**
     * El mail de quien va a recibir el mensaje
     * @var string
     */
    private $_receiverMail;

    /**
     * Asunto del mail
     * @var string
     */
    private $_mailSubject;

    /**
     * Las cabeceras del mensaje
     * @var string
     */
    private $_mailHeaders;

    /**
     * Contenido final del mail, se puede tomar una entrada o ser generado
     * desde el contenido de un template de un archivo
     * @var string
     */
    private $_mailContent;

    /**
     * Dirección absoluta dentro del disco de un template para utilizar durante
     * la generación de un mail
     * @var mixed Puede ser false si no existe o string si existe
     */
    private $_inputTemplate;

    // ------------------------------------------------------------------------> Constructor/Destructor

    /**
     * Constructor de la clase Mailer
     */
    function __construct() { }

    /**
     * Destructor de la clase Mailer
     */
    function __destruct() { }

    // ------------------------------------------------------------------------> Privado

    /**
     * Descripción: Guarda en un archivo el mensaje recibido por parámetro
     *
     * @author Agustín Cignetti
     *
     * @access private
     *
     * @param string $fileName Nombre del archivo donde guardar
     * @param string $message  String a guardar en el archivo
     *
     * @internal Fecha de creación:   2014-05-19
     * @internal Ultima modificación: 2014-05-19
     * @internal Razón: Creación
     *
     * @return void
     */
    private static function logException($fileName, $message) {
        try {
            $myFile = fopen(CURRENT_PATH.'exceptions/' . $fileName, 'a+');
            fwrite($myFile, date('Y-m-d H:i:s -- ') . str_repeat('-', 77) . PHP_EOL);
            if (is_array($message)) {
                foreach ($message as $aLine) {
                    fwrite($myFile, date('Y-m-d H:i:s -- ') . $aLine . PHP_EOL);
                }
            } else {
                fwrite($myFile, date('Y-m-d H:i:s -- ') . $message);
            }
            fwrite($myFile, date('Y-m-d H:i:s -- ') . str_repeat('-', 77) . PHP_EOL);
            fclose($myFile);
        } catch (Exception $final) {
            /**
             * Esta exception no puede ser tomada por nadie, pero no podemos
             * cortar la ejecución así que sólo eliminamos el mensaje
             */
            unset($final);
        }
    }

    /**
     * Descripción: Comprueba mediante una expresión regular si el string pasado
     * por parámetro es un correo válido desde el punto de vista sintáctico, no
     * de existencia
     *
     * @author Agustín Cignetti
     *
     * @access private
     *
     * @param string $mailToCheck Correo a validar
     *
     * @internal Fecha de creación:   2014-05-19
     * @internal Ultima modificación: 2014-05-19
     * @internal Razón: Creación
     *
     * @return boolean Resultado de la operación
     */
    private static function checkMail($mailToCheck) {
        return preg_match("/^[a-zA-Z0-9-_]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-_]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,3})$/", $mailToCheck);
    }

    /**
     * Descripción: Carga el contenido de las variables dentro de los headers
     * del mail a enviar
     *
     * @author Agustín Cignetti
     *
     * @access private
     *
     * @internal Fecha de creación:   2014-05-19
     * @internal Ultima modificación: 2014-05-19
     * @internal Razón: Creación
     *
     * @return boolean Resultado de la operación
     */
    private function setHeaders() {
        try {
            $this->_mailHeaders  = "From: " . $this->_senderName . " <" . $this->_senderMail . ">" . PHP_EOL;
            $this->_mailHeaders .= "Reply-To: noreply@sondeos.com.ar" . PHP_EOL;
            $this->_mailHeaders .= "Return-Path: Redmine <noreply@sondeos.com.ar>" . PHP_EOL;
            $this->_mailHeaders .= "MIME-Version: 1.0" . PHP_EOL;
            $this->_mailHeaders .= "Content-Type: text/html; charset=UTF-8" . PHP_EOL;

            return true;
        } catch (Exception $myException) {
            self::logException('MailerException', $myException->getMessage());
            return false;
        }
    }

    // ------------------------------------------------------------------------> Público

    /**
     * Descripción: Cambia el nombre de la persona que envía el mail
     *
     * @author Agustín Cignetti
     *
     * @access public
     *
     * @param string $newSender Nombre del remitente
     *
     * @internal Fecha de creación:   2014-05-19
     * @internal Ultima modificación: 2014-05-19
     * @internal Razón: Creación
     *
     * @return boolean Resultado de la operación
     */
    public function setSender($newSender) {
        if ($newSender) {
            $this->_senderName = $newSender;

            return true;
        }

        return false;
    }

    /**
     * Descripción: Cambia el mail del remitente si es una dirección válida,
     * caso contrario deja el contenido anterior
     *
     * @author Agustín Cignetti
     *
     * @access public
     *
     * @param string $newSenderMail Correo del remitente
     *
     * @internal Fecha de creación:   2014-05-19
     * @internal Ultima modificación: 2014-05-19
     * @internal Razón: Creación
     *
     * @return boolean Resultado de la operación
     */
    public function setSenderMail($newSenderMail) {
        if ($newSenderMail && self::checkMail($newSenderMail)) {
            $this->_senderMail = $newSenderMail;

            return true;
        }

        return false;
    }

    /**
     * Descripción: Cambia el mail de la persona que recibe el mail
     *
     * @author Agustín Cignetti
     *
     * @access public
     *
     * @param string $newReceiver Nombre del receptor del mensaje
     *
     * @internal Fecha de creación:   2014-05-19
     * @internal Ultima modificación: 2014-05-19
     * @internal Razón: Creación
     *
     * @return boolean Resultado de la operación
     */
    public function setReceiver($newReceiver) {
        if ($newReceiver && self::checkMail($newReceiver)) {
            $this->_receiverMail = $newReceiver;

            return true;
        }

        return false;
    }

    /**
     * Descripción: Cambia el asunto del correo a ser enviado
     *
     * @author Agustín Cignetti
     *
     * @access public
     *
     * @param string $newSubject Asunto del mensaje
     *
     * @internal Fecha de creación:   2014-05-19
     * @internal Ultima modificación: 2014-05-19
     * @internal Razón: Creación
     *
     * @return boolean Resultado de la operación
     */
    public function setSubject($newSubject) {
        if ($newSubject) {
            $this->_mailSubject = $newSubject;

            return true;
        }
        return false;
    }

    /**
     * Descripción: Carga el path del archivo dentro de una variable, devuelve
     * true si pudo cargarse, false en caso contrario. Si no se puede cargar el
     * archivo, se coloca false dentro de la variable $_inputTemplate
     *
     * @author Agustín Cignetti
     *
     * @access public
     *
     * @param string $newTemplate Path del archivo con el template
     *
     * @internal Fecha de creación:   2014-05-19
     * @internal Ultima modificación: 2014-06-06
     * @internal Razón: Se controla un template con Header, Body y Footer
     *
     * @return boolean Resultado de la operación
     */
    public function setTemplatePath($newTemplate) {
        $this->_inputTemplate = false;

        if ($newTemplate) {
            if (is_file($newTemplate)) {
                $this->_inputTemplate = $newTemplate;
            } elseif (
                file_exists($newTemplate . 'Header') &&
                file_exists($newTemplate . 'Body') &&
                file_exists($newTemplate . 'Footer')) {
                    $this->_inputTemplate = $newTemplate;
            }
        }

        return false || $this->_inputTemplate = $newTemplate;
    }

    /**
     * Descripción: Cambia el contenido del mail a ser enviado
     *
     * @author Agustín Cignetti
     *
     * @access public
     *
     * @param string $newContent Contenido del mensaje a enviar
     *
     * @internal Fecha de creación:   2014-05-19
     * @internal Ultima modificación: 2014-05-19
     * @internal Razón: Creación
     *
     * @return boolean Resultado de la operación
     */
    public function setMailContent($newContent) {
        if ($newContent) {
            $this->_mailContent = $newContent;

            return true;
        }

        return false;
    }

    /**
     * Descripción: Cambia el contenido del mensaje de acuerdo a los parámetros
     * de entrada y el template colocado anteriormente
     *
     * @author Agustín Cignetti
     *
     * @access public
     *
     * @param array $valuesToReplace Arreglo del estilo clave => valor que
     *                               relaciona una clave con una variable a
     *                               reemplazar en el archivo con el template
     *
     * @internal Fecha de creación:   2014-05-19
     * @internal Ultima modificación: 2014-06-06
     * @internal Razón: Se agrega la posibilidad de enviar un arreglo
     *
     * @return boolean Resultado de la operación
     */
    public function setContentFromFile($valuesToReplace) {
        try {
            $finalText = '';

            if ($this->_inputTemplate) {
                if (is_file($this->_inputTemplate)) {
                    $finalText = file_get_contents($this->_inputTemplate);
                } else {
                    $finalText = file_get_contents($this->_inputTemplate . 'Header');
                }

                foreach ($valuesToReplace as $name => $value) {
                    if (is_array($value)) {
                        $tmpText = file_get_contents($this->_inputTemplate . 'Body');
                        foreach ($value as $subName => $subValue) {
                            $tmpText = str_replace($subName, $subValue, $tmpText);
                        }
                        $finalText .= $tmpText;
                    } else {
                        $finalText = str_replace($name, $value, $finalText);
                    }
                }

                if (file_exists($this->_inputTemplate . 'Footer')) {
                    $tmpText    = file_get_contents($this->_inputTemplate . 'Header');
                    $finalText .= $tmpText;
                }

                return $this->setMailContent($finalText);
            }

            return false;
        } catch (Exception $myException) {
            self::logException('MailerException', $myException->getMessage());
            unset($myException);
            return false;
        }
    }

    /**
     * Descripción: Envía el mensaje con los datos anteriormente cargados
     *
     * @author Agustín Cignetti
     *
     * @access public
     *
     * @internal Fecha de creación:   2014-05-19
     * @internal Ultima modificación: 2014-05-19
     * @internal Razón: Creación
     *
     * @return boolean Resultado de la operación
     */
    public function sendMail() {
        try {
            if ($this->setHeaders()) {
                mail(
                    $this->_receiverMail,
                    $this->_mailSubject,
                    $this->_mailContent,
                    $this->_mailHeaders
                );

                // Esto es para pruebas locales
                // self::logException(
                //     'mailToSend', array(
                //         'To:      ' . $this->_receiverMail,
                //         'From:    ' . $this->_senderMail,
                //         'Subject: ' . $this->_mailSubject,
                //         'Content: ' . $this->_mailContent
                //     )
                // );

                return true;
            }

            return false;
        } catch (Exception $myException) {
            self::logException('MailerException', $myException->getMessage());
            return false;
        }
    }

} //---------------------------------------------------------------------------> Fin de Mailer
