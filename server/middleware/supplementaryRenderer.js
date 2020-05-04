const path = require("path");
const fs = require("fs");

export default (req, res, next) => {

    if (req.path == "/sitemap.txt")
    {
        const filePath = path.resolve(__dirname, '..', '..', 'build-stable', 'sitemap.txt');
        fs.readFile(filePath, 'utf8', (err, text) => {
            if (err) {
                console.error('err', err);
                return res.status(404).end()
            }
            return res.send(text)
        })
    }
    else {
        // point to the html file created by CRA's build tool
        const filePath = path.resolve(__dirname, '..', '..', 'build-stable', 'index.html');


            fs.readFile(filePath, 'utf8', (err, htmlData) => {
            if (err) {
                console.error('err', err);
                return res.status(404).end()
            }

            return res.send(
                htmlData.replace(
                    '<meta>',
                    `<meta name="robots" content="noindex">`
                )
            );
            
        });
    }
}