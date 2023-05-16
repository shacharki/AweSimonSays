import {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Store/UseStore';
import {resetUserPoint} from '../Slices/SliceSequence';
import {modalOn} from '../Slices/SliceModal';
import {addColor} from '../Slices/SliceSimon'
const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

type ReturnedTypes = {
  tempSimon: boolean;
  isStart: boolean;
  score: number;
  next: () => void;
  restart: () => void;
};

const useRandomSequence = (): ReturnedTypes => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [tempSimon, setTempSimon] = useState(false);

  const [isStart, setIsStart] = useState(false);
  const indexMax = 4;
  const initialRender = useRef(true);
  const enterSequence = useSelector(
    (state: RootState) => state.user.sequence,
  );
  const dispatch = useDispatch();
  var score = sequence.length - 1;

  useEffect(() => {
    triggerSimonSpeaking();
  }, [sequence, isStart]);

  useEffect(() => {
    if (enterSequence.length > 0) {
      let isEqual = isEqualSequence(enterSequence);
      isEqual === true && enterSequence.length === sequence.length && next();
    }
  }, [enterSequence]);

  useEffect(() => {
    initialRender.current === true && next();
    initialRender.current = false;
  }, [initialRender.current]);


  const triggerSimonSpeaking = async () => {
    if (isStart) {
      setTempSimon(true);
      await colorsOfSequence();
      setTempSimon(false);
    }
  };

  const colorsOfSequence = async () => {
    return new Promise(async resolve => {
      let i;
      await new Promise(resolve => setTimeout(resolve, 500));
      for (i = 0; i < sequence.length; i++) {
        dispatch(addColor(-1));
        await new Promise(resolve => setTimeout(resolve, 300));
        dispatch(addColor(sequence[i]));
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      dispatch(addColor(-1));
      resolve('done');
    });
  };

  const next = async () => {
    dispatch(resetUserPoint());
    let nextElement = randomNumber(1, indexMax);
    setSequence(sequence => [...sequence, nextElement]);
  };

  const stopGame = () => {
    setIsStart(false);
    dispatch(modalOn());
  };

  const restart = () => {
    setSequence([]);
    initialRender.current = true;
    setIsStart(true);
  };

  const isEqualSequence = (user: number[]): boolean => {
    let isEqual = false;
    if (sequence.length > 0) {
      sequence.forEach((element, idx) => {
        if (element != user[idx] && user[idx] != undefined)
          return stopGame();
        isEqual = true;
      });
    } else return false;
    return isEqual;
  };


  return {tempSimon, isStart, score, next, restart};
};
export default useRandomSequence;
