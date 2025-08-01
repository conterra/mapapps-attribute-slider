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

import AttributeFilterWidget from "./template/AttributeFilterWidget.ts.vue";
import Vue from "apprt-vue/Vue";
import VueDijit from "apprt-vue/VueDijit";
import Binding, { Bindable } from "apprt-binding/Binding";

import type { InjectedReference } from "apprt-core/InjectedReference";
import type { MessagesReference } from "./nls/bundle";
import type { AttributeFilterWidgetModel } from "./AttributeFilterWidgetModel";
import type { AttributeFilterController } from "./AttributeFilterController";

export class AttributeFilterWidgetFactory {
    private vm?: Vue;
    private attributeFilterModelBinding?: Bindable;

    private _i18n!: InjectedReference<MessagesReference>;
    private _model: InjectedReference<AttributeFilterWidgetModel>;
    private _controller: InjectedReference<AttributeFilterController>;

    activate(): void {
        this.initComponent();
    }

    deactivate(): void {
        this.attributeFilterModelBinding?.unbind();
        this.attributeFilterModelBinding = undefined;

        this.vm = undefined;
    }

    initComponent(): void {
        const model = this._model!;
        const controller = this._controller!;

        const vm: Vue = this.vm = new Vue(AttributeFilterWidget);
        vm.i18n = this._i18n!.get().ui;
        vm.sliderSettings = model.sliderSettings;

        model.sliderValue = model.sliderSettings.sliderStartValue || model.sliderSettings.min;
        model.watch("sliderValue", (newValue: any) => {
            controller.removeSliderDefinitionExpressionFromLayers();
            controller.addSliderDefinitionExpressionToLayers(newValue);
        });

        this.attributeFilterModelBinding = Binding.for(vm, model)
            .syncAll("sliderValue")
            .enable()
            .syncToLeftNow();
    }

    createInstance(): typeof VueDijit {
        return VueDijit(this.vm);
    }

}
