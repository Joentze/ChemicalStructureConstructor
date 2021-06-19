function createAtom(){
    if(buttonHighlight == false){
        let latestAtom = structure.atoms.slice(-1)[0]
        if(selectedAtom){
            latestAtom=selectedAtom
        }
        if(!latestAtom){

            structure.addAtom(new Atom(mouseX, mouseY, currElement, currElementName));
        }else{

            let shouldDraw = withinRadius(latestAtom.x, latestAtom.y, fixed_length_bond*2);
            if(shouldDraw && !atomIsFull(latestAtom)){
          
                // this gets the fixed angled bonds
                
                if(selectedAtom!=null && isDrawingRing==true){
                addRing(6)
                }else{
                    let [projX,projY] = calculateNextPointFixLen(fixed_length_bond, latestAtom, mouseX, mouseY);
                    atom = new Atom(projX,projY,currElement,currElementName)

                    structure.addAtom(atom)
                    bond = new Bond(atom,latestAtom)
                    structure.addBond(bond)
                }
                return atom
            }
        }
    }
}

function joinAtoms(){
    let joinAtom = null

    for (atom of structure.atoms){
        if (atom.hoverBool){
            joinAtom=atom;
        }
    }
    if (joinAtom){
        if (!atomIsFull(selectedAtom) && !atomIsFull(joinAtom)){
            let bond = new Bond(selectedAtom,joinAtom)
            structure.addBond(bond)
            selectedAtom = joinAtom
            return joinAtom
        }
    }
    return selectedAtom

}

function atomIsFull(atom){
    let neighbours = structure.adjList.get(atom)
    return neighbours.length>=atom.bNo
}
