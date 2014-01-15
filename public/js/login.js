$(function() {

    var $navbarLogin = $('.navbar-login');
    var $loginButton = $navbarLogin.find('#submit');

    $loginButton.on('click', function() {
        var user = escape($('#username').val());
        var pass = escape($('#pass').val());

        var data = {
            user: user,
            pass: pass
        };

        function failLogin(message) {
             message = message || '<h5>Unexpected error! Please try again.</h5>';
            $navbarLogin.html(message);
        }

        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: data
        }).done(function(response) {
            if (response.user) {
                $navbarLogin.html('<h5>Logged in! Refreshing...</h5>');
                location.reload();
            } else {
                failLogin('Invalid login');
            }
        }).fail(function(err) {
            failLogin();
        });

        return false;
    });

});