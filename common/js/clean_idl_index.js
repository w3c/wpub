function clean_idl_index() {
    // 1. Get all the (partial) definitions for the publication manifest IDL
    const all_defs = Array.from(document.querySelectorAll('section#idl-index pre.idl span[data-title=PublicationManifest'));

    // 2. Collect all the definition into one HTML text. Note that the first entry is empty, should be
    // kept for the final display.
    // The HTML that must be found is what is between the `{` and the `}` characters.
    const all_defs_essential = all_defs.slice(1).map((def) => def.innerHTML.split('{')[1].split('}')[0]).join('');

    // 3. The partial definitions, as well as the preceding empty line, should be removed
    all_defs.slice(1).forEach((def) => {
        const previous = def.previousSibling;
        previous.remove();
        def.remove()
    });

    // 4. Add the definition to the first definition which is still around
    // 4.1 looking for object title
    const object_title = all_defs[0].querySelector('.idlID');
    // 4.2 remove the next sibling, which is a text node with the empty definition
    object_title.nextSibling.remove();
    // 4.3 create a new span with the html content and add this to the definition
    const new_span = document.createElement('span');
    new_span.innerHTML = ` {${all_defs_essential}};`
    object_title.parentNode.append(new_span);
}


