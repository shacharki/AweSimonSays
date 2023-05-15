export const GAME = 'Game';
export const RESULTS = 'Results';

export type NavigationList = {
    Game: undefined;
    Results: {
      score: number;
      restartGame: () => void;
    };
  };