// required params: 
//   (elements_count || pages_count),
//   (current_page   || auto_detect_current_page)
function display_paginator(h) {
  
  h = h || {};

  if ((!h.elements_count && !h.pages_count) || (!h.current_page && !h.auto_detect_current_page)) {
    // not throw exception if disabled
    if (h.disable_errors || (h.pages_count == 0) || (h.elements_count == 0)) {
      return '';
    } else {
      throw("Error from simple paginator: Incorrect input values.");
    }
  }

  var default_params = {
    per_page: 10,
    div_class: 'simple_paginator',
    display_paginator: 1, // write html code into document
    display_next_prev_bittons: 1,
    prev_button_name: '&laquo; Previous ',
    prev_button_class: 'simple_paginator_prev_page',
    next_button_name: ' Next &raquo;',
    next_button_class: 'simple_paginator_next_page',
    start_page: 1,
    interval_from_edge_to_current: 7,
    increase_interval_if_close_to_edge: 0,
    display_one_page: 0,
    first_page_separator: ' ... ',
    last_page_separator:  ' ... ',
    page_url: '/page/%page%',
    page_class: 'simple_paginator_page',
    current_page_class: 'simple_paginator_current_page',
    shift_page_number_in_url: 0 // if current page in paginator != page in url (Example: start_page = 0, when normally start_page should be 1)
  };

  // add default_params to input params
  merge_hashes(h, default_params);
  
  // define pages count
  h.end_page = h.end_page || h.pages_count || Math.ceil(h.elements_count/h.per_page);

  // define current_page
  if (h.auto_detect_current_page && !h.current_page) {
    var page_url_local = h.page_url;
    page_url_local = page_url_local.replace(/%page%/,"(\\d+)");
    page_url_local = page_url_local.replace(/\//gi,"\\/");
    page_url_local = page_url_local.replace(/\?/gi,"\\?");
    var regexS  = page_url_local;
    var regex   = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null) {
      h.current_page = start_page;
    } else {
      h.current_page = parseInt(results[1]);
    }
  }

  // simple pagination
  // pagination like (1...10 11 12...100)
  //                 (s...sn n  en...e  )
  //                      sn = n - p        (sn = s if sn - s <= k)
  //                            en = n + p  (en = e if en - e >= -k)
  var current_page = h.current_page; // n
  var start_page = h.start_page;     // s
  var end_page = h.end_page;         // e
  var intermediate_start_page;       // sn
  var intermediate_end_page;         // en
  var intermediate_edge_to_current_pages_count = h.interval_from_edge_to_current; // p
  var intermediate_start_to_current_pages_count = h.interval_from_left_to_current || intermediate_edge_to_current_pages_count; // p for left
  var intermediate_end_to_current_pages_count = h.interval_from_right_to_current || intermediate_edge_to_current_pages_count;  // p for right
  var edge_to_intermediate_pages_count = h.increase_interval_if_close_to_edge;    // k
  var start_to_intermediate_start_pages_count = h.increase_interval_if_close_to_left || edge_to_intermediate_pages_count;      // k for left
  var end_to_intermediate_end_pages_count = h.increase_interval_if_close_to_right || edge_to_intermediate_pages_count;         // k for right
  var paginator_html = h.paginator_html_prefix || '';
  var display_one_page = h.display_one_page; // not display paginator if page == 1

  intermediate_start_page = current_page - intermediate_start_to_current_pages_count;
  intermediate_end_page = current_page + intermediate_end_to_current_pages_count;

  // sn = s if sn - s <= k
  if (intermediate_start_page - start_page <= start_to_intermediate_start_pages_count) intermediate_start_page = start_page;
  // en = e if en - e >= -k
  if (intermediate_end_page - end_page >= -end_to_intermediate_end_pages_count) intermediate_end_page = end_page;

  // collect paginator
  if ((display_one_page || (end_page != start_page)) && (end_page >= start_page)) {
  
    // html collection for simple paginator
    paginator_html += "<div class='"+h.div_class+"'>";
  
    // display prev button
    if (h.display_next_prev_bittons && (current_page != start_page)) {
      var prev_button_page = current_page - 1 + h.shift_page_number_in_url;
      paginator_html += '<a class="'+h.prev_button_class+'" href="'+h.page_url.replace(/%page%/, prev_button_page)+'">' + h.prev_button_name + '</a>';
    }

    // display start page (1...)
    if (intermediate_start_page != start_page) {
      paginator_html += '<a class="'+(h.first_page_class || h.page_class)+'" href="'+
        h.page_url.replace(/%page%/, start_page + h.shift_page_number_in_url)+'">' + start_page + '</a>' + h.first_page_separator;
    }
  
    // display list pages
    for(var i = intermediate_start_page; i <= intermediate_end_page; ++i) {
      if (i == current_page) {
        paginator_html += '<span class="'+h.current_page_class+'">' + i + '</span>';
      } else {
        paginator_html += '<a class="'+h.page_class+'" href="'+h.page_url.replace(/%page%/, i + h.shift_page_number_in_url)+'">' + i + '</a>';
      }
    }
  
    // display end page (...n)
    if (intermediate_end_page != end_page) {
      paginator_html += h.last_page_separator + '<a class="'+(h.last_page_class || h.page_class)+'" href="'+
        h.page_url.replace(/%page%/, end_page + h.shift_page_number_in_url)+'">' + end_page + '</a>';
    }

    // display next button
    if (h.display_next_prev_bittons && (current_page != end_page)) {
      var next_button_page = current_page + 1 + h.shift_page_number_in_url;
      paginator_html += '<a class="'+h.next_button_class+'" href="'+h.page_url.replace(/%page%/, next_button_page)+'">' + h.next_button_name + '</a>';
    }
  
    paginator_html += '</div>';
  
    // display or return pagination html
    if (h.display_paginator) {
      document.write(paginator_html);
    } else {
      return paginator_html;
    }
  
  }

  return paginator_html;
  
}

var merge_hashes = function (h, h_merge) {
  for (var i in h_merge) {
    if (h[i] === undefined) {
      h[i] = h_merge[i];
    }
  }
};
