import React, { useEffect, useState } from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Koder from './components/koder.component';
import tmi from 'tmi.js';
import * as _ from 'lodash';

import './styles/styles.scss';

function GETRequest(url) // https://stackoverflow.com/questions/247483/http-get-request-in-javascript
{
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, false);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

function App() {
  const [koders, setKoder] = useState({});
  let users = {};

  var response = GETRequest("https://api.frankerfacez.com/v1/badge/bot");
  var bots = JSON.parse(response)['users']['2']; // bots names from ffz api
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
        if (Object.values(bots).includes(tags.username))
          return;
        users = {...users, [tags.username]: {'msg': message, 'channel': tags}};
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