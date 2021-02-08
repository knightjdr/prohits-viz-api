# Download Human protein and RNA expression

Cell and tissue RNA expression data is downloaded from the Human Protein Atlas.
Cell and tissue protein expression data is downloaded from the ProteomicsDB.

## Run script

```
node index.js
```

## Output

It will output txt files with expression data and it will output two js files with lists of all cells and tissues, for either protein or RNA. Files with be output to the `files` folder beneath the api root directory.

* protein-expression.txt
* protein-tissues.json
* rna-expression.txt
* rna-tissues.json
