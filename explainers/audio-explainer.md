# Audiobooks Explainer 
## What is an audiobook and why are we doing this?
This sounds like an easy question, a “book with audio”! Audiobooks, for the purposes of the scope of our work right now, are publications that are primarily audio-based. Audiobooks can contain non-audio content like supplements or navigational documents, but their main content is in audio format. 

Audiobooks have grown massively in popularity in the last few years despite being a segment of the industry for far longer. The main reason for this shift is due to several technologies:
* Pervasiveness of mobile devices (phones and tablets)
* Improved mobile storage capacity
* Improved mobile networks (3G, 4G, LTE)
* Widespread use of wifi

When previously users would need several CDs to listen to one audiobook, they can now stream or download and listen to their chosen content anywhere, any time. Audiobooks, like ebooks, are now in their pockets on demand. 

The main difference between ebooks and audiobooks is currently their level of specification. The EPUB format has existed as an open standard in one form or another for almost 20 years, but audiobooks still do not benefit from a standard format. A mature publishing industry has co-opted audiobooks to make them work within the same contexts, but the lack of standardization has made this process arduous for audiobook studios, distributors, retail platforms, user agents and by extension, users. 

## Key Use cases and Current Issues

### The Business Problem

Publishers usually team up with specialized studios to produce audiobook content. Once produced, each audiobook is sent to different distributors and retail platforms. Distributor are themselves hubs in the supply chain, which redirect the audiobooks to multiple retail (or public lending) platforms.

Today, audio content is split into a number of mp3 files simply ordered by their file name. Each audiobook is then usually packaged in a zip file. The quality and size of these files is constrained by the target distributors. Embedded metadata is sparse due to file format restrictions, and different standards across distributors and retailers results in publishers sending different files to each. This results in duplicated effort, increases the chances of errors, and makes the supply chain less efficient.

Different platforms offer users different ways to download audiobooks: some provide apps which totally hide the format, others offer a zip download or, if the book is huge (more than 800 Mb maybe), a series of zip downloads. Alternatively, many platforms offer a "streaming" service, or more properly speaking a progressive download mp3 service, open to authentified users. The audiobook platform displays useful metadata and allows navigating from track to track. Streaming requires being online, but it avoids downloading hundreds of megabytes of data before listening to audio content. 

By creating a format that allows for consistent, standardized embedded metadata, retailers and users will have access to essential metadata for the file, in addition to any retail metadata (i.e. ONIX) they may use. Creating a format with a clearly defined TOC format allows for clear navigation for both user and reading system. 


## Goals

* Create a specification for the audiobook format that is usable on both the web and in packaged contexts
* Create a specification that supports all of the major use cases of audio
* Create a specification that is accessible
* Create a specification that meets the needs and requirements of publishers, user agents, and users

## Out of Scope

* Synchronized media -- we will be referencing and supporting this as a companion specification
* DRM -- as outlined by our charter.

## Key Features

The Audiobooks Task Force has described the core audiobook experience as:

* Content that can be listened to from beginning to end without user input (moving forwards/backwards through the reading order without manual input).
* Content that can be paused, played, moved forwards and backwards.
* Content for which the listening position is retained for the next reading session.
* Content for which the user can access at any time a table of contents equivalent to the one associated with the book.
* Content for which the user can always know his position.
* Content where the user knows how long is remaining in the chapter/section/audiobook.
* Content that can be streamed, offlined, and downloaded.
* A format with complete metadata support.

## How It Works

The basic idea is simple: store in a given folder audio files, a cover image, metadata and table of contents, any supplemental material; zip that folder. 

The tricky part is the metadata. We use the term "manifest" to describe the list of audio files, in order, that make up the book. The manifest also includes bibliographic metadata, and identifies special resources like a cover image or a table of contents. To make all that information easily machine-readable, it's structured as JSON. We expect that there will be simple tools available to create this format. 

The manifest format comes from the W3C's [Web Publication Manifest](https://w3c.github.io/wpub/) spec, which we hope will be used for many different types of publications.

### Sample Folder

![Folder structure of audiobook](audiopub-folder.png)

## Considered Alternatives

There were several considered alternatives, we have outlined their use and the reasons why we are proceeding with a new standard:

#### [DAISY Talking Books](http://www.daisy.org/daisypedia/daisy-digital-talking-book)

Since 2001 (!) people with print disabilities benefit from from Daisy Digital Talking Books (DTB). In one of its profiles, a DTBook contains a set of audio tracks, a Table of Contents and a full set of metadata. DTBooks are often produced via the OBI Daisy tool. 

Many specialized players support the Daisy DTBook format, but this is still a niche format, unused in the publishing industry. In the ebooks domain, the Daisy format tends to be replaced by the EPUB 3 format, with a full support from the Daisy Consortium; the same will certainly happen if a global standard emerges for audiobooks, with proper support for core accessibility features.   

#### HTML Custom Elements

HTML does have an `audio` element. It would be possible to have the Primary Entry Page of the Web Publication be an HTML page that contains `audio` elements for each constituent resource. Someone wrote a custom element called  [x-playlist](https://github.com/heff/x-playlist) that wrapped a sequence of audio elements, auto-playing them in order with no intervention. A member of the working group created a [sample audio book](https://dauwhe.github.io/html-first/flatland-custom-element/) using this approach.

#### EPUB 3 for Audio Books

The existing EPUB 3 specification could be changed to allow audio core media types as spine items. We could then take advantage of EPUB's existing metadata and packaging features. 

#### M4B

M4B is an audiobook format based on the [MPEG-4 Part 14](https://en.wikipedia.org/wiki/MPEG-4_Part_14) container specification. They can contain multiple audio files, a cover image, and metadata. Audiobook providers such as Librevox often supply M4B to end users. They can be played in iTunes. M4B was explored as an option but dismissed because of the complications to produce it, and the ill-fit of the metadata model. 

#### Web Packaging

The Working Group is very interested in Web Packaging as a future option for Audiobooks (and other web publications), but due to timing, we have decided to proceed with a temporary option in the Lightweight Packaging Format (https://w3c.github.io/pwpub/), until there is a viable web option. 

#### HEIF (High Efficiency Image Format)

We explored the possibility of HEIF after it was suggested the image format could be modified for audio, and had the flexibility of storage and metadata we would require. After exploring the format and having an expert present on it, it was decided that while promising, the format would be too complicated for workflows and users. 


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


