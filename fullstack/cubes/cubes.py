#!/usr/bin/env python

'''
Module cubes
'''

from sys import argv
from math import floor

def minCubes(l, w, h, cubes):
    used = 0
    cube_count = 0
    # to find min # of cubes start with largest cubes
    for i in range(len(cubes) - 1, -1, -1):
        # figure out how many cubes length(2^i) fit in box
        dim = 1 << i
        fits = floor(l/dim) * floor(w/dim) * floor(h/dim)
        # get number of cubes from current batch we'll use after
        # subtracting out space taken up by prev (larger) cubes
        fits -= used
        fits = min(cubes[i], fits)
        # given 8 cubes of 2^n-1 dimension make 1 cube of 2^n dimension
        used = (fits + used) * 8
        cube_count += fits
    # check for space in box
    vol = l * w * h
    if used != vol * 8:
        return -1
    return int(cube_count)

def main():
    f = open(argv[1], 'r')
    lines = []
    for line in f:
        args = " ".join(line.split()).split(" ") # handles multiple spaces
        lines.append(args)

    print lines
    # print minCubes(10, 10, 10, [2000])
    # print minCubes(10, 10, 10, [900])
    # print minCubes(4, 4, 8, [10, 10, 1])
    # print minCubes(5, 5, 5, [61, 7, 1])
    # print minCubes(5, 5, 6, [61, 4, 1])
    # print minCubes(1000, 1000, 1000, [0, 0, 0, 46501, 0, 2791, 631, 127, 19, 1])
    # print minCubes(1, 1, 9, [9, 1])





if __name__ == "__main__":
    main()