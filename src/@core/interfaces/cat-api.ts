import { Type, Filter, Fit, Position } from "../enums/cat-query";

export interface Cat {
    id: string,
    tags: string[],
    created_at: string,
    mimetype: string,
}

export interface CatImage extends Cat{
    url: string
}

export interface CatListQuery {
    limit: number;
    skip: number;
    tags?: string;
}

export interface CatQuery {
    type?: Type;
    filter?: Filter;
    fit?: Fit;
    position?: Position;
    width?: number;
    height?: number;
    blur?: number;
    r?: number;
    g?: number;
    b?: number;
    brightness?: number;
    saturation?: number;
    hue?: number;
    lightness?: number;
    html?: boolean;
    json?: boolean;
}

export interface CatQueryText extends CatQuery {
    fontSize: number,
    fontColor: string,
    fontBackground: string,
}

export interface CountResponse {
    count: number;
}