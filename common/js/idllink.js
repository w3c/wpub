
function convert_dfn_to_link() {
	var defs = document.querySelectorAll("*[data-dfn-for='PublicationManifest']");
	
	if (defs) {
		defs.forEach( function(elem) {
			var dfns = elem.querySelectorAll('dfn');
			
			if (dfns) {
				dfns.forEach( function(dfn) {
					var link = document.createElement('a');
						link.setAttribute('href', '#idl-def-publicationmanifest-' + dfn.textContent.toLowerCase());
						link.appendChild(dfn.cloneNode(true));
					
					dfn.parentNode.replaceChild(link,dfn);
				});
			}
		});
	}
}
