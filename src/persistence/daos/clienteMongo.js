import mongodb from 'mongodb'
const { MongoClient } = mongodb

function crearClienteMongoDb(cnxStr) {

  const client = new MongoClient(cnxStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  return {
    conectar: async (dbName) => {
      await client.connect();
      const db = client.db(dbName)
      return db
    },
    desconectar: async () => {
      await client.close();
    }
  }
}

export { crearClienteMongoDb }
