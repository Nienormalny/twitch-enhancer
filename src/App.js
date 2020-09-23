import React, { useEffect, useState } from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Koder from './components/koder.component';
import tmi from 'tmi.js';
import * as _ from 'lodash';

import './styles/styles.scss';

function App() {
  const [koders, setKoder] = useState({});
  let users = {};
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
        users = {...users, [tags.username]: {'msg': message, 'channel': tags}};
        setKoder({...users});
      }
    });
  }, []);

  return (
    <div className="App">
        <TransitionGroup className="users">
          {!_.isEmpty(koders) && _.map(koders, (koder, id) => {
            const key = Object.keys(koder)[0];
            return <CSSTransition
              classNames="dude"
              timeout={{enter: 500}}
              enter={true}
              key={id}>
                {/* <Expire delay="5000"> */}
                  <Koder koder={koder}/>
                {/* </Expire> */}
            </CSSTransition>
          })}
        </TransitionGroup>
    </div>
  );
}

export default App;
