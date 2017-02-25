# Dependencies and how to use
```
python cubes.py problems.txt
```
>Note:
Ensure python 2.7 is installed

# Implementation exercise

You are given a box with integer dimensions length x width x height. You also have a set of cubes whose sides are powers of 2, e.g. 1x1x1, 2x2x2, 4x4x4 etc.

You need to fill the box with cubes from the set.

Write a program that for a given box and given set of cubes can determine the **smallest** number of cubes needed to fill the box.

The set of cubes can be represented for instance as a list or array of numbers, where the position in the list designates the dimension of the cube. E.g. `100 10 1` means you have 100 cubes of 1x1x1 and 10 cubes of 2x2x2 and 1 cube of 4x4x4.

A problem specification is a sequence of lines separated by newline. Each line has the box dimensions as the first three elements and the remaining elements enumerate the given cubes. Elements are separated by a single space. Lines are terminated by your platform's newline convention. E.g.

```
2 3 4 5 6
7 8 9 1 2 3 4
```

specifies two problems:
 - a box with dimensions 2 x 3 x 4, 5 cubes of 1x1x1 and 6 cubes of 2x2x2
 - a box with dimensions 7 x 8 x 9, 1 cube of 1x1x1, 2 of 2x2x2, 3 of 4x4x4, and 4 of 8x8x8.

Your program should read one or more problem specifications from `stdin` and print the answer to each problem on `stdout`. Spend as little effort as possible on parsing and validation of the input. An unsolvable problem should yield `-1`. Please provide instructions on how to run/compile your program.

Examples:
Assume the file `problems.txt` contains:

```
10 10 10 2000
10 10 10 900
4 4 8 10 10 1
5 5 5 61 7 1
5 5 6 61 4 1
1000 1000 1000 0 0 0 46501 0 2791 631 127 19 1
1 1 9 9 1
```

Then executing

```
./myprogram < problems.txt
```

should print the following to `stdout`:
```
1000
-1
9
62
59
50070
9
```
