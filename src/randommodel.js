// Graves
const grasses = new THREE.Group();
scene.add(grasses);
//   random loop
for (let i = 0; i < 50; i++) {
  const angle = Math.random() * Math.PI * 2; // Random angle
  const radius = 3 + Math.random() * 6; // Random radius
  const x = Math.cos(angle) * radius; // Get the x position using cosinus
  const z = Math.sin(angle) * radius; // Get the z position using sinus

  // Create the mesh
  const grass = new THREE.Mesh(model5, p5);
  // Position
  grass.position.set(x, 0, z);

  // Rotation
  // grave.rotation.z = (Math.random() - 0.5) * 0.4
  // grave.rotation.y = (Math.random() - 0.5) * 0.4

  // Add to the graves container
  grasses.add(grass);
}
