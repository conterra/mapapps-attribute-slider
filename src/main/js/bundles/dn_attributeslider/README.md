# dn_attributeslider Bundle Documentation

## Bundle Description
The `dn_attributeslider` bundle provides an interactive slider widget for filtering map layers based on attribute values. It allows users to dynamically adjust a numeric attribute filter (e.g., house number) on one or more layers. The widget supports configuration of the target attribute, comparison relation, and slider settings such as range, step, and visible elements. It can automatically apply or remove the filter when the widget is opened or closed, and supports group layers.

## Usage
- The bundle must be added to the app.json in "allowedBundles" as `dn_attributeslider`.
- The bundle provides a Tool that must be added to a toolset in the `app.json`, the tool ID to reference is `attributeSliderWidgetToggleTool`

## Configuration Reference

```json
{
    "dn_attributeslider": {
        "Config": {
            "layerIds": [],
            "applyToGroupContents": false,
            "targetAttribute": "",
            "attributeValueRelation": ">=",
            "applyDefinitionExpressionOnWidgetOpen": true,
            "removeDefinitionExpressionOnWidgetClose": true,
            "sliderSettings": {
                "sliderStartValue": null,
                "min": 0,
                "max": 50,
                "step": 10,
                "visibleElements": {
                    "ticks": "always",
                    "tickLabels": [],
                    "maxLabel": true,
                    "minLabel": true,
                    "thumbLabel": "always"
                }
            }
        }
    }
}
```

| Property                                  | Type     | Values                          | Default  | Description                                                  |
|-------------------------------------------|----------|---------------------------------|----------|--------------------------------------------------------------|
| layerIds                                  | string[] | Any layer IDs                   | []       | List of layer IDs to which the slider filter will be applied |
| applyToGroupContents                      | boolean  | true, false                     | false    | Whether to apply the filter to all sublayers of group layers |
| targetAttribute                           | string   | Any attribute name              | ""       | The attribute field to filter on                             |
| attributeValueRelation                    | string   | "=", "<", ">", "<=", ">=", "!=" | ">="     | The comparison operator for the filter                       |
| applyDefinitionExpressionOnWidgetOpen     | boolean  | true, false                     | true     | Whether to apply the filter when the widget is opened        |
| removeDefinitionExpressionOnWidgetClose   | boolean  | true, false                     | true     | Whether to remove the filter when the widget is closed       |
| sliderSettings                            | object   | See below                       |          | Settings for the slider UI                                   |
| sliderSettings.sliderStartValue           | number   | Any number                      | null     | Initial value of the slider                                  |
| sliderSettings.min                        | number   | Any number                      | 0        | Minimum slider value                                         |
| sliderSettings.max                        | number   | Any number                      | 50       | Maximum slider value                                         |
| sliderSettings.step                       | number   | Any number                      | 10       | Step size for slider increments                              |
| sliderSettings.visibleElements            | object   | See below                       |          | Controls which slider UI elements are visible                |
| sliderSettings.visibleElements.ticks      | string   | "always", true, false           | "always" | Whether to show tick marks                                   |
| sliderSettings.visibleElements.tickLabels | string[] | Any array                       | []       | Custom labels for ticks, add "" for spacing                  |
| sliderSettings.visibleElements.maxLabel   | boolean  | true, false                     | true     | Show label for maximum value                                 |
| sliderSettings.visibleElements.minLabel   | boolean  | true, false                     | true     | Show label for minimum value                                 |
| sliderSettings.visibleElements.thumbLabel | string   | "always", true, false           | "always" | Show value label on slider thumb                             |

### Additional Considerations
- If `layerIds` contains group layers and `applyToGroupContents` is true, the filter will be applied to all sublayers.
- Ensure that the `targetAttribute` exists on all specified layers.
- The widget will only function if the referenced layers are present in the map.
- Edge cases: If a layer is missing or the attribute is not found, the filter will not be applied to that layer.
- The slider UI can be customized via the `sliderSettings.visibleElements` object.
