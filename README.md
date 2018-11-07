# Introduction

This API allows third-party access to the analysis and visualization tools at ProHits-viz.

# Overview

## Address
https<nolink>://prohits-viz.org/api/third-party

## Endpoints

All endpoints use the POST method.

### Route: /viz
headers:
* 'Accept: application/json'
* 'Content-Type: application/json'

response:
* 200 status: url where the image can be accessed
* 400 status: message indicating an error with the request body
* 500 status: null

body: Please see the JSON files in the sample-files folder for examples of how to format the request body. Specfically see the "-minimal.json" files for minimal working examples for either dot plots or heat maps. See the dotplot.json file for an example with many optional parameters set.

| property                         | type   | description                                        | options                                                 | required     | default   |
|----------------------------------|--------|----------------------------------------------------|---------------------------------------------------------|--------------|-----------|
| columns                          | object | column content                                     |                                                         | true         |           |
| columns.names                    | array  | array of column names                              |                                                         | true         |           |
| columns.names[i]                 | string | column name                                        |                                                         | true         |           |
| parameters                       | object | analysis specific parameters                       |                                                         | true         |           |
| parameters.imageType             | string | type of image                                      | dotplot, heatmap                                        | true         |           |
| parameters.scoreType             | string | score type to use                                  | lte, gte                                                | false        | lte       |
| settings                         | object | image display parameters. Use to override defaults |                                                         | false        |           |
| settings.current                 | object | specify parameters here                            |                                                         | false        |           |
| settings.current.fillColor       | string | fill colour on dot plots and heat maps             | blueBlack, greenBlack, greyscale, redBlack, yellowBlack | false        | blueBlack |
| settings.current.primaryFilter   | number | primary filter for setting dot plot edge color     |                                                         | false        | 0.01      |
| settings.current.secondaryFilter | number | secondary filter for setting dot plot edge color   |                                                         | false        | 0.05      |
| settings.default                 | object | default visualization setings                      |                                                         | false        |           |
| rows                             | object | row-specific content                               |                                                         | true         |           |
| rows.list                        | array  | image content                                      |                                                         | true         |           |
| rows.list[i].name                | string | row name                                           |                                                         | true         |           |
| rows.list[i].data                | array  | row content. Length must equal columns.names       |                                                         | true         |           |
| rows.list[i].data[j]             | object | cell content                                       |                                                         | true         |           |
| rows.list[i].data[j].ratio       | number | cell size (range 0 - 1)                            |                                                         | dotplot only |           |
| rows.list[i].data[j].score       | number | cell score/edge                                    |                                                         | dotplot only |           |
| rows.list[i].data[j].value       | number | cell abundance/value                               |                                                         | true         |           |

Heat maps are the most basic image type and require a "columns" object with an array of column "names" in the order they should appear on the image. The "rows" object contains the actual data for the image. The "list" key in the "rows" object is an array with a length equal to the number of rows. Each entry in the "rows.list" array should have a "name" and a "data" array containing the data for each cell in the row. The "data" array should have the same length as there are columns and be in the same order. Each entry in "data" should be an object with a "value" indicating the abundance/intensity for the cell.

The "imageType" should be specified in the "parameters" object. If you require a dot plot you should also specify the "score" to use for the edge and the "ratio" (range 0-1) in each "data" entry. The score will be used to colour edges on the dot plot. The ratio refers to the relative size of a dot plot cell relative to other cells in the row. The cell with the greatest value should be set to 1 and all other cells should be set relative to this. We do not calculate this on the fly in the interative viewer to make image loading and viewing more efficient.

There are two objects used for defining the image. The "parameters" object is used for setting immutable values. Typically these are parameters used during analysis to generate the image. When the image is generated by ProHits-viz, you may see key-value pairs such as "distanceMetric": "euclidean" or "abundanceColumn": "Bait". Only "imageType" and "scoreType" are reserved key names. You can add any other key-value pairs you like and these will simply be displayed on the information panel. This is a convenient way of associating meta-data with your image.

The "settings" object can be used to set mutable values, such as the "fillColor" or to set the thresholds for the primary and secondary filters that will be used to bin scores into edge colours on dotplots. Use the "current" key in the "settings" object to specify settings. The "default" key on the "settings" object is used by the interactive viewer for storing default settings and should not be used.

# Error Codes
* 400: Error with request body
* 403: Forbidden endpoint
* 404: Endpoint not found
* 405: Unsupported HTTP method
* 500: Server error

# Rate limit
There is no rate limit to requests.

# Tests

`npm test`

© 2018 James Knight.
