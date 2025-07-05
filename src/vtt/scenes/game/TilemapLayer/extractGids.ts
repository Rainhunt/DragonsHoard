import { inflate, ungzip } from "pako";

export interface TileData {
    id: number;
    hFlip: boolean;
    vFlip: boolean;
}

export function extractGids(base64: string, compression: "gzip" | "zlib" | "zstd" | null) {
    const binaryStr = atob(base64);
    let byteArr = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
        byteArr[i] = binaryStr.charCodeAt(i);
    }

    switch (compression) {
        case null:
            break;
        case "gzip":
            byteArr = inflate(byteArr);
            break;
        case "zlib":
            byteArr = ungzip(byteArr);
            break;
        default:
            throw new Error(`${compression} compression is not yet supported.`);
    }

    const dataView = new DataView(byteArr.buffer);
    const tiles: TileData[] = [];
    for (let i = 0; i < byteArr.length; i += 4) {
        const val = dataView.getUint32(i, true);
        tiles.push({
            id: val & 0x0FFFFFFF,
            hFlip: (val & 0x80000000) !== 0,
            vFlip: (val & 0x40000000) !== 0
        });
    }
    return tiles;
}