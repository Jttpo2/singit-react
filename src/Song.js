export default class Song {
  constructor(title: String, artist: String, lyricLines: [String]) {
    this.title = title;
    this.artist = artist;
    this.lines = lyricLines;
  }
}
