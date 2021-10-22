
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
    }
},false)

function organiseObject(){
    let package = {
        atoms:{}//,
        //bonds:[]
    }
    for(let thisAtom of structure.atoms){
        if(Object.keys(package.atoms).length ==0){
            for(let thisVariable of thisAtom.getAllVariables()){
                package.atoms[thisVariable] = [thisAtom[thisVariable]]
            }
        }else if(Object.keys(package.atoms).length>0){
            for(let thisVariable of thisAtom.getAllVariables()){
                package.atoms[thisVariable].push(thisAtom[thisVariable])
            }
        }
    }
    //delete package.atoms['targetX']
    //delete package.atoms['targetY']
    delete package.atoms['atomElementDrawing']
    /*
    for(let thisBond of structure.bonds){
        package.bonds.push(thisBond)
    }*/
    console.log("getting object....4")
    console.log(package)
    return package
}