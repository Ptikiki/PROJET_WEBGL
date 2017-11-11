const chords = [
  [ ['m', 'j', 'c'], [0xfcfcfc, 0xe1f4e7, 0xc3f7d4, 0x9bffbb], 'assets/songs/orelsan.mp3' ],
  [ ['x', 'u', 's'], [0xfcfcfc, 0xf9c9c7, 0xf78e8a, 0xfc605a], 'assets/songs/mademoisellek.mp3' ],
  [ ['p', 'q', 'h'], [0xfcfcfc, 0x7194FE, 0x656AFA, 0x8A64FD], 'assets/songs/petitbiscuit.mp3' ]
]
const notes = {
  'm' : 'assets/notes/e5o.wav',
  'j' : 'assets/notes/g5do.wav',
  'c' : 'assets/notes/b5o.wav',

  'x' : 'assets/notes/a4k.wav',
  'u' : 'assets/notes/c5k.wav',
  's' : 'assets/notes/e5k.wav',

  'p' : 'assets/notes/a3p.wav',
  'q' : 'assets/notes/c4p.wav',
  'h' : 'assets/notes/e4p.wav',

  't' : 'assets/notes/e5o.wav'
}

const songs = [
  ['assets/songs/orelsan.mp3', 'assets/songs/mademoisellek.mp3', 'assets/songs/petitbiscuit.mp3' ],
  ['assets/songs/orelsan.mp3', 'assets/songs/mademoisellek.mp3', 'assets/songs/petitbiscuit.mp3' ],
  ['assets/songs/orelsan.mp3', 'assets/songs/mademoisellek.mp3', 'assets/songs/petitbiscuit.mp3' ]
]

export default { chords, notes, songs }
