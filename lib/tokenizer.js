module.exports = function(str){
 
  // trim spaces
  str = str.replace(/^\s+|\s+$/g, '');
 
  // retun if string is empty
  if (!str) return str;
 
  // split by spaces  
  var terms = str.split(/\s/)
    , i = 0
    , result = [];
 
  while (terms[i]) {
    var current = terms[i];
 
    // phrase if double quoted
    if (current[0] == '"') {
 
      // iterate by the end of quotations
      var j = i + 1;
      while (terms[j]) {
        var next = terms[j];
        current += ' ' + next;
 
        if (next.slice(-1) == '"') {
          terms.splice(j, 1);
          break;
        } else {
          terms.splice(j, 1);
        }
      }
    }
 
    result.push(current);
 
    i++;
  }
 
  return result;
}