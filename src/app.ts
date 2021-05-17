import express from 'express';
import fileUpload from 'express-fileupload';
import { PORT, HOST } from '@constants';

const app = express();

app.use(fileUpload({}));

app.listen(PORT, HOST, () => {
    console.log(`Listening at ${PORT} port`)
});

export default app;
