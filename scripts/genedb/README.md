# Download human gene ID data

Gene mapping data is downloaded from UniProt and HGNC.

## Run script

```
node index.js
```

## Output

It will output a json file indexed by Entrez gene ID, with additional identifiers, interactions and expression data. File with be output to the `files` folder beneath the api root directory.

* gene-db.json
