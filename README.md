[![devnet-bundle-snapshot](https://github.com/conterra/mapapps-attribute-slider/actions/workflows/devnet-bundle-snapshot.yml/badge.svg)](https://github.com/conterra/mapapps-attribute-slider/actions/workflows/devnet-bundle-snapshot.yml)
![Static Badge](https://img.shields.io/badge/tested_for_map.apps-4.18.3-%20?labelColor=%233E464F&color=%232FC050)

# Attribute Slider

The Attribute Slider provides an interactive slider widget for filtering map layers based on attribute values. It allows users to dynamically adjust a numeric attribute filter on one or more layers. The widget supports configuration of the target attribute, comparison relation, and slider settings such as range, step, and visible elements. It can automatically apply or remove the filter when the widget is opened or closed, and supports group layers.

![Screenshot App](https://github.com/conterra/mapapps-attribute-slider/blob/main/screenshot.png)

### Sample App

[Sample App Link](https://demos.conterra.de/mapapps/resources/apps/public_demo_attributeslider/index.html)

### Documentation & Installation

[Attribute Slider Documentation Link](https://github.com/conterra/mapapps-attribute-slider/tree/master/src/main/js/bundles/dn_attributeslider)

## Development Quick Start

### Software Requirements

- Java >= 17
- Maven >= 3.9.0

Clone this project and ensure that you have all required dependencies installed correctly (see [Documentation](https://docs.conterra.de/en/mapapps/latest/developersguide/getting-started/set-up-development-environment.html)).

Then run the following commands from the project root directory to start a local development server:

```bash
# install all required node modules
$ mvn initialize

# start dev server
$ mvn compile -Denv=dev -Pinclude-mapapps-deps

# run unit tests
$ mvn test -P run-js-tests,include-mapapps-deps
```

For more details refer to the [Developer's Guide](https://docs.conterra.de/en/mapapps/latest/developersguide/getting-started/).
