//Creates Button
class buttonCreation {
  constructor(iconIMG, funcToExec, text, classOfButtonPreset) {
    
    this.img = iconIMG;
    this.exe = funcToExec;
    this.text = text;
    this.idName = classOfButtonPreset;
  }
  renderButton() {
    var NewButton = createButton(this.text);
    NewButton.class(this.idName + " " + this.img);
    //NewButton.position(this.x, this.y);
    NewButton.mouseOver(this.buttonIsHover);
    NewButton.mouseOut(this.buttonIsNotHover);
    NewButton.mouseClicked(this.exe);
  }

  buttonIsHover() {
    buttonHighlight = true;
  }
  buttonIsNotHover() {
    buttonHighlight = false;
  }
}
/*
function makeModeOne() {
  modeClicker = prevModeClicker;
}*/

function modeClickerEDIT() {
  //selectedAtom = null;
  mode = modes.EDIT;
  console.log("EDIT MODE");
}

function modeClickerSELECT() {
  mode = modes.SELECT;
  console.log("SELECT MODE");
}

function makeFullScreen() {
  let fs = fullscreen();
  fullscreen(!fs);
}

function changeViewStructure(){
  if(currViewingState>=2){
    currViewingState = 0;
  }else{
  currViewingState += 1;
  }
  print(currViewingState);
}

function checkIfHoverCircle(posX, posY, radiusRange) {
  var return_bool = false;
  var calDist = sqrt(sq(mouseY - posY) + sq(mouseX - posX));
  if (calDist <= radiusRange) {
    return_bool = true;
  } else {
    return_bool = false;
  }
  return return_bool;
}

//Creates selection box
class selectionListCreation {
  constructor(itemSelection, executeThisFunction, classPresetCSS) {
    
    this.namePair = itemSelection;
    this.exe = executeThisFunction;
    this.CSSclass = classPresetCSS;
    this.currVal;
    this.listSel = createSelect();
    this.visibility = true;
  }
  renderListSel() {
    //listSel.position(this.x,this.y)
    this.assignListItems(this.namePair);
    this.listSel.class(this.CSSclass);
    this.currVal = this.listSel.value();

    this.listSel.changed(this.exe);
    this.listSel.style("font-family", "Arame-Regular");
    this.listSel.mouseOver(this.buttonIsHover);
    this.listSel.mouseOut(this.buttonIsNotHover);
    
    if(this.visibility){
      
      this.listSel.style('visibility', 'visible')
    }
    else{
      this.listSel.style('visibility','hidden');
    };
    
  }
  assignListItems(namePair) {
    var listToLook = namePair;
    var lengthOfKey = Object.keys(listToLook).length;
    var listOfKeys = Object.keys(listToLook);
    for (var cnt = 0; cnt < lengthOfKey; cnt++) {
      var currAssignment = listOfKeys[cnt];
      this.listSel.option(currAssignment);
    }
  }
  buttonIsHover() {
    buttonHighlight = true;
  }
  buttonIsNotHover() {
    buttonHighlight = false;
  }
}

function changeMainElementSelection() {
  let currSelect = EDIT_selectionBox.listSel;
  var getNumCovalentBonds = elementsCovalentBondCount[currSelect.value()];
  var getSymElement = elementsSymbol[currSelect.value()];
  currElement = getNumCovalentBonds;
  currElementName = getSymElement;
  print(currElement);
}

function launchSelectionsBox() {
  if (selectedAtomIfAny.length > 0) {
    var currAtom = selectedAtomIfAny[0];
    var currSelectionTable = new selectionListCreation(
      currAtom.x,
      currAtom.y + 15,
      elementsCovalentBondCount,
      testSelection,
      "selectionBoxPreset"
    );
    currSelectionTable.renderListSel();
  }
}

/*
class sliderInput{
  constructor(StyleCSS){
    this.css = StyleCSS;
    this.sliderVar = createSlider(0,100,1);
    this.sliderVar.class(this.css);
    this.sliderVar.mouseOver(this.buttonIsHover);
    this.sliderVar.mouseOut(this.buttonIsNotHover)
  }
  returnSliderVal(){
    return this.sliderVar.value();
  }
  buttonIsHover() {
    buttonHighlight = true;
  }
  buttonIsNotHover() {
    buttonHighlight = false;
  }
}
*/


