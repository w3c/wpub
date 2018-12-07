# Audiobooks Explainer 
## What is an audiobook and why are we doing this?
This sounds like an easy question, a “book with audio”! Audiobooks, for the purposes of the scope of our work right now, are publications that are primarily audio-based. Audiobooks can contain non-audio content like supplements or navigational documents, but the content is in audio format. 

Audiobooks have grown massively in popularity in the last few years despite being a segment of the industry for far longer. The main reason for this shift is due to several technologies:
* Mobile devices (phones and tablets)
* Improved mobile networks (3G, 4G LTE)
* Improved mobile storage capacity
* Widespread use of wifi

When previously audiobook users would need several CDs to listen to their audiobook, they can now stream, download, and listen to their chosen content anywhere and time they choose. Audiobooks, like ebooks, are now in their pockets on demand. 

The main difference between ebooks and audiobooks currently is their level of specification. EPUB has existed in one form or another for almost 20 years, audiobooks still does not have a common specification. A mature ebooks industry co-opted audiobooks to make them work within the same contexts, but the lack of specification has made this process arduous for user agents and by extension, users. 

An audiobooks spec would also help with B2B relationships. Today publishers have to deal with multiple non-standards, preparing files and metadata differently for each audiobook distributor. This results in duplicated effort, increases the chances of errors, and makes the supply chain less efficient.

It is in the interest of users, creators, and distributors that we push to create a single specification for audiobooks. 
## Goals
* Create a specification for the audiobook format that is usable on both the web and in packaged contexts
* Create a specification that supports all of the major use cases of audio
* Create a specification that is accessible
* Create a specification that meets the needs and requirements of publishers, user agents, and users
## Out of Scope
* Synced media -- though the needs of sync media in a metadata/structure context will be taken into account
* DRM (as outlined by our charter)
## Key Use Cases
The Audiobooks Task Force has identified the definition of an essential audiobook experience as:
* A format that can be listened to from beginning to end without user input (moving forwards/backwards through the reading order without manual input)
* A format that can be paused, played, moved forwards and backwards
* A format where the listening position is retained for the next reading session
* A format where the user can access the table of contents at any time
* A format where the user can always find their position
* A format where the user knows how long is remaining in the chapter/section/audiobook
* A format that can be streamed, offlined, and downloaded
* A format with clear metadata supported for user libraries (title, author, narrator, cover, duration, etc.)

## Considered Alternatives
There were several considered alternatives:
* [DAISY Talking Books](http://www.daisy.org/daisypedia/daisy-digital-talking-book)
* [x-playlist](https://github.com/heff/x-playlist)
* Extending EPUB3 OPF and OCF to allow media links in the `<spine>`

## References and Acknowledgements
### Experiments:
#### Audiobook Web Publication:
https://github.com/w3c/wpub/tree/master/experiments/audiobook (code)
https://w3c.github.io/wpub/experiments/audiobook/index.html (sample)

Sample Manifest:
```
{
  "@context": ["https://schema.org", "https://www.w3.org/ns/wp-context"],
  "type": "Audiobook",
  "id": "https://librivox.org/flatland-a-romance-of-many-dimensions-by-edwin-abbott-abbott/",
  "url": "https://w3c.github.io/wpub/experiments/audiobook/",
  "name": "Flatland: A Romance of Many Dimensions",
  "author": "Edwin Abbott Abbott",
  "readBy": "Ruth Golding",
  "publisher": "Librivox",
  "inLanguage": "en",
  "dateModified": "2018-06-14T19:32:18Z",
  "datePublished": "2008-10-12",
  "license": "https://creativecommons.org/publicdomain/zero/1.0/",

  "resources": [
    {"rel": "cover", "url": "http://ia800704.us.archive.org/9/items/LibrivoxCdCoverArt12/Flatland_1109.jpg", "encodingFormat": "image/jpeg"},
    {"rel": "contents", "url": "toc.html", "encodingFormat": "text/html"}
  ],

  "readingOrder": [
    {"url": "http://www.archive.org/download/flatland_rg_librivox/flatland_1_abbott.mp3", "encodingFormat": "audio/mpeg", "name": "Part 1, Sections 1 - 3"},
    {"url": "http://www.archive.org/download/flatland_rg_librivox/flatland_2_abbott.mp3", "encodingFormat": "audio/mpeg", "name": "Part 1, Sections 4 - 5"}, 
    {"url": "http://www.archive.org/download/flatland_rg_librivox/flatland_3_abbott.mp3", "encodingFormat": "audio/mpeg", "name": "Part 1, Sections 6 - 7"}, 
    {"url": "http://www.archive.org/download/flatland_rg_librivox/flatland_4_abbott.mp3", "encodingFormat": "audio/mpeg", "name": "Part 1, Sections 8 - 10"}, 
    {"url": "http://www.archive.org/download/flatland_rg_librivox/flatland_5_abbott.mp3", "encodingFormat": "audio/mpeg", "name": "Part 1, Sections 11 - 12"}, 
    {"url": "http://www.archive.org/download/flatland_rg_librivox/flatland_6_abbott.mp3", "encodingFormat": "audio/mpeg", "name": "Part 2, Sections 13 - 14"}, 
    {"url": "http://www.archive.org/download/flatland_rg_librivox/flatland_7_abbott.mp3", "encodingFormat": "audio/mpeg", "name": "Part 2, Sections 15 - 17"}, 
    {"url": "http://www.archive.org/download/flatland_rg_librivox/flatland_8_abbott.mp3", "encodingFormat": "audio/mpeg", "name": "Part 2, Sections 18 - 20"}, 
    {"url": "http://www.archive.org/download/flatland_rg_librivox/flatland_9_abbott.mp3", "encodingFormat": "audio/mpeg", "name": "Part 2, Sections 21 - 22"}
  ]
}
```
Entry Page: 
```
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Audiobook Player</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="flatland.json" rel="publication">
</head>
<body>
  <main>
    <img id="cover" style="display:block; margin:auto;">
    <audio id="audio-element" controls controlsList="nodownload" style="display:block; margin:auto;">
      <source id="audio-source" type="audio/mpeg">
    </audio>
  </main>
  <nav style="text-align: center; margin-top: 10px;">
  	<a id="previous" rel="prev">&lt;&nbsp;Previous Track</a>
  	&nbsp;&nbsp;
  	<a id="next" rel="next">Next Track&nbsp;&gt;</a>
    <br />
    <a href="toc.html">Table of Contents</a>
  </nav>
  <script src="polyfills/fetch.js"></script>
  <script src="polyfills/urlsearchparams.js"></script>
  <script src="player.js" async></script>
</body>
</html>
```
HTML TOC Sample:
```
<!DOCTYPE html>
<html>
  <head>
    <title>Table of Contents for Flatland</title>
  </head>
  <body>
    <nav role="doc-toc">
      <ul>
        <li>
          <a href="http://www.archive.org/download/flatland_rg_librivox/flatland_1_abbott.mp3#t=71">Part 1 - This World</a>
          <ul>
            <li>
              <a href="http://www.archive.org/download/flatland_rg_librivox/flatland_1_abbott.mp3#t=80">Section 1 - Of the Nature of Flatland</a>
            </li>
            <li>
              <a href="http://www.archive.org/download/flatland_rg_librivox/flatland_1_abbott.mp3#t=415">Section 2 - Of the Climate and Houses in Flatland</a>
            </li>
            <li>
              <a href="http://www.archive.org/download/flatland_rg_librivox/flatland_1_abbott.mp3#t=789">Section 3 - Concerning the Inhabitants of Flatland</a>
            </li>
            <li>
              <a href="http://www.archive.org/download/flatland_rg_librivox/flatland_2_abbott.mp3#t=18">Section 4 - Concerning the Women</a>
            </li>...
```
JSON TOC Example: 
```
"toc": [
    {
      "url": "http://www.archive.org/download/flatland_rg_librivox/flatland_1_abbott.mp3#t=71",
      "name": "Part 1 - This World",
      "children": [
        {
          "url": "http://www.archive.org/download/flatland_rg_librivox/flatland_1_abbott.mp3#t=80",
          "name": "Section 1 - Of the Nature of Flatland"
        },
        {
          "url": "http://www.archive.org/download/flatland_rg_librivox/flatland_1_abbott.mp3#t=415",
          "name": "Section 2 - Of the Climate and Houses in Flatland"
        },
        {
          "url": "http://www.archive.org/download/flatland_rg_librivox/flatland_1_abbott.mp3#t=789",
          "name": "Section 3 - Concerning the Inhabitants of Flatland"
        },...
```
#### Packaged Audiobook:
https://www.w3.org/2018/audiobook_examples/flatland.audiopub

## Acknowledgements:


