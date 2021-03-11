

function ClickerPeg(){

  noFill();
  stroke(150,30,30);
  strokeWeight(1);
  ellipse(mouseX,mouseY,20,20);
  textSize(17);
  if(modeClicker==1){
  text(getMouseAngleEstimate(returnArray_X[returnArray_X.length-1], returnArray_Y[returnArray_Y.length-1]), mouseX +10, mouseY-5);
}}

function filterEightAngle(filterPegNo){
  var return_no = 0;
  if(filterPegNo == 0 || filterPegNo == 8){
          return_no= 0;
          
         }
         else{
          return_no = filterPegNo; 
         }
  return return_no;
}

function addPointArray(returnArray_X, returnArray_Y, anglePegNo){
     //first reference point
     var currPegNo = 0;
     if(returnArray_X.length>0){
         currPegNo = filterEightAngle(anglePegNo);
         
         FixedX = returnEightAngle("X",80);
         FixedY = returnEightAngle("Y",80);
         
         append(returnArray_X, returnArray_X[returnArray_X.length-1] + FixedX[currPegNo]);
         append(returnArray_Y, returnArray_Y[returnArray_Y.length-1] + FixedY[currPegNo]);
        // print(returnArray_X);
     }
     else if(returnArray_X.length == 0){
       append(returnArray_X, mouseX);
       append(returnArray_Y, mouseY);
     }
}

function drawEightLine(refPtX,refPtY, xptArr, yptArr){
   
    strokeWeight(0.5);
    for(let cnt = 0; cnt< xptArr.length; cnt++){
      line(refPtX, refPtY, xptArr[cnt] + refPtX, yptArr[cnt] +refPtY);
      textSize(7);
      text(cnt ,xptArr[cnt] + refPtX+3,yptArr[cnt] +refPtY+3);
  }
}

function renderingLineStructure(array_X, array_Y){
  
  var getGuideOfX = returnEightAngle("X", 50);
  var getGuideOfY = returnEightAngle("Y", 50);
  var currentPegAngle = getMouseAngleEstimate(returnArray_X[returnArray_X.length-1], returnArray_Y[returnArray_Y.length-1]);
  var filteredPeg = filterEightAngle(currentPegAngle);
  
  if(array_X.length > 0){  
    for(let currNo = 1; currNo <= array_X.length; currNo++){
      if(currNo == array_X.length){
       stroke(0);
       line(array_X[currNo],array_Y[currNo],mouseX,mouseY);
       if(modeClicker == 1){
         drawEightLine(array_X[currNo-1], array_Y[currNo-1], getGuideOfX, getGuideOfY);
         stroke(color('rgba(255, 158, 207,0.5)'));
         strokeWeight(5);
         line(returnArray_X[returnArray_X.length-1],returnArray_Y[returnArray_Y.length-1], returnArray_X[returnArray_X.length-1] + getGuideOfX[filteredPeg],returnArray_Y[returnArray_Y.length-1] +getGuideOfY[filteredPeg]);
      }}
      else{
        stroke(90);
        strokeWeight(3);
        line(array_X[currNo-1],array_Y[currNo-1], array_X[currNo], array_Y[currNo]);
        //drawEightLine(array_X[currNo], array_Y[currNo], getGuideOfX, getGuideOfY);
      }
    }
  }
}

//returns the angles for the next branch
function returnEightAngle(XorY, lengthPX){
  angleMode(DEGREES);
  let pi_constants = [0,45,90,135,180,225,270,315];
  return_values = [];  
 
 for(let cnt = 0; cnt<pi_constants.length;cnt++){
  if(XorY == "X"){
  var currValX =  lengthPX * cos(pi_constants[cnt]);
  //print("PRINTX:"+currValX);
  append(return_values, currValX);
 }
 else if(XorY == "Y"){
  var currValY =  lengthPX * sin(pi_constants[cnt]);
  //print("PRINTY:"+currValY);
  append(return_values, currValY);
 }
 }
 //print(return_values);
  return return_values;
}

//tracks position of the mouse and gives the estimate for 8 possible branches (assuming "Carbon" atom)
function getMouseAngleEstimate(prevX, prevY){
  
  allAngleBorders = [0,45,90,135,180,225,270,315,359];
  angleMode(DEGREES); 
  var angleFromPrevPoint = 0;
  var returnPegNo = 0;
  var getOne = mouseY-prevY;
  var getTwo = mouseX-prevX;

  angleFromPrevPoint =  atan2(getOne, getTwo);
  if (angleFromPrevPoint <0){
   var addTo180 = map(angleFromPrevPoint,-180,-1,0,179);
   angleFromPrevPoint = 180 + addTo180;
  }
  
  for(let cnt = 1; cnt<allAngleBorders.length; cnt++){
    
    borderOne = allAngleBorders[cnt-1];
    borderTwo = allAngleBorders[cnt];

    if(angleFromPrevPoint>borderOne && angleFromPrevPoint < borderTwo){
    
      diffBorderOne = abs(angleFromPrevPoint - borderOne);
      diffBorderTwo = abs(angleFromPrevPoint - borderTwo);
      //print(diffBorderOne);
    if(diffBorderTwo>diffBorderOne){
      returnPegNo = cnt - 1;
      break;
    }
    else if(diffBorderTwo<diffBorderOne){
      returnPegNo = cnt;
      break;
    }
    
    }
  }
  return returnPegNo;
}
