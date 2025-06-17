---
permalink: /shelf/
layout: post
title:  "My shelf"
---
<div>
  <center id="mydiv"><img src="/media/shelf.gif" id="shelfload"><canvas id="tester" width="0" height="0"></canvas></center>
</div>
<script async src="https://unpkg.com/es-module-shims@1.6.3/dist/es-module-shims.js"></script>

<script type="importmap">
  {
  "imports": {
    "three": "https://unpkg.com/three@0.146.0/build/three.module.js",
    "three/addons/": "https://unpkg.com/three@0.153.0/examples/jsm/"
  }
  }
</script>
<script type="module">

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let canvas = document.getElementById("tester");

let [mx,my]=[0,0];

const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
if (gl instanceof WebGLRenderingContext){
  const scene = new THREE.Scene();
  scene.background = new THREE.Color().setHex(0xd1e4ed);
  const camera = new THREE.PerspectiveCamera( 90, 1, 0.1, 1000 );
  const raycaster = new THREE.Raycaster();

  const loader = new GLTFLoader();

  const renderer = new THREE.WebGLRenderer( { antialias: false } );
  renderer.setSize( 360,360 );

  function mousemov(event){
    var rect = renderer.domElement.getBoundingClientRect();
    //console.log(mx,my);
    let omx = mx;
    let omy = my;
    mx = 2*((event.clientX - rect.left)/360-0.5); //x position within the element.
    my = 2*((event.clientY - rect.top)/360-0.5);  //y position within the element.
  }
  document.addEventListener('mousemove', mousemov, false);

  function animate() {
    renderer.render( scene, camera );
    camera.position.set(mx,2-my,24);
  }

  window.setTimeout(()=>{
    document.getElementById("mydiv").appendChild( renderer.domElement );
    document.getElementById("shelfload").remove();
    canvas.remove();
    renderer.setAnimationLoop( animate );
  },320);

  camera.position.set(0,2,24);
  

  loader.load(
    // resource URL
    '/media/models/shelf.glb',
    // called when the resource is loaded
    function ( gltf ) {

      scene.add( gltf.scene );

      gltf.animations; // Array<THREE.AnimationClip>
      gltf.scene; // THREE.Group
      gltf.scenes; // Array<THREE.Group>
      gltf.cameras; // Array<THREE.Camera>
      gltf.asset; // Object

    },
    // progress callback
    function ( xhr ) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    function ( error ) {
      console.log( 'oops' );
    }
  );
  
};

</script>
