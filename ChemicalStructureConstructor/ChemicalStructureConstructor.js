  var returnArray_X = [];
  var returnArray_Y = [];
  let pointHighlight = [];
  //mode 1 is for drawing
  //mode 2 is for branching
  //
 let testButton;
  var modeClicker = 1;
function setup() {
  var colorOfButton = color('rgb(25, 35, 41)');
  testButton = new buttons(100,700,colorOfButton);
}


function draw() {
  createCanvas(1500,800);  
  background(230);
  ClickerPeg(returnArray_X, returnArray_Y);
  renderingLineStructure(returnArray_X,returnArray_Y);
  testButton.renderButton();
  
}

// draws all the points in the coordinates
function renderingLineStructure(array_X, array_Y){

  var lastXArr = array_X.length - 1; 
  var lastYArr = array_Y.length - 1;
  var exceedDistPointer = calPointerExceed(array_X[lastXArr], array_Y[lastYArr], mouseX, mouseY, 120);
  var getGuideOfX = returnEightAngle("X", 30,twenty_PEGVAL);
  var getGuideOfY = returnEightAngle("Y", 30,twenty_PEGVAL);
  var currentPegAngle = getMouseAngleEstimate(returnArray_X[returnArray_X.length-1], returnArray_Y[returnArray_Y.length-1], twenty_PEGVAL);
  var filteredPeg = filterEightAngle(currentPegAngle, twenty_PEGVAL.length-1);
  
  if(array_X.length > 0){  
    for(let currNo = 1; currNo <= array_X.length; currNo++){
      
      if(currNo == array_X.length){
       stroke(0);
       line(array_X[currNo],array_Y[currNo],mouseX,mouseY);
       if(modeClicker == 1){
         drawEightLine(array_X[currNo-1], array_Y[currNo-1], getGuideOfX, getGuideOfY);
         //line(returnArray_X[returnArray_X.length-1],returnArray_Y[returnArray_Y.length-1], returnArray_X[returnArray_X.length-1] + getGuideOfX[filteredPeg],returnArray_Y[returnArray_Y.length-1] +getGuideOfY[filteredPeg]);
         
        if(exceedDistPointer){
          
         stroke(color('rgba(255, 158, 207,0.5)'));
         strokeWeight(5);
         line(returnArray_X[returnArray_X.length-1],returnArray_Y[returnArray_Y.length-1], mouseX, mouseY);
        }
        else{
          stroke(90);
          strokeWeight(5);
          line(returnArray_X[returnArray_X.length-1],returnArray_Y[returnArray_Y.length-1], mouseX, mouseY);
        }
        }}
      else{
        stroke(90);
        strokeWeight(3);
        line(array_X[currNo-1],array_Y[currNo-1], array_X[currNo], array_Y[currNo]);
        //drawEightLine(array_X[currNo], array_Y[currNo], getGuideOfX, getGuideOfY);
      }
      if(pointHighlight.length>=0 && currNo<=pointHighlight.length){
        pointHighlight[currNo-1].renderPt();
        }
    }
  }
}

