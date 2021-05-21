import { resolve } from 'path';

export const PORT = 8000;
export const HOST = '0.0.0.0';

export const REQ_FILE_NAME = 'image';
export const REQ_CAM_ID = 'camID';

export const ROOT_DIR = resolve(`${__filename}/../../../`);
export const PICTURE_DIR = `${ROOT_DIR}/public/pics`;
export const PICTURE_DIST_DIR = `${ROOT_DIR}/public/dist`;

export const PYMODULE_MAIN = `${ROOT_DIR}/pymodules/main.py`;
