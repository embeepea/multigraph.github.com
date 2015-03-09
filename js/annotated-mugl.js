$('document').ready(function() {
  $('span.element span.expanded').hide();

  $('span.element').each(function() {
      var collapsed_span = $(this).find('>span.collapsed');
      var expanded_span = $(this).find('>span.expanded');
console.log(collapsed_span.find('>span.target'));
      collapsed_span.find('>span.target').click(function() {
console.log('expanding');
          collapsed_span.hide();
          expanded_span.show();
      });
      expanded_span.find('>span.target').click(function() {
console.log('collapsing');
          expanded_span.hide();
          collapsed_span.show();
      });
  });

  $('.boolean').tooltip({
	track: true,
	delay: 0,
	showURL: false,
	extraClass: "pretty",
	fixPNG: true,
	opacity: 0.95,
	left: -120,
	  bodyHandler : function() {
		return $('<div>Here is a<br/>test with<br/>three lines</div>');
	}
  });

});
