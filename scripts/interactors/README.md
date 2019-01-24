# Download known interactions

Known interactors are downloaded from BioGRID and IntAct, then merged into a single list containing only the source and target gene names and species.

## Run script

```
node index.js
```

## Output

It will output a txt file with all interactions and it will output a js file with an array of all species that have interactors. Files with be output to the `files` folder beneath the api root directory. The JS file should be copied to the `assets/data` directory in the client repo.

* interactors.txt
* interactor-species.txt
