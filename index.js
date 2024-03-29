import "dotenv/config"

import { MongoClient, ServerApiVersion } from "mongodb";


const uri = process.env.MONGODB_CONNECTION_STRING;
import express from "express";
import cors from "cors"
import { getAlbum, addAlbum, getPhoto, removePhotoFromPhotos, addPhotoToAlbum, addPhotoToPhotos, removePhotoFromAlbum} from "./mongodb-connection.js";
import bodyParser from "body-parser";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const app = express();
const port = 3001;
const corsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cors())




app.get("/photo/:nome", async(req, res) => {

    await res.send(getPhoto(client, req.params.nome))

});
app.get("/photo/photo/remove/:nome", async(req, res) => {

    await res.send(removePhotoFromPhotos(client, req.params.nome, res))
    

});

app.get("/photo/album/remove/:nome", async(req, res) => {

    await res.send(removePhotoFromAlbum(client, req.params.nome, res))
    

});
app.get("/photo/photo/add/:nome", async(req, res) => {

    await res.send(addPhotoToPhotos(client, req.params.nome, res))
    

});
app.get("/photo/album/add/:nome", async(req, res) => {

    await res.send(addPhotoToAlbum(client, req.params.nome, res))
    

});
app.get("/album/add/:nome", async(req, res) => {

    await res.send(addAlbum(client, req.params.nome, res))
    

});

app.get("/album/:nome", async(req, res) => {

    await res.send(getAlbum(client, req.params.nome, res))
    

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
