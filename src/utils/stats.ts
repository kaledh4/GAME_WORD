export interface GameStats {
    gamesPlayed: number;
    gamesWon: number;
    currentStreak: number;
    maxStreak: number;
    guessDistribution: { [key: number]: number };
}

const STATS_KEY = "game_word_stats";

export const getStats = (): GameStats => {
    const stats = localStorage.getItem(STATS_KEY);
    if (stats) {
        return JSON.parse(stats);
    }
    return {
        gamesPlayed: 0,
        gamesWon: 0,
        currentStreak: 0,
        maxStreak: 0,
        guessDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
    };
};

export const saveGameResult = (isWin: boolean, guesses: number) => {
    const stats = getStats();

    stats.gamesPlayed += 1;

    if (isWin) {
        stats.gamesWon += 1;
        stats.currentStreak += 1;
        if (stats.currentStreak > stats.maxStreak) {
            stats.maxStreak = stats.currentStreak;
        }
        stats.guessDistribution[guesses] += 1;
    } else {
        stats.currentStreak = 0;
    }

    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    return stats;
};
