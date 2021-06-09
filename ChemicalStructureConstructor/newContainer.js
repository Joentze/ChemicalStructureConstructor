
class newButtonContainer{
    //will render a list of html buttons with reference to a set of coordinates
    //takes in list number of buttons and passes in their functions
    //stylised by css file 
    constructor(defaultVis,idContainer,containerClass ,attributeList, cssPresetToUseButton){
        this.visBool = false
        this.contClass = containerClass;
        this.list = attributeList;
        this.css = cssPresetToUseButton;
        this.idMain =idContainer
        //render last
        this.thisContainer = this.render()
        this.thisContainer.style.visibility = defaultVis;
    }
    //as in create
    render(){
        let divContainer = document.createElement('div')
        divContainer.setAttribute('class',this.contClass)
        divContainer.setAttribute('id',this.idMain)

        for(let currKey of Object.keys(this.list)){
            let currAttribute = this.htmlFrameButton(currKey)
            divContainer.insertAdjacentHTML('beforeend',currAttribute)
        }
        document.body.appendChild(divContainer)
        return divContainer;
    }

    htmlFrameButton(key){
        let currChar = this.list[key]
        let onclickFunc = currChar['func'] 
        let innerIcon = currChar['icon']
        let buttonHtmlStr = `<button id=${key} onclick=${onclickFunc} class=${this.css}>${innerIcon}</button>`
        return buttonHtmlStr;
    }

    //check visibility 
    checkVis(){
        if(this.visBool == false){
            this.thisContainer.style.visibility = 'hidden'
        }
        else if(this.visBool == true){
            this.thisContainer.style.visibility = 'visible'
        }
    }
}