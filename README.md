htmlTT.js
=====

Configurable JavaScript/HTML tooltips. IE6+. Small size (2.7k minified, 1.3k gzipped), no dependencies.


## API:

	htmlTT.create(group[, options]);
		group 	- (string) name of tooltip group
		options - (object) options hash:
			pos   - (object, default {"x": 0, "y": 0} | boolean false) px offsets of tooltip position. false means no positioning at all
			class - (string) extra css class for tooltip view
			view  - (DOM node | string (DOM node id)) element to display tooltip in (no positioning)


## Basic usage:

First, include `htmlTT.css` in the head section of your page
  
	<link rel="stylesheet" type="text/css" href="htmlTT.css" />

Second, annotate your HTML with the `data-htmltt` attribute.
The attribute's value represents the tooltip group and the DOM id of a HTML source, like:
`[group]#[srcId]`

	<ul>
		<li data-htmltt="foo#info1">Bloody information</li>
		<li data-htmltt="foo#info2">Other information</li>
	</ul>


Third, create the HTML for your tooltips like this:

	<script type="text/x-htmltt" id="info1">
		<h3>Fee fi fo fum</h3>
		<p>I smell the DOM</p>
	</script>
	<script type="text/x-htmltt" id="info2">
		<h3>Yo</h3>
		<p>I left my wallet in el Segundo</p>
	</script>


Then, at the bottom of the page, include your preferred version of `htmlTT.js` and initialize the tooltips for each group by calling `htmlTT.create()`:
	
	<script src="htmlTT.min.js"></script>
	<script>
		htmlTT.create("foo");
		// variants:
		// htmlTT.create("foo", {"class": "custom-styles"});
		// htmlTT.create("foo", {"pos": {"x": 10, "y": 10}});
	</script>
	

Pressing `ESC` on the page closes any open tooltips.

When active, the tooltip view element gets set with two attributes: `data-htmltt-group` and `data-htmltt-src`, which contain the group name of the tooltip show and the DOM id of the source of its current HTML.

At the same time, the element which triggered the tooltip receives the attribute `data-htmltt-active`, with the value of the tooltip group name.


Check out the demo page at [http://npup.github.io/htmlTT/](http://npup.github.io/htmlTT/)
