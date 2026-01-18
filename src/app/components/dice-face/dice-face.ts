import { Component, CUSTOM_ELEMENTS_SCHEMA, input, ResourceRef, signal } from '@angular/core';
import { NgtsDecal } from 'angular-three-soba/misc';
import { textureResource } from 'angular-three-soba/loaders';
import * as THREE from 'three';

@Component({
    selector: 'app-dice-face',
    imports: [NgtsDecal],
    templateUrl: './dice-face.html',
    styleUrl: './dice-face.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DiceFace {

    side = input<string>('top');

    faceTexture = input<ResourceRef<THREE.Texture<HTMLImageElement> | undefined>>(
        textureResource(
            () => 'data:image/svg+xml,' +
                encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
                        <text x="64" y="96" font-size="96" text-anchor="middle" fill="#ff00ff" font-family="Arial">?</text>
                    </svg>
                `))
    );

    position = signal<[number, number, number]>([0, 0.5, 0]);
    rotation = signal<[number, number, number]>([-Math.PI / 2, 0, 0]);

    ngAfterViewInit() {    

        const distance = 0.2;

        switch (this.side()) {
            case 'top':
                this.position.set([0, distance, 0]);
                this.rotation.set([-Math.PI / 2, 0, 0]);
                break;
            case 'bottom':
                this.position.set([0, -distance, 0]);
                this.rotation.set([Math.PI / 2, 0, 0]);
                break;
            case 'left':
                this.position.set([-distance, 0, 0]);
                this.rotation.set([0, -Math.PI / 2, 0]);
                break;
            case 'right':
                this.position.set([distance, 0, 0]);
                this.rotation.set([0, Math.PI / 2, 0]);
                break;
            case 'front':
                this.position.set([0, 0, distance]);
                this.rotation.set([0, 0, 0]);
                break;
            case 'back':
                this.position.set([0, 0, -distance]);
                this.rotation.set([0, Math.PI, 0]);
                break;
        }
    }

}
