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

  'b' : 'assets/notes/random/piano/a6.wav',
  'c' : 'assets/notes/random/synth/b4.wav',
  'e' : 'assets/notes/random/piano/b3.wav',
  'h' : 'assets/notes/random/minimoog/f4.wav',
  'i' : 'assets/notes/random/piano/d4.wav',
  'l' : 'assets/notes/random/minimoog/a4.wav',
  'm' : 'assets/notes/random/minimoog/c5.wav',
  'p' : 'assets/notes/random/minimoog/c4.wav',
  'o' : 'assets/notes/random/piano/b5.wav',
  'x' : 'assets/notes/random/synth/d3.wav',
  'r' : 'assets/notes/random/piano/e5.wav',
  's' : 'assets/notes/random/synth/e4.wav',
  'g' : 'assets/notes/random/piano/f2.wav',
  'u' : 'assets/notes/random/piano/g2.wav',
  'y' : 'assets/notes/random/piano/g3.wav',
  'd' : 'assets/notes/random/piano/g6.wav',
  'z' : 'assets/notes/random/synth/g4.wav'
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
  false,
  false,
  false
]

export default { chords, notes, songs, songsName, artists, artistsFound, tuto }
