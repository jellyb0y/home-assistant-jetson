import { getProcessedImage } from '@root/storage';
import { REQ_CAM_ID } from '@constants';

const get = (req, res) => {
  const camID: string = req.query[REQ_CAM_ID];

  if (!camID) {
    const errorMessage = 'Error: CamID not provided';
    res.status(400).send(errorMessage);
    console.error(errorMessage);
    return;
  }

  const fileName = getProcessedImage(camID);
  
  if (!fileName) {
    const errorMessage = 'Error: CamID not found';
    res.status(400).send(errorMessage);
    console.error(errorMessage);
    return;
  }

  res.sendFile(fileName);
};

export default get;
