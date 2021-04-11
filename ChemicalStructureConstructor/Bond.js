
class Bond{
    constructor(atomOne, atomTwo){
        //current atom classes 
       
        
        this.pair = [atomOne,atomTwo]


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
        // this.isWithinArea = false;

        //if hovering in line area
        this.isHoverLine = false;

        //BORDER ALLOWANCE
        this.borderAdd = 15; //3 px

    }
    
    render(){
        //check if the cursor is within two points
        let [atom1, atom2] = this.pair;    

        this.isHoverLine = this.checkIfHover(atom1,atom2)
        let coords = this.gapMinus(20,atom1,atom2);
        push();
        stroke(this.strokeColor);
        strokeWeight(this.strokeW);
        line(...coords);
        pop();
     
        //is returned when cursor is hovered
        if(this.isHoverLine){
            push();
            stroke(this.strokeColHov);
            strokeWeight(this.strokeWSel);
            line(...coords);
            pop();
        }
    }

    checkIfinArea(atom1,atom2){
        let minX = min(atom1.x,atom2.x)
        let maxX = max(atom1.x,atom2.x)
        let minY = min(atom1.y,atom2.y)
        let maxY = max(atom1.y,atom2.y)
       
        return ((minX<mouseX && mouseX<maxX) && (minY<mouseY && mouseY<maxY))
    }
    
    checkIfHover(atom1,atom2){            

        if (this.checkIfinArea(atom1,atom2)){
            let crossProduct = ((mouseX-atom1.x)*(atom2.y-atom1.y) - (mouseY-atom1.y)*(atom2.x-atom1.x))
            let distance = dist(atom1.x,atom1.y,atom2.x,atom2.y)
            let perpDist = Infinity
            if(distance>0){
                perpDist = abs(crossProduct)/distance
                
            }
            return perpDist < 10
        }
        return false
    }
    

    gapMinus(radiusClear, atom1, atom2){
        let x1,y1,x2,y2;
        if(atom1.isGapNeeded){
            [x1,y1] = calculateNextPointFixLen(radiusClear,atom1,atom2.x,atom2.y);
        }
        else{
            x1 = atom1.x;
            y1 = atom1.y;
        }
        if(atom2.isGapNeeded){
            [x2,y2] = calculateNextPointFixLen(radiusClear,atom2,atom1.x,atom1.y);
        }
        else{
            x2 = atom2.x;
            y2 = atom2.y;
        }
        return [x1,y1,x2,y2];
    }
}