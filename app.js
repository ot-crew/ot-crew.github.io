/*------------------------------------*\
    Deps
\*------------------------------------*/
var express = require( 'express' )
  , stylus = require( 'stylus' )
  , nib = require( 'nib' )
  , app = module.exports = express.createServer()
  , crew = JSON.parse( require( 'fs' ).readFileSync( __dirname + '/public/crew.json' ) ).sort( function( a, b ) {
      var a = a.name.toLowerCase()
        , b = b.name.toLowerCase()
      return ( a < b )
        ? -1
        : ( a > b )
          ? 1
          : 0
    })
    

/*------------------------------------*\
    INIT
\*------------------------------------*/
function compile_stylus ( str, path ) {
  return stylus( str )
    .set( 'filename', path )
    .set( 'compress', true )
    .use( nib() )
}


/*------------------------------------*\
    Config
\*------------------------------------*/
app.configure( function(){
  app.set( 'views', __dirname + '/views' )
  app.set( 'view engine', 'jade' )
  app.use( express.bodyParser() )
  app.use( express.methodOverride() )
  app.use( stylus.middleware({ src: __dirname + '/public', compile: compile_stylus }) )
  app.use( app.router )
  app.use( express.static( __dirname + '/public' ) )
})

app.configure( 'development', function(){
  app.use( express.logger( '[:date] :method :url -> :status (:response-time)' ) )
  app.use( express.errorHandler({ dumpExceptions: true, showStack: true })  )
})

app.configure( 'production', function(){
  app.use( express.errorHandler()  )
})


/*------------------------------------*\
    Routes
\*------------------------------------*/
app.get( '/', function( req, res ) {
  res.render( 'index',
    { title: '-ot crew'
    , crew: crew
    , defaultImg: '/images/batman-for-facebook.jpg'
    })
})


/*------------------------------------*\
    Listen!
\*------------------------------------*/
if ( ! module.parent )
  app.listen( 3000 ) && console.log( "Express server listening on port %d", app.address().port )

