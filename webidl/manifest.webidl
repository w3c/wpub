dictionary WebPublicationManifest {
    required DOMString                          url;
    required DOMString                          type;

             DOMString                          accessMode;
             DOMString                          accessModeSufficient;
             DOMString                          accessibilityAPI;
             DOMString                          accessibilityControl;
             DOMString                          accessibilityFeature;
             DOMString                          accessibilityHazard;
             DOMString                          accessibilitySummary;

             DOMString                          id;

             sequence<Person>                   artist;
             sequence<(Person or Organization)> author;
             sequence<Person>                   colorist;
             sequence<(Person or Organization)> contributor;
             sequence<(Person or Organization)> creator;
             sequence<Person>                   editor;
             sequence<Person>                   illustrator;
             sequence<Person>                   letterer;
             sequence<Person>                   penciler;
             sequence<(Person or Organization)> publisher;
             sequence<Person>                   readby;
             sequence<(Person or Organization)> translator;

             DOMString                          inLanguage;
             TextDirection                      inDirection;

             DOMString                          dateModified;
             DOMString                          datePublished;

             ProgressionDirection               readingProgression = "ltr";

             sequence<LocalizableString>        name;

             sequence<PublicationLink>          readingOrder;
             sequence<PublicationLink>          resources;
             sequence<PublicationLink>          links;

             DOMString                          accessibilityReport;
             DOMString                           privacyPolicy;
             sequence<DOMString>                cover;
             DOMString                          toc;
};
