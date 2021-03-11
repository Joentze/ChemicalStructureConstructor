function mousePressed(){
  
  if(modeClicker==1){
   //Drawing mode
   if(mouseButton == LEFT){
    addPointArray(returnArray_X, returnArray_Y,getMouseAngleEstimate(returnArray_X[returnArray_X.length-1], returnArray_Y[returnArray_Y.length-1]));
  }
  }
  
  
}

function keyPressed(){
 if(keyCode== ESCAPE){ 
   modeClicker = 0;
 
 }
}
