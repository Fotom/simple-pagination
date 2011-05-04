Simple pagination with JavaScript
==================================================
This is lightweight pagination on JavaScript. 
You can use it that would not display the entire list of pages on your site.


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
    page_url: '/topics.html?fid=5&pg=%page%'+date_params});

//]]>
</script>

The result obtained:

« Previous 1 2 3 4 5 6 7 8 9 10 11 12 ... 100 Next »
