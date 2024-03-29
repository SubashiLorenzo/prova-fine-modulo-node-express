import { MongoClient, ServerApiVersion } from "mongodb";
import "dotenv/config";
import { stringify } from "querystring";
const uri = process.env.MONGODB_CONNECTION_STRING;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function getPhoto(client, foto) {
  const result = await client
    .db("album-fotografico")
    .collection("foto")
    .findOne({nome: foto});

  console.log(`New photo found: ${stringify(result)}`);
  return stringify(result)
}
export async function addPhotoToPhotos(client, foto) {
  let json = {"nome": foto,
  "data-creazione": "29-03-2024",
  "data-modifica": "29-03-2024",
  "hashtags": "#mare, #sole"}
  const result = await client
    .db("album-fotografico")
    .collection("foto")
    .insertOne(json);
  console.log(`New photo created: ${result}`);
}
export async function addPhotoToAlbum(client, foto) {
let json = {"nome": foto,
  "data-creazione": "29-03-2024",
  "data-modifica": "29-03-2024",
  "hashtags": "#mare, #sole"}
  const result = await client
    .db("album-fotografico")
    .collection("album-fotografico")
    .insertOne(json);
  console.log(`New photo created: ${result}`);
}

export async function removePhotoFromAlbum(client, foto) {
  const result = await client
    .db("album-fotografico")
    .collection("album-fotografico")
    .deleteOne({nome: foto});
  console.log(`New photo deleted from album: ${stringify(result)}`);
  return stringify(result)
}

await client.connect();

export async function removePhotoFromPhotos(client, foto, res) {
  const result = await client
    .db("album-fotografico")
    .collection("foto")
    .deleteOne({nome: foto});
  console.log(`New photo deleted from photos: ${stringify(result)}`);
  return stringify(result)
}

export async function addAlbum(client, foto) {
  const result = await client
    .db("album-fotografico").createCollection(foto, null)

  console.log(`New album created: ${stringify(result)}`);
  return stringify(result)
}

export async function getAlbum(client, album) {
  const result = await client
    .db("album-fotografico")
    .collection(album)

  console.log(`New album found: ${stringify(result)}`);
  return stringify(result)
}
await client.connect();




await client.close();
