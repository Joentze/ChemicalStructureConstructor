
var twenty_PEGVAL = [0, 18, 36, 54, 72, 90, 108, 126, 144, 162, 180, 198, 216, 234, 252, 270, 288, 306, 324, 342,359];
/* 
var fifteen_PEGVAL = [0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336,359];
var eight_PEGVAL = [0,45,90,135,180,225,270,315,359];

var HEX_MOLECULE_RANGE = [60,120,240,300];
var PENTA_MOLECULE_RANGE = [];

*/


//draws the cursor circle and shows data
function ClickerPeg(){

  noFill();
  stroke(150,30,30);
  strokeWeight(1);
  ellipse(mouseX,mouseY,20,20);
  textSize(17);
  if(modeClicker==1){
  text(getMouseAngleEstimate(returnArray_X[returnArray_X.length-1], returnArray_Y[returnArray_Y.length-1],twenty_PEGVAL), mouseX +10, mouseY-5);
  //text(testVarMouseWheel, mouseX + 10, mouseY +10);
}}

//simply assigns the correct number for each angle range
function filterEightAngle(filterPegNo, maxNo){
  var return_no = 0;
  if(filterPegNo == 0 || filterPegNo == maxNo){
          return_no= 0;
          
         }
         else{
          return_no = filterPegNo; 
         }
  return return_no;
}

//appends the current coordinates for the global x and y arrays
//called under events
function addPointArray(returnArray_X, returnArray_Y, anglePegNo){
     //first reference point
    var lastXArr = returnArray_X.length - 1; 
    var lastYArr = returnArray_Y.length - 1;
    var exceedDistPointer = calPointerExceed(returnArray_X[lastXArr], returnArray_Y[lastYArr], mouseX, mouseY, 120);
  
     var currPegNo = 0;
     if(returnArray_X.length>0){
         currPegNo = filterEightAngle(anglePegNo,twenty_PEGVAL.length-1);
         
         FixedX = returnEightAngle("X",80,twenty_PEGVAL);
         FixedY = returnEightAngle("Y",80,twenty_PEGVAL);
        if(!exceedDistPointer){
         append(returnArray_X, mouseX);
         append(returnArray_Y, mouseY);
        // print(returnArray_X);
        }
     }
     else if(returnArray_X.length == 0){
       append(returnArray_X, mouseX);
       append(returnArray_Y, mouseY);
       //ADD THE FIRST POINT STICK
       pointStickAssignment(pointHighlight.length,mouseX, mouseY, 30);
     }
}


//draws the angle guides at the last point
function drawEightLine(refPtX,refPtY, xptArr, yptArr){
   
    strokeWeight(0.4);
    for(let cnt = 0; cnt< xptArr.length; cnt++){
      line(refPtX, refPtY, xptArr[cnt] + refPtX, yptArr[cnt] +refPtY);
      textSize(7);
      //text(cnt ,xptArr[cnt] + refPtX+3,yptArr[cnt] +refPtY+3);
  }
}

//returns the angles for the next branch
function returnEightAngle(XorY, lengthPX,fixedPegList){
  angleMode(DEGREES);
  //let fixedAngles = [0,45,90,135,180,225,270,315, 359];
  return_values = [];  
 
 for(let cnt = 0; cnt<fixedPegList.length-1;cnt++){
  if(XorY == "X"){
  var currValX =  lengthPX * cos(fixedPegList[cnt]);
  //print("PRINTX:"+currValX);
  append(return_values, currValX);
 }
 else if(XorY == "Y"){
  var currValY =  lengthPX * sin(fixedPegList[cnt]);
  //print("PRINTY:"+currValY);
  append(return_values, currValY);
 }
 }
 //print(return_values);
  return return_values;
}

//tracks position of the mouse and gives the estimate for n number of possible branches (assuming "Carbon" atom)
function getMouseAngleEstimate(prevX, prevY,fixedPegList){
  
  
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
  
  for(let cnt = 1; cnt<fixedPegList.length; cnt++){
    
        borderOne = fixedPegList[cnt-1];
        borderTwo = fixedPegList[cnt];
  

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


function calPointerExceed(mousePosX, mousePosY, prevX, prevY, lengthLimit){
  let booleanReturn = false;
  var calculateDistance = sqrt(sq(mousePosY - prevY)+sq(mousePosX-prevX));
  if(calculateDistance<=lengthLimit){
    booleanReturn = false;
  }
  else{
    booleanReturn = true;
  }
  return booleanReturn;
}