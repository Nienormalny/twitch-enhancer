import monkas from '../assets/images/emotes/monkaS.png';
import pepelaugh from '../assets/images/emotes/pepelaugh.png';
import salami from '../assets/images/emotes/SALAMI.gif';
import petthepeepo from '../assets/images/emotes/petthepeepo.gif';
import coffee from '../assets/images/emotes/coffee.gif';

export const emotes = (emoji) => {
    emoji = emoji.split(emoji)
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
        case '<3':
            return {
                status: true, 'emoji': 'https://static-cdn.jtvnw.net/emoticons/v2/9/default/light/3.0'
            };
        case 'coffee':
            return{
                status: true, 'emoji': coffee
            };
        case ':d':
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
        default:
            return {
                status: false
            };
    }
}