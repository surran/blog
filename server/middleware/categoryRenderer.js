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

        const category = categories.filter(category => `/${category.handle}` == req.path)
        
        let title = ""
        let desc = ""
        let image = ""
        if (category.length > 0)
        {
            title = category[0].title + " - Terminal Notes"
            desc = category[0].desc
            image = ""//category[0].image.url
        }
        return res.send(
            htmlData.replace(
                '<head>',
                `<head>
                    <meta charset="utf-8" />
                    <title>${title}</title>
                    <meta name="google-site-verification" content="dLqzs6Uj-FT1CFOtyxv8k40FmEHuEJa75U2ryXnjUyg" />
                    <link rel="icon" href="/favicon.ico" />
                    <!--<link rel="stylesheet" href="https://stackedit.io/style.css" />-->
                    <link rel="stylesheet" href="/trimmedStyle.css">
                    <link href="https://fonts.googleapis.com/css?family=Lato:400,900&display=swap" rel="stylesheet">
                    <link href="https://fonts.googleapis.com/css?family=Luckiest+Guy&display=swap" rel="stylesheet">
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
            ).replace('<script></script>', `<script>window.categories = ${JSON.stringify(categories)}</script>`)
        );
        
    });
}