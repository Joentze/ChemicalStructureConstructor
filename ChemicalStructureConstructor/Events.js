//Only one atom allowed to be selected at any time
var selectedAtomIfAny = [];


function mousePressed(){


if(modeClicker == 1){
      addingAsParent(main_branch_atoms);
}
else if(modeClicker == 0){
    mouseClickedSelectedFunc(main_branch_atoms);
}

}

function keyPressed(){

  if(keyCode == ESCAPE){
      modeClicker = 0;
      print("clicker mode 0")
  }

}


// selects atom if there arent any selected, otherwise switches between selected atoms
function mouseClickedSelectedFunc(mainBranchArray){
    for(let cnt = 0; cnt<mainBranchArray.length; cnt ++){
        currAtomClass = mainBranchArray[cnt];
        if(currAtomClass.hoverBool == true && currAtomClass.selectedBool == false){
            
            if(selectedAtomIfAny.length<=0){
                currAtomClass.selectedBool = true;
                selectedAtomIfAny[0] = currAtomClass;
                break;
            }
            else if(selectedAtomIfAny.length>0 ){
                //when there is a currently selected atom, select this
                print("doing this");
                makeSelectedAtom(currAtomClass,selectedAtomIfAny);
                break;
            }
        }
        else if(currAtomClass == selectedAtomIfAny[0]&& withinArea(currAtomClass.x, currAtomClass.y,fixed_length_bond)== true && currAtomClass.selectedBool == true){
            //triggered when an already selected point is clicked on 
            //ADD SUB BRANCHES

            addingMainSubBranches(selectedAtomIfAny[0]);
            print("adding");
        }
        currAtomClass.checkIfSubBranchSelected(currAtomClass.subBranches);
    }
}



//switches between selected points
function makeSelectedAtom(currAtom, ifSelectedArr){
    currAtom.selectedBool = true;
    ifSelectedArr[0].selectedBool = false;
    ifSelectedArr.pop();
    ifSelectedArr[0] = currAtom;
}

//TO BE IMPLEMENTED!! unselects all points 
function clickedAway(currAtom, ifSelectedArr){
    currAtom.selectedBool = false;
    ifSelectedArr.pop();
}

//Check if cursor is drawing on an existing point
function checkIfHover(main_branch_atoms){
    var returnBool = false;
    for(let cnt = 0; cnt< main_branch_atoms.length; cnt++){
        //print(main_branch_atoms[cnt].hoverBool);
        if(main_branch_atoms[cnt].hoverBool){
            returnBool = true;
            break;
        }
        else{
            returnBool = false;
        }
    }
    return returnBool;
}

function withinArea(posX, posY, radiusRegion){
    var return_bool = false;
    var calDist = sqrt(sq(mouseY-posY)+sq(mouseX-posX));
    if(calDist<=radiusRegion){
        return_bool = true;
    }
    else{
        return_bool = false;
    }
    return return_bool;
}