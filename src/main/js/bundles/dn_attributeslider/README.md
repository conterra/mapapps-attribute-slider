# dn_attributeslider
The Attribute Slider Bundle provides attribute-based filtering capabilities for layers .

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
        "sliderOptions": {
            "min": 0,
            "max": 100,
            "step": 1,
            "defaultValue": 50,
            "showTicks": true,
            "showLabels": true
        },
        "layerOptions": {
            "allowedLayers": ["layer1", "layer2"],
            "defaultLayer": "layer1"
        },
        "fieldOptions": {
            "allowedFields": ["fieldA", "fieldB"],
            "defaultField": "fieldA"
        }
    }
}
```

| Property      | Type   | Possible Values | Default | Description                          |
|---------------|--------|-----------------|---------|--------------------------------------|
| sliderOptions | Object |                 |         | Options for the attribute slider UI. |
| layerOptions  | Object |                 |         | Configuration for selectable layers. |
| fieldOptions  | Object |                 |         | Configuration for selectable fields. |

### Customize widget configuration
To customize the appearance of the widget, use the widgetRole _attributeSliderWidget_.
More information about customizing a widget can be found here: https://docs.conterra.de/en/mapapps/latest/apps/configuring-apps/layout.html#customize-widgets
