var trim = require( 'lodash/trim' );

function tokenize( input )
{

	// Trim input
	input = trim( input );
	
	var pattern = /(\w+:|-)?("[^"]*"|'[^']*'|[^\s]+)/g,
	results = [],
	matched;
	
	while ( matched = pattern.exec( input ) )
	{
		var prefix = matched[1],
		term = matched[2],
		result = {};
		
		// Remove quotes
		if ( /^".+"$/.test( term ) )
		{
			term = trim( term, '" ' );
			result.phrase = true;
		}
		if ( /^'.+'$/.test( term ) )
		{
			term = trim( term, "' " );
			result.phrase = true;
		}
		
		result.term = term;
		
		if ( prefix )
		{
			if ( prefix == '-' )
			{
				result.exclude = true;
			} 
			else
			{
				result.tag = prefix.slice( 0, -1 );
			}
		}
		
		results.push( result );
	}
	
	return results;
}

module.exports = tokenize;
