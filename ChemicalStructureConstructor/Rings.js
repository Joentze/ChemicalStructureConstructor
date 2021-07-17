//lengthOfEdge is usually bond length
function getLengthToCenter(vertices, lengthOfEdge){
    angleMode(DEGREES)
    let separation = 360/vertices
    let halvedAngle = separation*0.5
    let halvedEdge = lengthOfEdge*0.5
    return  halvedEdge/sin(halvedAngle)
}


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
    if(selectedAtom!=null){
        let returnDict = {0:selectedAtom}
        for(let cnt=0; cnt<lenOfNewAtoms; cnt++){
            let [x,y] = coordDict[cnt]
            if(cnt>0){
                let thisNewAtom = new Atom(x,y,currAtomUsedRing,currElementName)
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
            if(firstRingsData=='Benzene'){
                if(currCnt==1||currCnt==3||currCnt==5){
                    thisBond.bondNumber = 2
                    thisBond.iterDblBond = 3
                }
            }
        }
    }
    else{
        let returnDict = {}
        for(let cnt=0; cnt<lenOfNewAtoms; cnt++){
            let [x,y] = coordDict[cnt]
            let thisNewAtom = new Atom(x,y,currAtomUsedRing,currElementName)
            structure.addAtom(thisNewAtom)
            returnDict[cnt] = thisNewAtom;
        }


        let Vertices = Object.keys(returnDict)
        console.log(returnDict)
        for(let currCnt of Vertices){
            let atom1 = returnDict[currCnt]
            let atom2 = returnDict[vertexPair[currCnt]]
            thisBond = new Bond(atom1, atom2);
            structure.addBond(thisBond)
            if(firstRingsData=='Benzene'){
                if(currCnt==1||currCnt==3||currCnt==5){
                    thisBond.bondNumber = 2
                    thisBond.iterDblBond = 3
                }
            }
        }
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
    let lenToCenter = getLengthToCenter(currRingVertices, 100)
    let len = structure.atoms.length
    if(selectedAtom==null && len>1){
        let [newX, newY] = calculateNextPointFixLen(lenToCenter,structure.atoms.slice(-1)[0],mouseX, mouseY)
        drawRingWithOffset(structure.atoms.slice(-1)[0],newX, newY, vertices, lenToCenter);
    }
    else if(selectedAtom!=null && len>1){
        let [newX, newY] = calculateNextPointFixLen(lenToCenter,selectedAtom,mouseX, mouseY)
        drawRingWithOffset(selectedAtom,newX, newY, vertices, lenToCenter);
    }
    else if(selectedAtom==null && len==0){
        drawRingWithOffset(selectedAtom,mouseX, mouseY, vertices, lenToCenter);
    }
}