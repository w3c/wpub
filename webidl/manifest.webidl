dictionary WebPublicationManifest {
    required DOMString                    url;
    required sequence<DOMString>          type;

             sequence<DOMString>          accessMode;
             sequence<DOMString>          accessModeSufficient;
             sequence<DOMString>          accessibilityAPI;
             sequence<DOMString>          accessibilityControl;
             sequence<DOMString>          accessibilityFeature;
             sequence<DOMString>          accessibilityHazard;
             LocalizableString            accessibilitySummary;

             DOMString                    id;

             sequence<Contributor>        artist;
             sequence<Contributor>        author;
             sequence<Contributor>        colorist;
             sequence<Contributor>        contributor;
             sequence<Contributor>        creator;
             sequence<Contributor>        editor;
             sequence<Contributor>        illustrator;
             sequence<Contributor>        inker;
             sequence<Contributor>        letterer;
             sequence<Contributor>        penciler;
             sequence<Contributor>        publisher;
             sequence<Contributor>        readby;
             sequence<Contributor>        translator;

             DOMString                    inLanguage;
             TextDirection                inDirection;

             DOMString                    dateModified;
             DOMString                    datePublished;

             ProgressionDirection         readingProgression = "ltr";

             sequence<LocalizableString>  name;

   required  sequence<PublicationLink>    readingOrder;
             sequence<PublicationLink>    resources = [];
             sequence<PublicationLink>    links = [];

             PublicationLink              accessibilityReport;
             PublicationLink              privacyPolicy;
             sequence<PublicationLink>    cover;
             HTMLElement                  toc;
};
