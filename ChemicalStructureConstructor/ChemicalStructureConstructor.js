  var returnArray_X = [];
  var returnArray_Y = [];
  var modeClicker = 1;
function setup() {

}


function draw() {
  createCanvas(1500,800);  
  background(230);
  ClickerPeg(returnArray_X, returnArray_Y);
  renderingLineStructure(returnArray_X,returnArray_Y);

}
