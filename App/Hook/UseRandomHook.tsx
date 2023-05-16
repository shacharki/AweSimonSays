import {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Store/UseStore';
import {resetUserPoint} from '../Slices/SliceSequence';

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

type ReturnedTypes = {
  isStart: boolean;
  score: number;
  next: () => void;
  restart: () => void;
};

const useRandomSequence = (): ReturnedTypes => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [isStart, setIsStart] = useState(false);
  const _maxNum = 4;
  const initialRender = useRef(true);
  const enterSequence = useSelector(
    (state: RootState) => state.user.sequence,
  );
  const dispatch = useDispatch();
  var score = sequence.length - 1;

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


  const next = async () => {
    dispatch(resetUserPoint());
    let nextElement = randomNumber(1, _maxNum);
    setSequence(sequence => [...sequence, nextElement]);
  };

  const stopGame = () => {
    setIsStart(false);
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


  return {isStart, score, next, restart};
};
export default useRandomSequence;
