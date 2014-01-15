$(document).on('submit', 'form.add', function(e) {

    e.preventDefault();

    var name = $('#name').val();
    var user = $('#user').val();
    var pass = $('#pass').val();
    
    var data = {
        name: name,
        user: user,
        pass: pass
    };

    $.ajax({
        type: 'POST',
        url: '/api/admin',
        data: data
    }).done(function(response) {
        $(this).html("<h3>Account successfully created!</h3>");
    }).fail(function() {
        $(this).html('<div class=\'alert\'>Unexpected error! Please try again.</div>');
    });

    return false;
});