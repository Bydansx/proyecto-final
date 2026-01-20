import {BASE_IMAGE_URL} from "../constants/base-url.js";

export const buildUrlImage = (path, size = 'w342') => {
    return `${BASE_IMAGE_URL}/${size}${path}`;
}