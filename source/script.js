/*setInterval(function() {
	// řádkový program
	$(".info").not('.tv2csfd').each(function() {
		$(this).wrap('<span style="white-space: nowrap;" />');
		$(this).after(' <a href="http://www.csfd.cz/hledat/?q='+$(this).text()+'" target="_blank"><img src="http://img.csfd.cz/assets/images/favicon.ico" width="16" height="16" style="vertical-align: bottom;" /></a>');
		$(this).addClass('tv2csfd');
	});

	// sloupcový program
	$(".prog h4").not('.tv2csfd').each(function() {
		$(this).eq(0).append(' <a href="http://www.csfd.cz/hledat/?q='+$(this).text()+'" target="_blank"><img src="http://img.csfd.cz/assets/images/favicon.ico" width="16" height="16" style="vertical-align: bottom;" /></a>');
		$(this).addClass('tv2csfd');
	});
}, 2000);*/

$(function() {
	$tasker = $('<div id="github-tasker" class="markdown-body"><h2 class="discussion-topic-title" style="height: 30px; line-height: 30px;">Github Tasker</h2></div>');
	$tasker.css('position', 'fixed');
	$tasker.css('right', '10px');
	$tasker.css('bottom', '0px');
	$tasker.css('height', '330px');
	$tasker.css('width', '300px');
	$tasker.css('background', '#fff');
	
	$content = $('<div id="github-tasker-content"></div>');
	$content.css('overflow-y', 'auto');
	$content.css('height', '300px');
	$tasker.append($content);
	
	$('.discussion-bubble').each(function() {
		$(this).find('.task-list').each(function(){
			//alert($(this).find('.task-list-item-checkbox:checked').length);
			$content.append($(this).clone());
		});
	});
	
	$('body').append($tasker);
});