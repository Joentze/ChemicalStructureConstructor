//THIS NEEDS ALOT OF WORKKKKKKKK SHITTTT
/*class AtomBar{
    constructor(x,y){
     this.posX = x;
     this.posY = y;
     this.showThis = false;
    }

    renderingElementText(AtomSelected){
        let atomSym = AtomSelected.sym;
        push();
        noStroke();
        fill(color('rgb(40,40,40)'));
        textSize(70);
        text(atomSym,this.posX,this.posY);
        pop();
        let aM = elementsArShow[atomSym]["aM"];
        let aN = elementsArShow[atomSym]["aN"];
        push();
        noStroke();
        fill(color('rgb(40,40,40)'));
        textSize(10);
        text(aM.toString(),this.posX+50,this.posY-50);
        text(aN.toString(), this.posX+50, this.posY+10);
        pop();
    }

    renderSelectionElement(){
        if(this.showThis){
            let elementBoxSelector = new selectionListCreation(elementsSymbol,changeCurrSelectedAtomElement,"selectionBoxElementsPreset" );
            elementBoxSelector.renderListSel();
        }
    }

    checkToShow(){
        if(modeClicker == 0 && selectedAtomIfAny.length>0){
            this.showThis = true;
            print("showing....")
        }
        else{
            this.showThis = false;
        }
    }
   
}

function changeCurrSelectedAtomElement() {
    let currSelect = newSelectionBoxTest.listSel;
    var getNumCovalentBonds = elementsCovalentBondCount[currSelect.value()];
    var getSymElement = elementsSymbol[currSelect.value()];
    selectedAtomIfAny[0].bNo = getNumCovalentBonds;
    selectedAtomIfAny[0].sym = getSymElement;
  }
  */