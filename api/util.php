<?php

// ref: http://php.net/manual/en/function.defined.php#87340
function C(&$constant) {
    $nPrev1 = error_reporting(E_ALL);
    $sPrev2 = ini_set('display_errors', '0');
    $sTest = defined($constant) ? 'defined' : 'not defined';
    $oTest = (object) error_get_last();
    error_reporting($nPrev1);
    ini_set('display_errors', $sPrev2);
    if ($oTest->message) {
        return '';
    } else {
        return $constant;
    }
}

?>