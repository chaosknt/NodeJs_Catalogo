import { crearServidor } from './Servidor.js'
import assert from 'assert'
import FormData from "form-data"
import axios from 'axios'
import fs from 'fs'

async function main() {
 
const servidor = await crearServidor({ port: 8080 })
  
var formData = new FormData();
formData.append('sampleFile', fs.createReadStream('src/archivos/Form1.cs'));
formData.append('sampleFile', fs.createReadStream('src/archivos/Program.cs'));
formData.append('sampleFile', fs.createReadStream('src/archivos/mkEyv1.jpg'));
formData.append('sampleFile', fs.createReadStream('src/archivos/agregateroots.jpg'));

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

servidor.close();

}

main()