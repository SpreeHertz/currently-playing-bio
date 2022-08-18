const fetch = require('node-fetch');
const { IgApiClient } = require("instagram-private-api")
const ig = new IgApiClient()
require('dotenv').config();
const config = require('./config.json')

const USERNAME = process.env.instagram_username || config.instagram_username;
const PASSWORD = process.env.instagram_password || config.instagram_password;

ig.state.generateDevice(USERNAME)

const main = async () => {
    fetch("https://api.spotify.com/v1/me/player/currently-playing?market=ES", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.spotify_token || config.spotify_token}`,
        },
    }).then(async response => {
        // Try to get a sucessful response
        try {
            const res = await response.json();
            const currentlyPlayingTrack = res.item.name;
            const currentlyPlayingArtist = res.item.artists[0].name;
        console.log(`Currently playing: ${currentlyPlayingTrack} by ${currentlyPlayingArtist}`);
        // Try to change the bio of the user
        try {
            await ig.simulate.preLoginFlow()
            await ig.account.login(USERNAME, PASSWORD)
            // log out of Instagram when done
            process.nextTick(async () => await ig.simulate.postLoginFlow())
    
            await ig.account.setBiography(`${config.current_bio}\n▶ Playing: ${currentlyPlayingTrack} - ${currentlyPlayingArtist}`)
        }
        catch (err) {
            console.log(err);
        }
        // If there was an error fetching the track itself, change the bio to the default one
        }
        catch (err) {
            await ig.simulate.preLoginFlow()
            await ig.account.login(USERNAME, PASSWORD)
            process.nextTick(async () => await ig.simulate.postLoginFlow())
            await ig.account.setBiography(`${config.current_bio}`)
        }
    })
}

main();

