// Just pretend this magically works and we'll both be a lot happier.

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

var movesInAlg = function(alg) {
  return alg.match(/[UDRLFBudlrfbxyz]w?[2']?/g)
};

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

  "U2": "U U",
  "U'": "U U U",

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

  "D2": "D D",
  "D'": "D D D",

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

  "R2": "R R",
  "R'": "R R R",

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

  "L2": "L L",
  "L'": "L L L",

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

  "F2": "F F",
  "F'": "F F F",

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
               53, 50, 47],

  "B2": "B B",
  "B'": "B B B",

  "x": [       12, 13, 14,
               21, 22, 23,
               30, 31, 32,
   11, 20, 29, 36, 37, 38, 33, 24, 15,
   10, 19, 28, 39, 40, 41, 34, 25, 16,
    9, 18, 27, 42, 43, 44, 35, 26, 17,
               45, 46, 47,
               48, 49, 50,
               51, 52, 53,
                0,  1,  2,
                3,  4,  5,
                6,  7,  8],

  "x2": "x x",
  "x'": "x x x",

  "y": [        6,  3,  0,
                7,  4,  1,
                8,  5,  2,
   12, 13, 14, 15, 16, 17, 53, 52, 51,
   21, 22, 23, 24, 25, 26, 50, 49, 48,
   30, 31, 32, 33, 34, 35, 47, 46, 45,
               38, 41, 44,
               37, 40, 43,
               36, 39, 42,
               29, 28, 27,
               20, 19, 18, 
               11, 10,  9],

  "y2": "y y",
  "y'": "y y y",

  "z": "x y x'",
  "z2": "z z",
  "z'": "z z z",

  "M": "L' R x'",
  "M2": "M M",
  "M'": "M M M",

  "E": "z M z'",
  "E2": "E E",
  "E'": "E E E",

  "S": "y M y'",
  "S2": "S S",
  "S'": "S S S",
};

var cubesEqual = function(cube1, cube2) {
  for (var i = 0; i < stickerCount; i++) {
    if (cube1[i] !== cube2[i]) return false;
  }
  return true;
}

var applyMove = function(cube, move) {
  var effect = moveEffects[move];
  if (typeof effect === "string") {
    return movesInAlg(effect).reduce(applyMove, cube);
  } else {
    return effect.map(function(i) { return cube[i] });
  }
};

var Cubid = function() {
  var init;
  var alg = arguments[0];
  if (arguments.length === 1) {
    init = solved();
  } else if (arguments.length === 2) {
    init = arguments[1];
  } else {
    throw "new Cubid(...) takes 1 or 2 arguments.";
  }

  var moves = movesInAlg(alg);
  this.contents = moves.reduce(applyMove, init);
};

var sides = [
  [ 0,  1,  2,  3,  4,  5,  6,  7,  8],
  [ 9, 10, 11, 18, 19, 20, 27, 28, 29],
  [12, 13, 14, 21, 22, 23, 30, 31, 32],
  [15, 16, 17, 24, 25, 26, 33, 34, 35],
  [36, 37, 38, 39, 40, 41, 42, 43, 44],
  [45, 46, 47, 48, 49, 50, 51, 52, 53]
];

var colours = {};
sides.forEach(function(side, i) {
  side.forEach(function(sticker) {
    colours[sticker] = i;
  });
});

Cubid.prototype.isSolved = function() {
  for (var i = 0; i < sides.length; i++) {
    var col = colours[this.contents[sides[i][0]]];
    for (var j = 1; j < sides[i].length; j++) {
      if (col !== colours[this.contents[sides[i][j]]]) {
        return false;
      }
    }
  };
  return true;
};

Cubid.prototype.apply = function(alg) {
  return new Cubid(alg, this.contents);
};

module.exports = Cubid;
