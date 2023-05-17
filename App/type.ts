export const GAME = 'Game';
export const RESULTS = 'Results';

export type RootStackParamList = {
    Game: undefined;
    Results: {
        score: number;
        restart: () => void;
    };
};

