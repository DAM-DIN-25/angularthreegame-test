import { Component, CUSTOM_ELEMENTS_SCHEMA, input, signal, AfterViewInit, ResourceRef } from '@angular/core';
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
export class DiceFace implements AfterViewInit {

    side = input<string>('top');

    faceRef = input<string>(
        'assets/faces/empty.svg'
        // textureResource(
        //     () => 'data:image/svg+xml,' +
        //         encodeURIComponent(`
        //             <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
        //                 <text x="64" y="96" font-size="96" text-anchor="middle" fill="#ff00ff" font-family="Arial">?</text>
        //             </svg>
        //         `))
    );

    faceTexture = signal<ResourceRef<THREE.Texture<HTMLImageElement> | undefined> | undefined>(undefined);

    position = signal<[number, number, number]>([0, 0.5, 0]);
    rotation = signal<[number, number, number]>([-Math.PI / 2, 0, 0]);

    constructor() {
        const resource = textureResource(() => this.faceRef());
        this.faceTexture.set(resource);
    }

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
