//Only one atom allowed to be selected at any time


function mousePressed(){
    if (mode==modes.EDIT){
        if(mouseButton == LEFT){
            // change selection if any atom is hovered
            let changingSelection = false;
            for (atom of structure.atoms){
                if (atom.hoverBool){
                    selectedAtom=atom;
                    changingSelection=true;
                }
            }
            // if no atom is hovered, create a new atom
            if (!changingSelection){
                newAtom = createAtom()
                if(newAtom){
                    selectedAtom=newAtom
                }
                
            }
            
        }
        else if(mouseButton == RIGHT){
            // join selected atom with currently hovered atom
            newAtom = joinAtoms()
            if(newAtom){
                selectedAtom=newAtom
            }
        }
        
        // update each atoms selectedBool and fullstate
        for(let atom of structure.atoms){
            atom.selectedBool = (atom == selectedAtom)
            atom.fullstate = atomIsFull(atom)
        }


    }
   

}


function keyPressed(){

  if(keyCode == ESCAPE){
      modeClicker = 0;
      print("clicker mode 0")
  }

}




//TO BE IMPLEMENTED!! unselects all points 
function clickedAway(currAtom, ifSelectedArr){
    currAtom.selectedBool = false;
    ifSelectedArr.pop();
}

//check if cursor is within a certain radius of selected point
function withinRadius(posX, posY, radiusRegion){
    let distance = dist(mouseX,mouseY,posX,posY) 
    return distance<=radiusRegion
    
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