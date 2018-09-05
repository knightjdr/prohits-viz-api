# Introduction

This API allows access to the analysis and visualization tools at ProHits-viz.

# Overview

## Address
https://prohits-viz.lunenfeld.ca/v2/api.

## Endpoints

### POST method

#### viz/

# Authentication
API access requires a key which can be be requested by e-mailing x. The key should be included in the request header using the field "apikey".

# Error Codes
* 401: Invalid or missing API key
* 404: Endpoint not found
* 405: Unsupported HTTP method
* 500: Server error

# Rate limit
There is no rate limit to requests.

# Tests

`npm test`

© 2018 James Knight.
