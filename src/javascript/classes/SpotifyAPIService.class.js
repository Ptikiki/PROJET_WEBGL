const Spotify = require('spotify-web-api-js')
const Q = require('q')

import chordsDatas from '../datas/chordsDatas.js'

class SpotifyAPIService {

  constructor(options) {
    STORAGE.SpotifyAPIServiceClass = this
    this.token = 'BQDWeWtKG0ZgiVFofdNvvtPbB_mcndV5cXffxIPoNj3c5VHUdS0fKUK0qXmLjjzKwp5ujyrwKyDjnLUvdP6ojyAL0zRiYuRlVGMR-ST_Pjx9l7Ogzz8qaFcHYlZSPbRvcoztNTbci8HoXjpgV2Vei1UEaDyMpBukJMn7BCY9YL_kIeQ0Y9Fs-4_05mrBOg8Ga-mL6nbHCzVh72VAvwNjtnZAdPL90lmUmzDhteZhajnEF1v4lSHMkO1br1c9whCogbYh-lvAmiaRdYjYGtwc3LAa9Xc'
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
