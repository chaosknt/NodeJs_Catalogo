import {subirUno} from './subirUno.js'

async function subirTodos(reqs) {

    let keys = Object.keys(reqs);
    let sampleFile = reqs[keys[0]];

    if (!Array.isArray(sampleFile)) {
      sampleFile[0] = sampleFile;
    }

    let files = "";

    for (let i=0;i<sampleFile.length;i++) {
        let file = sampleFile[i]
        let xx = await subirUno(file);
        files = files + ' ' + xx
      }
      
    return files
}

export { subirTodos }