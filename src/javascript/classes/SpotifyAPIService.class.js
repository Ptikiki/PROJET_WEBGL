const Spotify = require('spotify-web-api-js')
const Q = require('q')

import chordsDatas from '../datas/chordsDatas.js'

class SpotifyAPIService {

  constructor(options) {
    STORAGE.SpotifyAPIServiceClass = this
    this.token = 'BQC1_0IcQEO-OfnpkRT4tYorj1JKxsMaFBHXWKg7HjgKPQtxQLmX45trjttPBXQZMrE1ndm5ZFYw7DX1xrlVBcwC3S97XpSBvmt9YkQ9Ng1odnwpbZemA7ocol8MQsNM5KdKMyE2jGV9ejeSgpxNMRYzbOCPuLM7kqkYW8yd06MLr4y4DeclLOqOrhEhXgs71QS_8AfVfwh5Wr_EXwodHJ-DdQpR6RlKnduLQoW4BEeqKFSliIfx8U0rJqDD2zUfRe7Tk3pDKH2mxFwgD3VPyllOu94'
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
