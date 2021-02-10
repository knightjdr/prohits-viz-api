# Download known interactions

Known interactors are downloaded from BioGRID and IntAct, then merged into a single list per Entrez gene ID.

## Run script

```
node index.js
```

## Output

It will output a json file with interactions by Entrez gene ID. Files with be output to the `files` folder beneath the api root directory.

* interactors.json
