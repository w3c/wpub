
function denumber_parts() {
	
	var toc_entries = document.querySelectorAll('nav#toc > ol.toc > li.tocline');
	
	for (var i = 0; i < toc_entries.length; i++) {
		toc_label = toc_entries[i].querySelector('a.tocxref');
		
		if (toc_label.textContent.match(/part i+:/i)) {
			toc_label.classList.add('suppress');
		}
	}
}
