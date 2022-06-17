exports.redditAmoledbackgrounds = async function (ctx) {
    const img = await getImagesReddit("Amoledbackgrounds", 50)
    ctx.replyWithPhoto(img)
};

async function getImagesReddit(subreddit, amount) {
    const fetch = require('node-fetch')
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/top.json?limit=${amount}`);
    const data = await response.json();
    const images = data.data.children.map(child => child.data.url);
    //dis
    console.log(images[0]);
    return images[0];
}