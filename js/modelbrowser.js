// Initialize Description
$(function(){
    var title = $('#model-title');
    var author = $('#model-author');
    var first_model = $('.model-table > tbody > tr:first-child');
    title.text($(first_model).find('td:first-child').text());
    author.text($(first_model).find('td:nth-child(2)').text());
});

// Update Description Click Handler
$(function(){
    var title = $('#model-title');
    var author = $('#model-author');
    var models = $('.model-table > tbody > tr');
    models.each(function() {
        $(this).click(function () {
            title.text($(this).find('td:first-child').text());
            author.text($(this).find('td:nth-child(2)').text());
        });
    });
});