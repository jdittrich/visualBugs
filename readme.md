
This is a bookmarklet which allows to take screenshots, annotate them, write some text and send them to a server where text and image are saved. It should serve as a help for projects in which you want participation of people who are not savvy wiith using a bugtracker or even making screenshots. 

##Setup
###Define dependencies
The script has several dependencies. It gets jquery from googles CDN. The others you need provide yourself. On top of the code in `bookmarklet.js` you see: 

    var url_html2canvas=""; //url for  html2canvas
    var url_sketchjs=""; //url for sketchjs
    var url_sentTo=""; //url the image and Text is POSTed to.
    
Download [html2canvas](https://github.com/niklasvh/html2canvas/releases), put it on a server and put in the adress the string for   `url_html2canvas` (so it looks like: `var url_html2canvas="http://example.com/html2canvas.js"; `)

Use the sketchwrapped.js file from the repo, put it on a server and put the address in `url_sketchjs`.

Put the `postpicture.php` file from the repo in an PHP-enabled folder on  a server. Put the location of the script in the `url_sentTo`


###Create the bookmarklet 
Use [bookbu](https://github.com/ardcore/bookbu.js) to convert the code of `bookmarklet.js`  to a bookmarklet. Copypaste the text bookbu creates into the adress field of a bookmark.

###Setup on Server
Like mentioned above, the `postpicture.php` file needs to go on a php enabled webspace. In the folder where you put the file create a *files* folder. In this folder go the reports and the screenshots. 
Enable [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing). If you are on Apache you can use the `.htaccess` file from this repo. 

Be sure that the `postpicture.php` may write in the *files* folder, but that the content of *files* may not be accessed from outside! 

## License
The MIT License (MIT)

Copyright (c)  2014 Jan Dittrich

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
