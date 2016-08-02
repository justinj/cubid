[![Build Status](https://travis-ci.org/justinj/cubid.png?branch=master)](https://travis-ci.org/justinj/cubid)

Cubid
=====

You don't want to write it.
I don't want to write it.
I'm writing it.
It's done.
We're done here.
Let's go home.

## API

### `var cube = new Cubid(<alg>)`

All cubes are immutable.

#### `cube.isSolved(<stage="all">)`

Returns true if `cube` is solved.
Any rotation of the solved cube is also considered to be solved, so `new Cubid("x").isSolved() === true`.

If a `stage` is specified (only `"all"` and `"f2l"` are currently supported)
then that is the stage that must be solved to return true.
That is, if an algorithm is performed that only affects the last layer, and
`"f2l"` is specified, then the cube is considered solved.

#### `cube.apply(<alg>)`

Returns the result of applying `<alg>` to `cube`.

#### Algorithm format

Anything supported by [alg.js](https://github.com/cubing/alg.js).

## Philosophy

Writing cube representations sucks.  I don't know why, but it is just not a fun
problem to solve, especially if you're doing nxnxn cubes.  To that end, I *have
not* done nxnxn cubes with Cubid. All it supports is 3x3.

Cubid is a cube representation supporting the bare minimum set of features -
you can create cubes, apply moves to them, and check if they're solved.  That's
it.  Extremely useful for a limited set of use cases, downright pointless for
pretty much everything else.

If this doesn't do what you want, it's succeeded.

If you make a general nxnxn cube reprentation with a friendly interface for
querying various properties of a scramble (stickers, orientation, permutation,
solvedness, current stage), hit me up, I'd love to see it.  Until then, we have
Cubid.
