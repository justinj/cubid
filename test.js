var assert = require("assert");
var cubid = require("./index.js");

describe("invert", function() {
  it("inverts the given move", function() {
    var cases = [
      ["R2", "R2"],
      ["R", "R'"],
      ["R'", "R"],
      ["R U", "U' R'"],
      ["R U2 R'", "R U2 R'"],
    ];
    cases.forEach(function(c) {
      assert.equal(cubid.invert(c[0]), c[1]);
    });
  });
});

describe("isIdentity", function() {
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
      "D x F' x'"
    ];
    cases.forEach(function(c) {
      assert.equal(cubid.isIdentity(c), true);
    });
  });

  it("is false if a sequence of moves doesn't solve the cube", function() {
    var cases = [
      "R",
      "U",
      "R U R'",
      "R U2 R'",
      "x"
    ];
    cases.forEach(function(c) {
      assert.equal(cubid.isIdentity(c), false);
    });
  });
  it.skip("doesn't mind rotations", function() {
    assert.equal(cubing.isIdentity("x"), true);
  });
});
