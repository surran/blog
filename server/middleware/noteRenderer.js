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
        let urlCategory, urlNote;
        const urlSplit = req.path.split("/")
        if (urlSplit.length >= 2)
            urlCategory = urlSplit[1]
        if (urlSplit.length >= 3)
            urlNote = urlSplit[2]
        const note = result.filter(note => `${note.handle}` == urlNote)
        if (urlCategory && urlNote && note.length > 0)
        {
            
            //res.statusCode = statusCode;
            console.log(JSON.stringify(note))
            let title = note[0].name
            let desc = note[0].desc
            let image = `https://surran.github.io/mark-downs/social-share-postcards/${note[0].handle}.png`
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
                        <link rel="canonical" href="https://www.terminalnotes.com/${urlCategory}/${note[0].handle}">
                        <meta name="twitter:image" content="${image}"/>`
                )
            );
        }

        return res.send(htmlData)});
    });
}