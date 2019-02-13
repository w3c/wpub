Added on 2018-06-05.

Inspired by [Dave's minimal WPUB](https://github.com/w3c/wpub/wiki/Minimal-WPUB) for a book, I tried to create one for what is equivalent to a scholarly paper. I wanted a real-life example; to avoid copyright issues, I took a W3C document instead: the [Model for Tabular Data and Metadata on the Web](https://www.w3.org/TR/tabular-data-model/). I believe that, as far as a WPUB goes, it is equivalent to a scholarly paper.

The interesting points of this publication, from our point of view:

- It is a single document publication. Ie, the entry point and the main content is the same HTML resource.
- The publication already has a TOC (as generated for the recommendation by respec): its structure is a `section` element with a `ul`. It is not a `nav`, thus. And, of course, they do not use `doc-toc`. In a new WPUB these should be slightly updated, of course, depending on what the final structure is.
- Because it is a single document publication, it is o.k. to use the `title` HTML element (as the spec says) for the `Title` infoset item, it is not necessary to use the relevant `schema.org` `name` property.
- The publication refers to further HTML files that are not in the main thread of the paper, but may essential for the publication (i.e., they should be cached/offlined!), namely:
    - a diff file comparing the document to its previous incarnation
    - a separate html file used for a `longdesc` value for a diagram
- The publication refers to a number of CSV and Excel files, as well as images in different formats, that may be essential for the content of the paper

In other words, the "boundaries" of the publication should include (beyond the CSS files used for rendering) references to other resources. These should be listed explicitly in the resource list of the publication in my view. The document also refers to a number of other HTML files (e.g., in the references) which should _not_ be part of the boundaries, ie, should not be cached/offlined.

I have created two WPUB skeletons. The [simple version](./simple_version.html) has the strict minimum according to our spec. It relies on a number of (reasonable) defaults: the language in the manifest is en-US, the names of persons is enough, the references to svg, png, csv, etc, files do not require media type setting because they are all "well known" to browsers. The [full version](./full_version.html) adds a number of extra metadata entries to, say, the persons, all using the relevant `schema.org` entries, while still referring to the terms listed in our infoset (`schema.org` has many many more metadata entries that could be used, of course). B.t.w., I have added the various `@type` values although, in real practice, I am not sure they are necessary (can be deduced from the values).

The `publ-resources` property is _not_ a `schema.org` term, it is what we could use for the 'Resource List' infoset item. Per JSON-LD rules, by not defining (or, in this case "un-defining" the property with the help of `null`, see examples) this property, with the subtree underneath, will be ignored by any JSON-LD processor.

-- Ivan
