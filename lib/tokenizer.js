var _ = require( 'lodash' );

function tokenize( input )
{
	// Trim input
	input = _.trim( input );

	var results = input.match(/"[^"]*"|'[^']*'|[^\s]+/g) || [''];
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
		return term;
	}).value();
	return results;
}

module.exports = tokenize;
