
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
        this.accessCoord;
        //whether cursor xy is within atom one and two xy
        // this.isWithinArea = false;

        //if hovering in line area
        this.isHoverLine = false;

        //BORDER ALLOWANCE
        this.borderAdd = 15; //3 px

        this.moreThanOneBond = false;
        //number of covalent bond...1/2/3
        this.bondNumber = 1;


    }
    
    render(){
        //check if the cursor is within two points
        let [atom1, atom2] = this.pair;    

        this.isHoverLine = this.checkIfHover(atom1,atom2)
        let coords = this.gapMinus(20,atom1,atom2);
        this.accessCoord = coords;
        //let DBCoords = this.getOffsetDblBond(atom1,atom2);
        //console.log(DBCoords);
        //let set1 = subset(DBCoords,0,4);
        //let set2 = subset(DBCoords,4,4);
        push();
        stroke(this.strokeColor);
        strokeWeight(this.strokeW);
        line(...coords);
        //testDoubleBond
        //console.log(set1)
        //line(...set1);
        //line(...set2);
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

    getGradient(x1,y1,x2,y2){
        let num = y2-y1
        let den = x2-x1
        return num/den
    }

//must make sure that there can be double bond lol 
//refer to google drive brainstorm file kekw
    getBaseCoordinates(atom1, atom2){
        let oneX1, oneY1
        let twoX1, twoY1
        let getAdjAtom1 = structure.adjList.get(atom1)
        if(getAdjAtom1.length == 1){
            atom1.isGapNeeded,atom2.isGapNeeded = true;
            let coords = this.gapMinus(10,atom1,atom2);
            let gradientBond = this.getGradient(...coords);
            if(gradientBond == Infinity){
                return [coords[0]+10,coords[1],coords[2]+10,coords[3],coords[0]-10,coords[1],coords[2]-10,coords[3]]
            }
            else{
                
            }
        }
        else if(getAdjAtom1.length == 2){
            getAdjAtom1.pop(atom2);
            [oneX1,oneY1] = calculateNextPointFixLen(20,atom1,getAdjAtom1[0].x,getAdjAtom1[0].y)
            return [oneX1,oneY1] 
        }else if(getAdjAtom1.length == 3){
            getAdjAtom1.pop(atom2)
            [oneX1,oneY1] = calculateNextPointFixLen(20,atom1,getAdjAtom1[0].x,getAdjAtom1[0].y)
            [twoX1,twoY1] = calculateNextPointFixLen(20,atom1,getAdjAtom1[1].x,getAdjAtom1[1].y)
            return [oneX1,oneY1,twoX1,twoY1];
        }
        
    
    }

    getOffsetDblBond(atom1,atom2){

        let returnArray = [];
        atom1.isGapNeeded,atom2.isGapNeeded = true;
        let coords = this.gapMinus(10,atom1,atom2);
        let gradientBond = this.getGradient(...coords);
        if(gradientBond == Infinity){
            return [coords[0]+10,coords[1],coords[2]+10,coords[3],coords[0]-10,coords[1],coords[2]-10,coords[3]]
        }
        else if(gradientBond == 0){
            return [coords[0],coords[1]+10,coords[2],coords[3]+10,coords[0],coords[1]-10,coords[2],coords[3]-10]
        }
        else{
            console.log(coords);
returnArray = concat(returnArray,this.newXYOffsetCal(10,gradientBond,coords[0],coords[1]))
returnArray = concat(returnArray,this.newXYOffsetCal(10,gradientBond,coords[2],coords[3]))
returnArray = concat(returnArray,this.newXYOffsetCal(-10,gradientBond,coords[0],coords[1]))
returnArray = concat(returnArray,this.newXYOffsetCal(-10,gradientBond,coords[2],coords[3]))
            
        }
        return returnArray    
    }

    newXYOffsetCal(constant, gradient, x, y){
        let newY = y + constant;
        let newX = x
        return [newX, newY]
    }
}