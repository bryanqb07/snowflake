

const Util = (maxX, maxY, padding) => {
    var xVal = 0;
    var yVal = 0;
    while (xVal < padding || xVal > maxX - padding) {
        xVal = Math.floor(Math.random() * this.DIM_X);
    }
    while (yVal < this.PADDING || yVal > this.maxY - this.PADDING) {
        yVal = Math.floor(Math.random() * this.DIM_Y);
    }
    return [xVal, yVal];
};

export default Util;