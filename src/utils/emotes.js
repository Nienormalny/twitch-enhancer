<<<<<<< HEAD
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
=======
import monkas from '../assets/images/emotes/monkaS.png';
import pepelaugh from '../assets/images/emotes/pepelaugh.png';
import salami from '../assets/images/emotes/SALAMI.gif';
import petthepeepo from '../assets/images/emotes/petthepeepo.gif';
import coffee from '../assets/images/emotes/coffee.gif'
import kekw from '../assets/images/emotes/KEKW.png';
import feelsokayman from '../assets/images/emotes/FeelsOkayMan.png';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import babyyodasip from '../assets/images/emotes/BabyYodaSip.gif';
import pogu from '../assets/images/emotes/PogU.png';
import hackermans from '../assets/images/emotes/HACKERMANS.gif';
=======
>>>>>>> d3844d9... Sprawdz czy uzytkownik jest botem, jezeli tak to nie dodawaj go
=======
import babyodasip from '../assets/images/emotes/BabyYodaSip.gif'
>>>>>>> 98d8494... Dodalem BabyYodaSip z powrotem bo usunelo u mnie
=======
import babyyodasip from '../assets/images/emotes/BabyYodaSip.gif'
>>>>>>> f341a2e... Naprawiłem blad demb00* z literowka emotki BabyYodaSip

export const emotes = (emoji) => {
    switch (emoji) {
        case 'monkas':
            return {
                status: true, 'emoji': monkas
            };
        case 'salami':
            return {
                status: true, 'emoji': salami
            };
        case 'petthepeepo':
            return {
                status: true, 'emoji': petthepeepo
            };
        case 'coffee':
            return{
                status: true, 'emoji': coffee
            };
        case 'kekw':
            return{
                status: true, 'emoji': kekw
            };
        case 'feelsokayman':
            return{
                status: true, 'emoji': feelsokayman
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 98d8494... Dodalem BabyYodaSip z powrotem bo usunelo u mnie
            };
        case 'babyyodasip':
            return{
                status: true, 'emoji': babyyodasip
            };
<<<<<<< HEAD
        case 'pogu':
            return {
                status: true, 'emoji': pogu
            };
=======
            }
>>>>>>> d3844d9... Sprawdz czy uzytkownik jest botem, jezeli tak to nie dodawaj go
=======
>>>>>>> 98d8494... Dodalem BabyYodaSip z powrotem bo usunelo u mnie
        case '<3':
            return {
                status: true, 'emoji': 'https://static-cdn.jtvnw.net/emoticons/v2/9/default/light/3.0'
            };
        case 'pepelaugh':
            return {
                status: true, 'emoji': pepelaugh
            };
        case '418':
            return {
                status: true, 'emoji': 'https://static-cdn.jtvnw.net/emoticons/v2/303571815/default/light/3.0'
            };
        case '01':
            return {
                status: true, 'emoji': 'https://static-cdn.jtvnw.net/emoticons/v2/303571812/default/light/3.0'
            };
        case 'hellofriend':
            return {
                status: true, 'emoji': 'https://static-cdn.jtvnw.net/emoticons/v2/303571809/default/light/3.0'
            };
        case 'nienor418':
            return {
                status: true, 'emoji': 'https://static-cdn.jtvnw.net/emoticons/v2/303571815/default/light/3.0'
            };
        case 'nienor01':
            return {
                status: true, 'emoji': 'https://static-cdn.jtvnw.net/emoticons/v2/303571812/default/light/3.0'
            };
        case 'nienorhellofriend':
            return {
                status: true, 'emoji': 'https://static-cdn.jtvnw.net/emoticons/v2/303571809/default/light/3.0'
            };
        case 'hackermans':
            return {
                status: true, 'emoji': hackermans
            }
        default:
            return {
                status: false
            };
>>>>>>> 76100e8... Sprawdz czy uzytkownik jest botem, jezeli tak to nie dodawaj go
    }

    // check if emoji exists in bttv
    // TODO: bttv global emotes
    request = GETRequest("https://api.betterttv.net/3/emotes/shared/search?query=" + emoji + "&offset=0&limit=50");
    parsed = JSON.parse(request);
    if (!isEmpty(parsed)) {
        for (i = 0; i < parsed.length; i++) {
            if (parsed[i]['code'] !== emoji)
                continue;

            loadedEmotes[emoji] = "//cdn.betterttv.net/emote/" + parsed[i]['id'] + "/3x";
            return true;
        }
    }

    notEmotes[emoji] = true;
    return false;
}

export const emotes = (emoji) => {
    var ret = GetEmoji(emoji);
    if (ret)
        return { status: true, 'emoji': loadedEmotes[emoji] };
    else
        return { status: false };
}