import { GETRequest } from './functions.js'
import { isEmpty } from 'lodash';

var loadedEmotes = {};

const GetEmoji = (emoji) => {
    if (loadedEmotes[emoji])
        return true; // emote already loaded
    var request = GETRequest("https://api.frankerfacez.com/v1/emoticons?per_page=1&high_dpi=on&sort=count&q=" + emoji);
    var parsed = JSON.parse(request);
    if (isEmpty(parsed['emoticons']))
        return false;
    var highestDPI = Object.keys(parsed['emoticons'][0]['urls']).length;
    if (highestDPI == 3) // w pelni profesjonalny kod którego nawet cukierberg nie potrafi zrobić XDD
        highestDPI++; // XDDDD
    loadedEmotes[emoji] = parsed['emoticons'][0]['urls'][highestDPI];
    return true;
}
// TODO: bttv emote api ( https://community.nightdev.com/t/is-there-a-bettertwitchtv-api/5223 )
export const emotes = (emoji) => {
    var ret = GetEmoji(emoji);
    if (ret)
        return { status: true, 'emoji': loadedEmotes[emoji] };
    else
        return { status: false };
}