import express from 'express';

// we'll talk about this in a minute:
import serverNoteRenderer from './middleware/noteRenderer';
import serverCategoryRenderer from './middleware/categoryRenderer';
import supplementaryRenderer from './middleware/supplementaryRenderer';

import categories from "./../src/data/categories";

const PORT = 8082;
const path = require('path');

// initialize the application and create the routes
const app = express();
const router = express.Router();


// root (/) should always serve our server rendered page
//router.use('^/$', serverRenderer);


  
// Category Renderer
router.get('/', serverCategoryRenderer)

categories.map(category => {
    const categoryHandle = category.handle
    router.get(`/${categoryHandle}`, serverCategoryRenderer)
    router.get(`/${categoryHandle}/*`, serverNoteRenderer)
})

// Special Page Rendered
router.get('/terms-of-use', supplementaryRenderer)
router.get('/privacy-policy', supplementaryRenderer)
router.get('/sitemap.txt', supplementaryRenderer)
router.get('/founder', supplementaryRenderer)

// other static resources should just be served as they are
router.use(express.static(
    path.resolve(__dirname, '..', 'build-stable'),
    { maxAge: '30d' },
));

// tell the app to use the above rules
app.use(router);

app.get('*', serverCategoryRenderer);

// start the app
app.listen(PORT, (error) => {
    if (error) {
        return console.log('something bad happened', error);
    }

    console.log("listening on " + PORT + "...");
});