const chords = [
  [ ['m', 'j', 'c'], [0x303848, 0x1d242e, 0x383d42, 0x464c51], 'assets/songs/orelsan.mp3' ],
  [ ['x', 'u', 's'], [0x303848, 0xf9c9c7, 0xf78e8a, 0x31030d], 'assets/songs/mademoisellek.mp3' ],
  [ ['p', 'q', 'h'], [0x303848, 0x081f38, 0x113966, 0x1c5ba2], 'assets/songs/petitbiscuit.mp3' ]
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
  ['assets/songs/orelsan.mp3'],
  ['assets/songs/mademoisellek.mp3'],
  ['assets/songs/petitbiscuit.mp3']
]

const songsName = [
  ['Grands Parents'],
  ['Sous les brûlures'],
  ['Waterfall']
]

const artists = [
  'Orelsan',
  'Mademoiselle K',
  'Petit Biscuit'
]

export default { chords, notes, songs, songsName, artists }
