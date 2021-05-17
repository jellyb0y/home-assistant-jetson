import { REQ_FILE_NAME, REQ_CAM_ID } from '@constants';
import { uploadImage } from '@root/storage';

const upload = (req, res) => {
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

  let fileName: string;

  try {
    fileName = uploadImage(camID, file);
  } catch (e) {
    res.status(400).send('Something went wrong');
  }

  res.end('Ok');
  console.log(`File saved as ${fileName}`);
};

export default upload;
