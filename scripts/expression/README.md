# Download Human protein and RNA expression

Cell and tissue RNA expression data is downloaded from the Human Protein Atlas.
Cell and tissue protein expression data is downloaded from ProteomicsDB.

## Run script

```
node index.js
```

## Output

It will output json files with expression data and files just listing cells and tissues, for either protein or RNA. Tissue name-only files with be output to the `files` folder beneath the api root directory, while expression files will be output to the `files/unmapped` folder. These unmapped files will be handled by the genedb script with identifiers converted to HGNC.

* protein-expression.json (indexed by Uniprot acc)
* protein-tissues.json
* rna-expression.json (indexed by ENSEMBLG)
* rna-tissues.json
