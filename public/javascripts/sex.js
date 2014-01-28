(function( window, document, $, undefined) {

    var tooltip;
    var $crew = $('#crew');
    var $OGs = $crew.find('>li');

    // Append to list
    $crew
    .delegate( 'h3 img', 'mouseenter', function(){
        var $img = $( this );
        var pos  = $img.offset();

        tooltip = tooltip || $( '<img class="ttImg" height"300" />' ).appendTo( document.body );

        tooltip
            .hide()
            .load(function(){
                tooltip
                    .css({
                        top : pos.top - ( tooltip.height() / 2 ),
                        left: pos.left + 30
                    })
                .fadeIn();
            })
            .attr( 'src', this.src );

        if ( $img[0].src == this.src ) {
            tooltip.trigger( 'load' );
        }
    })
    .delegate( 'h3 img', 'mouseleave', function(){
        tooltip.stop( true, true ).fadeOut();
    });

    $.expr[":"].straightup = $.expr.createPseudo(function(arg) {
        return function( elem ) {
            return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
        };
    });

    $('#crewSearch').on('keyup', function(e){
        var wat = $(this).val();
        var $street_names = $OGs.filter('[id*=' + wat.toUpperCase() + ']');
        var $homies_names = $OGs.find('.name:straightup(' + wat + ')').parent().parent();
        var $found_homies = $.fn.add.call($street_names, $homies_names);

        if($found_homies.length) {
            $OGs.css('display', 'none');
            $found_homies.css('display', 'block');
        } else {
            $OGs.css('display', 'block');
        }

    });

})( this, this.document, jQuery );
