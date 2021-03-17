//  HANDLES EVENTS IN THE PROCESSING RUNNED SCRIPT
var testVarMouseWheel;

//mouse events
function mousePressed(){
  
  if(modeClicker==1){
   //Drawing mode
   if(mouseButton == LEFT){
    var lastXArr = returnArray_X.length-1;
    var lastYArr = returnArray_Y.length-1;
    var anglePeg = getMouseAngleEstimate(returnArray_X[lastXArr], returnArray_Y[lastYArr], twenty_PEGVAL);
    
    addPointArray(returnArray_X, returnArray_Y,anglePeg);

    if(!calPointerExceed(returnArray_X[lastXArr], returnArray_Y[lastYArr], mouseX, mouseY, 120) && pointHighlight.length >= 0){
    pointStickAssignment(pointHighlight.length,mouseX, mouseY, 30);
      print(pointHighlight);
  }
  }
  }
  
  
}

// keypressed events
function keyPressed(){
 if(keyCode== ESCAPE){ 
   modeClicker = 0;
 
 }
}

//mouse wheel events
function mouseWheel(event){
testVarMouseWheel = event.delta;
}

//Mouse Dragged event
function mouseDragged(){

  if(modeClicker == 0){
    for(let currPt = 0; currPt<=pointHighlight.length-1; currPt++){
      if(pointHighlight[currPt].return_boolean){
        print("changing...")
        returnArray_X[currPt] = mouseX;
        returnArray_Y[currPt] = mouseY;
        pointHighlight[currPt].x = mouseX;
        pointHighlight[currPt].y = mouseY;
      }
    }

}

}