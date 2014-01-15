$(document).on('click', 'a.dl', function() {

    var data = {
        mod: 1
    }

    $.ajax({
        type: 'POST',
        url: '/api/download',
        data: data
    }).done(function(response) {
        location.reload();
    });

});