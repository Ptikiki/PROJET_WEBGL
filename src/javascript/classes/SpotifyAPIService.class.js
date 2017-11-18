const Spotify = require('spotify-web-api-js')
const Q = require('q')

import chordsDatas from '../datas/chordsDatas.js'

class SpotifyAPIService {

  constructor(options) {
    STORAGE.SpotifyAPIServiceClass = this
    this.token = 'BQARjx1-5ReyDxlYXPVaurAM_TaAXJMGeqQeAYXd6tUhsV6joOwau_hUvZfav4BXoZZFWDmTv5BeUewOPmK8wHigPrQNKwlkwqogDeAmXpBXeEwGPhPAUNQ3Lc5vXgFqhrlEsIZ9cbBeJKt3MaHA4h5O1Ryab3Uft6moClQ0_c7WnqHbso_qB3_oL_7nKa4FI3sLXrghzcF108wt4WSm_KAKn6GNnXs-dudjXMvrmvBHyEzun-XIYgseX_nXHgueso3b'
    this.initAPI()
  }

  initAPI() {
    this.spotify = new Spotify()
    console.log(this.spotify)
    this.spotify.setAccessToken(this.token);
    this.spotify.setPromiseImplementation(Q);
    this.getTopTracks()
  }

  getTopTracks() {
    // get Orelsan top tracks
    this.spotify.getArtistTopTracks('4FpJcNgOvIpSBeJgRg3OfN', 'FR')
      .then(function(data) {
        data.tracks.forEach((track) =>{
          chordsDatas.songs[0].push(track.preview_url)
          chordsDatas.songsName[0].push(track.name)
        })
      }, function(err) {
        console.error(err);
      });

    // get Mademoiselle K top tracks
    this.spotify.getArtistTopTracks('5O2FUMAWxdTikjoCBAXrNI', 'FR')
      .then(function(data) {
        data.tracks.forEach((track) =>{
          chordsDatas.songs[1].push(track.preview_url)
          chordsDatas.songsName[1].push(track.name)
        })
      }, function(err) {
        console.error(err);
      });

    // get Petit Biscuit top tracks
    this.spotify.getArtistTopTracks('6gK1Uct5FEdaUWRWpU4Cl2', 'FR')
      .then(function(data) {
        data.tracks.forEach((track) =>{
          chordsDatas.songs[2].push(track.preview_url)
          chordsDatas.songsName[2].push(track.name)
        })
      }, function(err) {
        console.error(err);
      });
  }

}

export default SpotifyAPIService
