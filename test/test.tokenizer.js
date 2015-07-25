var tokenizer = require('../lib/tokenizer')
  , should = require('should');

describe('tokenizer', function(){
  it('should support single word inputs', function(){
    tokenizer('redbull')
      .should.eql(['redbull']);
  });

  it('should support multiple words', function(){
    tokenizer('red bull')
      .should.eql(['red', 'bull']);
  });

  it('should ignore empty queries', function(){
    tokenizer('')
      .should.eql(['']);
  });

  it('should ignore spaces', function(){
    tokenizer(' ')
      .should.eql(['']);
  });

  it('should trim spaces', function(){
    tokenizer(' redbull ')
      .should.eql(['redbull']);
  });

  it('should support double quoted phrases', function(){
    tokenizer('"red bull"')
      .should.eql(['"red bull"']);
  });

  it('should support single quoted phrases', function(){
    tokenizer("'red bull'")
      .should.eql(["'red bull'"]);
  });

  it('should not interpret apostrophes as single quoted phrases', function(){
    tokenizer("don't won't")
      .should.eql(["don't", "won't"]);
  });

  it('should support multiple phrases', function(){
    tokenizer('"red bull" "gives you wings"')
      .should.eql(['"red bull"', '"gives you wings"']);
  });

  it('should support a single words and phrases', function(){
    tokenizer('red bull "gives you wings"')
      .should.eql(['red', 'bull', '"gives you wings"']);
  });

  it('should support broken phrases', function(){
    tokenizer('red bull "gives you wings')
      .should.eql(['red', 'bull', '"gives', 'you', 'wings']);
  });

  it('should support broken phrases (2)', function(){
    tokenizer('red bull gives you wings"')
      .should.eql(['red', 'bull', 'gives', 'you', 'wings"']);
  });
});
