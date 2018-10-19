# Introduction

This API allows third-party access to the analysis and visualization tools at ProHits-viz.

# Overview

## Address
https<nolink>://prohits-viz.lunenfeld.ca/v2/api/third-party

## Endpoints

All endpoints use the POST method.

### Route: /viz
headers:
* 'Accept: application/json'
* 'Content-Type: application/json'

response:
* 200 status: url where the image can be accessed
* 400 status: message indicating the error with the request body
* 500 status: null

body: Please see the JSON files in the sample-files folder for examples of how to format the request body. Specfically see the "-minimal.json" files for minimal working examples for either dot plots or heat maps. See the dotplot.json file for an example with many optional parameters set.

| property                         | type   | description                                        | options          | required      | default |
|----------------------------------|--------|----------------------------------------------------|------------------|---------------|---------|
| columns                          | object | column content                                     |                  | true          |         |
| columns.names                    | array  | array of column names                              |                  | true          |         |
| columns.names[i]                 | string | column name                                        |                  | true          |         |
| parameters                       | object | analysis specific parameters                       |                  | true          |         |
| parameters.imageType             | string | type of image                                      | dotplot, heatmap | true          |         |
| parameters.scoreType             | string | score type to use                                  | lte, gte         | false         | lte     |
| settings                         | object | image display parameters. Use to override defaults |                  | dot plot only |         |
| settings.current                 | object | specific parameters here.                          |                  | dot plot only |         |
| settings.current.imageType       | string | type of image.                                     | dotplot, heatmap | dot plot only | heatmap |
| settings.current.primaryFilter   | number | primary filter for setting dot plot edge color     |                  | false         | 0.01    |
| settings.current.secondaryFilter | number | secondary filter for setting dot plot edge color   |                  | false         | 0.05    |
| settings.default                 | object | default visualization setings                      |                  | false         |         |
| rows                             | object | row-specific content                               |                  | true          |         |
| rows.list                        | array  | image content                                      |                  | true          |         |
| rows.list[i].name                | string | row name                                           |                  | true          |         |
| rows.list[i].data                | array  | row content. Length must equal columns.names       |                  | true          |         |
| rows.list[i].data[j]             | object | cell content                                       |                  | true          |         |
| rows.list[i].data[j].ratio       | number | cell size (range 0 - 1)                            |                  | dotplot only  |         |
| rows.list[i].data[j].score       | number | cell score/edge                                    |                  | dotplot only  |         |
| rows.list[i].data[j].value       | number | cell abundance/value                               |                  | true          |         |

Heat maps are the most basic image type and require a "columns" object with an array of column "names" in the order they should appear on the image. The "rows" object contains the actual data for the image. The "list" key in the "rows" object is an array with a length equal to the number of rows. Each entry in the "rows.list" array should have a "name" and a "data" array containing the data for each cell in the row. The "data" array should have the same length as there are columns and be in the same order. Each entry in "data" should be an object with a "value" indicating the abundance/intensity for the cell.

The "imageType" should be specified in the "parameters" object. As dot plots and heat maps can be converted from one to the other in the interactive viewer, the user must specify in the settings object that a dot plot is preferred if you have a dot plot image and wish to have the image initial display as a dot plot (defaults to "heatmap"). Use the "current" key in the "settings" object to specify the "imageType" for dot plots. The "default" key on the "settings" object is used by the interactive viewer for storing default setings and should not be used.

If you require a dot plot you should also specify the "score" to use for the edge and the "ratio" to apply (range 0-1) in each "data" entry. The score will be used to colour edges on the dot plot. You can use the "settings" object to set the thresholds for the primary and secondary filters that will be used to bin scores into edge colours. The ratio refers to the relative size of a dot plot cell relative to other cells in the row. The cell with the greatest value should be set to 1 and all other cells should be set relative to this. We do not calculate this on the fly in the interative viewer to make image loading and viewing more efficient. By default lower scores are assumed to be better but you can reverse this by setting the "scoreType" on the "parameters" object to "gte".

# Authentication
API access requires a key which can be be requested by e-mail. The key should be included in the request header using the "authorization" field.

# Error Codes
* 401: Invalid or missing API key
* 403: Forbidden endpoint
* 404: Endpoint not found
* 405: Unsupported HTTP method
* 500: Server error

# Rate limit
There is no rate limit to requests.

# Tests

`npm test`

© 2018 James Knight.
