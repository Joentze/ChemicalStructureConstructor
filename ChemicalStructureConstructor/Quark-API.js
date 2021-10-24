
//EXPORT PNG URI QUARK API
window.addEventListener('message',event =>{
    console.log('receiving a message')
    console.log("this is the correct rendition")
    console.log(event.data.fn)
    if(event.data == "downloadPNG"){
        let uri = getCanvasURI()
        let type = 'downloadPNG'
        event.source.postMessage({
            'type':type,
            'uri':uri
        }, event.origin)
        
    }
    else if(event.data.fn == 'qrk_save_data'){
        console.log("saving object data")
        event.source.postMessage(
        JSON.parse(JSON.stringify(    
        {
            fn:"qrk_save_data",
            payload:organiseObject()
        })), event.origin)
    }
    else if(event.data.fn == 'qrk_load_data'){
        console.log("unloading data form firebase")
        console.log(event.data.payload.data)
        unloadStructureData(event.data.payload.data)
    }
},false)

function organiseObject(){

    let package = {
        atoms:[],
        bonds:structure.bonds,
        adjList:[]
    }
    for(let thisAtom of structure.atoms){
        //remove atomElementDrawing to prevent circular json
        delete thisAtom['atomElementDrawing']
        package.atoms.push(thisAtom)
    }

    for(let atomMap of structure.adjList){
        //console.log(atomMap)
        package.adjList.push({key:atomMap[0], value:atomMap[1]})
    }
    return package
}

function unloadStructureData(data){
    let allBonds = data.bonds
    for(let bond of allBonds){
        let pair = bond.pair
        delete bond['strokeColorSel']
        delete bond['strokeColHov']
        delete bond['strokeColor']
        console.log(bond)
        let atomOne = propagateVariable(new Atom(),pair[0])
        let atomTwo = propagateVariable(new Atom(),pair[1])
        if(!containsObject(atomOne, Object.keys(pair[0]))){
            structure.addAtom(atomOne)
        }
        if(!containsObject(atomTwo, Object.keys(pair[1]))){
            structure.addAtom(atomTwo)
        }
        let instantiateBond = propagateVariable(new Bond(), bond)
        instantiateBond.pair = [atomOne, atomTwo]
        structure.addBond(instantiateBond)

    }
    
}

function propagateVariable(object, map){
    for(let key of Object.keys(map)){
        object[key] = map[key]
    }
    return object
}

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        let testAtom = new Atom()
        let thisAtomVariables = list[i]
        for(let key of Object.keys(thisAtomVariables)){
            //propogates class instances into atom 'key' object
                testAtom[key] = thisAtomVariables[key]
        }
        if (testAtom === obj) {
            return true;
        }
    }

    return false;
}
