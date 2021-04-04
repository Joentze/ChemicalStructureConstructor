//THIS PROTOTYPE ONLY DRAWS BONE ORGANIC CHEMICAL STRUCTURES


//current element ---> current number of branches
var currElement = 4;

//Object Oriented variables
var main_branch_atoms = [];
var main_bonds = [];
var currSelectedVar = 0;

//States in the system
var modeClicker = 1;
var prevModeClicker;

//var newAtom;
var testThisButton
//Fixed length for the bonds
var fixed_length_bond = 100;

function setup() {
  //NEATEN THIS UP!!!!
  testThisButton = new buttonCreation(20,20,"backGroundPencil",runThis,"","mainButtonPreset");
  testThisButton.renderButton();
  fsButton= new buttonCreation(windowWidth*0.98,windowHeight*0.9,"backGroundFS",makeFullScreen,"","clearPresetButton");
  fsButton.renderButton();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  createCanvas(windowWidth,windowHeight);  
  background(230);
  drawMainStructure(main_branch_atoms, main_bonds);
  if(modeClicker == 1){
  drawGuideLine();}
 
}

//calculates the fixed x y coordinates for a fixed bond length
function calculateNextPointFixLen(fixedLength,XorY,prevPoint){
  var returnIntCoord;
  angleMode(DEGREES);
  var getAngleToHorizontal = atan2(mouseY-prevPoint.y, mouseX-prevPoint.x);
   if (getAngleToHorizontal <0){
    var addTo180 = map(getAngleToHorizontal,-180,-1,0,179);
    getAngleToHorizontal = 180 + addTo180;
   }
  if(XorY == "X"){
    returnIntCoord = fixedLength*cos(getAngleToHorizontal);
  }
  else if(XorY == "Y"){
    returnIntCoord = fixedLength*sin(getAngleToHorizontal);
  }
  return returnIntCoord;
}

//draws out the guideline for fixed angles
function drawGuideLine(){
  var lenOfMain = main_branch_atoms.length;
  var lastAtom = main_branch_atoms[lenOfMain-1];
  var returnIfExceed = false;
  if(lenOfMain>0){
    var getX = calculateNextPointFixLen(fixed_length_bond, "X", lastAtom);
    var getY = calculateNextPointFixLen(fixed_length_bond, "Y", lastAtom);
    push();
    strokeWeight(0.8);
    stroke(60);
    line(lastAtom.x, lastAtom.y, lastAtom.x + getX, lastAtom.y + getY);
    var getDist = sqrt(sq(mouseY-lastAtom.y)+sq(mouseX - lastAtom.x));
    if(getDist>fixed_length_bond){
      push();
      strokeWeight(1.5);
      stroke(color('rgba(225,30,40,0.6)'));
      line(lastAtom.x+getX,lastAtom.y+getY, mouseX, mouseY);
      returnIfExceed = true;
      pop();
    }
    pop();
  }
  return returnIfExceed;
}