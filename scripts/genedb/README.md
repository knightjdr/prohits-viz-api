# Download human gene ID data

Gene mapping data is downloaded from UniProt and HGNC.

## Run script

```
node index.js
```

## Output

It will output a json file indexed by HGNC ID, with additional identifiers. Interaction and expression files in `files/unmapped` will be mapped to use HGNC ID. Files with be output to the `files` folder beneath the api root directory.

* gene-db.json
* interactions.json
* protein-expression.json
* rna-expression.json
