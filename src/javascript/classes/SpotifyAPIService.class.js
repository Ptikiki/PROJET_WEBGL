const Spotify = require('spotify-web-api-js')
const Q = require('q')

import chordsDatas from '../datas/chordsDatas.js'

class SpotifyAPIService {

  constructor(options) {
    STORAGE.SpotifyAPIServiceClass = this
    this.token = 'BQBKdBkuIjUA7VgFQ_iHZMx8eM8A0rob0m5hLlKaFZ-NuUBYF5fSHE0mLdCZBBk80yyS1N0mJp0aU_quPld30_8M4ZJOeB0YEjU8ohidu0NjnFh-GOBIivhx03QGmuPYv6DAoA8EYNslyBbue4Vuq5OslM61lz-c5xZxKaKBukakgxy4bOXBJBefmcbcOxusUyooTIc9FAzQE9iCP58BPZONT3J_auqqCaY1EOoB7dM3A7MoMR_gmz8zNOg5wITX-0-8cLWJS7Ai'
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
