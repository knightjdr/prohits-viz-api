# Introduction

This API allows third-party access to the visualization tools at ProHits-viz.

# Overview

## Access
Access to the api requires a key. Please email contact@prohits.org to request one. Once you have a key, include it and your contact email in the request header using the `apikey` field. The contact email and key should be separated using a colon: `contact@address.org:apikey`

## Address
https<nolink>://prohits-viz.org/api/third-party

## Endpoints

All endpoints use the POST method.

### Route: /viz

This route is used for passing data in a supported "interactive" format for displaying at ProHits-viz. Other than displaying the data as an image, ProHits-viz does not do any filtering or clustering. Data should be passed as you want it visualized.

#### Request header

There are three required headers for the request. Your contact address and apikey should be used in the `Apikey` field.

* `Accept: application/json`
* `Apikey: contact@address.org:apikey`
* `Content-Type: application/json`

#### Request body

Examples of the request format for the body can be found in the folder `sample-files/`. Files with `-minimal` in the file handle are basic examples that can be used to better understand the request format.

##### Heat maps/dot plots

The request body can take two different formats. `format1` is a minimal format designed to make it as easy as possible to submit data. See the file `sample-files/heatmap-format1-minimal.json` for an example. In the `dataKeys` object, the `condition`, `readout` and `abundance` fields are required and refer to the keys used in the `data` array to specify those properties. The `data` field is an array, with a single data point per entry corresponding to a condition-readout pair with their associated abundance. In the case of a dot plot, there must also be a `score` and `ratio` field, with the ratio referring to the relative circle size from 0-1.

The `imageType` in the `parameters` object is required and indicates to the api the type of image you would like to visualize.

When `format1` is drawn as an image, the first `condition` encountered in the `data` array will be the first column, the next unique condition the second column, and so on. Similarly for readouts. You do not need to specify a value for every cell (column-row) pair on the heat map as missing values will be treated as zero.

`format1` will be turned into `format2`. `format2` is the actual JSON structure used by the interactive viewer at ProHits-viz and requests sent to our server in this format will be handled quicker as no conversion is necessary. However, the structure for `format2` is slightly more complicated.

In `format2`, the `columnDB` array lists the column names and their order, while the `rowDB` array contains data for each row in the image. The order of the rows is the order they will be displayed in. The `name` field for each row specifies the name to display for the row, and the `data` array lists the row data values corresponding to each column. The order of these values must match the `columnDB` order and missing values are not permitted (use zero instead).

##### Scatter plots

See the file `sample-files/scatter-minimal.json` for an example. Each scatter plot must have a `labels` object with labels for the `x` and `y` axes, a `name` for the plot and an array of `points` to display. The `plots` array can contain multiple plots and the `name` field is used to select between them from the UI.

The `imageType` in the `parameters` object is required and indicates to the api the type of image you would like to visualize.

##### Circular heat maps

See the file `sample-files/circheatmap-minimal.json` for an example. Each plot requires a `circles` object and a `plots` array. `circles` will define the settings and order for the metrics being displayed. In `plots`, each plot must have a `name` and an array or `readouts`. Each entry in `readouts` will have a `label` and an object specifying the values for each of the metrics defined in `circles`. The `plots` array can contain multiple plots and the `name` field is used to select between them from the UI.

The `imageType` in the `parameters` object is required and indicates to the api the type of image you would like to visualize

#### Response

* 200 status: JSON response with a `url` field whose value will be a link where the image can be accessed. An example response will look like:
```json
{ "url": "https://prohits-viz.org/visualization/samplefile/dotplot" } 
```

# Error Codes
* 400: Error with request body
* 403: Forbidden endpoint or invalid credentials
* 404: Endpoint not found
* 405: Unsupported HTTP method
* 500: Server error

# Rate limit
Requests are limited to 5 per second.

# Tests

`npm test`

© 2021 James Knight.
