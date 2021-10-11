import fetch from 'node-fetch';
import { addImageToQueue, setImageAsProcessed } from '@utils/storage';
import { PICTURE_DIST_DIR, WATCHER_PERIOD, CAMERAS } from '@constants';
import type { IUploadedImage } from '@utils/storage/storage.types';
import processFile from '@utils/pymodules';

const watcher = (): void => {
  const createTimer = (camID: string, camUrl: string) =>
    setTimeout(() => {
      fetch(camUrl)
        .then((res) => res.arrayBuffer())
        .then((data) => addImageToQueue(camID, Buffer.from(data)))
        .then((uploadedImage: IUploadedImage) => {
          if (!uploadedImage) {
            return;
          }

          console.log(`File saved as ${uploadedImage.path}`);

          const distFileName = `${PICTURE_DIST_DIR}/${uploadedImage.name}`;
          return processFile(uploadedImage.path, distFileName)
            .then(() => {
              console.log(`File processed and saved to ${distFileName}`);
              setImageAsProcessed(camID, distFileName);
            })
            .catch(console.error);
        })
        .catch((err) => console.log('Something went wrong', err))
        .finally(() => createTimer(camID, camUrl));
    }, WATCHER_PERIOD);

  Object.entries(CAMERAS).map((params) => createTimer(...params));
};

export default watcher;
