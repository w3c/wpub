all: WP-diagram.png clean_up_data.png find_manifest.png canonicalize_manifest.png convert_manifest.png manifest_lifecycle.png

%.png : %.svg
	svgConvert -w 800 $<
	cp $< $(basename $<).png ../snapshot/images
