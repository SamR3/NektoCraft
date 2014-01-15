$(document).on('submit', 'form.add', function (e) {
    e.preventDefault();

    var mod = $('#mod').val();
    var version = $('#ver').val();
    var minecraftVersion = $('#mineVer').val();
    var info = $('#info').val();
    var link = $('#link').val();
    var release = $('#release').val();

    var data = {
        mod: mod,
        version: version,
        minecraftVersion: minecraftVersion,
        info: info,
        link: link,
        release: release
    };

    $.ajax({
        type: 'POST',
        url: '/api/add_release',
        data: data
    }).done(function(response) {
        location.reload();        
    }).fail(function() {
        $('#alert').append('<div class=\'alert\'>Unexpected error! Please try again.</div>');
    });


});