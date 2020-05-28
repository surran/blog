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
        
        if (category.length > 0)
        {
            let title = ""
            if (category[0].title == "All")
                title = "Terminal Notes - Web Development Solutions"
            else
                title = category[0].title + " - Terminal Notes"
            let desc = category[0].seoDescription
            let image = category[0] && category[0].image && category[0].image.url || ""
            let relPath = `/${category[0].handle}`

            return res.send(
                htmlData.replace(
                    '<meta>',
                    `<title>${title}</title>
                    <link rel="canonical" href="https://www.terminalnotes.com${relPath}">
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
        }
        return res.status(404).send(htmlData)
    });
}