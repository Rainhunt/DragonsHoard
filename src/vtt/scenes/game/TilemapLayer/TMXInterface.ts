import { TileData } from "./decodeTMX";

export interface TMXMap {
    "@_": {
        compressionlevel?: number;
        width: number;
        height: number;
        tilewidth: number;
        tileheight: number;
        backgroundcolor: string;
    }
    tileset: TMXTileset | TMXTileset[];
    layer: TMXLayer | TMXLayer[];
}

export interface TMXTileset {
    "@_": {
        firstgid: number;
        source?: string;
        name: string;
        tilewidth: number;
        tileheight: number;
        spacing: number;
        margin: number;
        tilecount: number;
        columns: number;
    }
    image: TMXImage;
    tile: TMXTile | TMXTile[];
}

export interface TMXImage {
    "@_": {
        source: string;
    }
}

export interface TMXTile {
    "@_": {
        id: number;
    }
}

export interface TMXLayer {
    "@_": {
        id: number;
        opacity: number;
        visible: boolean;
        tintcolor: string;
    }
    data: TMXData;
}

export interface TMXData {
    "@_": {
        encoding: "base64" | "csv";
        compression: "gzip" | "zlib" | "zstd";
    }
    "#text": string;
    "#tiledata": TileData[];
}