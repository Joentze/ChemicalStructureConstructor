function neatenStructure(structure){
    function dfs(curr,visited = new Set()){
        visited.add(curr)
        const neighbours = structure.adjList.get(curr);
        for (const x of neighbours){
            if (!visited.has(x)){
                adjust(x,curr)
                dfs(x,visited)
            }
        }
    }

    function adjust(atom,referenceAtom){
        atom.targetY = referenceAtom.targetY
    }

    dfs(structure.atoms[0])
}