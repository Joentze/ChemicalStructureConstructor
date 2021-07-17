

class newAtomBar{
    constructor(x, y, defaultVisibility, id, lists){
        this.x = x;
        this.y = y;
        this.vis = defaultVisibility
        this.id = id
        this.lists = lists
        this.prevAtom;
        this.optionsSelect = this.initSelect(lists)
        this.htmlBarContainer = `<div class='atomBarContainer' id='${this.id}'>
                                <h1 id = "atomBarElementText"></h1>
                                 <div id="selectText" class="subAtomBarBox"></div>
                                 <div id="interactionBox class="subAtomBarBox">
                                 <div id="atomBarSelect">
                                 <select id="atomBarSelectTag" onchange='atomBarSelectChange(this)' onmouseover='makeTrue()' onmouseout='makeFalse()'>
                                 ${this.initSelect(this.lists)}
                                 </select>
                                 </div>
                                 <div id="atomBarButtonContainer">
                                 <button class='atomBarButton' onmouseover='makeTrue()' onmouseout='makeFalse()'></button>
                                 <button class='atomBarButton' onmouseover='makeTrue()' onmouseout='makeFalse()'></button>
                                 </div>
                                 </div>
                                </div>`
        this.initAtomBar(this.x, this.y, this.id, this.htmlBarContainer)
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

    //updates elementText
    updateElementText(selectedAtom){
        let component = document.getElementById('atomBarElementText')
        component.innerHTML = "";
        component.insertAdjacentHTML('afterbegin',selectedAtom.sym);
    }

    //assign x y coordinates for atom bar
    pegContainerToCoordinates(id, x, y){
        let container = document.getElementById(id)
        container.style.left = `${x}px`
        container.style.top = `${y}px`
        container.style.visibility = this.vis
    }

    //adds html of atom bar to html body
    injectHTMLString(htmlString){
        document.body.insertAdjacentHTML('beforeend',htmlString)
    }

    //on selected atom change
    onAtomChange(){
        if(this.prevAtom != selectedAtom){
            
            this.updateElementText(selectedAtom)
            this.prevAtom = selectedAtom
        }
    }

    //check visibility of atom bar
    checkVis(){
        if(mode == modes.SELECT){
            document.getElementById(this.id).style.visibility = 'visible'
        }
        else if(mode == modes.EDIT){
            document.getElementById(this.id).style.visibility = 'hidden'
        }
    }

    //init atombar
    initAtomBar(x, y, id, htmlString){
        this.injectHTMLString(htmlString)
        this.pegContainerToCoordinates(id,x,y)
    }

    //render
    render(){
        if(selectedAtom!=null){
            this.onAtomChange()
            this.checkVis()
        }
    }

}

function atomBarSelectChange(el){    
    if(mode==modes.SELECT){
        
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
}