class buttons{

    constructor(posX, posY, colorButton){
        this.posX = posX;
        this.posY = posY;
        this.colorButton = colorButton;
        this.fixedRadius = 40;
        this.fixedExpandRadius = 50;
        this.currState = false;
    }
    

    renderButton(){
        noStroke();
        fill(this.colorButton);
        if(isCursorNear(this.posX, this.posY,this.fixedRadius)){
            this.currState = true;
            this.fixedRadius = lerp(this.fixedRadius, this.fixedExpandRadius, 0.06);
            ellipse(this.posX,this.posY,this.fixedRadius, this.fixedRadius);
        }
        else{
            this.currState = false;
            this.fixedRadius = 40;
            ellipse(this.posX,this.posY, this.fixedRadius, this.fixedRadius);
        }
    }

}


function isCursorNear(getPosX, getPosY, radiusOfRound){
    return_boolean = false;
    calDist = sqrt(sq(mouseY - getPosY)+sq(mouseX - getPosX));
    if(calDist <= radiusOfRound){
        return_boolean = true;
    }
    else{
        return_boolean = false;
    }
    return return_boolean;
}