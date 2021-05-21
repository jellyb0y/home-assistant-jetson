import { storage } from './storage';
import { PICTURE_DIR } from '@constants';
import { unlink } from 'fs';

import type * as T from './storage.types';

export const addImageToQueue = (camID: string, image): Promise<T.IUploadedImage> =>
  new Promise((resolve, reject) => {
    if (!(camID in storage)) {
      storage[camID] = {
        queued: null,
        processed: null
      }
    }
  
    const queued = storage[camID].queued;
    if (queued) {
      reject();
      return;
    }
  
    const seed = `${Math.floor(Math.random() * 1000)}${Date.now()}`;
    const fileType = image.mimetype.split('/')[1];
    const fileName = `${seed}.${fileType}`;
    const filePath = `${PICTURE_DIR}/${seed}.${fileType}`;
  
    image.mv(filePath, () => {
      storage[camID] = {
        ...storage[camID],
        queued: filePath
      };

      resolve({
        path: filePath,
        type: fileType,
        name: fileName
      });
    });
  });

export const setImageAsProcessed = (camID: string, dist: string): Promise<void> =>
  new Promise((resolve) => {
    const queued = storage[camID].queued;
    const lastProcessed = storage[camID].processed;

    unlink(queued, () => {
      storage[camID] = {
        queued: null,
        processed: dist
      };

      if (lastProcessed) {
        unlink(lastProcessed, () => {
          storage[camID] = {
            queued: null,
            processed: dist
          };
          resolve();
        });
      } else {
        resolve();
      }
    });
  });

export const getProcessedImage = (camID: string) => {
  if (!(camID in storage)) {
    return;
  }

  return storage[camID].processed;
};
