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
//^^^^^^^
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
