const chords = [
  [ ['m', 'j', 'c'], [0xfcfcfc, 0xb5e2d7, 0x65c6ae, 0x47d1ae], 'assets/songs/orelsan.mp3' ],
  [ ['x', 'u', 's'], [0xfcfcfc, 0xf7e1c5, 0xf2c68c, 0xffba66], 'assets/songs/orelsan.mp3' ]
]
const notes = {
  'm' : 'assets/notes/e5.wav',
  'j' : 'assets/notes/g5d.wav',
  'c' : 'assets/notes/b5.wav',

  'x' : 'assets/notes/e5.wav',
  'u' : 'assets/notes/g5d.wav',
  's' : 'assets/notes/b5.wav',

  't' : 'assets/notes/b5.wav',
}

export default { chords, notes }
