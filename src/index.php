<?php
  $url = 'https://accounts.spotify.com/api/token';
  $credentials = "96dc887368944382a37dcd39286e551d:50c9171ac6eb4d5584ff4dce03e9d4b3";

  $headers = array(
    "Accept: application/json",
    "Content-Type: application/x-www-form-urlencoded",
    "User-Agent: runscope/0.1",
    "Authorization: Basic " . base64_encode($credentials)
  );

  $data = 'grant_type=client_credentials';
  unset($_COOKIE['stateKey']);
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $response = json_decode(curl_exec($ch), true);
  curl_close($ch);

  setcookie('spotifyToken',$response['access_token'] );
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>ARPEGIA</title>
  <link rel="stylesheet" href="stylesheet/main.css">
</head>
<body>
    <!-- webGL -->
  	<div id="container"></div>
    <!-- webGL -->

    <div class="interface">
      <button class="help">HELP</button>
      <div class="overlay"></div>
    </div>

    <div class="artistsLibrary">
      <!-- <div class="artist">
        <p class="name">Orelsan</p>
        <p class="chord">M J C</p>
      </div> -->
    </div>

    <div class="songCarateristics">
      <div class="songsName">
        <p class="artist"></p>
        <p class="song"></p>
      </div>

      <div class="letters">
        <p></p>
      </div>
    </div>

  	<script src="javascript/bundle.js"></script>
</body>
</html>
