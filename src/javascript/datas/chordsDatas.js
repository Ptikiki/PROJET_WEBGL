const chords = [
  [ ['o', 'k', 'j'],
    [ [0x303848, 0x2a3040],[0x1d242e, 0x161a21], [0x383d42, 0x2e3134], [0x464c51, 0x17181a] ],
    'assets/songs/orelsan.mp3' ],

  [ ['a', 'w', 'q'],
    [ [0x303848, 0x2a3040], [0xf9c9c7], [0xf78e8a], [0x31030d] ],
    'assets/songs/mademoisellek.mp3' ],

  [ ['g', 'b', 'y'],
    [ [0x303848, 0x2a3040], [0x081f38, 0x05182d], [0x113966, 0x0b2d53], [0x204e9f, 0x021227] ],
    'assets/songs/petitbiscuit.mp3' ]
]
const notes = {
  'o' : 'assets/notes/orelsan/eb4o.wav',
  'k' : 'assets/notes/orelsan/c4o.wav',
  'j' : 'assets/notes/orelsan/g4o.wav',

  'a' : 'assets/notes/mllek/a4k.wav',
  'w' : 'assets/notes/mllek/c5k.wav',
  'q' : 'assets/notes/mllek/e5k.wav',

  'g' : 'assets/notes/petit-biscuit/a3p.wav',
  'b' : 'assets/notes/petit-biscuit/c4p.wav',
  'y' : 'assets/notes/petit-biscuit/e4p.wav',

  'f' : 'assets/notes/petit-biscuit/a3p.wav',
  'c' : 'assets/notes/petit-biscuit/a3p.wav',
  'e' : 'assets/notes/petit-biscuit/a3p.wav',
  'h' : 'assets/notes/petit-biscuit/a3p.wav',
  'i' : 'assets/notes/petit-biscuit/a3p.wav',
  'l' : 'assets/notes/petit-biscuit/a3p.wav',
  'm' : 'assets/notes/petit-biscuit/a3p.wav',
  'n' : 'assets/notes/petit-biscuit/a3p.wav',
  'p' : 'assets/notes/petit-biscuit/a3p.wav',
  'x' : 'assets/notes/petit-biscuit/a3p.wav',
  'r' : 'assets/notes/petit-biscuit/a3p.wav',
  's' : 'assets/notes/petit-biscuit/a3p.wav',
  't' : 'assets/notes/petit-biscuit/a3p.wav',
  'u' : 'assets/notes/petit-biscuit/a3p.wav',
  'v' : 'assets/notes/petit-biscuit/a3p.wav',
  'd' : 'assets/notes/petit-biscuit/a3p.wav',
  'z' : 'assets/notes/petit-biscuit/a3p.wav'
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
  ['Mademoiselle K', 'A W Q', false],
  ['Petit Biscuit', 'B G Y', false]
]

export default { chords, notes, songs, songsName, artists, artistsFound }
