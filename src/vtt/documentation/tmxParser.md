# TMX File Parser (Partial Implementation)

This JavaScript module provides partial support for parsing [Tiled](https://www.mapeditor.org/)'s TMX map files. It focuses on the core structure needed to interpret tilemaps, supporting base64-encoded and gzip/zlib-compressed data. Maps must be orthogonal, square, and finite.

## Supported TMX Structure

### <map> Tag
The root element of a TMX file.

*Supported Attributes:*
- width
- height
- tilewidth
- tileheight

*Children:*
- Any number of <tileset> tags
- Any number of <layer> tags

---

### <tileset> Tag
Defines the tileset used in the map.

*Supported Attributes:*
- firstgid
- source *(link to external .tsx file; if source appears, the following attribute are ignored)*
- name
- tilewidth
- tileheight
- spacing
- margin
- tilecount
- columns

*Rules:*
- If source is present, the tileset is external and must be a .tsx file containing a <tileset> tag at the root of the file.
- External tilesets do *not* include firstgid.

*Children:*
- Exactly *one* <image> child.

---

### <image> Tag
Specifies the source image for a tileset.

*Supported Attributes:*
- source

---

### <layer> Tag
Represents a single tile layer in the map.

*Supported Attributes:*
- id

*Children:*
- Exactly *one* <data> tag

---

### <data> Tag
Holds tile data for a layer.

*Supported Attributes:*
- encoding — Only base64 is supported
- compression — Only gzip and zlib are supported

*Content:*
- Base64-encoded, compressed tile data representing the tile grid of the layer

---

## Limitations

- Only the following TMX tags are supported: <map>, <tileset>, <image>, <layer>, and <data>
- Only base64 encoding is supported in <data>
- Only gzip and zlib compression methods are supported
- Unsupported features include:
    - CSV encoding
    - Hex Maps
    - Isometric Maps
    - Object layers
    - Tile animations
    - Wang sets