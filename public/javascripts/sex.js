(function( window, document, $, undefined) {

  // imgUrl : "http://1.bp.blogspot.com/_PoXAWsmO1Fo/TItW-AmTjZI/AAAAAAAAEYw/yO4dqc802_c/s1600/batman-for-facebook.jpg"
  var tooltip

  // Append to list
  $( '#crew' )
    .delegate( 'h3 img', 'mouseenter', function(){
      var $img = $( this )
        , pos  = $img.offset()

      tooltip = tooltip || $( '<img />', { 'class': 'ttImg' } ).appendTo( document.body )

      tooltip
        .hide()
        .load(function(){
          tooltip.css(
            { top : pos.top - ( tooltip.height() / 2 )
            , left: pos.left + 30
            })
          .fadeIn()
        })
        .attr( 'src', this.src )

      if ( $img[0].src == this.src )
        tooltip.trigger( 'load' )
    })
    .delegate( 'h3 img', 'mouseleave', function(){
      tooltip.stop( true, true ).fadeOut()
    })

})( this, this.document, jQuery )

