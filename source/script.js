$(function() {
	$tasker = $('<div id="github-tasker" class="markdown-body"><div style="border-style: solid; border-color: #CACACA; border-width: 1px 1px 0 1px;"><h2 style="height: 30px; line-height: 30px; margin: 0; font-size: 21px; padding: 0 5px; position: relative; cursor: pointer; background-color: #e1e1e1; background-image: -webkit-linear-gradient(#f8f8f8, #e1e1e1); border-bottom: 1px solid #ccc;">Github Tasker <span id="github-tasker-progress"></span> <input type="checkbox" id="github-tasker-notcheckedonly" style="position: absolute; right: 3px; width: 20px; height: 20px; top: 5px;" /></h2><div id="github-tasker-content"></div></div></div>');
	$tasker.css('position', 'fixed');
	$tasker.css('right', '10px');
	$tasker.css('bottom', '0px');
	$tasker.css('width', '300px');
	$tasker.css('background', '#fff');
	$tasker.css('border-top', '3px solid #EEE');
	$tasker.css('border-left', '3px solid #EEE');
	$tasker.css('border-right', '3px solid #EEE');

	var $checkbox = $tasker.find('#github-tasker-notcheckedonly');
	var notcheckedonly = $.cookie('github-tasker-notcheckedonly');
	if(notcheckedonly === undefined || notcheckedonly === 'true') notcheckedonly = true;
	else notcheckedonly = false;
	$checkbox.attr('checked', notcheckedonly);
	
	$(document).on('click', '#github-tasker-notcheckedonly', function(e) {
		var $checkboxes = $tasker.find('.task-list li input[type="checkbox"]:checked').closest('li');
		var checked = $(this).is(':checked');
		$checkboxes.toggle(checked);
		$.cookie('github-tasker-notcheckedonly', checked, { expires: 100 });
		e.stopPropagation();
	});

	$content = $tasker.find('#github-tasker-content');
	$content.css('overflow-y', 'auto');	
	
	var show = $.cookie('github-tasker-show');
	if(show === undefined || show === 'false') show = false;
	else show = true;
	$content.toggle(show);
	
	$(document).on('click', '#github-tasker h2', function(e) {
		var show = $.cookie('github-tasker-show')
		if(show === undefined || show === 'false') show = false;
		else show = true;
		$content.toggle(!show);
		$.cookie('github-tasker-show', !show, { expires: 100 });
	});
	
	var checked = 0;
	var total = 0;
	$('.discussion-bubble').each(function() {
		var $comment = $(this);
		$(this).find('.task-list').each(function(){
			checked += $(this).find('.task-list-item-checkbox:checked').length;
			total += $(this).find('.task-list-item-checkbox').length;
			var $header = $comment.find('comment-header').clone();
			$content.append($header);
			$ul = $(this).clone();
			$ul.find('.task-list-item-checkbox').css('margin-top', '2px');
			$ul.css('font-size', '13px');
			$ul.css('line-height', '20px');
			$ul.css('cursor', 'help');
			$ul.find(':checkbox').prop('disabled', true).click(function() {return false;});
			$ul.click(function() {
				$('html, body').animate({
					scrollTop: $comment.offset().top
				}, 500);
			});
			$content.append($ul);
		});
	});
	$tasker.find('#github-tasker-progress').append(' '+checked+'/'+total);
	if(total) {
		$content.css('height', '300px');
	}

	var $checkboxes = $tasker.find('.task-list li input[type="checkbox"]:checked').closest('li');
	$checkboxes.toggle($checkbox.is(':checked'));
	
	$('body').append($tasker);
	
});
