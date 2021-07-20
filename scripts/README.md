# Scripts for generating API data files

Run as:
```
npm run update-files
```

or

```
node scripts/update-files.js
```

## Download known interactions

Known interactors are downloaded from BioGRID and IntAct, then merged into a single list per Entrez gene ID.

### Output

It will output a json file with interactions by Entrez gene ID. File with be output to the `files/unmapped` folder beneath the api root directory. This unmapped file will be handled by the genedb script with identifiers converted to HGNC.

* interactors.json


## Download Human protein and RNA expression

Cell and tissue RNA expression data is downloaded from the Human Protein Atlas.
Cell and tissue protein expression data is downloaded from ProteomicsDB.

### Output

It will output json files with expression data, and files just listing cells and tissues, for either protein or RNA. Tissue name-only files with be output to the `files` folder beneath the api root directory, while expression files will be output to the `files/unmapped` folder. These unmapped files will be handled by the genedb script with identifiers converted to HGNC.

* protein-expression.json (indexed by Uniprot acc)
* protein-tissues.json
* rna-expression.json (indexed by ENSEMBLG)
* rna-tissues.json

## Download Domains

Protein domain information is downloaded from Pfam

### Output

It will output a json file with domains for each UniProt accession in the `files/unmapped` folder. These unmapped files will be handled by the genedb script with identifiers converted to HGNC.

* domains.json (indexed by Uniprot acc)

## Download human gene ID data

Gene mapping data is downloaded from UniProt and HGNC.

### Output

It will output a json file indexed by HGNC ID, with additional identifiers. Interaction, domain and expression files in `files/unmapped` will be mapped to use HGNC ID. Files with be output to the `files` folder beneath the api root directory.

* gene-db.json
* domains.json
* interactions.json
* protein-expression.json
* rna-expression.json
