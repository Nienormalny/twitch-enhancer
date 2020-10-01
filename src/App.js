import React, { useEffect, useState } from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Koder from './components/koder.component';
import tmi from 'tmi.js';
import * as _ from 'lodash';

import './styles/styles.scss';

<<<<<<< HEAD
import { GETRequest } from './utils/functions.js';
=======
function GETRequest(url) // https://stackoverflow.com/questions/247483/http-get-request-in-javascript
{
  var xmlHttp = new XMLHttpRequest();
<<<<<<< HEAD
  xmlHttp.open("GET", url, false);
=======
  xmlHttp.open("GET", url, false); // false for synchronous request
>>>>>>> d3844d9... Sprawdz czy uzytkownik jest botem, jezeli tak to nie dodawaj go
  xmlHttp.send(null);
  return xmlHttp.responseText;
}
>>>>>>> 76100e8... Sprawdz czy uzytkownik jest botem, jezeli tak to nie dodawaj go

function App() {
  const [koders, setKoder] = useState({});
  let users = {};

  var response = GETRequest("https://api.frankerfacez.com/v1/badge/bot");
  var bots = JSON.parse(response)['users']['2'];
  useEffect(() => {
    const client = new tmi.Client({
      options: { debug: true },
      connection: {
        secure: true,
        reconnect: true
      },
      channels: [ 'nienormalny_' ]
    });

    client.connect();

    client.on('message', (channel, tags, message, self) => {
      if (users[tags.username]) {
        users[tags.username] = {...users[tags.username], 'msg': message};
        setKoder({...users});
      } else {
        if (Object.values(bots).includes(tags.username)) // check if user is bot
          return;
        users = {...users, [tags.username]: {'msg': message, 'channel': tags}};
        // check if user is bot
        var ret = GETRequest("https://api.frankerfacez.com/v1/badge/bot"); // send GET request to ffz api
        var parsed = JSON.parse(ret); // parse received text
        var _users = parsed['users']['2'];
        //console.log(Object.values(_users).includes(tags.username));
        if (Object.values(_users).includes(tags.username))
          return;
        setKoder({...users});
      }
    });
  }, []);

  return (
    <div className="App">
        <TransitionGroup className="users">
          {!_.isEmpty(koders) && _.map(koders, (koder, id) => {
            return <CSSTransition
              classNames="dude"
              timeout={{enter: 500}}
              enter={true}
              key={id}>
                <Koder koder={koder}/>
            </CSSTransition>
          })}
        </TransitionGroup>
    </div>
  );
}

export default App;