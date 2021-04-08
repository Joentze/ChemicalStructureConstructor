//* rendering of atoms in the function draw. this is takes the atoms on the main branch and draws them in succession
function drawMainStructure(mainBranchArray, main_bonds){
    var maxLength = mainBranchArray.length;
    for(let count = 0; count<maxLength; count++){
        var currAtom = mainBranchArray[count];
        if(count>0){
            //renders bonds between atoms
            main_bonds[count-1].renderLine();
        }
        //renders all atoms in the main branch 
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
        
        //returns the fixed length bonds 
        let {x,y} = calculateNextPointFixLen(fixed_length_bond,currSelectedAtom);
        
        //adds new atom under the sub branches of the main branch atom
        var thisNewAtom = new atoms(currSelectedAtom.x+x, currSelectedAtom.y+y, currElement);
        currSelectedAtom.addBranch(thisNewAtom, currSelectedAtom);
        
        //adds the main branch atom as a parent atom
        var currIndexSubBranchAtom = thisNewAtom.parentAtoms.length;
        thisNewAtom.parentAtoms[currIndexSubBranchAtom] = currSelectedAtom;
    }
   
}

// adding atoms to the main branch
function addingAsParent(main_branch_atoms){
    
   if(buttonHighlight == false){
    if(main_branch_atoms.length <= 0){
        main_branch_atoms[main_branch_atoms.length] = new atoms(mouseX, mouseY, currElement);
    }
    else if(main_branch_atoms.length>0){
        var latestAtom = main_branch_atoms[main_branch_atoms.length-1];
        var shouldDraw = withinArea(latestAtom.x, latestAtom.y, fixed_length_bond);
        if(!checkIfHover(main_branch_atoms)  && shouldDraw == true){
       
            var currLen = main_branch_atoms.length;
           
            // this gets the fixed angled bonds
            let {x,y} = calculateNextPointFixLen(fixed_length_bond,main_branch_atoms[currLen-1]);

            //this adds the new atom within the respective length
            main_branch_atoms[currLen] = new atoms(main_branch_atoms[currLen-1].x+x, main_branch_atoms[currLen-1].y+y, currElement);
            
            // o0 <--- o1
            var currAtomParentArr = main_branch_atoms[currLen].parentAtoms;
            var currAtomParArrLen = currAtomParentArr.length;
            currAtomParentArr[currAtomParArrLen] = main_branch_atoms[currLen-1];
            
            //adds previous atom as a co parent
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
}

//adds the bonds into main bond array.
function addingBonds(main_branch_atoms, currLen){
    firstAtom = main_branch_atoms[currLen - 1];
    secondAtom = main_branch_atoms[currLen];
    bondArrLen = main_bonds.length;
    main_bonds[bondArrLen] = new bond(firstAtom, secondAtom);
}

