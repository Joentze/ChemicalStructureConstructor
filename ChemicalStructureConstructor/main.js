//THIS PROTOTYPE ONLY DRAWS BONE ORGANIC CHEMICAL STRUCTURES

//current element ---> current number of branches
var currElement = 4;
var currElementName = "C"

//Object Oriented variables
var main_branch_atoms = [];
var main_bonds = [];
var currSelectedVar = 0;

//States in the system
let modes = {SELECT:0, EDIT:1}
let mode = modes.EDIT;

//viewing state
//0-skeletal structure, 1 - lewis structure, 2-view without nodes
var currViewingState = 0;

//shows user is branching
var isBranchingAnotherAtom = false;

//shows if button is highlighted
var buttonHighlight = false;

//var newAtom;
var testThisButton;
var SELECT_AtomBar;

//Fixed length for the bonds
var fixed_length_bond = 100;

//Default font
let myFont;

//
var EDIT_selectionBox;


let view = new View()


let structure = new Structure()

let selectedAtom = null;


function preload() {
  myFont = loadFont("Assets/Arame-Regular.ttf");
}

function setup() {
  //load default font
  textFont(myFont);

  //NEATEN THIS UP!!!!
  var drawMainBranch = new buttonCreation("backGroundPencil",modeClickerEDIT,"","mainButtonPreset");
  drawMainBranch.renderButton();
  var branchFromNodes = new buttonCreation("backGroundBranching",modeClickerSELECT,"","mainButtonPreset");
  branchFromNodes.renderButton();
  
  fsButton = new buttonCreation("backGroundFS",makeFullScreen,"","clearPresetButton");
  fsButton.renderButton();

  var structureViewButton = new buttonCreation("backGroundviewButt",changeViewStructure,"","clearPresetButton");
  structureViewButton.renderButton();

  EDIT_selectionBox = new selectionListCreation(elementsCovalentBondCount,changeMainElementSelection,"selectionBoxPreset");
  EDIT_selectionBox.renderListSel();
  SELECT_AtomBar = new AtomBar(40,90);
 // ZOOM_slider = new sliderInput("sliderForZoom");
  
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  
  resizeCanvas(windowWidth, windowHeight);
  background(230);

  if(mousePressed && view.panning){
    view.pan();
  }

  structure.render();
  if(selectedAtom!=null && mode == modes.SELECT){
    SELECT_AtomBar.visibility = true;
        EDIT_selectionBox.visibility = false;
    }
    
  if(mode == modes.EDIT){
    SELECT_AtomBar.visibility = false;
    EDIT_selectionBox.visibility = true;

  }

  structure.render();
  // text(`${mouseX}, ${mouseY}`,10,10)
  SELECT_AtomBar.renderAtomBar(selectedAtom);
  //print(SELECT_AtomBar.visibility);
 
}

//calculates the fixed x y coordinates for a fixed bond length
function calculateNextPointFixLen(fixedLength, prevPoint, newX, newY) {
  angleMode(DEGREES);
  var getAngleToHorizontal = atan2(newY - prevPoint.y, newX - prevPoint.x);
  if (getAngleToHorizontal < 0) {
    var addTo180 = map(getAngleToHorizontal, -180, -1, 0, 179);
    getAngleToHorizontal = 180 + addTo180;
  }
  let x = fixedLength * cos(getAngleToHorizontal);
  let y = fixedLength * sin(getAngleToHorizontal);

  return [prevPoint.x+x, prevPoint.y+y];
}

//draws out the guideline for fixed angles
function drawGuideLine() {
  let latestAtom = structure.atoms.slice(-1)[0]
  if(selectedAtom){
      latestAtom=selectedAtom
  }  
  if (latestAtom) {
    let [projX,projY] = calculateNextPointFixLen(fixed_length_bond,latestAtom, mouseX, mouseY);
    var distance = dist(latestAtom.x, latestAtom.y, mouseX, mouseY);
    if (distance < 2 * fixed_length_bond) {
      push();
      strokeWeight(0.8);
      stroke(60);
      line(latestAtom.x, latestAtom.y, projX, projY);
      pop();
    }
  }
}
function drawGuideLineForBranching(currAtomClass) {
  var returnIfExceed = false;
  if (selectedAtomIfAny.length > 0) {
    let {x,y} = calculateNextPointFixLen(fixed_length_bond,currAtomClass, mouseX, mouseY);
    var getDist = sqrt(
      sq(mouseY - currAtomClass.y) + sq(mouseX - currAtomClass.x)
    );
    if (getDist < 2*fixed_length_bond) {
      if (currAtomClass.fullState == false) {
        push();
        strokeWeight(0.8);
        stroke(60);
        line(currAtomClass.x,currAtomClass.y,currAtomClass.x + x,currAtomClass.y + y);
        pop();
      } else {
        push();
        strokeWeight(3);
        stroke(color("rgba(200,60,60,0.6)"));
        line(currAtomClass.x,currAtomClass.y,currAtomClass.x + x,currAtomClass.y + y);
        pop();
      }
    }
  }
  return returnIfExceed;
}

