class Atom{
    // **** New variable in construtor shows the name of the element
    constructor(posX, posY, noOfBranches, SymbolOfElement){

        //position of the atom
        this.x = posX;
        this.y = posY;
        this.targetX = this.x;
        this.targetY = this.y;

        //for testing
        this.sym = SymbolOfElement;
        this.element =  getKeyByValue(elementsSymbol, this.sym);
        //the total number of total covalent bonds that can be formed
        this.bNo = noOfBranches;
             
        //to see if the branch is fully filled
        this.fullState = false;

        //color of the rendered atom
        this.colorOfAtom = color(40);

        //radius of rendered atom 
        this.radiusA = 10;

        //expanded radius for atom 
        this.radiusB = 20;

        //is the atom selected
        this.selectedBool = false;

        //check if cursor is hovering over the atom 
        this.hoverBool = false;


        //selection bubble for right click select
        this.selectionTable;

        //if atom is not carbon leave gap for the text
        this.isGapNeeded = false;

        //render in select mode
        this.showLonePairs = 0;

        //1-show carbon sym, 2-show skeletal, 0-show node.
        this.showCentral = 0;
    }

    //draws the atom
    render(){
        this.updatePos()
        this.isAtomCarbon();
        // this.checkIfFullState();
            if(this.isGapNeeded == false && this.showCentral == 0){
                if(this.selectedBool){
                   this.RSelected();
                }
                else{
                    push();
                    noStroke();
                    fill(this.colorOfAtom);
                    var currRadiusSize = this.CursorNearExpand();
                    ellipse(this.x, this.y, currRadiusSize, currRadiusSize);
                    pop();
                }
            }
            else if(this.isGapNeeded==true){
                this.RShowText();
            }
            else if(this.isGapNeeded == false && this.showCentral == 1){
                this.isGapNeeded = true;
                this.RShowText();
            }
            else if(this.isGapNeeded==false && this.showCentral == 2){
                if(this.selectedBool){
                    this.RSelected();
                }
                else{
                    push();
                    noStroke();
                    fill(this.colorOfAtom);
                    var currRadiusSize = this.CursorNearExpand();
                    //ellipse(this.x, this.y, currRadiusSize, currRadiusSize);
                    pop();
                }
            }
        //checks if the atom is fully bonded
        // this.checkIfFullState();
    }

    setPos(x,y){
        this.x = x;
        this.targetX = x;
        this.y = y;
        this.targetY = y;
    }

    updatePos(){
        const d = 1
        this.x = lerp(this.x, this.targetX, 0.05);
        this.y = lerp(this.y, this.targetY, 0.05);
    }

    RSelected(){
        push();
        this.CursorNearExpand();
        strokeWeight(0.3);
        stroke(color('rgb(150, 30,30)'));
        fill(color('rgba(232, 134, 121,0.5)'));
        ellipse(this.x, this.y, this.radiusB, this.radiusB);
        pop();
    }

    RShowText(){
        push();
        this.CursorNearExpand();
        textAlign(CENTER);
        textFont('Arial');
        textSize(18);
        text(this.sym,this.x,this.y+1);
        pop();
    }
    
    // implements lerp for when the cursor is near the atom 
    CursorNearExpand(){
        var calDist = sqrt(sq(mouseY - this.y)+sq(mouseX - this.x));
        var return_radius = this.radiusA;
        if(calDist<=this.radiusA){
            this.radiusA = lerp(this.radiusA, this.radiusB, 0.05);
            return_radius = this.radiusA;
            this.hoverBool = true;
        }
        else{
            this.radiusA = lerp(this.radiusA, 10, 0.1);
            return_radius = this.radiusA;
            this.hoverBool = false;
        }
        return return_radius;
    }


    isAtomCarbon(){
        if(this.sym =="C"){
            this.isGapNeeded = false;
        }
        else{
            this.isGapNeeded = true;
        }
    }
}