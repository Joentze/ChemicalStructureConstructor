

function calculateNewAddCoordinatesCenter(hypotonuseLength,angleNow){
    angleMode(DEGREES)
    let addX = hypotonuseLength*cos(angleNow)
    let addY = hypotonuseLength*sin(angleNow)
    return [addX, addY]
}

function generateCoordinatePoly(x,y,numberOfVertices,lenToCenter){
    let returnDict = {}
    let angularIncrements = 360/numberOfVertices;
    for(let cnt=0; cnt<numberOfVertices; cnt++){
        let angleNow = cnt*angularIncrements;
        let [projX, projY] = calculateNewAddCoordinatesCenter(lenToCenter,angleNow)
        returnDict[cnt] = [x+projX, y+projY]
    }
    return returnDict
}

function returnVertexPair(coordDict){
    let returnMap = {}
    let numberOfVertices = Object.keys(coordDict).length
    for(let cnt = 0; cnt<numberOfVertices; cnt++){
        if(cnt==numberOfVertices-1){
            returnMap[cnt]=0
        }
        else if(cnt<numberOfVertices && cnt!=numberOfVertices-1){
            returnMap[cnt]=cnt+1;
        }
    }
    return returnMap
}

function drawRing(vertexPair, coordDict){
    let Vertices = Object.keys(vertexPair)
    for(let currCnt of Vertices){
        let[x1, y1] = coordDict[currCnt]
        let [x2, y2] = coordDict[vertexPair[currCnt]]

        line(x1,y1,x2,y2)
    }
}

