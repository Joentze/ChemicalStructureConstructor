class atoms{
    // **** New variable in construtor shows the name of the element
    constructor(posX, posY, noOfBranches, SymbolOfElement){

        //position of the atom
        this.x = posX;
        this.y = posY;

        //for testing
        this.sym = SymbolOfElement;

        //the total number of total covalent bonds that can be formed
        this.bNo = noOfBranches;
        
        //to store other atom objects
        this.subBranches = [];

        //to store the total number of parents if any.
        //it is important to know that there can be more than one parent, this is especially true 
        //for ring compounts.
        this.parentAtoms = [];
        
        //to see if the branch is fully filled
        this.fullState = false;

        //color of the rendered atom
        this.colorOfAtom = color(40);

        //radius of rendered atom 
        this.radiusA = 10;

        //expanded radius for atom 
        this.radiusB = 20;

        //is the atom selected
        this.selectedBool = false;

        //check if cursor is hovering over the atom 
        this.hoverBool = false;

        //Bonds between parent and immediate child
        this.parChildBondArr = [];

        //selection bubble for right click select
        this.selectionTable;

        //if atom is not carbon leave gap for the text
        this.isGapNeeded = false;
    }

    //draws the atom
    renderAtom(){
        this.isAtomCarbon();
        
            if(this.isGapNeeded == false && currViewingState == 0){
                if(this.selectedBool){
                   this.RSelected();
                }
                else{
                    push();
                    noStroke();
                    fill(this.colorOfAtom);
                    var currRadiusSize = this.CursorNearExpand();
                    ellipse(this.x, this.y, currRadiusSize, currRadiusSize);
                    pop();
                }
            }
            else if(this.isGapNeeded==true){
                this.RShowText();
            }
            else if(this.isGapNeeded == false && currViewingState == 1){
                this.isGapNeeded = true;
                this.RShowText();
            }
            else if(this.isGapNeeded==false && currViewingState == 2){
                if(this.selectedBool){
                    this.RSelected();
                }
                else{
                    push();
                    noStroke();
                    fill(this.colorOfAtom);
                    var currRadiusSize = this.CursorNearExpand();
                    //ellipse(this.x, this.y, currRadiusSize, currRadiusSize);
                    pop();
                }
            }
        // renders the other atoms and their respective secondary atoms
        this.renderSubBranches();
        //checks if the atom is fully bonded
        this.checkIfFullState();
    }
    RSelected(){
        push();
        this.CursorNearExpand();
        strokeWeight(0.3);
        stroke(color('rgb(150, 30,30)'));
        fill(color('rgba(232, 134, 121,0.5)'));
        ellipse(this.x, this.y, this.radiusB, this.radiusB);
        pop();
    }

    RShowText(){
        push();
        this.CursorNearExpand();
        textAlign(CENTER);
        textFont('Arial');
        textSize(18);
        text(this.sym,this.x,this.y);
        pop();
    }
    checkIfFullState(){
        var parentLen = this.parentAtoms.length;
        var subBranchLen = this.subBranches.length;
        var sumOfLen = parentLen + subBranchLen;
        if(sumOfLen <this.bNo){
            this.fullState = false;
        }
        else{
            this.fullState = true;
        }
    }

    //runs a for loop to render the atoms in the sub branches.
    renderSubBranches(){
        var maxLength = this.subBranches.length;
        var maxLengthBondArr = this.parChildBondArr.length;
        for(var cnt = 0; cnt<maxLength; cnt++){
            this.subBranches[cnt].renderAtom();
        }
        for(var cntB = 0; cntB<maxLengthBondArr; cntB++){
            var thisCurrBond = this.parChildBondArr[cntB]
            thisCurrBond.renderLine();
        }
    }
    
    // implements lerp for when the cursor is near the atom 
    CursorNearExpand(){
        var calDist = sqrt(sq(mouseY - this.y)+sq(mouseX - this.x));
        var return_radius = this.radiusA;
        if(calDist<=this.radiusA){
            this.radiusA = lerp(this.radiusA, this.radiusB, 0.05);
            return_radius = this.radiusA;
            this.hoverBool = true;
        }
        else{
            this.radiusA = lerp(this.radiusA, 10, 0.1);
            return_radius = this.radiusA;
            this.hoverBool = false;
        }
        return return_radius;
    }

    //adds sub branches to the current atom
    addBranch(newAtomObject, refToThisAtom){
        //print("trying to add..")
        var getLastObjNo = this.subBranches.length ;
        //print("getObj:"+getLastObjNo);
        var getParentListLen = this.parentAtoms.length;
        //print("getParent:"+getParentListLen);
        
        var getLastParChiLen = this.parChildBondArr.length;

        if(this.selectedBool){
        if(getLastObjNo + getParentListLen<this.bNo){
            this.subBranches[getLastObjNo] = newAtomObject;
            this.parChildBondArr[getLastParChiLen] = new bond(refToThisAtom, newAtomObject);
            print("adding branches and bonds...")
        }
        else{
            this.fullState = true;
        }
    }
    }

    checkIfSubBranchSelected(subBranchesArray){

        for(let cnt = 0; cnt<subBranchesArray.length; cnt ++){

            currAtomClass = subBranchesArray[cnt];
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
            else if(currAtomClass == selectedAtomIfAny[0] && withinArea(currAtomClass.x, currAtomClass.y,fixed_length_bond-10)==true && currAtomClass.selectedBool == true){
                //triggered when an already selected point is clicked on 
                //ADD SUB BRANCHES
                addingMainSubBranches(selectedAtomIfAny[0]);
                //print("adding");
            }
            this.checkIfSubBranchSelected(currAtomClass.subBranches);
        }

    }
    isAtomCarbon(){
        if(this.sym=="C"){
            this.isGapNeeded = false;
        }
        else{
            this.isGapNeeded = true;
        }
    }
}