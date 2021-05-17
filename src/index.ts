import app from './app';
import upload from './views/upload';
import get from './views/get';

app.post('/upload/', upload);
app.get('/get/', get);
