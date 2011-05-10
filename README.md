Simple pagination with JavaScript
==================================================
This is lightweight pagination on JavaScript. 
You can use it that would not display the entire list of pages on your site.
All the information you require is:

elements_count || pages_count

&&

current_page   || auto_detect_current_page


Installation
--------------------------------------

Add pagination js file into your folder with javascripts.
Include the simple_paginator.js file in your html page:

	<script type="text/javascript" src="/simple_paginator.js"></script>

Example usage
--------------------------------------

Insert this block of code into your page

	<script type="text/javascript"> 
	//<![CDATA[
	
	  // display paginator in html code
	  display_paginator({
	    pages_count: 100,
	    current_page: 5,
	    page_url: '/show?pg=%page%' + addon_params});
	
	//]]>
	</script>

The result obtained:

« Previous 1 2 3 4 **5** 6 7 8 9 10 11 12 ... 100 Next »

Or if you want to display paginator in several places, then:

	<script type="text/javascript"> 
	//<![CDATA[
	
	  // get html code of pagination
	  var paginator_html = display_paginator({
	    elements_count: 100,
	    auto_detect_current_page: 1,
	    display_paginator: 0,
	    page_url: '/show?type=5&page=%page%'});
	
	  // write code into page
	  document.write(paginator_html); // or onload in different places
	
	//]]>
	</script> 

**1** 2 3 4 5 6 7 8 ... 10 Next »

Examples
--------------------------------------

See more examples in example.js file
Online example: [pagination](http://malyh.com/examples/pagination)

Authors
--------------------------------------

Personal blog author: [Malykh Oleg](http://malyh.com/) - blog in russian


