import { Injectable, signal } from '@angular/core';
import { DiceType } from './dice-type';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    deviceAcceleration = signal(0);

    constructor() {
        window.addEventListener("devicemotion", (event: DeviceMotionEvent) => {
            if (event.acceleration) {
                console.log(`${event.acceleration.x} m/s2`);
                this.deviceAcceleration.set(event.acceleration.x ?? 0);
            }
        });
    }

    d6: DiceType = {
        name: 'd6-regular',
        shortName: '1d6',
        code: '1d6',
        mass: 1,
        faces: [
            { side: 'top', key: '4', textureRef: 'assets/faces/face-4.svg', value: 4 },
            { side: 'front', key: '3', textureRef: 'assets/faces/face-3.svg', value: 3 },
            { side: 'right', key: '1', textureRef: 'assets/faces/face-1.svg', value: 1 },
            { side: 'left', key: '6', textureRef: 'assets/faces/face-6.svg', value: 6 },
            { side: 'back', key: '2', textureRef: 'assets/faces/face-2.svg', value: 2 },
            { side: 'bottom', key: '5', textureRef: 'assets/faces/face-5.svg', value: 5 },
        ]
    }

    pokerDice: DiceType = {
        name: 'd6-poker',
        shortName: '1d6p',
        code: '1d6p',
        mass: 1,
        faces: [
            { side: 'top', key: 'Q', textureRef: 'assets/faces/poker-q.svg', value: 4 },
            { side: 'front', key: 'J', textureRef: 'assets/faces/poker-j.svg', value: 3 },
            { side: 'right', key: '9', textureRef: 'assets/faces/poker-9clubs.svg', value: 1 },
            { side: 'left', key: 'A', textureRef: 'assets/faces/poker-ace.svg', value: 6 },
            { side: 'back', key: '10', textureRef: 'assets/faces/poker-10diamonds.svg', value: 2 },
            { side: 'bottom', key: 'K', textureRef: 'assets/faces/poker-k.svg', value: 5 },
        ]
    }
}

