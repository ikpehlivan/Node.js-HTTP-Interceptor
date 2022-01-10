const express = require("express");
const puppeteer = require("puppeteer");

const port = 3000;
const app = express();

var myLogger = function (req, res, next) {
    console.log(req.get('User-Agent'))
    next()
  }
  
  app.use(myLogger)
  

app.get("/", (req, res) => {
    (async () => {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setExtraHTTPHeaders({
            'User-Agent': 'test'
        })
        page.on('request', req => {
            console.log(req.headers());
        })
        await page.goto('http://testphp.vulnweb.com');
      
        //await browser.close();
      })();

      res.send('işlem tamam')
});

app.listen(port, () => {
  console.log(`sunucu çalışıyor`);
});
