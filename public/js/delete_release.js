$(document).on('click', '.close', function() {

    var id = $(this).parent().parent().find('.id').val();

    var data = {
        _id: id
    };

    $.ajax({
        type: 'POST',
        url: '/api/delete_release',
        data: data
    }).done(function(response) {
        $(this).parent().parent().hide();
        location.reload();
    }).fail(function() {
        $parent.parent().html('<tr><td class=\'alpha\' colspan=\'4\'>Error! Refresh and try again.</td></tr>');
    });

});