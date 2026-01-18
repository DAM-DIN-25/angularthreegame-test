import { ResourceRef } from "@angular/core";
import * as THREE from "three";

export interface DiceType {
    name: string;
    shortName: string;
    code: string;
    mass?: number;

    faces: {
        top: FaceConfig;
        front: FaceConfig;
        right: FaceConfig;
        left: FaceConfig;
        back: FaceConfig;
        down: FaceConfig;
    }
}

export interface FaceConfig {
    key: string;
    textureRef: ResourceRef<THREE.Texture<HTMLImageElement> | undefined>;
    value: number;
}

export const DICE_TYPES: DiceType[] = [
    {
        name: 'd6-regular',
        shortName: '1d6',
        code: '1d6',
        mass: 1,
        faces: {
            top: { key: '4', textureRef: null as any, value: 4 },
            front: { key: '3', textureRef: null as any, value: 3 },
            right: { key: '1', textureRef: null as any, value: 1 },
            left: { key: '6', textureRef: null as any, value: 6 },
            back: { key: '2', textureRef: null as any, value: 2 },
            down: { key: '5', textureRef: null as any, value: 5 },
        }
    },
    {
        name: 'd6-poker',
        shortName: '1d6p',
        code: '1d6p',
        mass: 1,
        faces: {
            top: { key: 'Q', textureRef: null as any, value: 4 },
            front: { key: 'J', textureRef: null as any, value: 3 },
            right: { key: '9', textureRef: null as any, value: 1 },
            left: { key: 'A', textureRef: null as any, value: 6 },
            back: { key: '10', textureRef: null as any, value: 2 },
            down: { key: 'K', textureRef: null as any, value: 5 },
        }
    }
];

