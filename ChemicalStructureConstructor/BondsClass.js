
class bond{
    constructor(atomOne, atomTwo){
        //current atom classes 
        this.atomOne = atomOne;
        this.atomTwo = atomTwo;        
        
        //coordinates 
        this.firstX = atomOne.x;
        this.firstY = atomOne.y;
        this.secondX = atomTwo.x;
        this.secondY = atomTwo.y;

        

        //aesthetics of the bond rendering.
        this.strokeW = 2;
        this.strokeColor = color('rgb(40,40,40)');
        //bond selected aesthetics
        this.strokeWSel = 10;
        this.strokeColorSel = color('rgba(242, 109, 142,0.4)');
        //when cursor isHover aesthetics
        this.strokeColHov = color('rgba(100,100,100,0.4)');

        //states of the selected bond
        this.isSelected = false;
        //whether cursor xy is within atom one and two xy
        this.isWithinArea = false;
        //if hovering in line area
        this.isHoverLine = false;

        //BORDER ALLOWANCE
        this.borderAdd = 15; //3 px
        //Gradient difference tolerance
        this.gradientTolerance = 0.2;
    }
    
    renderLine(){
        //check if the cursor is within two points
        
            this.checkIfinArea();
            this.checkIfHover();
      
        push();
            stroke(this.strokeColor);
            strokeWeight(this.strokeW);
            line(this.firstX,this.firstY,this.secondX,this.secondY);
        pop();
        //is returned when clicked and isSelected becomes true
        if(this.isSelected){
            push();
                stroke(this.strokeColorSel);
                strokeWeight(this.strokeWSel);
                line(this.firstX,this.firstY,this.secondX,this.secondY);
            pop();
        }
        //is returned when cursor is hovered
        else if(this.isHoverLine){
            
            push();
                stroke(this.strokeColHov);
                strokeWeight(this.strokeWSel);
                line(this.firstX,this.firstY,this.secondX,this.secondY);
            pop();
        }
    }

    checkIfinArea(){
        var x_add_first = this.firstX; 
        var x_add_sec = this.secondX; 
        var y_add_first = this.firstY;
        var y_add_sec = this.secondY;
        
        var xCom = this.comparator(x_add_first,x_add_sec);
        var yCom = this.comparator(y_add_first,y_add_sec);

        if(mouseX >= xCom[1]&& mouseX <= xCom[0] && mouseY >= yCom[1]&& mouseY <= yCom[0]){
            //**** VERIFY THAT THIS WORKS
            //**** fix bug that cause hover highlight to stick
            if(this.atomOne.hoverBool == false && this.atomTwo.hoverBool == false){
                this.isWithinArea = true;
            }
        }
        else{
            this.isWithinArea = false;
        }
    }
    
    /*checkIfHover(){
        if(this.isWithinArea){
            var gradientOne = this.gradientCalculation(mouseY,this.firstY,mouseX,this.firstX);
            var gradientTwo = this.gradientCalculation(this.secondY, mouseY, this.secondX, mouseX);
            var absDiff = abs(gradientOne-gradientTwo);
            if(absDiff!=Infinity){
                if(absDiff>=-this.gradientTolerance && absDiff<=this.gradientTolerance){
                    this.isHoverLine = true;
                }
                else{
                    this.isHoverLine = false;
                }
            }
            else{
                var xCom = this.comparator(this.firstX,this.secondX);
                var yCom = this.comparator(this.firstY,this.secondY);
                if(mouseX >= xCom[1] && mouseX <= xCom[0] && mouseY >= yCom[1] && mouseY <= yCom[0]){
                    this.isHoverLine = true;
                }
                else{
                    this.isHoverLine = false;
                }
            }
        }
    }*/
    checkIfHover(){
        if(this.isWithinArea){
            let p1Vector = createVector(-this.firstX,-this.firstY);
            let p2Vector = createVector(this.secondX,this.secondY);
            let thisBondVector = p5.Vector.add(p1Vector,p2Vector);
            let mouseVectorFromOrigin = createVector(mouseX, mouseY);
            let mouseVectorFromP1 = p5.Vector.add(p1Vector,mouseVectorFromOrigin);
            let crossProduct = thisBondVector.cross(mouseVectorFromP1);
            var magCross = crossProduct.mag();

            if(magCross<=350){
                this.isHoverLine = true;
            }
            else{
                this.isHoverLine = false;
            }
        }
    }


    gradientCalculation(y_two, y_one, x_two, x_one){
        var num = y_two - y_one;
        var dem = x_two - x_one;
        return num/dem;
    }


    //basically returns values with the higher value being first
    comparator(firstCoord, secondCoord){
        var return_list = [];
        var diffBetween = abs(firstCoord-secondCoord);

        if(firstCoord>secondCoord && diffBetween>this.borderAdd){
            return_list[0] = firstCoord;
            return_list[1] = secondCoord;
        }
        else if(firstCoord<secondCoord && diffBetween>this.borderAdd){
            return_list[0] = secondCoord;
            return_list[1] = firstCoord;
        }
        else if(diffBetween<=this.borderAdd){
            return_list[0] = secondCoord+this.borderAdd;
            return_list[1] = firstCoord-this.borderAdd;
        }
        return return_list;
    }
}