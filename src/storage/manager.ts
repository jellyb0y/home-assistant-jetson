import { storage } from './storage';
import { PICTURE_DIR, PICTURE_DIST_DIR } from '@constants';
import { spawn } from 'child_process';

export const uploadImage = (camID: string, image) => {
  const seed = `${Math.floor(Math.random() * 1000)}${Date.now()}`;
  const fileType = image.mimetype.split('/')[1];
  const fileName = `${PICTURE_DIR}/${seed}.${fileType}`;
  const distFileName = `${PICTURE_DIST_DIR}/${seed}.${fileType}`;
  image.mv(fileName);

  storage[camID] = {
    ...storage[camID],
    uploadAvailable: false,
    uploaded: fileName
  };
  
  const process = spawn('mv', [fileName, distFileName]);

  process.stdout.on('data', console.log);
  process.on('exit', (data) => {
    storage[camID].processed = distFileName;
    console.log(data);
  });

  return fileName
};

export const getProcessedImage = (camID: string) => {
  if (!(camID in storage)) {
    return;
  }

  return storage[camID].processed;
};
