function neatenStructure(structure){
    function dfs(curr,visited = new Set()){
        visited.add(curr)
        adjust(curr, visited)
        const neighbours = structure.adjList.get(curr);
        for (const x of neighbours){
            if (!visited.has(x)){
                dfs(x,visited)
            }
        }
    }

    function adjust(atom,visited){
        const bondAngles = getBondAngles(atom);
        if (!bondAngles){
            return
        }
        let referenceAtom = null
        for(let neighbour of structure.adjList.get(atom)){
            if (visited.has(neighbour)){
                referenceAtom = neighbour
            }
        }
        
        let referenceAngle = getBearing(atom,referenceAtom)
        for(let neighbour of structure.adjList.get(atom)){
            if (visited.has(neighbour)){
                referenceAtom = neighbour
            }
        }
        let counter = 1
        for(let neighbour of structure.adjList.get(atom)){
            if (!visited.has(neighbour)){
                
                let newAngle = addAngles(referenceAngle, counter * bondAngles)
                // console.log(newAngle)
                counter++;
                let [tarX, tarY] = getTargetPoint(atom,newAngle)
                // console.log(tarX,tarY)
                neighbour.targetX = tarX
                neighbour.targetY = tarY
            }
        }
    }
     
    function getTargetPoint(ref, angle, length=fixed_length_bond){
        
        let dx = length * sin(angle)
        let dy = length * cos(angle)
        
        return [ref.targetX+dx, ref.targetY-dy]

    }
    function addAngles(angle1,angle2){
        return (angle1+angle2)%360
    }
    function getBearing(atom,ref){
        // returns the bearing of atom from red
        // bearing takes negative y as north
        return addAngles(atan2(atom.targetY-ref.targetY, atom.targetX-ref.targetX), 270)
    }

    function getBondAngles(atom){
        //gets the bond angles based on number of neighbours
        numBonds = structure.adjList.get(atom).length
        return numBonds>1 ? 360/numBonds : null;
    }

    dfs(structure.atoms[0])
}