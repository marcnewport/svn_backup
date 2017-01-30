## BACKUP
backup the full svn repo from the remote server using:

```
svnrdump dump https://ninelanterns.svn.cloudforge.com/9lbenchmark > 9lbenchmark.dump
```


## RESTORE

create a new "remote" svn repository locally
```
svnadmin create ./9lbenchmark
```

load in the previously dumped data
```
svnadmin load ./9lbenchmark < 9lbenchmark.dump
```

no we can checkout from this repo
```
svn co file:///path/to/local/repo/9lbenchmark ./9lbenchmark
```
