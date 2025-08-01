///
/// Copyright (C) 2025 con terra GmbH (info@conterra.de)
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///         http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import { whenOnce } from "esri/core/reactiveUtils";

import type { InjectedReference } from "apprt-core/InjectedReference";
import type { AttributeSliderWidgetModel } from "./AttributeSliderWidgetModel";
import type { MapWidgetModel } from "map-widget/api";

export class AttributeSliderController {
    private view?: __esri.MapView | __esri.SceneView;
    private targetLayers?: __esri.Layer[];

    private _model: InjectedReference<AttributeSliderWidgetModel>;
    private _mapWidgetModel: InjectedReference<MapWidgetModel>;

    activate(): void {
        this.initComponent();
    }

    private initComponent(): void {
        const model = this._model!;

        this.getView().then(async (view) => {
            this.view = view;
            this.targetLayers = this.getTargetLayers(model.layerIds);
            await this.targetLayersAreLoaded();
        });
    }

    private getTargetLayers(layerIds: string[]): __esri.Layer[] {
        if (!this.view) {
            return [];
        }

        return layerIds
            .map((layerId) => {
                const layer = this.getLayerById(layerId);
                if (layer && (layer as __esri.Layer).type) {
                    return layer as __esri.Layer;
                }
                return undefined;
            })
            .filter((layer): layer is __esri.Layer => !!layer);
    }

    private async targetLayersAreLoaded(): Promise<void> {
        if (!this.targetLayers) {
            return;
        }
        const promises = this.targetLayers.map(layer => {
            if (layer.loaded) {
                return Promise.resolve();
            }
            return whenOnce(() => layer.loaded).then(() => {});
        });
        await Promise.all(promises);
    }

    removeSliderDefinitionExpressionFromLayers(): void {
        if (!this.view || !this.targetLayers) {
            return;
        }

        const model = this._model!;
        const applyToGroupContents = model.applyToGroupContents;

        this.targetLayers.forEach((layer) => {
            if (layer.type !== "group") {
                const featureLayer = layer as __esri.FeatureLayer;
                featureLayer.definitionExpression =
                    this.cutSliderDefinitionExpression(featureLayer.definitionExpression);
            }
            else if (applyToGroupContents && layer.type === "group") {
                (layer as __esri.GroupLayer).layers.forEach((sublayer) => {
                    if (sublayer.type === "feature") {
                        const featureLayer = sublayer as __esri.FeatureLayer;
                        featureLayer.definitionExpression =
                            this.cutSliderDefinitionExpression(featureLayer.definitionExpression);
                    }
                });
            }
            else {
                console.warn(
                    `Layer "${layer.title}" is a group layer but "applyToGroupContents" is false.
                     Skipping definition expression removal.`
                );
            }
        });
    }

    private cutSliderDefinitionExpression(currentExpression: string | undefined): string {
        if (!currentExpression) {
            return "";
        }

        const model = this._model!;
        const attribute = model.targetAttribute;
        const relation = model.attributeValueRelation;

        const regex = new RegExp(`\\b${attribute}\\s*${relation}\\s*\\d+`, "g");
        return currentExpression.replace(regex, "").trim();
    }

    addSliderDefinitionExpressionToLayers(sliderValue: { value: number }): void {
        if (!this.view || !this.targetLayers) {
            return;
        }

        const model = this._model!;
        const attribute = model.targetAttribute;
        const relation = model.attributeValueRelation;
        const applyToGroupContents = model.applyToGroupContents;

        this.targetLayers.forEach((layer) => {
            if (layer.type !== "group") {
                (layer as __esri.FeatureLayer).definitionExpression =
                    `${attribute} ${relation} ${sliderValue.value}`;
            }
            else if (applyToGroupContents && layer.type === "group") {
                (layer as __esri.GroupLayer).layers.forEach((sublayer) => {
                    if (sublayer.type !== "feature") return;

                    const featureLayer = sublayer as __esri.FeatureLayer;
                    if (featureLayer.fields?.some(field => field.name === attribute)) {
                        featureLayer.definitionExpression =
                            `${attribute} ${relation} ${sliderValue.value}`;
                    } else {
                        console.warn(
                            `Attribute "${attribute}" not found in sublayer "${sublayer.title}".
                             Did not apply definition expression.`
                        );
                    }
                });
            }
            else {
                console.warn(
                    `Layer "${layer.title}" is a group layer but "applyToGroupContents" is false.
                     Skipping definition expression application.`
                );
            }
        });
    }

    private async getView(): Promise<__esri.MapView | __esri.SceneView> {
        const mapWidgetModel = this._mapWidgetModel;

        if (!mapWidgetModel) {
            return Promise.reject("MapWidgetModel is not available.");
        }
        return new Promise((resolve) => {
            if (mapWidgetModel.view) {
                resolve(mapWidgetModel.view);
            } else {
                const watcher = mapWidgetModel.watch("view", ({ value: view }) => {
                    watcher.remove();
                    resolve(view!);
                });
            }
        });
    }

    private getLayerById(layerIdPath: string): __esri.Layer | __esri.Sublayer | undefined {
        if (typeof layerIdPath !== "string") {
            return undefined;
        }

        const mapWidgetModel = this._mapWidgetModel;

        const parts = layerIdPath.split("/");
        const layerId = parts[0];
        const sublayerId = parts[1];

        const layer = mapWidgetModel?.map?.findLayerById(layerId);
        if (!layer) return undefined;
        if (!sublayerId) {
            return layer;
        }

        return layer.findLayerById(parseInt(sublayerId, 10));
    }
}
