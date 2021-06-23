var elementsCovalentBondCount = {
    "Carbon":4,
    "Rings ⬡":4,
    "Nitrogen":3,
    "Oxygen":2,
    "Hydrogen":1,
    "Silicon":4,
    "Fluorine":1,
    "Chlorine":1,
    "Bromine":1,
    "Iodine":1,
    "Phosphine":5,
    "Type Out ⌨️":3
};

let ringCompoundList = {

    'Benzene':{vertices:6,atomUsed:3},
    'Cyclohexane':{vertices:6,atomUsed:4},
    'Cyclopropane':{vertices:3,atomUsed:4},
    'Cyclobutane':{vertices:4,atomUsed:4},
    'Cyclopentane':{vertices:5,atomUsed:4},
    'Cycloheptane':{vertices:7,atomUsed:4},
    'Cyclooctane':{vertices:8,atomUsed:4},
    'Cyclononane':{vertices:9,atomUsed:4},
    'Cyclodecane':{vertices:10,atomUsed:4},
   
}

var elementsSymbol = {
    "Carbon":"C",
    "Rings ⬡":'C',
    "Nitrogen":"N",
    "Oxygen":"O",
    "Hydrogen":"H",
    "Silicon":"Si",
    "Fluorine":"F",
    "Chlorine":"Cl",
    "Bromine":"Br",
    "Iodine":"I",
    "Phosphine":"P",
    "Type Out ⌨️":"X",
};

var elementsSymbolForSelect = {
    "Carbon":"C",
    "Nitrogen":"N",
    "Oxygen":"O",
    "Hydrogen":"H",
    "Silicon":"Si",
    "Fluorine":"F",
    "Chlorine":"Cl",
    "Bromine":"Br",
    "Iodine":"I",
    "Phosphine":"P",
    "Type Out ⌨️":"X",
};

var organicGroupCovalent = {
    "Hydroxyl": 1,
    "Carboxylic":1,
    "Ester":2,
    "Amine":1,
    "Amide":2,
    "Methyl":1
}

var elementsArShow = {
    "C":{"aM":12,"aN":6},
    "N":{"aM":14,"aN":7},
    "O":{"aM":16,"aN":8},
    "H":{"aM":1,"aN":1},
    "Si":{"aM":28,"aN":14},
    "F":{"aM":19,"aN":9},
    "Cl":{"aM":35.5,"aN":17},
    "Br":{"aM":80,"aN":35},
    "I":{"aM":127,"aN":53},
    "P":{"aM":31,"aN":15},
    "--":{"aM":'--',"aN":'--'}
    };