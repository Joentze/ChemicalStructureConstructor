
class AtomBar{
    constructor(x,y){
        this.imageShowCentralList = ["showCentralPresetThree.svg","showCentralPresetTwo.svg","showCentralPresetOne.svg"];
        this.posX = x;
        this.posY = y;
        this.showThis = false;
        this.className = "selectionBoxElementsPreset";
        this.elementBoxSelector = new selectionListCreation(elementsSymbol,changeCurrSelectedAtomElement,this.className);
        this.selectedAtomCentralToggle = new buttonCreation("toggleMainButtonPreset",funcIncrement, "","toggleButtonPreset");
        this.selectedAtomCentralToggle.visibility = this.visibility;
        
       
        //this.selectedAtomLonePairToggle = new buttonCreation("",)
        this.prevAtom;
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
 
           if(this.prevAtom!=selectedAtom){

            let getIndex = Object.keys(elementsCovalentBondCount);
            document.getElementsByClassName(this.className)[0].selectedIndex = getIndex.indexOf(selectedAtom.element);
            this.changeIconCentralAtom(selectedAtom);
            this.prevAtom = selectedAtom;
           }
    }


    //SHOWS AND CHANGES THE STATES OF THE ATOM SELECTED
    renderShowCentral(selectedAtom){
        this.selectedAtomCentralToggle.visibility = this.visibility;
        this.selectedAtomCentralToggle.renderButton();
        //this.selectedAtomCentralToggle.NewButton.style('background-image',`url('image/${this.imageShowCentralList[0]}')`);
        
    }

    changeIconCentralAtom(selectedAtom){
        this.selectedAtomCentralToggle.NewButton.style('background-image',`url('image/${this.imageShowCentralList[selectedAtom.showCentral]}')`);
    }

    renderLonePairs(selectedAtom){

    }

    renderAtomBar(selectedAtom){
        
        if(selectedAtom!=null){

        this.renderSelectionElement(selectedAtom);
         this.renderShowCentral(selectedAtom);
        
        }
        if(mode == modes.SELECT && selectedAtom!=null){
        this.renderingElementText(selectedAtom);
       
       
    }
     
    
    
}
}


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
  
  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }


 function funcIncrement(){
      
    if(selectedAtom != null){
        
        let currViewingState = selectedAtom.showCentral;

        if(currViewingState>=2){
            currViewingState = 0;
            
        }else{
            currViewingState += 1;

        }
        
        SELECT_AtomBar.selectedAtomCentralToggle.NewButton.style('background-image',`url('image/${SELECT_AtomBar.imageShowCentralList[currViewingState]}')`);
        selectedAtom.showCentral = currViewingState;
    }
}