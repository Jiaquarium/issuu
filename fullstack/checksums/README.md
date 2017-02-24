# Essay question

Say issuu would like to check incoming documents for duplicates. A checksum could for instance be computed for each PDF we have. The checksum string could be a string of 16 hexadecimal digits.

When a document is uploaded, its checksum string is calculated and we check if it is in the set of existing strings. If so, we have a possible duplicate or DMCA flagged document (e.g. someone uploads Harry Potter over and over again).

How would you store this set of checksums and check for inclusion of strings in it?
Would it work (efficiently) if there were 10^10 number of strings to store? 10^12?
