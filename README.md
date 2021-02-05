# Introduction

This API allows third-party access to the analysis and visualization tools at ProHits-viz.

# Overview

## Access
Access to the api requires a key. Please email contact@prohits.org to request one. Once you have a key include it and your contact email in the request header using the `apikey` field. The contact email and key should be separated using a colon: `contact@address.org:apikey`

## Address
https<nolink>://prohits-viz.org/api/third-party

## Endpoints

All endpoints use the POST method.

### Route: /viz
headers:
* `Accept: application/json`
* `Apikey: contact@address.org:apikey`
* `Content-Type: application/json`

response:
* 200 status: url where the image can be accessed

body: Please see the JSON files in the sample-files folder for examples of how to format the request body. Specfically see the "-minimal.json" files for minimal working examples for either dot plots or heat maps. See the dotplot.json file for an example with many optional parameters set.

# Error Codes
* 400: Error with request body
* 403: Forbidden endpoint or invalid credentials
* 404: Endpoint not found
* 405: Unsupported HTTP method
* 500: Server error

# Rate limit
There is no rate limit to requests.

# Tests

`npm test`

© 2018 James Knight.
