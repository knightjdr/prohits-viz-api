# Download known interactions

Known interactors are downloaded from BioGRID and IntAct, then merged into a single list per Entrez gene ID.

## Run script

```
node index.js
```

## Output

It will output a json file with interactions by Entrez gene ID. File with be output to the `files/unmapped` folder beneath the api root directory. This unmapped file will be handled by the genedb script with identifiers converted to HGNC.

* interactors.json
