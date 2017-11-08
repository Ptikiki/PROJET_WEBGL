const chords = [
  [ ['m', 'j', 'c'], [0xfcfcfc, 0xAAFD91, 0x6ECE6E, 0x2C9442], 'assets/songs/orelsan.mp3', 'Orelsan' ],
  [ ['x', 'u', 's'], [0xfcfcfc, 0xFEE66E, 0xFFB246, 0xFC5454], 'assets/songs/mademoisellek.mp3', 'MlleK' ],
  [ ['p', 'q', 'h'], [0xfcfcfc, 0x7194FE, 0x656AFA, 0x8A64FD], 'assets/songs/petitbiscuit.mp3', 'PetitBiscuit' ]
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

  't' : 'assets/notes/b5.wav',
}

export default { chords, notes }
