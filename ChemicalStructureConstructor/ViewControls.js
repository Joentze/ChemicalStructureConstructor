class View{
    constructor(){
       this.initialX = 0
       this.initialY = 0 
       this.panning = false
       this.initialAtomPos = new Map();
    }
    
    panStart(){
        this.initialX = mouseX
        this.initialY = mouseY
        for (let atom of structure.atoms){
            this.initialAtomPos.set(atom,{x:atom.x,y:atom.y})
        }
        this.panning = true
        
    }
    
    pan(){
        if(structure){
            let panX = mouseX - this.initialX;
            let panY = mouseY - this.initialY;

            for(let atom of structure.atoms){
                atom.setPos(this.initialAtomPos.get(atom).x + panX, this.initialAtomPos.get(atom).y + panY )
                
            }
        }
    }

    panStop(){
        this.panning = false
    }


    zoom(dir){
        const zoomSpeed = dir/200
        for (let atom of structure.atoms){
            let dx = atom.x - mouseX;
            let dy = atom.y - mouseY;
            atom.setPos(atom.x + zoomSpeed * dx,atom.y + zoomSpeed * dy)
        }
        if (structure.atoms.length>1){
            fixed_length_bond = dist(structure.atoms[0].x,structure.atoms[0].y,structure.atoms[1].x,structure.atoms[1].y)

        }

    }

}

