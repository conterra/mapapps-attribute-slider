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

import type { InjectedReference } from "apprt-core/InjectedReference";
import type { AttributeFilterWidgetModel } from "./AttributeFilterWidgetModel";
import type { MapWidgetModel } from "map-widget/api";

export class AttributeFilterController {
    private view?: __esri.MapView | __esri.SceneView;
    private targetLayers?: __esri.Layer[];

    private _model: InjectedReference<AttributeFilterWidgetModel>;
    private _mapWidgetModel: InjectedReference<MapWidgetModel>;

    activate(): void {
        this.initComponent();
    }

    private initComponent(): void {
        const model = this._model!;

        this.getView().then((view) => {
            this.view = view;
            this.targetLayers = this.getTargetLayers(model.layerIds);
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

    applyDefinitionExpressionToLayers(sliderValue: { value: number }): void {
        if (!this.view || !this.targetLayers) {
            return;
        }

        this.targetLayers.forEach((layer) => {
            layer.definitionExpression = `${this._model!.targetAttribute} > ${sliderValue.value}`;
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
                    resolve(view);
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
