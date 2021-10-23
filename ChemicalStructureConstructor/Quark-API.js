
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
    structure.atoms = data.atoms
    structure.bonds = data.bonds
    let adjListArray = data.adjList
    for(let thisMap of adjListArray){
        let keyAtom = thisMap['key']
        let valueArray = thisMap['value']
        structure.adjList.set(keyAtom, valueArray)
    }
}