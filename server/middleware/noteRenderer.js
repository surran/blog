import rest from "./rest"
import categories from "./../../src/data/categories"

const path = require("path");
const fs = require("fs");

export default (req, res, next) => {

    // point to the html file created by CRA's build tool
    const filePath = path.resolve(__dirname, '..', '..', 'build-stable', 'index.html');

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('err', err);
            return res.status(404).end()
        }

        const options = {
                            host: 'surran.github.io',
                            port: 443,
                            path: '/mark-downs/index.json',
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        };
                        

        rest.getJSON(options, (statusCode, result) => {
        // I could work with the resulting HTML/JSON here. I could also just return it
        //console.log(`onResult: (${statusCode})\n\n${JSON.stringify(result)}`);
        console.log(req.path.split("/")[1])
        const note = result.filter(note => `${note.handle}` == req.path.split("/")[2])
        //res.statusCode = statusCode;
        console.log(JSON.stringify(note))
        let title = note.name
        let desc = note.desc
        let image = "image"
        if (note.length > 0)
        {
            title = note[0].name
            desc = note[0].desc
            image = note[0].illustration.image
        }
        return res.send(
            htmlData.replace(
                '<meta>',
                `   <meta charset="utf-8" />
                    <title>${title}</title>
                    <meta name="google-site-verification" content="dLqzs6Uj-FT1CFOtyxv8k40FmEHuEJa75U2ryXnjUyg" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="theme-color" content="#FFFFFF" />
                    <meta name="og:title" content="${title}" />
                    <meta name="og:image" content="${image}" />
                    <meta name="description" content="${desc}" />       
                    <meta name="og:description" content="${desc}" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:site" content="@surranshan"/>
                    <meta name="twitter:creator" content="@surranshan"/>
                    <meta name="twitter:title" content="${title}"/>
                    <meta name="twitter:description" content="${desc}" />
                    <meta name="twitter:image" content="${image}"/>`
            )
        );
        });
        // inject the rendered app into our html and send it
        
    });
}