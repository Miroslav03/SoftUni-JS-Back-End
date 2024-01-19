const cubes = [{
    _id: 1,
    name: 'Gan356 Air SM',
    description: `Magnets in AirSM will not drop, and their positions will be more precise with the
    Magnets-Snap-On design. With the use of 3mm*2mm magnets, the handfeel will be more stable and more
    comfortable. P.S. This design is brand new for the AirSM.`,
    difficulty: "3",
    imageUrl: 'https://ae01.alicdn.com/kf/HTB1CSddXRxRMKJjy0Fdq6yifFXa6/Gan-356-Air-SM-3x3-Black-Magic-cube-GAN-Air-SM-Magnetic-3x3x3-Speed-cube-gans.jpg'

}, {
    _id: 2,
    name: 'Rubik',
    description: `Rubik's Cube consists of 26 small cubes that rotate on a central axis; nine coloured cube faces, in three rows of three each, form each side of the cube.`,
    difficulty: "2",
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Rubiks_cube_solved.jpg'

}];

exports.searchCube = (title, difficulty1, difficulty2) => {
    let _cubes = cubes
    if (title) {
        _cubes = _cubes.filter(cube => cube.name.toLocaleLowerCase().includes(title.toLocaleLowerCase()));
    }

    if (difficulty1) {
        _cubes = _cubes.filter(cube => Number(cube.difficulty) >= Number(difficulty1));
    }

    if (difficulty2) {
        _cubes = _cubes.filter(cube => Number(cube.difficulty) <= Number(difficulty2));
    }

    if (difficulty1 && difficulty2) {
        _cubes = _cubes.filter(cube => Number(cube.difficulty) >= Number(difficulty1) && Number(cube.difficulty) <= Number(difficulty1));
    }


    return _cubes;
};

exports.addCube = (cube) => {
    cube._id = cubes.length + 1;
    cubes.push(cube);
};

exports.getOne = (id) => {
    const cube = cubes.filter(cube => cube._id == id);
    return cube;
};