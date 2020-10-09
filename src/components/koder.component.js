import React from 'react';
import face from '../assets/images/coder/face_koder.png';
import pepeface from '../assets/images/coder/face_pepe.png';
import body from '../assets/images/coder/koder_without_face.png';
import { emotes } from '../utils/emotes';
import classnames from 'classnames';

const Koder = ({koder}) => {
  return koder && <div className="koder">
    <img className={classnames('face', {'pepe': koder.channel.subscriber})} alt="koder face" src={koder.channel.subscriber ? pepeface : face}/>
    <img className="body" alt="koder body" src={body}/>
    <div className={classnames("msg", {'image': emotes(koder.msg.replace(' ', '')).status})}>
      {emotes(koder.msg.replace(' ', '')).status ? <img src={emotes(koder.msg.replace(' ', '')).emoji} alt={koder.msg} />: <p>{koder.msg}</p>}
    </div>
    <p className="koder-name">{koder.channel.username}</p>
  </div>
}

export default Koder;