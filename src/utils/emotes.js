import { GETRequest } from './functions.js'
import { isEmpty } from 'lodash';

var loadedEmotes = {};

const GetEmoji = (emoji) => {
    if (loadedEmotes[emoji])
        return true; // emote already loaded

    // check if emoji exists in ffz
    var request = GETRequest("https://api.frankerfacez.com/v1/emoticons?per_page=1&high_dpi=on&sort=count&q=" + emoji);
    var parsed = JSON.parse(request);
    if (!isEmpty(parsed['emoticons']))
    {
        var highestDPI = Object.keys(parsed['emoticons'][0]['urls']).length;
        if (highestDPI === 3) // w pelni profesjonalny kod którego nawet cukierberg nie potrafi zrobić XDD
            highestDPI++; // XDDDD
        loadedEmotes[emoji] = parsed['emoticons'][0]['urls'][highestDPI];
        console.log('Adding FFZ Emote ' + emoji);
        return true;
    }

    // check if emoji exists in bttv
    // TODO: bttv global emotes
    request = GETRequest("https://api.betterttv.net/3/emotes/shared/search?query=alliecatjam&offset=0&limit=50");
    parsed = JSON.parse(request);
    if (!isEmpty(parsed))
    {
        loadedEmotes[emoji] = "//cdn.betterttv.net/emote/" + parsed[0]['id'] + "/3x";
        console.log('Adding BTTV Emote ' + emoji);
        return true;
    }

    return false;
}

export const emotes = (emoji) => {
    var ret = GetEmoji(emoji);
    if (ret)
        return { status: true, 'emoji': loadedEmotes[emoji] };
    else
        return { status: false };
}