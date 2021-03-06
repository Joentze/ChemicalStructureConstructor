
class Bond{
    constructor(atomOne, atomTwo){
        //current atom classes 
        this.indexNo;
        
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
        this.bondNumber = defaultBondNo;

        //DOUBLE BOND COMBI, inner double bonds and regular double bond
        //1-regular 2-inner1 3-inner2
        this.iterDblBond = 1
        //show wedges and stuff, combi from 1-5, this is for enantiomerism 
        this.iterSingleBond = 1;

        this.DBoffset = 7
        this.TBoffset = 5

    }
    
    render(){
        //check if the cursor is within two points
        let [atom1, atom2] = this.pair;    
        this.isSelectedRender()
        this.isHoverLine = this.checkIfHover(atom1,atom2)
        let coords = this.gapMinus(14,atom1,atom2);
        this.accessCoord = coords;
        push();
        stroke(this.strokeColor);
        strokeWeight(this.strokeW);
        let [x1,y1,x2,y2] = coords
        let m = [y1-y2,x2-x1]
        let mabs = sqrt(sq(m[0])+sq(m[1]))
        let mhat = [m[0]/mabs, m[1]/mabs]
        let xoff=this.DBoffset*mhat[0]; 
        let yoff=this.DBoffset*mhat[1];
        let coords1 = [x1+xoff, y1+yoff, x2+xoff, y2+yoff]
        let coords2 = [x1-xoff, y1-yoff, x2-xoff, y2-yoff]
        if(this.bondNumber==1){
            if(this.iterSingleBond==1){
                line(...coords);
            }
            else if(this.iterSingleBond==2){
                push()
                fill(0)
                triangle(coords1[0],coords1[1],coords2[0],coords2[1],coords[2],coords[3])
                pop()
            }
            else if(this.iterSingleBond==3){
                push()
                fill(0)
                triangle(coords1[2],coords1[3],coords2[2],coords2[3],coords[0],coords[1])
                pop()
            }
            else if(this.iterSingleBond==4){
                push()
                noFill()
                triangle(coords1[0],coords1[1],coords2[0],coords2[1],coords[2],coords[3])
                pop()
            }
            else if(this.iterSingleBond==5){
                push()
                noFill()
                triangle(coords1[2],coords1[3],coords2[2],coords2[3],coords[0],coords[1])
                pop()
            }
            
        }else{ // this is so cancerous wtf
      
            if(this.bondNumber==2){

                
                if(this.iterDblBond==1){
                    line(...coords1)
                    line(...coords2)
                }
                else if(this.iterDblBond==2){
                    line(...coords)
                    line(...coords2)
                }
                else if(this.iterDblBond==3){
                    line(...coords1)
                    line(...coords)
                }
            }else if(this.bondNumber==3){
                let xoff=this.TBoffset*mhat[0]; 
                let yoff=this.TBoffset*mhat[1];
                let coords1 = [x1+xoff, y1+yoff, x2+xoff, y2+yoff]
                let coords2 = [x1-xoff, y1-yoff, x2-xoff, y2-yoff]
                line(...coords1)
                line(...coords)
                line(...coords2)
            }
        }
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
    isSelectedRender(){
        if(this.isSelected){
            push()
            strokeWeight(3)
            stroke(this.strokeColorSel)
            line(atom1.x, atom1.y,atom2.x,atom2.y )
            pop()
        }
    }
}

function iterNoBondOnClick(bondObj){
    if(bondObj.bondNumber<3){
        bondObj.bondNumber += 1;
        console.log('adding...')
    }
    else if(bondObj.bondNumber == 3){
        console.log('reducing')
        bondObj.bondNumber=1;
    }
}

function findHoverBond(){
    let allBonds = structure.bonds
    
    for(let currBond of allBonds){
        if(currBond.isHoverLine){
            iterNoBondOnClick(currBond)
            break
        }
    }
}
function iterDblBondTypeOnClick(bondObj){
    if(bondObj.bondNumber==2){
        if(bondObj.iterDblBond<3){
            bondObj.iterDblBond += 1;
        }
        else if(bondObj.iterDblBond == 3){
            bondObj.iterDblBond=1;
        }
    }
}

function adjDblBond(){
    let allBonds = structure.bonds
    
    for(let currBond of allBonds){
        if(currBond.isHoverLine){
            iterDblBondTypeOnClick(currBond)
            break
        }
    }
}

function iterSingleBondTypeOnClick(bondObj){
    if(bondObj.bondNumber==1){
        if(bondObj.iterSingleBond<5){
            bondObj.iterSingleBond += 1;
            console.log('single mingle')
        }
        else if(bondObj.iterSingleBond == 5){
            bondObj.iterSingleBond=1;
        }
    }
}

function adjSingleBond(){
    let allBonds = structure.bonds
    
    for(let currBond of allBonds){
        if(currBond.isHoverLine){
            iterSingleBondTypeOnClick(currBond)
            break
        }
    }
}

//branch seperation (l shape identification) algorithm
//decides if DOUBLE BOND is inside or outside


