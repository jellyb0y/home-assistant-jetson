import { REQ_FILE_NAME, REQ_CAM_ID, PICTURE_DIST_DIR } from '@constants';
import { addImageToQueue, setImageAsProcessed } from '@utils/storage';
import processFile from '@utils/pymodules';

import type { IUploadedImage } from '@utils/storage/storage.types';

const upload = (req, res): Promise<void> => {
  const file = req.files[REQ_FILE_NAME];
  const camID: string = req.body[REQ_CAM_ID];

  if (!camID) {
    const errorMessage = 'Error: CamID not provided';
    res.status(400).send(errorMessage);
    console.error(errorMessage);
    return;
  }

  if (!file) {
    const errorMessage = 'Error: Image not provided';
    res.status(400).send(errorMessage);
    console.error(errorMessage);
    return;
  }

  return addImageToQueue(camID, file)
    .then((uploadedImage: IUploadedImage) => {
      if (!uploadedImage) {
        res.status(200).send('Wait');
        return;
      }

      res.end('Ok');
      console.log(`File saved as ${uploadedImage.path}`);

      const distFileName = `${PICTURE_DIST_DIR}/${uploadedImage.name}`;
      return processFile(uploadedImage.path, distFileName)
        .then(() => {
          console.log(`File processed and saved to ${distFileName}`);
          setImageAsProcessed(camID, distFileName);
        })
        .catch(console.error);
    })
    .catch(() => {
      res.status(400).send('Something went wrong');
    });
};

export default upload;
