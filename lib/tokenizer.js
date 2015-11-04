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
		term = matched[2],
		result = {};
		
		// Remove quotes
		if ( /^".+"$/.test( term ) )
		{
			term = _.trim( term, '" ' );
			result.phrase = true;
		}
		if ( /^'.+'$/.test( term ) )
		{
			term = _.trim( term, "' " );
			result.phrase = true;
		}
		
		result.term = term;
		
		if ( tag )
		{
			result.tag = tag.slice( 0, -1 );
		}
		
		results.push( result );
	}
	
	return results;
}

module.exports = tokenize;
