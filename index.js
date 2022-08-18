const fetch = require('node-fetch');
const { IgApiClient } = require("instagram-private-api")
const ig = new IgApiClient()
require('dotenv').config();

const USERNAME = process.env.instagram_username;
const PASSWORD = process.env.instagram_password;

ig.state.generateDevice(USERNAME)

const main = async () => {
    fetch("https://api.spotify.com/v1/me/player/currently-playing?market=ES", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.spotify_token}`,
        },
    }).then(async response => {
        const res = await response.json();
        const currentlyPlayingTrack = res.item.name;
        const currentlyPlayingArtist = res.item.artists[0].name;
        console.log(`Currently playing: ${currentlyPlayingTrack} by ${currentlyPlayingArtist}`);
        try {
            await ig.simulate.preLoginFlow()
            await ig.account.login(USERNAME, PASSWORD)
            // log out of Instagram when done
            process.nextTick(async () => await ig.simulate.postLoginFlow())
    
            // fill in whatever you want your new Instagram bio to be
            await ig.account.setBiography(`Currently playing: ${currentlyPlayingTrack} - ${currentlyPlayingArtist}`)
        }
        catch (err) {
            console.log(err);
        }
    })
}

main();

