var _ = require( 'lodash' );

function tokenize( input )
{

	// Trim input
	input = _.trim( input );

	var results = input.match( /"[^"]*"|'[^']*'|[^\s]+/g ) || [''];
	results = _( results ).map( function( term )
	{
		// Remove quotes
		if ( /^".+"$/.test( term ) )
		{
			term = _.trim( term, '"' );
		}
		if ( /^'.+'$/.test( term ) )
		{
			term = _.trim( term, "'" );
		}
		
		// Box up terms in a String object
		term = new String( term );
		
		// Mark phrases
		if ( /\s/.test( term ) )
		{
			term.phrase = true;
		}
		
		return term;
	});
	return results.value();
}

module.exports = tokenize;
