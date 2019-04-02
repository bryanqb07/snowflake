const specs = {
    offsets : {
        fence: [0, 0],
        finish: [0, 0],
        lives: [0, 0],
        penguin: [0, 0],
        rock: [-208, 72],
        tree: [-130, 60]
    },

    dims: { //dimensions
        fence: [634, 618, 12], // width height shrinkFactor
        finish: [2000, 247, 1.5],
        lives: [300, 300, 10],
        penguin: [448, 480, 5],
        rock: [512, 512, 2],
        tree: [600, 300, 1]
    },

    srcs : {
        fence: "images/flag.png",
        finish: "images/finish.png",
        die: "images/flip-penguin.png",
        lives: "images/penguin_face.png",
        penguin: "images/penguin2.png",
        rock: "images/rock.png",
        tree: "images/tree3.png"
    }
};

export default specs;