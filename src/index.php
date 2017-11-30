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
      <div class="pause">

        <div class="overlay"></div>

        <img src="assets/logo_loader.svg" alt="" class="loader_logo">
      </div>
      <div class="splash">
        <img src="assets/logo_splash.svg" alt="" class="splash_logo">
        <div class="splash_baseline">La boîte à muzik zik zik</div>
      </div>
      <div class="tuto">
        
        <div class="tuto_explanations">
          <p>La boîte à muzik zik zik</p>
          <p>Pour révéler ce que renferme cette boîte, il faut réussir à trouver un accord de 3 notes.</p> 
        </div>
        <span class="skip_tuto">PASSER L'INTRODUCTION</span>
        <img src="assets/skip.svg" alt="" class="skip_tuto skip_arrow">
        
        <div class="tuto_training">
          <p>Utilise ton clavier comme un piano et retrouve les combinaisons de touches adjacentes.</p>
          <p>Es-tu prêt ?</p>
          <img src="assets/key_oui.svg" alt ="" class="oui_img">
        </div>
      </div>
      <div class="game">
        <img src="assets/logo_interface.svg" alt="" class="interface_logo">
        <img src="assets/about.svg" alt="" class="interface_about">
        <span class="interface_about about_text">A PROPOS</span>
        <img src="assets/help.svg" alt="" class="interface_help">
        <span class="interface_help help_text">COUP DE MAIN</span>
        <img src="assets/facebook.svg" alt="" class="interface_fb">
        <img src="assets/twitter.svg" alt="" class="interface_twitter">
        <p class="game_consigne">Pourquoi ne pas essayer quelques touches ?</p>
      </div>
    </div>

    <div class="artistsLibrary">
    </div>

    <div class="songCarateristics">
      <div class="songsName">
        <p class="artist"></p>
        <p class="song"></p>
      </div>

      <div class="letters">
        <span class="one"></span>
        <span class="two"></span>
        <span class="three"></span>
      </div>
    </div>

  	<script src="javascript/bundle.js"></script>
</body>
</html>
