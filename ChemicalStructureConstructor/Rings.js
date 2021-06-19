

function calculateNewAddCoordinatesCenter(hypotonuseLength,angleNow,angleAdd){
    angleMode(DEGREES)
    let addX = hypotonuseLength*cos(angleNow+angleAdd-180)
    let addY = hypotonuseLength*sin(angleNow+angleAdd-180)
    return [addX, addY]
}

function generateCoordinatePoly(x,y,numberOfVertices,lenToCenter,angleAdd){
    let returnDict = {}
    let angularIncrements = 360/numberOfVertices;
    for(let cnt=0; cnt<numberOfVertices; cnt++){
        let angleNow = cnt*angularIncrements;
        let [projX, projY] = calculateNewAddCoordinatesCenter(lenToCenter,angleNow,angleAdd)
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

function formRingAtoms(vertexPair, coordDict){
    
    let lenOfNewAtoms = Object.keys(coordDict).length
    let returnDict = {0:selectedAtom}
    for(let cnt=0; cnt<lenOfNewAtoms; cnt++){
        let [x,y] = coordDict[cnt]
        //for test purposes use carbon only!!!
        //start creating from second atom because the first will be the selected
        if(cnt>0){
            let thisNewAtom = new Atom(x,y,currElement,currElementName)
            structure.addAtom(thisNewAtom)
            returnDict[cnt] = thisNewAtom;
        }

    }
    let Vertices = Object.keys(returnDict)
    console.log(returnDict)
    for(let currCnt of Vertices){
        let atom1 = returnDict[currCnt]
        let atom2 = returnDict[vertexPair[currCnt]]
        thisBond = new Bond(atom1, atom2);
        structure.addBond(thisBond)
    }

}

function getAngleOffset(prevPoint, newX, newY) {
    angleMode(DEGREES);
    var getAngleToHorizontal = atan2(newY - prevPoint.y, newX - prevPoint.x);
    if (getAngleToHorizontal < 0) {
      var addTo180 = map(getAngleToHorizontal, -180, -1, 0, 179);
      getAngleToHorizontal = 180 + addTo180;
    }
    return getAngleToHorizontal;
}

function drawRingWithOffset(selectedAtom,endX, endY, numberOfVertices, lenToCenter){
    let angleAdd = 0
    let len = structure.atoms.length;
    if(len>0 && selectedAtom !=null){
        angleAdd = getAngleOffset(selectedAtom, endX, endY)
    }
    let dict = generateCoordinatePoly(endX, endY, numberOfVertices,lenToCenter, angleAdd)
    let vertexPair = returnVertexPair(dict)
    formRingAtoms(vertexPair,dict);
}

//test
function addRing(vertices){

    let len = structure.atoms.length
    if(selectedAtom==null && len>1){
        let [newX, newY] = calculateNextPointFixLen(100,structure.atoms.slice(-1)[0],mouseX, mouseY)
        drawRingWithOffset(structure.atoms.slice(-1)[0],newX, newY, vertices, 100);
    }
    else if(selectedAtom!=null && len>1){
        let [newX, newY] = calculateNextPointFixLen(100,selectedAtom,mouseX, mouseY)
        drawRingWithOffset(selectedAtom,newX, newY, vertices, 100);
    }
    else if(selectedAtom==null && len==0){
        drawRingWithOffset(selectedAtom,mouseX, mouseY, vertices, 100);
    }
}