
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.GLTFLoader = function (manager) {
    return new THREE.GLTFLoader(manager);
};

import { GLTFLoader } from 'https://unpkg.com/three@0.148.0/examples/jsm/loaders/GLTFLoader.js';
window.THREE = window.THREE || {};
window.THREE.GLTFLoader = GLTFLoader;
