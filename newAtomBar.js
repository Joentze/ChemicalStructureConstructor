class newAtomBar{
    constructor(x, y, defaultVisibility, id, lists){
        this.x = x;
        this.y = y;
        this.vis = defaultVisibility
        this.id = id
        this.lists = lists
        this.optionsSelect = this.initSelect(lists)
        this.htmlBarContainer = `<div class='atomBarContainer' id='${this.id}'>
                                 <div id="selectText" class="subAtomBarBox"></div>
                                 <div id="interactionBox class="subAtomBarBox">
                                 <div id="atomBarSelect">
                                 <select id="atomBarSelectTag" onchange='atomBarSelectChange(this)' onmouseover='makeTrue()' onmouseout='makeFalse()'>
                                 ${this.lists}
                                 </select>
                                 </div>
                                 <div id="atomBarButtonContainer">
                                 <button class='atomBarButton' onmouseover='makeTrue()' onmouseout='makeFalse()'></button>
                                 <button class='atomBarButton' onmouseover='makeTrue()' onmouseout='makeFalse()'></button>
                                 </div>
                                 </div>
                                </div>`
    }
    //injects options into html select tag
    initSelect(dict){
        let keys = Object.keys(dict)
        let returnString = ""
        for(let key of keys){
            let optionString = `<option value='${key}'>${key}</option>`
            returnString +=optionString
        }
        return returnString
    }
}

function atomBarSelectChange(el){
    
    let selectValue = el.value
    let bNo = elementsCovalentBondCount[selectValue]
    let currNoOfBonds = structure.adjList.get(selectedAtom).length
    let typeOutElement = document.getElementById('typeOutElementText')

    if(currNoOfBonds>bNo){
        alert(`Can't convert to ${selectValue}. Too many bonds`)
    }
    else{
    
        selectedAtom.sym = elementsSymbol[selectValue];
        selectedAtom.bNo = elementsCovalentBondCount[selectValue];
        selectedAtom.printSym = elementsSymbol[selectValue];
    
        if(currValue!="Type Out ⌨️"){
            selectedAtom.element = objName;
            typeOutElement.style.visibility = 'hidden';
        }
        else{
            typeOutElement.style.visibility = 'visible';
        }
    }
}