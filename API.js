
//EXPORT PNG URI QUARK API
window.addEventListener('message',event=>{
    if(event.data == "downloadPNG"){
        let uri = getCanvasURI()
        event.source.postMessage(uri, event.origin)
    }
    else{
        return
    }
},false)