
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
    else if(event.data['fn'] == 'qrk_save_data'){
        getStructureObj = 
        event.source.postMessage({
            fn:"qrk_save_data",
            payload:{"test1":"hello","test2":"hello"}
        })
    }
},false)

