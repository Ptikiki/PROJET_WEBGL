const SpotifyWebAPI = require('spotify-web-api-js')
const Q = require('q')

import chordsDatas from '../datas/chordsDatas.js'

class SpotifyAPIService {

  constructor(options) {
    STORAGE.SpotifyAPIServiceClass = this
    this.token = this.getCookie('spotifyToken')
    this.initFisrtsSongs()

  }

  getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
  }

  initFisrtsSongs() {
    let that = this
    STORAGE.AudioClass.initAudio(['assets/songs/orelsan.mp3'], 0).then((response)=>{
      STORAGE.AudioClass.initAudio(['assets/songs/mademoisellek.mp3'], 1).then((response)=>{
        STORAGE.AudioClass.initAudio(['assets/songs/petitbiscuit.mp3'], 2).then((response)=>{
          that.initAPI()
        }).catch((error)=> { console.warn(error) })
      }).catch((error)=> { console.warn(error) })
    }).catch((error)=> { console.warn(error) })
  }

  initAPI() {
    this.spotifyApi = new SpotifyWebAPI()
    if(this.token) {
      this.spotifyApi.setAccessToken(this.token);
      this.spotifyApi.setPromiseImplementation(Q);
      this.getTopTracksOrelsan()
    }
  }

  getTopTracksOrelsan() {
    // get Orelsan top tracks
    let that = this
    this.spotifyApi.getArtistTopTracks('4FpJcNgOvIpSBeJgRg3OfN', 'FR')
      .then(function(data) {
        let urlsTab = []
        data.tracks.forEach((track) =>{
          chordsDatas.songs[0].push(track.preview_url)
          chordsDatas.songsName[0].push(track.name)
          urlsTab.push(track.preview_url)
        })
        STORAGE.AudioClass.initAudio(urlsTab, 0).then((response)=> {
          that.getTopTracksMlleK()
        }).catch((error)=> { console.warn(error) })
      }, function(err) {
        console.error(err);
      });
  }

  getTopTracksMlleK() {
    // get MlleK top tracks
    let that = this
    this.spotifyApi.getArtistTopTracks('5O2FUMAWxdTikjoCBAXrNI', 'FR')
      .then(function(data) {
        let urlsTab = []
        data.tracks.forEach((track) =>{
          chordsDatas.songs[1].push(track.preview_url)
          chordsDatas.songsName[1].push(track.name)
          urlsTab.push(track.preview_url)
        })
        STORAGE.AudioClass.initAudio(urlsTab, 1).then((response)=> {
          that.getTopTracksPetitBiscuit()
        }).catch((error)=> { console.warn(error) })
      }, function(err) {
        console.error(err);
      });
  }

  getTopTracksPetitBiscuit() {
    // get PetitBiscuit top tracks
    let that = this
    this.spotifyApi.getArtistTopTracks('6gK1Uct5FEdaUWRWpU4Cl2', 'FR')
      .then(function(data) {
        let urlsTab = []
        data.tracks.forEach((track) =>{
          chordsDatas.songs[2].push(track.preview_url)
          chordsDatas.songsName[2].push(track.name)
          urlsTab.push(track.preview_url)
        })
        STORAGE.AudioClass.initAudio(urlsTab, 2).then((response)=> {
          console.log('ALL SOUND DATA LOADED')
        }).catch((error)=> { console.warn(error) })
      }, function(err) {
        console.error(err);
      });
  }

}

export default SpotifyAPIService
