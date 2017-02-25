# Essay Question Response - CheckSums

## Basic Requirements
### Main Components
- Publishing server
- Checksum microservice + worker
- In-memory cache (e.g. Redis)
- Index DB

### System Design Overview
The most effective way to store the set of checksums is through a combination of using an in-memory caching server and an index database.

### Checksum Microservice, Cache and Index DB
Client will send a POST to Issuu's publishing web server which will then communicate to the a checksum microservice that will handle checking the incoming document for duplicate existing documents. We can use an in-memory cache such as Redis for very quick/cheap lookups (discussion of lifecycle considerations of cache below) for hot titles such as Harry Potter. The service can check against the cache and if it exists we know it's a duplicate and we can then send a 500 HTTP status code response back to the client. If it's not readily in the cache, then we'll check the index database. The index database can be implemented using a RDBMS such as Postgres or MySQL and will be indexed based on checksum for lookup. Upon saving an entry, the microservice should also notify the main publishing server to accept the incoming document and save all relevant information into a main database, aside from this checksums process, which can be handled elsewhere. We can then update the cache for the new checksum and the microservice will then communicate with the publishing server which can send a 201 response back to the user.

### System Constraints Considerations
First I'd consider about how much traffic we're receiving at the microservice level and how that would dictate scaling of the service. On Issuu's job posting, it references 10,000 requests/seconds. If we assume perhaps 5% of these are publishing requests, assuming the bulk of activity is downloading, saving publications, other consumptions, etc., we arrive at 500 publishing requests/second. Depending on scaling needs we can use a load balancer and delegate to a cluster of publishing microservices as need be.

##### Cache Lifecycle Considerations
The next thing to point out is the in-memory cache. Although ultra-fast, everything is held purely in memory and isn't swapped out to disk once the max is reached, so we'd want to consider how much memory we can allot to it. This should be able to help in determining its lifecycle considerations. Using our previous metric of 500 publishing requests and say 75% of these are actually valid (not duplicates). Given 16 digit hex strings as keys, and we can store a value 1 as the value, each checksum would take 16 * 4 + 1 = 65 bits of memory. We can then roughly see how much memory that would be every month.

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

Approximately 7.9 GB/mo is would be needed per month. With this in mind we could and given that magazines, catalogs, newspapers and other publishings may become more irrelevant with time, say 6 months, so thats ~47 GB needed for a 6-month period if we wanted to preserve ultra-fast lookup for duplicates.

Given we had to store 10^10 strings, so 10^10 * 65 bits = 81.25 GB/mo, we'd definitely.





