// Create a new THREE.js scene
const scene = new THREE.Scene();

// Create a new THREE.js camera and position it
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);

// Create a new THREE.js renderer and set its size
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Add the renderer to the DOM
document.body.appendChild(renderer.domElement);

// Create a new THREE.js cube and add it to the scene
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xffffff })
);
scene.add(cube);

// Create an object to store the state of the movement keys
const movement = {
  forward: false,
  backward: false,
  left: false,
  right: false
};

// Listen for keyboard events and update the movement object accordingly
document.addEventListener('keydown', event => {
  switch (event.keyCode) {
    case 87: // W key
      movement.forward = true;
      break;
    case 83: // S key
      movement.backward = true;
      break;
    case 65: // A key
      movement.left = true;
      break;
    case 68: // D key
      movement.right = true;
      break;
  }
});

document.addEventListener('keyup', event => {
  switch (event.keyCode) {
    case 87: // W key
      movement.forward = false;
      break;
    case 83: // S key
      movement.backward = false;
      break;
    case 65: // A key
      movement.left = false;
      break;
    case 68: // D key
      movement.right = false;
      break;
  }
});

// Listen for mouse move events and update the camera's rotation accordingly
document.addEventListener('mousemove', event => {
  const x = event.clientX / window.innerWidth;
  const y = event.clientY / window.innerHeight;

  // Calculate the angle of rotation based on the current mouse position
  const theta = Math.PI * (x - 0.5);
  const phi = Math.PI * (y - 0.5);

  // Update the camera's rotation using the calculated angles
  camera.rotation.set(phi, theta, 0);
});

// Listen for mouse click events and shoot a white cube in the direction the camera is facing
document.addEventListener('click', () => {
  // Create a new cube at the position of the camera
  const newCube = cube.clone();
  newCube.position.set(camera.position.x, camera.position.y, camera.position.z);
  scene.add(newCube);

  // Set the velocity of the new cube so that it moves in the direction the camera is facing
  newCube.velocity = new THREE.Vector3();
  newCube.velocity.z = -1;
  newCube.velocity.applyQuaternion(camera.quaternion);
});

// Create a function that updates the position of each cube in the scene
const updateCubes = () => {
  scene.traverse(node => {
    if (node instanceof THREE.Mesh && node !== cube) {
      // Update the position of the cube based on its velocity
      node.position.add(node.velocity);

      // If the cube is outside the view of the camera, remove it from the scene
      if (node.position.z < camera.near || node.position.z > camera.far) {
        scene.remove(node);
      }
    }
  });
};

// Create a function that renders the scene and updates the position of each cube
const animate = () => {
  requestAnimationFrame(animate);

  // Update the camera's position based on the movement object
  if (movement.forward) {
    camera.position.z -= 0.1;
  }
  if (movement.backward) {
    camera.position.z += 0.1;
  }
  if (movement.left) {
    camera.position.x -= 0.1;
  }
  if (movement.right) {
    camera.position.x += 0.1;
  }

  // Update the position of each cube in the scene
  updateCubes();

  // Render the scene
  renderer.render(scene, camera);
};

animate();