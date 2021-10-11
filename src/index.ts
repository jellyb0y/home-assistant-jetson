import app from './app';
import upload from './views/upload';
import get from './views/get';
import watcher from './workers/watcher';

app.post('/upload/', upload);
app.get('/get/', get);

watcher();
