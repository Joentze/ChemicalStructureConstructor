

// Pointstick is a class that shows a point for each new x y for the diagram
// it gets highlighted if the cursor goes closed and is able to manipulate the coordinates 
// of the points

function pointStickAssignment(lastValue, coordX, coordY, radiusH){
    
    //adds to object array pointHighlight
    pointHighlight[lastValue] = new pointStick(coordX, coordY, radiusH);
  }

class pointStick{

    constructor(coordX, coordY, radiusTouch){
        this.x = coordX;
        this.y = coordY;
        this.radiusH = radiusTouch;
        this.returnExpandLoop = 10;
        this.return_boolean = false;
    }

        renderPt(){
            
            var distCal = sqrt(sq(this.y - mouseY)+sq(this.x - mouseX));
            if(distCal<=this.radiusH){
                this.return_boolean = true; 
            }
            else{
                this.return_boolean = false;
            }

        if(this.return_boolean && this.x != returnArray_X[returnArray_X.length-1] && this.y != returnArray_Y[returnArray_Y.length-1] && modeClicker ==1){
            noFill();
            stroke(color('rgb(2, 76, 173)'));
            strokeWeight(0.8);
            this.returnExpandLoop = lerp(this.returnExpandLoop, this.radiusH, 0.08)
            ellipse(this.x, this.y, this.returnExpandLoop, this.returnExpandLoop);
        }
        else if(this.return_boolean && modeClicker !=1){
            noFill();
            stroke(color('rgb(2, 76, 173)'));
            strokeWeight(0.8);
            this.returnExpandLoop = lerp(this.returnExpandLoop, this.radiusH, 0.08)
            ellipse(this.x, this.y, this.returnExpandLoop, this.returnExpandLoop);            
        }
        else{
            fill(40);
            noStroke();
            this.returnExpandLoop = 10;
            ellipse(this.x,this.y,this.returnExpandLoop, this.returnExpandLoop);
        }
    }
}

