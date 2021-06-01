import assert from 'assert'
import FormData from "form-data"
import axios from 'axios'
import fs from 'fs'
import { crearServidor } from '../src/Servidor.js'

const servidor = await crearServidor({ port: 8080 })
  
var formData = new FormData();
formData.append('sampleFile', fs.createReadStream('src/archivos/Form1.cs'));
formData.append('sampleFile', fs.createReadStream('src/archivos/Program.cs'));

//console.log(formData.getHeaders())

// upload
await axios.post(`http://localhost:8080/api/upload`, formData, {
       headers: formData.getHeaders()
    })
    .then(response => {
        console.log(response.status)
        console.log(response.data)
    })
    .catch (e => {
        console.log(e.message);
    }
    );

download
await axios.get(`http://localhost:8080/api/download?file=Program.cs`)
    .then(function (response) {
            console.log(response.status)
            //console.log(response.data);
            fs.writeFile('src/downloads/Program_salida.cs', response.data, (err) => {
                if (err) console.log(err);
            })
    })
    .catch (e => {
            console.log(e.message);
    });

servidor.close();
