dictionary WebPublicationManifest {
    required DOMString                         url;
             DOMString                         lang;
             TextDirection                     direction = "auto";
             TextDirection                     readingProgression = "auto";
             sequence<LocalizableString>       name;
             DOMString                         id;
             sequence<Contributor>             authors;
             DOMString                         dateModified;
             DOMString                         datePublished;
             sequence<PublicationLink>         links;
             sequence<PublicationLink>         readingOrder;
             sequence<PublicationLink>         resources;
             sequence<PublicationLink>         toc;
};
