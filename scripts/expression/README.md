# Download Human protein and RNA expression

Cell and tissue RNA expression data is downloaded from the Human Protein Atlas.
Cell and tissue protein expression data is downloaded from the ProteomicsDB.

## Run script

```
node index.js
```

## Output

It will output json files with expression data and files just listing cells and tissues, for either protein or RNA. Files with be output to the `files` folder beneath the api root directory.

* protein-expression.json (indexed by Uniprot acc)
* protein-tissues.json
* rna-expression.json (indexed by ENSEMBLG)
* rna-tissues.json
