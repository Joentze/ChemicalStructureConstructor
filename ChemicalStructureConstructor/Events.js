//Only one atom allowed to be selected at any time
var selectedAtomIfAny = [];


function mousePressed(){


if(modeClicker == 1 && mouseButton == LEFT){
   
    addingAsParent(main_branch_atoms);
}
else if(modeClicker == 0 && mouseButton == LEFT){
    mouseClickedSelectedFunc(main_branch_atoms);
}
else if(modeClicker == 0 && mouseButton == RIGHT){
    //launchSelectionsBox();
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
        else if(currAtomClass == selectedAtomIfAny[0]&& withinArea(currAtomClass.x, currAtomClass.y,2*fixed_length_bond)== true && currAtomClass.selectedBool == true){
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

//check if cursor is within a certain radius of selected point
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

//to disable the regular right click menu
/*
function newMenuFormation(atomSelectionArray){
    if (document.addEventListener) {
        document.addEventListener('contextmenu', function(e) {
          //alert("You've tried to open context menu"); //here you draw your own menu
        if(atomSelectionArray.length>0){
            var currAtom = atomSelectionArray[0];
            var currSelectionTable = new selectionListCreation(currAtom.x,currAtom.y + 15,elementsCovalentBondCount,testSelection,"selectionBoxPreset")
            currSelectionTable.renderListSel();
        }
          e.preventDefault();
        }, false);
      } else {
        document.attachEvent('oncontextmenu', function() {
          alert("You've tried to open context menu");
          window.event.returnValue = false;
        });
      }
}*/
window.addEventListener('contextmenu', function (e) { 
    // do something here... 
    e.preventDefault(); 
  }, false);


function clearSelectedAtom(selectedAtomIfAny){

    if(selectedAtomIfAny.length==1){
        var selectedAtom = selectedAtomIfAny[0];
        selectedAtom.selectedBool = false;
        selectedAtomIfAny.pop();
        console.log("is clearing...")
    }
}