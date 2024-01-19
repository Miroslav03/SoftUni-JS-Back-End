const cubes = [{
    _id: 1,
    name: 'Gan356 Air SM',
    description: `Magnets in AirSM will not drop, and their positions will be more precise with the
    Magnets-Snap-On design. With the use of 3mm*2mm magnets, the handfeel will be more stable and more
    comfortable. P.S. This design is brand new for the AirSM.`,
    difficulty: "3",
    imageUrl: 'https://ae01.alicdn.com/kf/HTB1CSddXRxRMKJjy0Fdq6yifFXa6/Gan-356-Air-SM-3x3-Black-Magic-cube-GAN-Air-SM-Magnetic-3x3x3-Speed-cube-gans.jpg'

}];

exports.getAll = () => {
    return cubes.slice();
};

exports.addCube = (cube) => {
    cube._id = cubes.length + 1;
    cubes.push(cube);
}