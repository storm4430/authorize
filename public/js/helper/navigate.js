var Init = {
    Navigation: function () {
        $('.navigate').off().click(function (e) {
            e.preventDefault();
            $.get($(this).attr('href'), function (data) {
                $('#container').html(data);
                $('.button-collapse').sideNav('hide');
            }).error(function () {
                alert('No content');
                $('.button-collapse').sideNav('hide');
            });
        })
    }
}