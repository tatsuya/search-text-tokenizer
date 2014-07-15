module.exports = function(str){
  return str.match(/"[^"]*"|[^\s]+/g) || '';
}