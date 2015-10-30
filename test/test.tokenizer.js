var _ = require( 'lodash' );
var should = require( 'should' );
var tokenizer = require( '../lib/tokenizer' );

should.Assertion.add( 'jsonEql', function( val )
{
	this.params = { operator: 'to be JSON eql' };
	var actual = JSON.stringify( this.obj );
	var expected = JSON.stringify( val );
	this.params.details = actual + ' != ' + expected;
	this.assert( actual == expected );
});

describe( 'tokenizer', function()
{
	it( 'should support single word inputs', function() {
		tokenizer( 'redbull' )
			.should.jsonEql( ['redbull'] );
	});
	
	it( 'should support multiple words', function() {
		tokenizer( 'red bull' )
			.should.jsonEql( ['red', 'bull'] );
	});
	
	it( 'should handle empty queries', function() {
		tokenizer( '' )
			.should.jsonEql( [''] );
		tokenizer( ' ' )
			.should.jsonEql( [''] );
	});
	
	it( 'should trim spaces', function() {
		tokenizer( ' redbull ' )
			.should.jsonEql( ['redbull'] );
	});
	
	it( 'should support quoted phrases', function() {
		var result = tokenizer( '"red bull"' );
		result.should.jsonEql( ['red bull'] );
		result[0].phrase.should.eql( true );
		
		result = tokenizer( "'red bull'" );
		result.should.jsonEql( ['red bull'] );
		result[0].phrase.should.eql( true );
	});
	
	it( 'should not interpret apostrophes as single quoted phrases', function() {
		tokenizer( "don't won't" )
			.should.jsonEql( ["don't", "won't"] );
	});
	
	it( 'should support multiple phrases', function() {
		tokenizer( '"red bull" "gives you wings"' )
			.should.jsonEql( ['red bull', 'gives you wings'] );
	});
	
	it( 'should support single words and phrases', function() {
		tokenizer( 'red bull "gives you wings"' )
			.should.jsonEql( ['red', 'bull', 'gives you wings'] );
	});
	
	it( 'should support broken phrases', function() {
		tokenizer( 'red bull "gives you wings' )
			.should.jsonEql( ['red', 'bull', '"gives', 'you', 'wings'] );
		tokenizer( 'red bull gives you wings"' )
			.should.jsonEql( ['red', 'bull', 'gives', 'you', 'wings"'] );
	});
});
