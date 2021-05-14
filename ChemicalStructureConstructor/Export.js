

class SVGExport{
    constructor(atoms, bonds){
        this.atoms = atoms;
        this.bonds = bonds;
        this.arrayToJoin = new Array(0);
        this.returnSVG = this.exportSVG()
    }
    initSVG(){
        let SVGString = `<svg version="1.1"
        baseProfile="full"
        width="${windowWidth}" height="${windowHeight}"
        xmlns="http://www.w3.org/2000/svg">`
        append(this.arrayToJoin,SVGString);
    }
    createLines(){
        let finalCompile = "";
        console.log(this.bonds);
        for(let currLine of this.bonds){
            let coords = currLine.accessCoord;
            
            let lineFrameWorkSVG = `<line x1="${coords[0]}" y1="${coords[1]}" x2="${coords[2]}" y2="${coords[3]}" stroke-width="2" stroke="black"/>`
            finalCompile+=lineFrameWorkSVG;
        }
        append(this.arrayToJoin, finalCompile);
    }
   // can be either letter or points
    createNodes(){
        let finalCompile = "";
        for(let currAtom of this.atoms){
            let currAtomState = currAtom.isGapNeeded;
            let stringToJoin = "";

            if(currAtomState == false){
                if(currAtom.showCentral==0){
                  stringToJoin = `<circle cx="${currAtom.x}" cy="${currAtom.y}" r="5" stroke-width = "0" fill="black"/>`
                }

            }
            else if(currAtomState == true){

                stringToJoin = `<text x="${currAtom.x-5}" y="${currAtom.y+5}" font-size="20px" font-family="Arial">${currAtom.sym}</text>`
            }
            finalCompile+=stringToJoin;
        }
        append(this.arrayToJoin,finalCompile);
    }
    exportSVG(){
        this.initSVG()
        this.createLines();
        this.createNodes();
        append(this.arrayToJoin,'</svg>');
        return this.arrayToJoin.join('\n');
    }
}

function downloadSVG(){
    let currentDrawingSVG = new SVGExport(structure.atoms, structure.bonds);
    let printThis = currentDrawingSVG.returnSVG;
    download('drawing.svg',printThis)
}

function download(filename, text) {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);
  
    element.style.display = "none";
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }