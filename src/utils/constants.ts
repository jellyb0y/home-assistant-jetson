import { resolve } from 'path';

export const PORT = 8000;
export const HOST = '0.0.0.0';

export const REQ_FILE_NAME = 'image';
export const REQ_CAM_ID = 'camID';

export const ROOT_DIR = resolve(`${__filename}/../../../`);
export const PICTURE_DIR = `${ROOT_DIR}/public/pics`;
export const PICTURE_DIST_DIR = `${ROOT_DIR}/public/dist`;

export const PYMODULE_MAIN = `${ROOT_DIR}/pymodules/main.py`;

export const WATCHER_PERIOD = 1000;

export const CAMERAS = {
  'cam1': 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/FLmT/U55cpB3dh',
  'cam2': 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/Ls2d/jf3dnku9H',
  'cam3': 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/YTJ5/oeAR3SnDf',
}
