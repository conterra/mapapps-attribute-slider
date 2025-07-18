# dn_attributeslider
The Attribute Slider Bundle provides attribute-based filtering capabilities for layers.

## Usage
1. Add the bundle `dn_attributeslider` to your app.
2. Configure it as needed.

To make the functions of this bundle available to the user, the following tool can be added to a toolset:

| Tool ID                   | Component                 | Description                        |
|---------------------------|---------------------------|------------------------------------|
| attributeSliderToggleTool | AttributeSliderToggleTool | Show or hide the attribute slider. |

## Configuration Reference

### Config
```json
"dn_attributeslider": {
    "Config": {
        "layerIds": ["layer1", "layer2"],
        "targetAttribute": "fieldA",
        "applyToGroupContents": true
    }
}
```

| Property              | Type      | Default   | Description                                                        |
|-----------------------|-----------|-----------|--------------------------------------------------------------------|
| layerIds              | string[]  | []        | List of layer IDs to apply the filter to.                          |
| targetAttribute       | string    | ""        | The attribute field to filter on.                                  |
| applyToGroupContents  | boolean   | true      | If true, applies the filter to all sublayers in group layers.      |

### Customize widget configuration
To customize the appearance of the widget, use the widgetRole _attributeSliderWidget_.
More information about customizing a widget can be found here: https://docs.conterra.de/en/mapapps/latest/apps/configuring-apps/layout.html#customize-widgets
