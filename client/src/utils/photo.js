function generatePhoto(id) {
    return { id, src: `https://picsum.photos/300/200?random=${id}`, description: `SKU: ${`${id}`.padStart(6, '0')}` }
}

function generatePhotoLibrary(n) {
    return Array(n).fill(0).map((_, id) => generatePhoto(id + 1));
}

export {
    generatePhoto,
    generatePhotoLibrary
}