const Spotify = require('spotify-web-api-js')
const Q = require('q')

import chordsDatas from '../datas/chordsDatas.js'

class SpotifyAPIService {

  constructor(options) {
    STORAGE.SpotifyAPIServiceClass = this
    this.token = 'BQAg8Scn9KCmwUAzImoW6zWvdeDWvkg0t0LvPAaCEIdYy-sDgQJISlTHrn2jeejYWTPcftKboNGsKwmTNYgtsDudhzzVxmybSKFVzp39T3kAmfO1PSe0c9ugxmyPR0gS5yVQGL3C7zgHW0U5oOqOkvS7-boeZX7l93MZypjhX1XQ5ARz-wIMlTIpKhQJ8BRfhXi5Fn5BlIYigJ1DAqa8g3_kO6dLDE_ioEv4qCFpVwC26gky0v0onisPzgnQCVycWAxsnQbKFqkwViMRvHlJvPwVOaM'
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
