dictionary WebPublicationManifest {
    required DOMString                          url;
    required DOMString                          type;

             sequence<DOMString>                accessMode;
             sequence<DOMString>                accessModeSufficient;
             sequence<DOMString>                accessibilityAPI;
             sequence<DOMString>                accessibilityControl;
             sequence<DOMString>                accessibilityFeature;
             sequence<DOMString>                accessibilityHazard;
             LocalizableString                  accessibilitySummary;

             DOMString                          id;

             sequence<Person>                   artist;
             sequence<(Person or Organization)> author;
             sequence<Person>                   colorist;
             sequence<(Person or Organization)> contributor;
             sequence<(Person or Organization)> creator;
             sequence<Person>                   editor;
             sequence<Person>                   illustrator;
             sequence<Person>                   inker;
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

   required  sequence<PublicationLink>          readingOrder;
             sequence<PublicationLink>          resources;
             sequence<PublicationLink>          links;

             PublicationLink                    accessibilityReport;
             PublicationLink                    privacyPolicy;
             sequence<PublicationLink>          cover;
             DOMString                          toc;
};
