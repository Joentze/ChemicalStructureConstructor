//THIS NEEDS ALOT OF WORKKKKKKKK SHITTTT
class AtomBar{
    constructor(x,y){
        this.posX = x;
        this.posY = y;
        this.showThis = false;
        this.className = "selectionBoxElementsPreset";
        this.elementBoxSelector = new selectionListCreation(elementsSymbol,changeCurrSelectedAtomElement,this.className);
        this.prevAtom;
    }

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

    renderSelectionElement(selectedAtom){
           this.elementBoxSelector.renderListSel();
           if(this.prevAtom!=selectedAtom){
            let getIndex = Object.keys(elementsCovalentBondCount);
            document.getElementsByClassName(this.className)[0].selectedIndex = getIndex.indexOf(selectedAtom.element) ;
            this.prevAtom = selectedAtom

           }
    }

    renderAtomBar(selectedAtom){
        this.renderingElementText(selectedAtom);
        this.renderSelectionElement(selectedAtom);
    }
   
}

function changeCurrSelectedAtomElement() {

}

  
  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }