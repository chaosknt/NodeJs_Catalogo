import express from 'express'
import fileUpload from 'express-fileupload'
import {subirTodos} from './subirTodos.js'

function crearServidor({ db = [], port = 0 }) {

  const app = express()

  app.use('/api/upload',fileUpload());

  app.post('/api/upload', async function(req, res) {
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send('No suministro archivo a subir');
      return;
    }
  
    //console.log('req.files >>>', req.files); 
 
    try {
        let reqs = req.files;
        let rep = await subirTodos(reqs);
        console.log(rep)
        res.status(200).send('Operacion Ok'); 
    }
    catch(e) {
      console.log(e.message)
      res.status(500).send(e.message);
    }
  });

  app.get('/api/download', function(req, res){

    if (!req.query.file ) {
      res.status(400).send('No informo archivo a bajar');
      return;
    }

    const file = 'src/archivos/' + req.query.file;
    res.download(file); 
  });

  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      server.port = server.address().port
      resolve(server)
    })
    server.on('error', () => {
      reject(new Error('error al conectarse al servidor'))
    })
  })


}

export { crearServidor }
