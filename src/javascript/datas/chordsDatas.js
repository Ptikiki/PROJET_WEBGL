const chords = [
  [ ['o', 'k', 'j'],
    [ [0x303848, 0x2a3040],[0x1d242e, 0x161a21], [0x383d42, 0x2e3134], [0x464c51, 0x17181a] ],
    'assets/songs/orelsan.mp3' ],

  [ ['x', 'd', 'f'],
    [ [0x303848, 0x2a3040], [0xf9c9c7], [0xf78e8a], [0x31030d] ],
    'assets/songs/mademoisellek.mp3' ],

  [ ['g', 'b', 'y'],
    [ [0x303848, 0x2a3040], [0x081f38, 0x05182d], [0x113966, 0x0b2d53], [0x204e9f, 0x021227] ],
    'assets/songs/petitbiscuit.mp3' ]
]
const notes = {
  'o' : 'assets/notes/orelsan/e5o.wav',
  'k' : 'assets/notes/orelsan/g5do.wav',
  'j' : 'assets/notes/orelsan/b5o.wav',

  'x' : 'assets/notes/a4k.wav',
  'd' : 'assets/notes/c5k.wav',
  'f' : 'assets/notes/e5k.wav',

  'g' : 'assets/notes/a3p.wav',
  'b' : 'assets/notes/c4p.wav',
  'y' : 'assets/notes/e4p.wav',

  'a' : 'assets/notes/e5o.wav',
  'c' : 'assets/notes/e5o.wav',
  'e' : 'assets/notes/e5o.wav',
  'h' : 'assets/notes/e5o.wav',
  'i' : 'assets/notes/e5o.wav',
  'l' : 'assets/notes/e5o.wav',
  'm' : 'assets/notes/e5o.wav',
  'n' : 'assets/notes/e5o.wav',
  'p' : 'assets/notes/e5o.wav',
  'q' : 'assets/notes/e5o.wav',
  'r' : 'assets/notes/e5o.wav',
  's' : 'assets/notes/e5o.wav',
  't' : 'assets/notes/e5o.wav',
  'u' : 'assets/notes/e5o.wav',
  'v' : 'assets/notes/e5o.wav',
  'w' : 'assets/notes/e5o.wav',
  'z' : 'assets/notes/e5o.wav'
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

const artistsFound = [
  ['Orelsan', 'O K J', false],
  ['Mademoiselle K', 'X D F', false],
  ['Petit Biscuit', 'B G Y', false]
]

export default { chords, notes, songs, songsName, artists, artistsFound }
