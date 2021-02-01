const axios = require('axios');
const cheerio = require('cheerio');
const request = require("request-promise");


async function getChefInfo(username) {

    const url = await request(`https://www.codechef.com/users/${username}`);
    const $ = cheerio.load(url);
    // const sol = $('.rating-data-section problems-solved > a');
    let name = $('section[class= "rating-data-section problems-solved"]>div[class="content"]>article>p>span>a').text();
    console.log(">> SCRAPING DONE");
    return name;

}
module.exports = {
    getChefInfo
};