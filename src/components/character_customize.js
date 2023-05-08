import { AbstractMesh } from 'babylonjs';

/**
 * Get Vector3 for Babylon.js from right handed system with z-up vector floats
 *
 * @param {AbstractMesh[] } meshes array of mesh
 * @param {string } base string
 * @param {string } hair string
 * @param {string } jacket string
 * @param {string } pants string
 * @param {string } shoes string
 * @param {string } cloth string
 * @param {string } acc string
 * @returns {AbstractMesh[]} array of mesh
 */
export function setupCharacter (meshes, data ) {
  refreshCharacter(meshes);
  meshes.map((mesh) => {
    if(mesh.name != data.base && mesh.name != data.hair && mesh.name != data.jacket && mesh.name != data.pants  && mesh.name != data.shoes  && mesh.name != data.cloth  && mesh.name != data.accesory)
    {
      mesh.isVisible = false;
    }
  });
  return meshes;
}

export function setupCharacterPack (meshes, data ) {
  refreshCharacterPack(meshes);
  meshes.map((mesh) => {
    if(mesh.name == data.base)
    {
      mesh.isVisible = true;
    }

    for (let i = 0; i < data.head.length; i++) {
      if(mesh.name == data.head[i])
      {
        mesh.isVisible = true;
      }
    }

    for (let i = 0; i < data.body.length; i++) {

      if(mesh.name == data.body[i])
      {
        mesh.isVisible = true;
      }
    }

    for (let i = 0; i < data.pants.length; i++) {
      if(mesh.name == data.pants[i])
      {
        mesh.isVisible = true;
      }
    }
  });
  return meshes;
}

/**
 * Get Vector3 for Babylon.js from right handed system with z-up vector floats
 *
 * @param {AbstractMesh[] } meshes array of mesh
 * @returns {AbstractMesh[]} array of mesh
 */
 export function refreshCharacter (meshes ) {
  meshes.map((mesh) => {
    mesh.isVisible = true;
  });
  return meshes;
}

export function refreshCharacterPack (meshes ) {
  meshes.map((mesh) => {
    mesh.isVisible = false;
  });
  return meshes;
}

