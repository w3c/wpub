dictionary PublicationLink {
    required DOMString                  url;
             DOMString                  encodingFormat;
             DOMString                  name;
             sequence<DOMString>        rel;
             sequence<PublicationLink>  children;
};
