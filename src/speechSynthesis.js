import React, { useState } from 'react';
import { useSpeechSynthesis,useSpeechRecognition } from "react-speech-kit";

const SpeechSynthesis = () => {
  const [text, setText] = useState('Start entering the name or record your custom name');
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [voiceIndex, setVoiceIndex] = useState(null);
  const onEnd = () => {
    // You could do something here after speaking has finished
  };
  const { speak, cancel, speaking, voices } = useSpeechSynthesis({
    onEnd,
  });

  const voice = voices[voiceIndex] || null;
  
  const [blocked,setBlocked]=useState(false);
  
  const { listen, listening, stop } = useSpeechRecognition({
    onResult:(result)=> {
	        setText('')
		setText(result);
	},
   
  });
  
 const [lang]=useState('en-AU');
  
  const toggle = listening
    ? stop
    : () => {
        setBlocked(false);
        listen({ lang });
      };

  const styleFlexRow = { display: 'flex', flexDirection: 'row' };
  const styleContainerRatePitch = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 12,
  };

  return (
    <div claasName="speechSynthesis">
      <div className="group">
        <h2>Pronunciation tool by Iconic Team</h2>
		</div>
          <div className="group">
            <label htmlFor="voice">Choose the language</label>
            <select
              id="voice"
              name="voice"
              value={voiceIndex || ''}
              onChange={(event) => {
                setVoiceIndex(event.target.value);
              }}
            >
              <option value="">Default</option>
              {voices.map((option, index) => (
                <option key={option.voiceURI} value={index}>
                  {`${option.lang} - ${option.name}`}
                </option>
              ))}
            </select>
			</div>
			<div className="group">
            <div style={styleContainerRatePitch}>
              <div style={styleFlexRow}>
                <label htmlFor="rate">Speed: </label>
                <div className="rate-value">{rate}</div>
              </div>
              <input
                type="range"
                min="0.5"
                max="2"
                defaultValue="1"
                step="0.1"
                id="rate"
                onChange={(event) => {
                  setRate(event.target.value);
                }}
              />
            </div>
            <div style={styleContainerRatePitch}>
              <div style={styleFlexRow}>
                <label htmlFor="pitch">Pitch: </label>
                <div className="pitch-value">{pitch}</div>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                defaultValue="1"
                step="0.1"
                id="pitch"
                onChange={(event) => {
                  setPitch(event.target.value);
                }}
              />
            </div>
			</div>
			<div className="group">
            <label htmlFor="message">Type name in the above box</label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={text}
              onChange={(event) => {
                setText(event.target.value);
              }}
            />
			</div>
			<div className="group">
            {speaking ? (
              <button type="button" onClick={cancel}>
                Stop
              </button>
            ) : (
              <button
                type="button"
                onClick={() => speak({ text, voice, rate, pitch })}
              >
                Pronounce
              </button>
            )}
			<button onClick={()=> {setText(''); }}>Clear Name </button>
			<button disabled={blocked} type="button" onClick={toggle}>
			 {listening ? 'Stop' : 'Voice your name'}
			 </button>
          </div>
		  </div>
       
  );
};

export default SpeechSynthesis;
