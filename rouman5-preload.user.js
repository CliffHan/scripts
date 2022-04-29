// ==UserScript==
// @name         rouman5-preload
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  preload rouman5 image
// @author       You
// @match        https://rouman01.xyz/books/*/*
// @match        https://rouman5.com/books/*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';
    var fetchArray = [];
    const loadImage = (src) => new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });

    let data = JSON.parse(document.getElementById("__NEXT_DATA__").innerHTML);
    if (data.props.pageProps.images) {
        console.log(`direct image, count=${data.props.pageProps.images.length}`)
        for (const [index, value] of data.props.pageProps.images.entries()) {
            console.log(`loading image ${index}, url=${value.src}`);
            try {
                let tempImage = await loadImage(value.src);
                fetchArray.push(tempImage);
            } catch (error) {
                console.error(error);
            }
        }
        return;
    }
    console.log('indirect image, fetch chapter api path');
    let response = await fetch(data.props.pageProps.chapterAPIPath);
    let chapters = await response.json();
    console.log(`fetch finished, count=${chapters.chapter.images.length}`)
    for (const [index, value] of chapters.chapter.images.entries()) {
        console.log(`loading image ${index}, url=${value.src}`);
        try {
            let tempImage = await loadImage(value.src);
            fetchArray.push(tempImage);
        } catch (error) {
            console.error(error);
        }
    }
})();
