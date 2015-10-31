var _ = require( 'lodash' );

function tokenize( input )
{

	// Trim input
	input = _.trim( input );
	
	var pattern = /(\w+:)?("[^"]*"|'[^']*'|[^\s]+)/g,
	results = [],
	matched;
	
	while ( matched = pattern.exec( input ) )
	{
		var tag = matched[1],
		term = matched[2];
		
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
		if ( tag )
		{
			term.tag = tag.slice( 0, -1 );
		}
		
		results.push( term );
	}
	
	return results;
}

module.exports = tokenize;
