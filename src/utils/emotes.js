import { GETRequest } from './functions.js'
import { isEmpty } from 'lodash';

var loadedEmotes = {};
var notEmotes = {};

const GetEmoji = (emoji) => {
    if (notEmotes[emoji])
        return false;
    if (loadedEmotes[emoji])
        return true; // emote already loaded

    // check if emoji exists in ffz
    var request = GETRequest("https://api.frankerfacez.com/v1/emoticons?per_page=1&high_dpi=on&sort=count&q=" + emoji);
    var parsed = JSON.parse(request);
    if (!isEmpty(parsed['emoticons'])) {
        for (var i = 0; i < parsed['emoticons'].length; i++) {
            if (parsed['emoticons'][i]['name'] !== emoji)
                continue;
            
            var highestDPI = Object.keys(parsed['emoticons'][i]['urls']).length;

            if (highestDPI === 3) // hard coded
                highestDPI++;

            loadedEmotes[emoji] = parsed['emoticons'][i]['urls'][highestDPI];
            return true;
        }
    }
}

export const emotes = (emoji) => {
    var ret = GetEmoji(emoji);
    if (ret)
        return { status: true, 'emoji': loadedEmotes[emoji] };
    else
        return { status: false };
}