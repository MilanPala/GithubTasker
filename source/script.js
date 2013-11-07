$(function() {
	$tasker = $('<div id="github-tasker" class="markdown-body"><h2 style="height: 30px; line-height: 30px; margin-bottom: 0; font-size: 21px; padding: 0 3px; position: relative; cursor: pointer;">Github Tasker <span id="github-tasker-progress"></span> <input type="checkbox" id="github-tasker-notcheckedonly" style="position: absolute; right: 3px; width: 20px; height: 20px; top: 5px;" /></h2></div>');
	$tasker.css('position', 'fixed');
	$tasker.css('right', '10px');
	$tasker.css('bottom', '0px');
	$tasker.css('width', '300px');
	$tasker.css('background', '#fff');
	$tasker.css('border-top', '1px solid #CACACA');
	$tasker.css('border-left', '1px solid #CACACA');
	$tasker.css('border-right', '1px solid #CACACA');

	var $checkbox = $tasker.find('#github-tasker-notcheckedonly');
	$checkbox.val($.cookie('github-tasker-notcheckedonly'));
	$(document).on('click', '#github-tasker-notcheckedonly', function(e) {
		e.stopPropagation();
		var $checkboxes = $tasker.find('.task-list li input[type="checkbox"]:checked').closest('li');
		$checkboxes.toggle();
		$.cookie('github-tasker-notcheckedonly', $(this).val());
	});
	
	$(document).on('click', '#github-tasker h2', function(e) {
		$content.toggle();
	});
	
	$content = $('<div id="github-tasker-content"></div>');
	$content.css('overflow-y', 'auto');
	$tasker.append($content);
	
	var checked = 0;
	var total = 0;
	$('.discussion-bubble').each(function() {
		var $comment = $(this);
		$(this).find('.task-list').each(function(){
			checked += $(this).find('.task-list-item-checkbox:checked').length;
			total += $(this).find('.task-list-item-checkbox').length;
			var $header = $comment.find('comment-header').clone();
			$content.append($header);
			$li = $(this).clone();
			$li.find('.task-list-item-checkbox').css('margin-top', '2px');
			$li.css('font-size', '13px');
			$li.css('line-height', '20px');
			$content.append($li);
		});
	});
	$tasker.find('#github-tasker-progress').append(' '+checked+'/'+total);
	if(total) {
		$content.css('height', '300px');
	}
	if($checkbox.val() === 'on') {
		var $checkboxes = $tasker.find('.task-list li input[type="checkbox"]:checked').closest('li');
		$checkboxes.hide();
	}
	$('body').append($tasker);
	
});
