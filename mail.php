<?php

if ( isset($_POST['email']) ) {
    $email = trim($_POST['email']);

    if ( empty($email) ) {
       echo 'Вы заполнили не все поля!';
    }

    else {
        $file = fopen("mail.txt", "a+");
        $fileWrite = fwrite($file, "$email\n");

        if ( $fileWrite ) {
            echo 'Thank you for subscribing!';
        }

        else {
            http_response_code(403);
            echo 'An error occurred while sending';
        }

        fclose($file);

    }
} else {
    echo 'An error occurred while sending';
}


?>