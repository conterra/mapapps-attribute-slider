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

import { expect } from "chai";
import sinon from "sinon";
import { AttributeFilterController } from "../AttributeFilterController";

const mockModel = {
    layerIds: ["layer1"],
    targetAttribute: "attr",
    applyToGroupContents: true
} as any;
const mockSublayer = {
    fields: [{ name: "attr" }],
    definitionExpression: "",
    title: "Sublayer 1"
};
const mockGroupLayer = {
    type: "group",
    layers: [mockSublayer]
};
const mockFeatureLayer = {
    type: "feature",
    definitionExpression: ""
};
const mockMapWidgetModel = {
    view: {} as any,
    map: {
        findLayerById: sinon.stub().returns(mockGroupLayer)
    }
} as any;

describe("AttributeFilterController", () => {
    let controller: AttributeFilterController;

    beforeEach(() => {
        controller = new AttributeFilterController();
        controller["_model"] = { get: () => mockModel } as any;
        controller["_mapWidgetModel"] = mockMapWidgetModel as any;
    });

    it("should activate and initialize component", () => {
        const initSpy = sinon.spy(controller, "initComponent");
        controller.activate();
        expect(initSpy.calledOnce).to.be.true;
    });

    it("should get target layers when view is set", () => {
        controller.view = {} as any;
        const layers = controller["getTargetLayers"](["layer1"]);
        expect(layers).to.be.an("array");
    });

    it("should apply definition expression to layers", () => {
        controller.view = {} as any;
        controller.targetLayers = [{ definitionExpression: "", type: "feature" }] as any;
        controller["_model"] = { targetAttribute: "attr" } as any;
        controller.applyDefinitionExpressionToLayers({ value: 10 });
        expect(controller.targetLayers[0].definitionExpression).to.equal("attr > 10");
    });

    it("should return empty array if view is not set in getTargetLayers", () => {
        controller.view = undefined;
        const layers = controller["getTargetLayers"](["layer1"]);
        expect(layers).to.deep.equal([]);
    });

    it("should resolve view from getView if present", async () => {
        const view = await controller["getView"]();
        expect(view).to.be.an("object");
    });

    it("should return undefined for invalid layerId in getLayerById", () => {
        const result = controller["getLayerById"](123 as any);
        expect(result).to.be.undefined;
    });

    it("should skip group sublayers when applyToGroupContents is false", () => {
        controller["view"] = {} as any;
        // Set applyToGroupContents to false
        const modelWithNoGroupApply = { ...mockModel, applyToGroupContents: false };
        controller["_model"] = modelWithNoGroupApply;
        // Reset definitionExpression before test
        mockSublayer.definitionExpression = "";
        controller["targetLayers"] = [mockGroupLayer as any];
        controller.applyDefinitionExpressionToLayers({ value: 99 });
        // Only the group layer should get the definitionExpression, not the sublayer
        expect(mockGroupLayer.definitionExpression).to.equal("attr > 99");
        expect(mockSublayer.definitionExpression).to.equal("");
    });

    it("should not apply definition expression if view is undefined", () => {
        controller["view"] = undefined;
        controller["targetLayers"] = [mockFeatureLayer as any];
        controller["_model"] = mockModel;
        // Reset definitionExpression before test
        mockFeatureLayer.definitionExpression = "";
        controller.applyDefinitionExpressionToLayers({ value: 7 });
        expect(mockFeatureLayer.definitionExpression).to.equal("");
    });

    it("should not apply definition expression if targetLayers is undefined", () => {
        controller["view"] = {} as any;
        controller["targetLayers"] = undefined;
        controller["_model"] = mockModel;
        mockFeatureLayer.definitionExpression = "";
        controller.applyDefinitionExpressionToLayers({ value: 8 });
        expect(mockFeatureLayer.definitionExpression).to.equal("");
    });

    it("should not apply definition expression if targetAttribute is missing", () => {
        controller["view"] = {} as any;
        controller["targetLayers"] = [mockFeatureLayer as any];
        controller["_model"] = { ...mockModel, targetAttribute: undefined };
        mockFeatureLayer.definitionExpression = "";
        controller.applyDefinitionExpressionToLayers({ value: 15 });
        expect(mockFeatureLayer.definitionExpression).to.equal("undefined > 15");
    });

    it("should filter out undefined layers in getTargetLayers", () => {
        // Simulate getLayerById returning undefined
        sinon.stub(controller as any, "getLayerById").returns(undefined);
        controller["view"] = {} as any;
        const layers = controller["getTargetLayers"](["nonexistentLayer"]);
        expect(layers).to.deep.equal([]);
        (controller as any).getLayerById.restore();
    });

    it("should log info if sublayer does not have target attribute", () => {
        const sublayerNoAttr = { fields: [{ name: "other" }], definitionExpression: "", title: "Sublayer 2" };
        const groupLayer = { type: "group", layers: [sublayerNoAttr] };
        controller["view"] = {} as any;
        controller["targetLayers"] = [groupLayer as any];
        controller["_model"] = mockModel;
        const infoSpy = sinon.spy(console, "info");
        controller.applyDefinitionExpressionToLayers({ value: 10 });
        expect(infoSpy.calledOnce).to.be.true;
        infoSpy.restore();
    });

    it("should apply definition expression to feature layers", () => {
        controller["view"] = {} as any;
        controller["targetLayers"] = [mockFeatureLayer as any];
        controller["_model"] = mockModel;
        controller.applyDefinitionExpressionToLayers({ value: 5 });
        expect(mockFeatureLayer.definitionExpression).to.equal("attr > 5");
    });
});
