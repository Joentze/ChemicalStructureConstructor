//simply draws the lines between atoms
function joinLineDraw(currAtom, nextAtom){
    push();
    noFill();
    stroke(200);
    strokeWeight(5);
    line(currAtom.x,currAtom.y,nextAtom.x,nextAtom.y);
    pop();
}

//* rendering of atoms in the function draw. this is takes the atoms on the main branch and draws them in succession
function drawMainStructure(mainBranchArray, main_bonds){
    var maxLength = mainBranchArray.length;
    for(let count = 0; count<maxLength; count++){
        var currAtom = mainBranchArray[count];
        if(count>0){
            main_bonds[count-1].renderLine();
        }
        currAtom.renderAtom();
    }

}

//this function adds a subbranch atom to the selected atom (via the mouseClickedSelectedFunc()) and assigns the
// selected atom as a parent atom in the subbranch atom class object.
//*** to add into the mouseClickedSelectedFunc!!!!!!!
function addingMainSubBranches(currSelectedAtom){
    //if the current selected atom is not full
    //print(currSelectedAtom);
    //print(currSelectedAtom.fullState);
    if(!currSelectedAtom.fullState){
        //28/03/21 - change the mouseX and mouseY coordinates to selected coordinates
        var fixedX = calculateNextPointFixLen(fixed_length_bond,"X",currSelectedAtom);
        print(fixedX);
        var fixedY = calculateNextPointFixLen(fixed_length_bond,"Y",currSelectedAtom);
        print(fixedY);
        var thisNewAtom = new atoms(currSelectedAtom.x+fixedX, currSelectedAtom.y+fixedY, 4);
        currSelectedAtom.addBranch(thisNewAtom, currSelectedAtom);
        var currIndexSubBranchAtom = thisNewAtom.parentAtoms.length;
        thisNewAtom.parentAtoms[currIndexSubBranchAtom] = currSelectedAtom;
        print(thisNewAtom.parentAtoms);
        print(currSelectedAtom.subBranches);
    }
   
}

// adding atoms to the main branch
function addingAsParent(main_branch_atoms){
   
    if(main_branch_atoms.length <= 0){
        main_branch_atoms[main_branch_atoms.length] = new atoms(mouseX, mouseY, 4);
    }
    else if(main_branch_atoms.length>0){

        if(!checkIfHover(main_branch_atoms)){
       
            var currLen = main_branch_atoms.length;
            //28/03/21 - change the mouseX and mouseY coordinates to selected coordinates
            // this gets the fixed angled bonds
            var getNewX = calculateNextPointFixLen(fixed_length_bond,"X",main_branch_atoms[currLen-1]);
            var getNewY = calculateNextPointFixLen(fixed_length_bond,"Y",main_branch_atoms[currLen-1]);

            //this adds the new atom within the respective length
            main_branch_atoms[currLen] = new atoms(main_branch_atoms[currLen-1].x+getNewX, main_branch_atoms[currLen-1].y+getNewY, 4);
            
            var currAtomParentArr = main_branch_atoms[currLen].parentAtoms;
            var currAtomParArrLen = currAtomParentArr.length;
            
            currAtomParentArr[currAtomParArrLen] = main_branch_atoms[currLen-1];

            var prevAtomParentLength = main_branch_atoms[currLen-1].parentAtoms.length;
            main_branch_atoms[currLen-1].parentAtoms[prevAtomParentLength] = main_branch_atoms[currLen];
            addingBonds(main_branch_atoms, currLen);
           
            //adds second atom of main branch to be first atoms co parent
            if(main_branch_atoms[currLen-1].parentAtoms.length == 0){
                var tempArray = main_branch_atoms[currLen-1].parentAtoms;
                tempArray[0] = main_branch_atoms[currLen];
                print("adding parents of first atom")

        }
        }
    }

}

function addingBonds(main_branch_atoms, currLen){
    firstAtom = main_branch_atoms[currLen - 1];
    secondAtom = main_branch_atoms[currLen];
    bondArrLen = main_bonds.length;
    main_bonds[bondArrLen] = new bond(firstAtom, secondAtom);
}