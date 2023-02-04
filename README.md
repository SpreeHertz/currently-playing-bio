# currently-playing-bio

Allows you to display the currently playing song on your Instagram bio using [intsgram-private-api](https://npmjs.org/instagram-private-api).

## Get Started

Go to `config.json`:

```json
{ 
    "instagram_username": "",
    "instagram_password": "",
    "spotify_token": "",
    "current_bio": "",
    "sentence_before_mentioning_track": ""
}
```

FIll in the above fields. You can obtain a spotify token from the [Spotify Developer Console](https://developer.spotify.com/console/get-users-currently-playing-track).

Leave `current_bio` empty if you only want to show the currently playing song.

`sentence_before_mentioning_track`: Specifies what it should be before mentioning the track and artist.

> Note: Use it at your own risk. Don't abuse the APIs. Your account may get blocked by Instagram if you do so.