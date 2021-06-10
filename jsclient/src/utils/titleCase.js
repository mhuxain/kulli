const titleCase = function(str) {
  return str.replace(/-|_/gi, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
  
}

export default titleCase