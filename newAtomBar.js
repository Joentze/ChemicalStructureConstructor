class newAtomBar{
    constructor(x, y, defaultVisibility, id){
        this.x = x;
        this.y = y;
        this.vis = defaultVisibility
        this.id = id
        this.htmlBarContainer = `<div class='atomBarContainer' id='${id}'>
                                 <div id="selectText" class="subAtomBarBox"></div>
                                 <div id="interactionBox class="subAtomBarBox">
                                 <div id="atomBarSelect">
                                 <select id="atomBarSelectTag" onchange='atomBarSelectChange(this)' onmouseover='makeTrue()' onmouseout='makeFalse()'></select>
                                 </div>
                                 <div id="atomBarButtonContainer">
                                 <button class='atomBarButton' onmouseover='makeTrue()' onmouseout='makeFalse()'></button>
                                 <button class='atomBarButton' onmouseover='makeTrue()' onmouseout='makeFalse()'></button>
                                 </div>
                                 </div>
                                </div>`
    }
}

function atomBarSelectChange(el){

}