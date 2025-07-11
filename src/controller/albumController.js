import { Album } from "../models/album.model.js";

export const getAllAlbums = async (req, res, next) => {
    try {
        const albums = await Album.find();
        res.status(200).json(albums);
    } catch (error) {
        next(error);
    }
}


export const getAlbumById = async (req, res, next) => {
    try {
        const {albumId} = req.params;

        const album = await Album.findByID(albumId).populate("songs");

        if(!album) {
            return res.status(404).json({ message: "Album not found" });
        }

         

    } catch (error) {
        next(error);
    }
}
