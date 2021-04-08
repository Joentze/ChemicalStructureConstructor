/*function testButton(){
    var createButtonTest = createButton("testButton");
    createButtonTest.id("mainButtonPreset");
}
*/

class buttonCreation {
  constructor(posX, posY, iconIMG, funcToExec, text, classOfButtonPreset) {
    this.x = posX;
    this.y = posY;
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

function makeModeOne() {
  modeClicker = prevModeClicker;
}
function modeClickerOne() {
  modeClicker = 1;
}
function modeClickerZero() {
  modeClicker = 0;
}
function makeFullScreen() {
  let fs = fullscreen();
  fullscreen(!fs);
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

class selectionListCreation {
  constructor(posX, posY, itemSelection, executeThisFunction, classPresetCSS) {
    this.x = posX;
    this.y = posY;
    this.namePair = itemSelection;
    this.exe = executeThisFunction;
    this.CSSclass = classPresetCSS;
    this.currVal;
    this.listSel = createSelect();
  }
  renderListSel() {
    //listSel.position(this.x,this.y)
    this.assignListItems(this.namePair);
    this.listSel.class(this.CSSclass);
    //this.currVal = listSel.value();
    this.listSel.changed(this.exe);
    this.listSel.style("font-family", "Arame-Regular");
    this.listSel.mouseOver(this.buttonIsHover);
    this.listSel.mouseOut(this.buttonIsNotHover);
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
  let currSelect = newSelectionBoxTest.listSel;
  var getNumCovalentBonds = elementsCovalentBondCount[currSelect.value()];
  currElement = getNumCovalentBonds;
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
