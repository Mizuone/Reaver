interface LevelDetail {
    xp: number;
}

export interface LevelDictionary {
    [level: number]: LevelDetail
}

export const playerLevelDictionary: LevelDictionary = {
    2: { "xp": 85 },
    3: { "xp": 350 },
    4: { "xp": 610 },
    5: { "xp": 943 },
    6: { "xp": 1031 }
}