import { Component, CUSTOM_ELEMENTS_SCHEMA, input, ResourceRef, signal } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsRoundedBox } from 'angular-three-soba/abstractions';
import { NgtrRigidBody } from 'angular-three-rapier';
import { textureResource } from 'angular-three-soba/loaders';
import { DiceFace } from '../dice-face/dice-face';

import * as THREE from 'three';

@Component({
    selector: 'app-d6-dice',
    imports: [NgtArgs, NgtsRoundedBox, NgtrRigidBody, DiceFace],
    templateUrl: './d6-dice.html',
    styleUrl: './d6-dice.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class D6Dice {
    protected readonly Math = Math;

    position = input<[number, number, number]>([0, 1, 0]);
    color = input<string>('white');

    hovered = signal(false);

    onDiceClick() {

    }

    // TODO: Create svg textures in assets folder

    faceAce = signal<ResourceRef<THREE.Texture<HTMLImageElement> | undefined>>(textureResource(
        () =>
            'data:image/svg+xml,' +
            encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
                  <text x="64" y="96" font-size="96" text-anchor="middle" fill="#000000" font-family="Arial">♠️</text>
              </svg>
        `)));


    // J blue
    faceJ = signal<ResourceRef<THREE.Texture<HTMLImageElement> | undefined>>(textureResource(
        () =>
            'data:image/svg+xml,' +
            encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
                <text x="112" y="28"  font-size="40" text-anchor="middle" fill="#0000FF" font-family="Arial">J</text>
                <text x="64" y="96" font-size="96" text-anchor="middle" fill="#000000" font-family="Serif">🐦</text>
              </svg>
        `)));

    // Q green
    faceQ = signal<ResourceRef<THREE.Texture<HTMLImageElement> | undefined>>(textureResource(
        () =>
            'data:image/svg+xml,' +
            encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
                  <text x="112" y="28"  font-size="40" text-anchor="middle" fill="#008000" font-family="Arial">Q</text>
                  <text x="64" y="96" font-size="96" text-anchor="middle" fill="#000000" font-family="Serif">🐉</text>
              </svg>
        `)));


    // K red
    faceK = signal<ResourceRef<THREE.Texture<HTMLImageElement> | undefined>>(textureResource(
        () =>
            'data:image/svg+xml,' +
            encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
                  <text x="22" y="28"  font-size="40" text-anchor="middle" fill="#FF0000" font-family="Arial">K</text>
                  <text x="64" y="96" font-size="96" text-anchor="middle" fill="#000000" font-family="Serif">🗡️</text>
              </svg>
        `)));

    // 9 of clovers
    face9 = signal<ResourceRef<THREE.Texture<HTMLImageElement> | undefined>>(textureResource(
        () =>
            'data:image/svg+xml,' +
            encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
                    <!-- 4 clovers left -->
                    <text x="30" y="22"  font-size="20" text-anchor="middle" fill="#000000" font-family="Arial">♣️</text>
                    <text x="30" y="52"  font-size="20" text-anchor="middle" fill="#000000" font-family="Arial">♣️</text>
                    <text x="30" y="82"  font-size="20" text-anchor="middle" fill="#000000" font-family="Arial">♣️</text>
                    <text x="30" y="112" font-size="20" text-anchor="middle" fill="#000000" font-family="Arial">♣️</text>

                    <!-- center clover -->
                    <text x="64" y="64"  font-size="20" text-anchor="middle" fill="#000000" font-family="Arial">♣️</text>

                    <!-- 4 clovers right -->
                    <text x="98" y="22"  font-size="20" text-anchor="middle" fill="#000000" font-family="Arial">♣️</text>
                    <text x="98" y="52"  font-size="20" text-anchor="middle" fill="#000000" font-family="Arial">♣️</text>
                    <text x="98" y="82"  font-size="20" text-anchor="middle" fill="#000000" font-family="Arial">♣️</text>
                    <text x="98" y="112" font-size="20" text-anchor="middle" fill="#000000" font-family="Arial">♣️</text>
                </svg>
            `)));

    // 10 of diamonds
    face10 = signal<ResourceRef<THREE.Texture<HTMLImageElement> | undefined>>(textureResource(
        () =>
            'data:image/svg+xml,' +
            encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
                  <!-- 4 diamonds left -->
                    <text x="30" y="22"  font-size="20" text-anchor="middle" fill="#000000" font-family="Arial">♦️</text>
                    <text x="30" y="52"  font-size="20" text-anchor="middle" fill="#000000" font-family="Arial">♦️</text>
                    <text x="30" y="82"  font-size="20" text-anchor="middle" fill="#000000" font-family="Arial">♦️</text>
                    <text x="30" y="112" font-size="20" text-anchor="middle" fill="#000000" font-family="Arial">♦️</text>

                  <!-- center two diamonds -->
                    <text x="64" y="37"  font-size="20" text-anchor="middle" fill="#000000" font-family="Arial">♦️</text>
                    <text x="64" y="97"  font-size="20" text-anchor="middle" fill="#000000" font-family="Arial">♦️</text>
                  <!-- 4 diamonds right -->
                    <text x="98" y="22"  font-size="20" text-anchor="middle" fill="#000000" font-family="Arial">♦️</text>
                    <text x="98" y="52"  font-size="20" text-anchor="middle" fill="#000000" font-family="Arial">♦️</text>
                    <text x="98" y="82"  font-size="20" text-anchor="middle" fill="#000000" font-family="Arial">♦️</text>
                    <text x="98" y="112" font-size="20" text-anchor="middle" fill="#000000" font-family="Arial">♦️</text>
              </svg>
        `)));


    constructor() {
    }
}
