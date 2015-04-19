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

#### `cube.isSolved()`

Returns true if `cube` is solved.
Any rotation of the solved cube is also considered to be solved, so `new Cubid("x").isSolved() === true`.

#### `cube.apply(<alg>)`

Returns the result of applying `<alg>` to `cube`.

#### Algorithm format

Anything supported by [https://github.com/cubing/alg.js](alg.js).
