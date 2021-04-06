/*function testButton(){
    var createButtonTest = createButton("testButton");
    createButtonTest.id("mainButtonPreset");
}
*/

class buttonCreation{
    constructor(posX, posY, iconIMG, funcToExec, text, classOfButtonPreset,){
        this.x = posX;
        this.y = posY;
        this.img = iconIMG;
        this.exe = funcToExec;
        this.text = text;
        this.idName = classOfButtonPreset;
      
    }
    renderButton(){
        var NewButton = createButton(this.text);
        NewButton.class(this.idName + " " +this.img);
        //NewButton.position(this.x, this.y);
        NewButton.mouseOver(this.buttonIsHover);
        NewButton.mouseOut(this.buttonIsNotHover);
        NewButton.mouseClicked(this.exe);
    }
    

    buttonIsHover(){
        buttonHighlight = true;
    }
    buttonIsNotHover(){
        buttonHighlight = false;
    }
    
}

function makeModeOne(){
    modeClicker = prevModeClicker;
}
function modeClickerOne(){
    modeClicker = 1;
}
function modeClickerZero(){
    modeClicker = 0;
}
function makeFullScreen(){
    let fs = fullscreen();
    fullscreen(!fs);
}



function checkIfHoverCircle(posX, posY, radiusRange){
    var return_bool = false;
    var calDist = sqrt(sq(mouseY-posY)+sq(mouseX - posX));
    if(calDist<=radiusRange){
        return_bool = true;
    }
    else{
        return_bool = false;
    }
    return return_bool;
}

class selectionListCreation{
    constructor(posX, posY, itemSelection, executeThisFunction,classPresetCSS){
        this.x = posX;
        this.y = posY;
        this.listSel = itemSelection;
        this.exe = executeThisFunction;
        this.CSSclass =  classPresetCSS;
        this.currVal;
    }
    renderListSel(){
        let listSel = createSelect();
        listSel.position(this.x, this.y);
        this.assignListItems(listSel);
        listSel.class(this.CSSclass);
        this.currVal = listSel.value();
        listSel.changed(this.exe);
    }
    assignListItems(listSel){
        var listToLook = this.listSel;
        var lengthOfKey = Object.keys(listToLook).length;
        var listOfKeys = Object.keys(listToLook);
        for(var cnt = 0; cnt<lengthOfKey; cnt++){
            var currAssignment = listOfKeys[cnt];
            listSel.option(currAssignment);
        }
    }
}

function testSelection(){
    console.log("i made a selection");
}
function launchSelectionsBox(){
    if(selectedAtomIfAny.length>0){
        var currAtom = selectedAtomIfAny[0];
        var currSelectionTable = new selectionListCreation(currAtom.x,currAtom.y + 15,elementsCovalentBondCount,testSelection,"selectionBoxPreset");
        currSelectionTable.renderListSel();
    }
}