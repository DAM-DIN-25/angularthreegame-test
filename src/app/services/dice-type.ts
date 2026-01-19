export interface DiceType {
    name: string;
    shortName: string;
    code: string;
    mass?: number;

    faces: FaceConfig[]
}

export interface FaceConfig {
    key: string;
    side: string;
    textureRef: string;
    value: number;
}

export interface DiceResult {
    diceType: DiceType;
    face: FaceConfig;
}
