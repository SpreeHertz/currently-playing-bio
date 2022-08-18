const fetch = require('node-fetch');
const config = require('./config.json')
const chalk = require('chalk');
const { IgApiClient } = require("instagram-private-api")
const ig = new IgApiClient()
require('dotenv').config();

const USERNAME = process.env.instagram_username || config.instagram_username;
const PASSWORD = process.env.instagram_password || config.instagram_password;
const currentBio = process.env.current_bio || config.current_bio;
const sentenceBeforeMentioningTrack = process.env.sentence_before_mentioning_track || config.sentence_before_mentioning_track;


ig.state.generateDevice(USERNAME);

const response = fetch("https://api.spotify.com/v1/me/player/currently-playing?market=ES", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.spotify_token || config.spotify_token}`,
        },
    })

const login = async () => {
    try {
        await ig.simulate.preLoginFlow()
        await ig.account.login(USERNAME, PASSWORD)
        process.nextTick(async () => await ig.simulate.postLoginFlow())
    }
    catch (err) {
        console.log(chalk.redBright('error' + " An error occured while connecting to your Instagram account:" + err))
    }
}

const main = async () => {
    try {
    const data = await response.json();
    const track = data.item.name;
    const artist = data.item.artists[0].name;
    console.log(chalk.blueBright('playing') + chalk.yellow(` ${track}`) + ` -` + chalk.yellowBright(` ${artist}`));
    login().then(await ig.account.setBiography(`${currentBio}` + `${sentenceBeforeMentioningTrack}` + ` ${track} - ${artist}`))    
    }
    catch (err) {
        login().then(await ig.account.setBiography(`${currentBio}`))
    }
    
}

main();