class Structure{
    constructor(){
        this.atoms = [];
        this.bonds = [];
        this.adjList = new Map();
    }
    render(){
        let hoveredAtom = null;
        for (let bond of this.bonds){
            bond.render();
        }
        for (let atom of this.atoms){
            atom.render()
            
            if (atom.hoverBool){
                hoveredAtom=atom
            }
        }
        
        if (hoveredAtom){

        }else{
            if (mode == modes.EDIT) {
            drawGuideLine();
            } 
        }

    }

  
    addAtom(atom){

        this.atoms.push(atom)
        atom.indexNo = this.atoms.length - 1 
        this.adjList.set(atom,[])
    }

    addBond(bond){
        this.bonds.push(bond)
        const [v,w] = bond.pair 
        this.adjList.get(v).push(w)
        this.adjList.get(w).push(v)
    }

    removeAtom(atom){
        let len = this.bonds.length
        for(let cnt=len-1;cnt>=0;cnt--){
            if (this.bonds[cnt].pair.includes(atom)){
                this.removeBond(this.bonds[cnt])
                
            }
        }
        this.atoms.splice(this.atoms.indexOf(atom),1)         
        this.adjList.delete(atom);


    }
    
    removeBond(bond){
        let [v,w] = bond.pair
        let vBonds = this.adjList.get(v)
        let wBonds = this.adjList.get(w)
        if(vBonds!=undefined && wBonds!=undefined){
            vBonds.splice(vBonds.indexOf(w),1)
            wBonds.splice(wBonds.indexOf(v),1)           
        }
        this.bonds.splice(this.bonds.indexOf(bond),1)

    }

    print(){
        console.log('atoms',this.atoms)
        console.log('bonds',this.bonds)
        // for (var i of this.adjList.keys()) {
        //         // great the corresponding adjacency list
        //         // for the vertex
        //         var get_values = this.adjList.get(i);
        //         var conc = "";
          
        //         // iterate over the adjacency list
        //         // concatenate the values into a string
        //         for (var j of get_values)
        //             conc += j + " ";
          
        //         // print the vertex and its adjacency list
        //         console.log(i + " -> " + conc);
        // }
   
    }

}