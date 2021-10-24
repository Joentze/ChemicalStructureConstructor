
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

    let adjListArray = data.adjList
    for(let thisMap of adjListArray){
        let keyAtom = thisMap['key']
        
        //creates new atom class for key atom
        let currAtom = new Atom()
        //
        for(let key of Object.keys(keyAtom)){
            //propogates class instances into atom 'key' object
                currAtom[key] = keyAtom[key]
        }
        structure.addAtom(currAtom)
        //interates atoms in the value array
        
    }
    for(let thisMap of adjListArray){
        let keyAtom = thisMap['key']
        let valueArray = thisMap['value']
        let currAtom = new Atom()
        //
        for(let key of Object.keys(keyAtom)){
            //propogates class instances into atom 'key' object
                currAtom[key] = keyAtom[key]
        }
        for(let valueAtom of valueArray){
            let atom = new Atom()
            for(let key of Object.keys(keyAtom)){
                atom[key] = valueAtom[key]
            }
            //check if current atom 'value' object has been added to the structure
            if(containsObject(atom, structure.atoms)){
                structure.addAtom(atom)
            }
            let currentBond = new Bond(currAtom, atom)
            for(let thisBond of data.bonds){
                let ifContainOne = containsObject(currAtom, thisBond.pair)
                let ifContainTwo = containsObject(atom, thisBond.pair)
                if(ifContainOne && ifContainTwo){
                    for(let bondVariable of Object.keys(thisBond)){
                        currentBond[bondVariable] = thisBond[bondVariable]
                    }
                }
            }
            currentBond.pair = [currAtom, atom]
            console.log(currentBond)
            structure.addBond(currentBond)
        }
    }
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
