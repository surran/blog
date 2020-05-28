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
    else if (req.path == "/founder")
    {
        const filePath = path.resolve(__dirname, '..', '..', 'build-stable', 'index.html');

        fs.readFile(filePath, 'utf8', (err, htmlData) => {
            if (err) {
                console.error('err', err);
                return res.status(404).end()
            }

            const title = "Founder - Terminalnotes.com"
            const desc = "Surya Ranjan Shandil is a 33 year old computer programmer and artist from Bengaluru, India. He is the founder and owner of Terminalnotes.com and has worked in capacity of software developer at Ck12.org and Ansys Inc."
            const image = "https://www.terminalnotes.com/meLarge.jpg"

            return res.send(
                htmlData.replace(
                    '<meta>',
                    `<title>${title}</title>
                    <meta name="og:title" content="${title}" />
                    <meta name="og:image" content="${image}" />
                    <meta name="description" content="${desc}" />       
                    <meta name="og:description" content="${desc}" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:site" content="@surranshan"/>
                    <meta name="twitter:creator" content="@surranshan"/>
                    <meta name="twitter:title" content="${title}"/>
                    <meta name="twitter:description" content="${desc}" />
                    <link rel="canonical" href="https://www.terminalnotes.com/founder">
                    <meta name="twitter:image" content="${image}"/>`
                )
            );
        });
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