var should = require( 'should' );
var tokenizer = require( '../lib/tokenizer' );

describe( 'tokenizer', function()
{
	it( 'should handle empty queries', function() {
		tokenizer( '' )
			.should.eql( [] );
		tokenizer( ' ' )
			.should.eql( [] );
	});
	
	it( 'should support single word inputs', function() {
		tokenizer( 'redbull' )
			.should.eql( [ { term: 'redbull' } ] );
	});
	
	it( 'should support multiple words', function() {
		tokenizer( 'red bull' )
			.should.eql( [ { term: 'red' }, { term: 'bull' } ] );
	});
	
	it( 'should support quoted phrases', function() {
		tokenizer( '"red bull"' )
			.should.eql( [ {
				term: 'red bull',
				phrase: true,
			} ] );
		
		tokenizer( '"redbull"' )
			.should.eql( [ {
				term: 'redbull',
				phrase: true,
			} ] );
		
		tokenizer( "'red bull'" )
			.should.eql( [ {
				term: 'red bull',
				phrase: true,
			} ] );
	});
	
	it( 'should trim spaces', function() {
		tokenizer( ' redbull ' )
			.should.eql( [ { term: 'redbull' } ] );
			
		tokenizer( '" red bull "' )
			.should.eql( [ {
				term: 'red bull',
				phrase: true,
			} ] );
	});
	
	it( 'should not interpret apostrophes as single quoted phrases', function() {
		tokenizer( "don't won't" )
			.should.eql( [ { term: "don't" }, { term: "won't" } ] );
	});
	
	it( 'should support multiple phrases', function() {
		tokenizer( '"red bull" "gives you wings"' )
			.should.eql( [ {
				term: 'red bull',
				phrase: true,
			}, {
				term: 'gives you wings',
				phrase: true,
			} ] );
	});
	
	it( 'should support a combination of words and phrases', function() {
		tokenizer( 'red bull "gives you wings"' )
			.should.eql( [ { term: 'red' }, { term: 'bull' }, {
				term: 'gives you wings',
				phrase: true,
			} ] );
	});
	
	it( 'should support broken phrases', function() {
		tokenizer( 'red bull "gives you wings' )
			.should.eql( [ { term: 'red' }, { term: 'bull' }, { term: '"gives' }, { term: 'you' }, { term: 'wings' } ] );
		tokenizer( 'red bull gives you wings"' )
			.should.eql( [ { term: 'red' }, { term: 'bull' }, { term: 'gives' }, { term: 'you' }, { term: 'wings"' } ] );
	});
	
	it( 'should support tagged words', function() {
		tokenizer( 'author:tolkien' )
			.should.eql( [ {
				term: 'tolkien',
				tag: 'author',
			} ] );
	});
	
	it( 'should support tagged phrases', function() {
		tokenizer( 'author:"j. r. r. tolkien"' )
			.should.eql( [ {
				term: 'j. r. r. tolkien',
				phrase: true,
				tag: 'author',
			} ] );
		
		tokenizer( "author:'j. r. r. tolkien'" )
			.should.eql( [ {
				term: 'j. r. r. tolkien',
				phrase: true,
				tag: 'author',
			} ] );
	});

	it( 'should support exclusion', function() {
		tokenizer( '-redbull' )
			.should.eql( [ {
				term: 'redbull',
				exclude: true
			} ] );
	});

  it( 'should support exclusin on multiple words', function() {
		tokenizer( 'jaguars -car' )
			.should.eql( [ {
				term: 'jaguars'
			},
			{
				term: 'car',
				exclude: true
			} ] );
  });

	it( 'should support exclusion of phrases', function() {
		tokenizer( '-"red bull"' )
			.should.eql( [ {
				term: 'red bull',
				phrase: true,
				exclude: true
			} ] );

		tokenizer( "-'red bull'" )
			.should.eql( [ {
				term: 'red bull',
				phrase: true,
				exclude: true
			} ] );
	});
});
