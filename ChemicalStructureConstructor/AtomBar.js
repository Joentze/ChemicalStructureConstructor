
class AtomBar{
    constructor(x,y){

        //position of atom bar
        this.posX = x;
        this.posY = y;

        //class name atom bar 
        this.className = "selectionBoxElementsPreset";
        
        //Array of ul for images for button
        this.imageShowCentralList = ["showCentralPresetThree.svg","showCentralPresetTwo.svg","showCentralPresetOne.svg"];
        this.imageShowLPList = ["showLPPresetThree.svg","showLPPresetTwo.svg","showLPPresetOne.svg"];
        
        //Creation of interaction objects
        this.elementBoxSelector = new selectionListCreation(elementsSymbol,changeCurrSelectedAtomElement,this.className);
        this.selectedAtomCentralToggle = new buttonCreation("toggleMainButtonPreset",ElementfuncIncrement, "","toggleButtonPreset");
        this.selectedAtomLonePairToggle = new buttonCreation("toggleMainButtonPreset",LPfuncIncrement,"","LPtoggleButtonPreset");
        this.notesButton = new buttonCreation("toggleMainButtonPreset",openTextbox,"","textBoxOpenPreset");
        this.notePad = new createTextArea("textAreaPreset");
        //assign visibility
        this.notesButton.visibility,this.selectedAtomCentralToggle.visibility, this.selectedAtomLonePairToggle.visibility = this.visibility;

        //keeps record of previous atom
        this.prevAtom;
        this.prevAtomElement;

        //current visibility of atom bar
        this.visibility = false;
        
    }

    //RENDERS THE TEXT AT TOP LEFT CORNER DURING SELECT MODE
    renderingElementText(AtomSelected){
        let atomSym = AtomSelected.sym;
        push();
        if(atomSym.length==1){
            textFont('Arial');
            noStroke();
            fill(color('rgb(40,40,40)'));
            textSize(70);
            text(atomSym,this.posX,this.posY);
            pop();

        }
        else if(atomSym.length == 2){
            textFont('Arial');
            noStroke();
            fill(color('rgb(40,40,40)'));
            textSize(70);
            text(atomSym,this.posX-20,this.posY);
            pop();

        }
            let aM = elementsArShow[atomSym]["aM"];
            let aN = elementsArShow[atomSym]["aN"];
        
            push();
            textFont('Arial');
            noStroke();
            fill(color('rgb(40,40,40)'));
            textSize(10);
            text(aM.toString(),this.posX+50,this.posY-50);
            text(aN.toString(), this.posX+50, this.posY+10);
            pop();
    }

    //RENDERS THE SELECTION BOX FOR THE CURRENT ATOM
    renderSelectionElement(selectedAtom){
            this.elementBoxSelector.visibility = this.visibility;
            this.elementBoxSelector.renderListSel();
 
       
    }

    //SHOWS AND CHANGES THE STATES OF THE ATOM SELECTED
    renderShowCentral(selectedAtom){
        this.selectedAtomCentralToggle.visibility = this.visibility;
        this.selectedAtomCentralToggle.renderButton();
    }

    //SHOWS THE LONE PAIR TOGGLER FOR THE SELECTED ATOM 
    renderLonePairs(selectedAtom){
        this.selectedAtomLonePairToggle.visibility = this.visibility;
        this.selectedAtomLonePairToggle.renderButton();
    }

    //RENDER TEXT BOX BUTTON
    renderTextBoxButton(){
        this.notesButton.visibility = this.visibility;
        this.notesButton.renderButton();
    }

    //CHANGES THE TOGGLE BUTTON ICON WITH EVERY CHANGE IN SELECTED ATOM
    changeIconCentralAtom(selectedAtom,buttonToAct,arrayToPickImg,variableTolook){
        buttonToAct.NewButton.style('background-image',`url('image/${arrayToPickImg[variableTolook]}')`);
        if(selectedAtom.sym == "C" && buttonToAct != this.selectedAtomCentralToggle){
            buttonToAct.NewButton.style('filter', "blur(0px)");
        }
        else if(selectedAtom.sym !="C" && buttonToAct == this.selectedAtomCentralToggle){
            buttonToAct.NewButton.style('filter', "blur(3px)");
        }
        else if(selectedAtom.sym == "C" && buttonToAct == this.selectedAtomCentralToggle){
            buttonToAct.NewButton.style('filter', "blur(0px)");
        }
    }

    //RENDERS ATOM BAR
    renderAtomBar(selectedAtom){
        if(selectedAtom!=null){
            this.renderSelectionElement(selectedAtom);
            this.renderShowCentral(selectedAtom);
            this.renderLonePairs(selectedAtom);
            this.renderTextBoxButton(selectedAtom);
            this.checkForChangeExec();    
        }
        if(mode == modes.SELECT && selectedAtom!=null){
            this.renderingElementText(selectedAtom);      
        }    
}

//CHECKS FOR A CHANGE IN THE ATOM SELECTED AND EXECUTE FUNCTIONS ACCORDINGLY.
checkForChangeExec(){
    if(this.prevAtom!=selectedAtom){
        let getIndex = Object.keys(elementsCovalentBondCount);
        document.getElementsByClassName(this.className)[0].selectedIndex = getIndex.indexOf(selectedAtom.element);
        this.changeIconCentralAtom(selectedAtom,this.selectedAtomCentralToggle,this.imageShowCentralList, selectedAtom.showCentral);
        this.changeIconCentralAtom(selectedAtom,this.selectedAtomLonePairToggle,this.imageShowLPList, selectedAtom.showLonePairs);
        this.prevAtom = selectedAtom;
        this.prevAtomElement = selectedAtom.element;
       }
    else if(this.prevAtom == selectedAtom && selectedAtom.element != this.prevAtomElement){
        this.changeIconCentralAtom(selectedAtom,this.selectedAtomCentralToggle,this.imageShowCentralList, selectedAtom.showCentral);
        this.prevAtomElement = selectedAtom.element;
    }
}




}



//CHECKS FOR "OVER BONDING"
function changeCurrSelectedAtomElement() {
  
    var currValue = document.getElementsByClassName("selectionBoxElementsPreset")[0].selectedIndex;
    let objName = Object.keys(elementsSymbol)[currValue]
    let bNo = elementsCovalentBondCount[objName];
    let currNumBonds = structure.adjList.get(selectedAtom).length

    if (currNumBonds>bNo){
        alert(`Can't convert to ${objName}. Too many bonds`)
    }else{
        selectedAtom.sym = elementsSymbol[objName];
        selectedAtom.bNo = elementsCovalentBondCount[objName];
        selectedAtom.element = objName;
    }  
}   

 function ElementfuncIncrement(){
      
    if(selectedAtom != null){
        let currViewingState = selectedAtomIncrementVar(selectedAtom.showCentral,2);
        SELECT_AtomBar.selectedAtomCentralToggle.NewButton.style('background-image',`url('image/${SELECT_AtomBar.imageShowCentralList[currViewingState]}')`);
        if(selectedAtom.sym == "C"){
        selectedAtom.showCentral = currViewingState;
        }
    }
}

function LPfuncIncrement(){
      
    if(selectedAtom != null){
        
        let currViewingState = selectedAtomIncrementVar(selectedAtom.showLonePairs,2);
        
        SELECT_AtomBar.selectedAtomLonePairToggle.NewButton.style('background-image',`url('image/${SELECT_AtomBar.imageShowLPList[currViewingState]}')`);
 
        selectedAtom.showLonePairs = currViewingState;

    }
}

function selectedAtomIncrementVar(varToChange, max){
    let currViewingState = varToChange;
        if(currViewingState>=max){
            currViewingState = 0;
        }else{
            currViewingState += 1;
        }
        return currViewingState;
}

function openTextbox(){

}

function boolNotesButton(){
    //SELECT_AtomBar.
}