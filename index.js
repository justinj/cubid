var movesInAlg = function(alg) {
  return alg.match(/[UDRLFBudlrfbxyz]w?[2']?/g)
};

var parseMove = function(move) {
  var suffix;
  var len;
  if (move.match(/'$/)) {
    suffix = "'";
    len = 3;
    move = move.replace(/'$/, "");
  } else if (move.match(/2$/)) {
    suffix = "2";
    len = 2;
    move = move.replace(/2$/, "");
  } else {
    suffix = "";
    len = 1;
  }
  return {
    move: move,
    suffix: suffix,
    len: len
  };
};

var invertSingle = function(move) {
  if (move.match(/'$/)) {
    return move.replace(/'$/, "");
  } else if (move.match(/2$/)) {
    return move;
  } else {
    return move + "'";
  }
};

var invert = function(alg) {
  return movesInAlg(alg).map(invertSingle).reverse().join(" ");
};

// Just pretend this part magically works and we'll both be a lot happier.

//          ┌──┬──┬──┐
//          │ 0│ 1│ 2│
//          ├──┼──┼──┤
//          │ 3│ 4│ 5│
//          ├──┼──┼──┤
//          │ 6│ 7│ 8│
// ┌──┬──┬──┼──┼──┼──┼──┬──┬──┐
// │ 9│10│11│12│13│14│15│16│17│
// ├──┼──┼──┼──┼──┼──┼──┼──┼──┤
// │18│19│20│21│22│23│24│25│26│
// ├──┼──┼──┼──┼──┼──┼──┼──┼──┤
// │27│28│29│30│31│32│33│34│35│
// └──┴──┴──┼──┼──┼──┼──┴──┴──┘
//          │36│37│38│
//          ├──┼──┼──┤
//          │39│40│41│
//          ├──┼──┼──┤
//          │42│43│44│
//          ├──┼──┼──┤
//          │45│46│47│
//          ├──┼──┼──┤
//          │48│49│50│
//          ├──┼──┼──┤
//          │51│52│53│
//          └──┴──┴──┘

var stickerCount = 54;
var solved = function() {
  var r = [];
  for (var i = 0; i < stickerCount; i++) {
    r.push(i);
  }
  return r;
};

var moveEffects = {
  "U": [        6,  3,  0,
                7,  4,  1,
                8,  5,  2,
   12, 13, 14, 15, 16, 17, 53, 52, 51,
   18, 19, 20, 21, 22, 23, 24, 25, 26,
   27, 28, 29, 30, 31, 32, 33, 34, 35,
               36, 37, 38,
               39, 40, 41,
               42, 43, 44,
               45, 46, 47,
               48, 49, 50,
               11, 10,  9],

  "D": [        0,  1,  2,
                3,  4,  5,
                6,  7,  8,
    9, 10, 11, 12, 13, 14, 15, 16, 17,
   18, 19, 20, 21, 22, 23, 24, 25, 26,
   47, 46, 45, 27, 28, 29, 30, 31, 32,
               42, 39, 36,
               43, 40, 37,
               44, 41, 38,
               35, 34, 33,
               48, 49, 50,
               51, 52, 53],

  "R": [        0,  1, 14,
                3,  4, 23,
                6,  7, 32,
    9, 10, 11, 12, 13, 38, 33, 24, 15,
   18, 19, 20, 21, 22, 41, 34, 25, 16,
   27, 28, 29, 30, 31, 44, 35, 26, 17,
               36, 37, 47,
               39, 40, 50,
               42, 43, 53,
               45, 46,  2,
               48, 49,  5,
               51, 52,  8],

  "L": [       45,  1,  2,
               48,  4,  5,
               51,  7,  8,
   27, 18,  9,  0, 13, 14, 15, 16, 17,
   28, 19, 10,  3, 22, 23, 24, 25, 26,
   29, 20, 11,  6, 31, 32, 33, 34, 35,
               12, 37, 38,
               21, 40, 41,
               30, 43, 44,
               36, 46, 47,
               39, 49, 50,
               42, 52, 53],

  "F": [        0,  1,  2,
                3,  4,  5,
               29, 20, 11,
    9, 10, 36, 30, 21, 12, 6, 16, 17,
   18, 19, 37, 31, 22, 13, 7, 25, 26,
   27, 28, 38, 32, 23, 14, 8, 34, 35,
               33, 24, 15,
               39, 40, 41,
               42, 43, 44,
               45, 46, 47,
               48, 49, 50,
               51, 52, 53],

  "B": [       27, 18,  9,
                3,  4,  5,
                6,  7,  8,
   42, 10, 11, 12, 13, 14, 15, 16,  0,
   43, 19, 20, 21, 22, 23, 24, 25,  1,
   44, 28, 29, 30, 31, 32, 33, 34,  2,
               36, 37, 38,
               39, 40, 41,
               35, 26, 17,
               51, 48, 45,
               52, 49, 46,
               53, 50, 47]
};

var cubesEqual = function(cube1, cube2) {
  for (var i = 0; i < stickerCount; i++) {
    if (cube1[i] !== cube2[i]) return false;
  }
  return true;
}

var applyMove = function(cube, move) {
  for (var i = 0; i < move.len; i++) {
    cube = moveEffects[move.move].map(function(i) { return cube[i] });
  }
  return cube;
};

var isIdentity = function(alg) {
  var c = solved();
  var moves = movesInAlg(alg).map(parseMove);
  c = moves.reduce(applyMove, c);
  return cubesEqual(c, solved());
};

module.exports = {
  invert: invert,
  isIdentity: isIdentity
};
