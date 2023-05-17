import { useEffect, useState } from 'react';
import Sound from 'react-native-sound';
Sound.setCategory('Playback');

export default function useSounds() {
  const [sound1, setSound1] = useState<Sound>();
  const [sound2, setSound2] = useState<Sound>();

  const [sound3, setSound3] = useState<Sound>();
  const [sound4, setSound4] = useState<Sound>();

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    setSound1(
      new Sound(require('../Sounds/blip1.wav'), error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      }),
    );
    setSound2(
      new Sound(require('../Sounds/blip2.wav'), error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      }),
    );

    setSound3(
      new Sound(require('../Sounds/blip3.wav'), error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      }),
    );
    setSound4(
      new Sound(require('../Sounds/blip4.wav'), error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      }),
    );
  };


  return [sound1, sound2, sound3, sound4]
}
