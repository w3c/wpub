# Web Publication Experiments

The [experiments folder](https://github.com/w3c/wpub/tree/master/webpub/experiments) lists various initiatives (example files, books, publications, etc.) that have been undertaken by the Working Group as part of the development of the [Web Publications specification](https://www.w3.org/TR/wpub/webpub). These experiments, by their nature, may become obsolete as the final specification evolves, but are retained here nevertheless.

## Proofs of Concept

### Web Publications

- [Embedded Manifest](https://github.com/w3c/wpub/tree/master/webpub/experiments/manifest_script) — Demonstrates an example of a Web Publication with its manifest embedded in a `script` tag in the entry page header.
- [Embedded Manifest](https://github.com/w3c/wpub/tree/master/webpub/experiments/manifest_script) — Demonstrates an example of a Web Publication with its manifest embedded in a `script` tag in the entry page header.
- [HTML with JSON-LD - No Manifest](https://github.com/w3c/wpub/tree/master/webpub/experiments/html-schema-org-json-ld) — An alternative to the Web Publication manifest, this example demonstrates a basic HTML page with only schema.org metadata.
- [Linked Manifest](https://github.com/w3c/wpub/tree/master/webpub/experiments/separate_manifest) — Demonstrates a Web Publiction where the manifest is stored in a separate JSON file and linked to from the entry page.
- [Minimal and Full Manifest](https://github.com/w3c/wpub/tree/master/webpub/experiments/w3c_rec) — Demonstrates both the bare minimal set of manifest metadata required by the Web Publication manifest and a more expansive record.

## Processing Tools

- [Canonical Manifest Generator](https://github.com/iherman/WPManifest) — Demonstrates how to compile a canonical manifest from a Web Publication's manifest and entry page (source hosted in a separate repository). This tool can also be [tested live](https://iherman.github.io/WPManifest/webview/).
- [Table of Contents Generator](https://github.com/w3c/wpub/tree/master/webpub/experiments/toc_generator) — Demonstrates how an HTML `nav` can be processed by user agents to extract the table of contents. This tool can also be [tested live](https://w3c.github.io/wpub/webpub/experiments/toc_generator/).
