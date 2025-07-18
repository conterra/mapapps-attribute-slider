<!--

    Copyright (C) 2025 con terra GmbH (info@conterra.de)

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

-->
<template>
    <div class="attributeFilterWidget--container">
        <v-slider
            v-model="sliderValue"
            :min="sliderSettings.min"
            :max="sliderSettings.max"
            :step="sliderSettings.step"
            :ticks="sliderSettings.ticks"
            :tick-labels="sliderSettings.tickLabels"
        />
    </div>
</template>

<script lang="ts">
    import Bindable from "apprt-vue/mixins/Bindable";
    import { defineComponent } from 'vue';

    import type { SliderSettings } from "dn_attributeslider/api";

    export default defineComponent({
        mixins: [Bindable],
        props: {
            i18n: {
                type: Object,
                default: () => {
                }
            }
        },
        data() {
            return {
                sliderValue: 0,
                sliderSettings: {} as SliderSettings
            };
        }
    });
</script>
