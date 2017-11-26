const SpotifyWebAPI = require('spotify-web-api-js')
const Q = require('q')

import chordsDatas from '../datas/chordsDatas.js'

class SpotifyAPIService {

  constructor(options) {
    STORAGE.SpotifyAPIServiceClass = this
    this.token = this.getCookie('spotifyToken')
    this.initFisrtsSongs()

    setTimeout(() => {
      this.initAPI()
    }, 2000)

  }

  getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
  }

  initFisrtsSongs() {
    STORAGE.AudioClass.initAudio(['assets/songs/orelsan.mp3'], 0)
  }

  initAPI() {
    this.spotifyApi = new SpotifyWebAPI()
    if(this.token) {
      this.spotifyApi.setAccessToken(this.token);
      this.spotifyApi.setPromiseImplementation(Q);
      this.getTopTracks()
    }
  }

  getTopTracks() {
    // get Orelsan top tracks
    this.spotifyApi.getArtistTopTracks('4FpJcNgOvIpSBeJgRg3OfN', 'FR')
      .then(function(data) {
        let urlsTab = []
        data.tracks.forEach((track) =>{
          chordsDatas.songs[0].push(track.preview_url)
          chordsDatas.songsName[0].push(track.name)
          urlsTab.push(track.preview_url)
        })
        STORAGE.AudioClass.initAudio(urlsTab, 0)
      }, function(err) {
        console.error(err);
      });

    // get Mademoiselle K top tracks
    // this.spotifyApi.getArtistTopTracks('5O2FUMAWxdTikjoCBAXrNI', 'FR')
    //   .then(function(data) {
    //     data.tracks.forEach((track) =>{
    //       chordsDatas.songs[1].push(track.preview_url)
    //       chordsDatas.songsName[1].push(track.name)
    //     })
    //   }, function(err) {
    //     console.error(err);
    //   });
    //
    // // get Petit Biscuit top tracks
    // this.spotifyApi.getArtistTopTracks('6gK1Uct5FEdaUWRWpU4Cl2', 'FR')
    //   .then(function(data) {
    //     data.tracks.forEach((track) =>{
    //       chordsDatas.songs[2].push(track.preview_url)
    //       chordsDatas.songsName[2].push(track.name)
    //     })
    //   }, function(err) {
    //     console.error(err);
    //   });
  }

}

export default SpotifyAPIService
