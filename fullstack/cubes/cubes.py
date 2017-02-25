#!/usr/bin/env python

'''
Module cubes
'''

from sys import argv
from math import floor

def minCubes(l, w, h, cubes):
    '''
    int l, w, h
    list cubes
    returns int representing min number of cubes to fill box of l*w*h
    '''
    used = 0
    cube_count = 0

    # start with largest cubes
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
        args = map(int, args)
        lines.append(args)

    for l in lines:
        print minCubes(l[0], l[1], l[2], l[3:])

if __name__ == "__main__":
    main()