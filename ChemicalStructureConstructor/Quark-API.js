
//EXPORT PNG URI QUARK API
window.addEventListener('message',event =>{
    console.log('receiving a message')
    if(event.data == "downloadPNG"){
        let uri = getCanvasURI()
        let type = 'downloadPNG'
        event.source.postMessage({
            'type':type,
            'uri':uri
        }, event.origin)
        
    }
    else{
        return
    }
},false)
