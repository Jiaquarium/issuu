# Essay Question Response - CheckSums

## Basic Requirements
### Main Components
- Publishing server
- Checksum microservice
- In-memory cache (e.g. Redis)
- Index DB

### System Design Overview
The most effective way to store the set of checksums is through a combination of using an in-memory caching server and an index database.

### Checksum Microservice, Cache and Index DB
Client will send a POST to Issuu's publishing web server which will then communicate to the checksum microservice that will handle computing a checksum for the uploaded PDF and then check for duplicate checksums. We can use an in-memory cache such as Redis for very quick/cheap lookups (discussion of lifecycle considerations of cache below) for processed checksums. The service can check against the cache and if the checksum exists we know it's a duplicate and we can then send a 400 HTTP status code response back to the client.

If the checksum is not readily in the cache, then we'll check the index database. The index database can be implemented using a RDBMS such as Postgres or MySQL and will be indexed based on checksum for lookup. Upon saving an entry, we'll update the cache for the new checksum. The microservice should also notify the main publishing server to accept the incoming document and save all relevant information into a main database, aside from this checksums process, which can be handled elsewhere. The publishing server can then send a 201 response back to the user in this case.

### System Constraints Considerations
First I'd consider how much traffic we're receiving at the checksum microservice level and how that would dictate scaling of the service. On Issuu's job posting, it references 10,000 requests/seconds. If we assume perhaps 5% of these are publishing requests, assuming the bulk of activity is downloading, saving publications, other consumptions, etc., we arrive at 500 publishing requests/second. Depending on scaling needs we can use a load balancer and delegate to a cluster of publishing microservices as need be.

#### Cache Lifecycle Considerations
The next thing to point out is the in-memory cache. Although ultra-fast, everything is held purely in memory and isn't swapped out to disk once the max is reached, so we'd want to consider how much memory we can allot to it. Using our previous metric of 500 publishing requests/second and say 75% of these are actually valid (not duplicates). Given 16 digit hex strings as keys, and we can store a value 1 as the value, each checksum would take 16 * 4 + 1 = 65 bits of memory. We can then roughly see how much memory that would be every month.

```
  65 bits
x 375 publishing requests/second
= 24,375 bits/second

x 60
= 1,462,500 bits/minute

x 60
= 87,750,000 bits/hour

x 24
= 2,106,000,000 bits/day

x 30
= 63,180,000,000 bits/mo
= ~7.9 GB/mo 
```

Approximately 7.9 GB/mo would be needed per month. With this in mind we could and given that magazines, catalogs, newspapers and other publishings may become more irrelevant with time, say 3 months, thats ~24 GB needed for a 3-month period if we wanted to preserve ultra-fast lookup for duplicates. 

Given that we'd have to store 10^10 strings (assuming its 10^10 strings/month), then 10^10 * 65 bits = 81.25 GB/mo would be ~244 GB for 3-months of cached checksums. And for 10^12 * 65 bits = 8.125 TB or ~24 TB for the 3-month period. For this amount of data, we definitely wouldn't be able to store this on one machine so we can consider distributed caching across multiple machines. Also, we should decide on a cap for memory allocation to the cache and remove the oldest entries/implement an LRU cache.

#### DCMA Flagged Documents
A similar process can be implemented where we store all DCMA documents in an in-memory cache to compare checksums as well. This would be updated, instead of by publishers, by Issuu administrators.

### Additional Thoughts
Once the amount of strings becomes massive, we can consider sharding the database. We could do this by the prefix of the checksum, so for example if we wanted to have 4 databases, we know we have 16 prefixes, so we can shard on 4 prefix characters (0-3, 4-7, 8-b, c-f).

It may be worth mentioning that the process to respond that there exists a duplicate/DCMA flagged document will be much faster since we only have to check in memory whereas if we miss a read and/or it's a new checksum, we'll be needing to query the database.




