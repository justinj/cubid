var assert = require("assert");
var Cubid = require("./index.js");

describe("isSolved", function() {
  it("is true if a sequence of moves solves the cube", function() {
    var cases = [
      "R R R R",
      "R R'",
      "R U R' U' R U R' U' R U R' U' R U R' U' R U R' U' R U R' U'",
      "L U L' U' L U L' U' L U L' U' L U L' U' L U L' U' L U L' U'",
      "F U F' U' F U F' U' F U F' U' F U F' U' F U F' U' F U F' U'",
      "B U B' U' B U B' U' B U B' U' B U B' U' B U B' U' B U B' U'",
      "B D B' D' B D B' D' B D B' D' B D B' D' B D B' D' B D B' D'",
      "x x x x",
      "x2 x x",
      "R y F' y'",
      "D x F' x'",
      "Rw L'",
      "Lw' R",
      "l' R",
      "[L, R]",
      "(L R (L' (R')))"
    ];
    cases.forEach(function(c) {
      var cube = new Cubid(c);
      assert(cube.isSolved());
    });
  });

  it("is false if a sequence of moves doesn't solve the cube", function() {
    var cases = [
      "R",
      "U",
      "R U R'",
      "R U2 R'"
    ];
    cases.forEach(function(c) {
      var cube = new Cubid(c);
      assert(!cube.isSolved());
    });
  });
  it("doesn't mind rotations", function() {
    assert(new Cubid("x").isSolved())
  });
});

describe("apply", function() {
  it("returns a new cube", function() {
    var cube = new Cubid("R");
    assert(!cube.isSolved());
    var cube2 = cube.apply("R'");
    assert(cube2.isSolved());
    assert(!cube.isSolved());
  });
});
