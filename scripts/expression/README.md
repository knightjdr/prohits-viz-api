# Download Human RNA expression

Cell and tissue RNA expression data is downloaded from the Human Protein Atlas and merged into a single file.

## Run script

```
node index.js
```

## Output

It will output a txt file with all expression data and it will output a js file with an array of all cells and tissues. Files with be output to the `files` folder beneath the api root directory. The JS file should be copied to the `assets/data` directory in the client repo.

* tissues.txt
* expression-tissues.js
