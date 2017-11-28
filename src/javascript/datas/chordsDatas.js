const tuto = ['o', 'u', 'i']

const chords = [
  [ ['n', 'j', 'k'],
    [ [0x303848, 0x2a3040],[0x1d242e, 0x161a21], [0x383d42, 0x2e3134], [0x464c51, 0x17181a] ],
    'assets/songs/orelsan.mp3' ],

  [ ['a', 'q', 'w'],
    [ [0x303848, 0x2a3040], [0x230c10, 0x050102] , [0x441920, 0x19090b], [0x9b202d, 0x19050a] ],
    'assets/songs/mademoisellek.mp3' ],

  [ ['t', 'f', 'v'],
    [ [0x303848, 0x2a3040], [0x081f38, 0x05182d], [0x113966, 0x0b2d53], [0x204e9f, 0x021227] ],
    'assets/songs/petitbiscuit.mp3' ]
]

const notes = {
  'n' : 'assets/notes/orelsan/eb4o.wav',
  'j' : 'assets/notes/orelsan/c4o.wav',
  'k' : 'assets/notes/orelsan/g4o.wav',

  'a' : 'assets/notes/mllek/a4k.wav',
  'w' : 'assets/notes/mllek/c5k.wav',
  'q' : 'assets/notes/mllek/e5k.wav',

  't' : 'assets/notes/petit-biscuit/a3p.wav',
  'f' : 'assets/notes/petit-biscuit/c4p.wav',
  'v' : 'assets/notes/petit-biscuit/e4p.wav',

  'f' : 'assets/notes/petit-biscuit/a3p.wav',
  'c' : 'assets/notes/petit-biscuit/a3p.wav',
  'e' : 'assets/notes/petit-biscuit/a3p.wav',
  'h' : 'assets/notes/petit-biscuit/a3p.wav',
  'i' : 'assets/notes/petit-biscuit/a3p.wav',
  'l' : 'assets/notes/petit-biscuit/a3p.wav',
  'm' : 'assets/notes/petit-biscuit/a3p.wav',
  'p' : 'assets/notes/petit-biscuit/a3p.wav',
  'o' : 'assets/notes/petit-biscuit/a3p.wav',
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
  ['Lumière'],
  ['Sous les brûlures'],
  ['Waterfall']
]

const artists = [
  'Orelsan',
  'Mademoiselle K',
  'Petit Biscuit'
]

const artistsFound = [
  ['Orelsan', 'N J K', false],
  ['Mademoiselle K', 'A W Q', false],
  ['Petit Biscuit', 'T F V', false]
]

export default { chords, notes, songs, songsName, artists, artistsFound, tuto }
