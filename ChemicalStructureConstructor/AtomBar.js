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
        this.elementBoxSelector = new selectionListCreation(elementsSymbol,changeCurrSelectedAtomElement,'atomBarSelectID',this.className);
        this.selectedAtomCentralToggle = new buttonCreation("toggleMainButtonPreset",ElementfuncIncrement, "","toggleButtonPreset");
        this.selectedAtomLonePairToggle = new buttonCreation("toggleMainButtonPreset",LPfuncIncrement,"","LPtoggleButtonPreset");
        this.notesButton = new buttonCreation("toggleMainButtonPreset",openTextbox,"","textBoxOpenPreset");
        this.ElementText(selectedAtom);      
        this.typeOutElement();
        this.el2 = document.getElementById('typeOutElementText')
        //assign visibility
        this.notesButton.visibility,this.selectedAtomCentralToggle.visibility, this.selectedAtomLonePairToggle.visibility = this.visibility;

        //keeps record of previous atom
        this.prevAtom;
        this.prevAtomElement;

        //current visibility of atom bar
        this.visibility = false;
        
    }

    //RENDERS THE TEXT AT TOP LEFT CORNER DURING SELECT MODE
    ElementText(){

        let textDiv = document.createElement('div')
        textDiv.setAttribute('class', 'ElementText')
        textDiv.setAttribute('id', 'ElementTextDiv')
        textDiv.style.visibility = 'hidden';
        let h1SymInnerHtml = `<h1 id = "atomBarElementText"></h1>`
        textDiv.insertAdjacentHTML('afterbegin',h1SymInnerHtml)
        document.body.appendChild(textDiv);
    }

    typeOutElement(){
        let divHolder = document.createElement('div')
        divHolder.setAttribute('id','typeOutDivHolder')
        let textAreaForSym = document.createElement('textarea');
        textAreaForSym.setAttribute('id','typeOutElementText')
        textAreaForSym.setAttribute('onmouseover','makeTrue()')
        textAreaForSym.setAttribute('onmouseout','makeFalse()')
        textAreaForSym.setAttribute('rows','1')
        textAreaForSym.setAttribute('maxlength','20')
        textAreaForSym.setAttribute('onkeyup','updateAtomPrintText(this)')
        textAreaForSym.setAttribute('placeholder','type group')
        textAreaForSym.style.visibility = 'hidden';
        
        divHolder.appendChild(textAreaForSym);
        document.body.appendChild(divHolder);
        

    }


    checkVisElText(){
        let el = document.getElementById('ElementTextDiv')
        
        if(mode == modes.SELECT){
            el.style.visibility = 'visible'
            
        }
        else if(mode == modes.EDIT){
            el.style.visibility = 'hidden'
            
        }
    }

    updateElementText(selectedAtom){
        let component = document.getElementById('atomBarElementText')
        component.innerHTML = "";
        component.insertAdjacentHTML('afterbegin',selectedAtom.sym);
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
            
            if(selectedAtom.atomNotePad != null){
            selectedAtom.atomNotePad.checkVisOfTextArea();  
            }
            if(selectedAtom.sym == '--Type Out--'){
            
            }
        }
        
        this.elementBoxSelector.checkVis();    
        this.checkVisElText();
}

//CHECKS FOR A CHANGE IN THE ATOM SELECTED AND EXECUTE FUNCTIONS ACCORDINGLY.
checkForChangeExec(){
    if(this.prevAtom!=selectedAtom){
        let getIndex = Object.keys(elementsCovalentBondCount);
        document.getElementById('mainElementSelect').selectedIndex = getIndex.indexOf(selectedAtom.element);
        this.changeIconCentralAtom(selectedAtom,this.selectedAtomCentralToggle,this.imageShowCentralList, selectedAtom.showCentral);
        this.changeIconCentralAtom(selectedAtom,this.selectedAtomLonePairToggle,this.imageShowLPList, selectedAtom.showLonePairs);
        this.updateElementText(selectedAtom)
        
        if(selectedAtom.element=='--Type Out--' && mode == modes.SELECT){
            this.el2.innerHTML = selectedAtom.sym;
            this.el2.style.visibility = 'visible'
        }
        else{
            this.el2.style.visibility = 'hidden'
        }
        this.prevAtom = selectedAtom;
        this.prevAtomElement = selectedAtom.element;
        this.notesButton.buttonState = false;
        
        

       }
    else if(this.prevAtom == selectedAtom && selectedAtom.element != this.prevAtomElement){
        this.changeIconCentralAtom(selectedAtom,this.selectedAtomCentralToggle,this.imageShowCentralList, selectedAtom.showCentral);
        this.updateElementText(selectedAtom)
        this.prevAtomElement = selectedAtom.element;
    }
    else if(this.prevAtom == selectedAtom){
        if(selectedAtom.element =='--Type Out--' && mode == modes.SELECT){
            this.el2.innerHTML = selectedAtom.sym;
            this.el2.style.visibility = 'visible'
        }
        else{
            this.el2.style.visibility = 'hidden'
        }
    }

    
}




}



//CHECKS FOR "OVER BONDING"
function changeCurrSelectedAtomElement() {
  
    var currValue = document.getElementsByClassName("selectionBoxElementsPreset")[0].selectedIndex;
    let objName = Object.keys(elementsSymbol)[currValue]
    let bNo = elementsCovalentBondCount[objName];
    let currNumBonds = structure.adjList.get(selectedAtom).length
    let el2 = document.getElementById('typeOutElementText')
    if (currNumBonds>bNo){
        alert(`Can't convert to ${objName}. Too many bonds`)
    }else{
        
        if(currValue!="--Type Out--"){
            selectedAtom.sym = elementsSymbol[objName];
            selectedAtom.printSym = elementsSymbol[objName];
            selectedAtom.bNo = elementsCovalentBondCount[objName];
            selectedAtom.element = objName;
            el2.style.visibility = 'hidden';
        }
        else{
            el2.style.visibility = 'visible';
            
            selectedAtom.sym = elementsSymbol[objName];
            selectedAtom.bNo = elementsCovalentBondCount[objName];
            selectedAtom.printSym = elementsSymbol[objName];
            
        }
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
    if(selectedAtom!=null && mode == modes.SELECT){
        let note = selectedAtom.atomNotePad;
        if(note == null){

            selectedAtom.atomNotePad = new createTextArea("TextAreaPreset");
            selectedAtom.atomNotePad.visibility = true;
            selectedAtom.atomNotePad.createTextArea.style.top = `${selectedAtom.y}px`;
            selectedAtom.atomNotePad.createTextArea.style.left = `${selectedAtom.x}px`;

        }
        else if(note!=null){
            let boolButton = toggleButton(SELECT_AtomBar.notesButton);
            if(boolButton){
                console.log("changing....");
                note.visibility = true;
            }
            else if(!boolButton){
                note.visibility = false;
            }
        }
    }
}

function toggleButton(buttonClass){
    //SELECT_AtomBar.
    if(buttonClass.buttonState == false){
        buttonClass.buttonState = true;
    }
    else if(buttonClass.buttonState == true){
        buttonClass.buttonState = false;
    }

    return buttonClass.buttonState;
}


function updateAtomPrintText(element){
    //this is janky af but its the only thing that works with the p5js text canvas drawing thing
    let unicodeDictionary={
        0:'\u2080',1:'\u2081',2:'\u2082',3:'\u2083',4:'\u2084',5:'\u2085',6:'\u2086',7:'\u2087',8:'\u2088',9:'\u2089'
    }
    let returnString = ""
    for(let currChar of element.value){
        let getInt  = Number(currChar);
        if(isNaN(getInt)){
            returnString += currChar
        }
        else if(!isNaN(getInt)){
            returnString += unicodeDictionary[getInt]
        }
}
selectedAtom.printSym = returnString;
}
