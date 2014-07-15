var tokenizer = require('../lib/tokenizer')
  , should = require('should');

describe('tokenizer', function(){
  it('should support single word', function(){
    tokenizer('redbull').should.eql(['redbull']);
  });

  it('should support multiple words', function(){
    tokenizer('red bull').should.eql(['red', 'bull']);
  });

  it('should ignore empty query', function(){
    tokenizer('').should.eql('');
  });

  it('should ignore space', function(){
    tokenizer(' ').should.eql('');
  });

  it('should trim spaces', function(){
    tokenizer(' redbull ').should.eql(['redbull']);
  });

  it('should support phrase', function(){
    tokenizer('"red bull"')
      .should.eql(['"red bull"']);
  });

  it('should support multiple phrases', function(){
    tokenizer('"red bull" "gives you wings"')
      .should.eql(['"red bull"', '"gives you wings"']);
  });

  it('should support pair of word and phrase', function(){
    tokenizer('red bull "gives you wings"')
      .should.eql(['red', 'bull', '"gives you wings"']);
  });

  it('should support broken phrase', function(){
    tokenizer('red bull "gives you wings')
      .should.eql(['red', 'bull', '"gives', 'you', 'wings']);
  });

  it('should support broken phrase 2', function(){
    tokenizer('red bull gives you wings"')
      .should.eql(['red', 'bull', 'gives', 'you', 'wings"']);
  });
});