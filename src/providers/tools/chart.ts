import { Injectable } from '@angular/core';
import F2 from '@antv/f2';

@Injectable()
export class chartToolsProvider {
    private chartObj: any;

    constructor() {

    }
    getLineChart(id: string, data: any, config: any) {
        return this.getChart(id, 'line', data, config);
    }
    getBarChart(id: string, data: any, config: any) {
        return this.getChart(id, 'bar', data, config);
    }
    getChart(id: string, type: string, data: any, config: any) {
        if (this.chartObj) {
            this.chartObj.clear();
        }
        const chart = new F2.Chart({
            id: id,
            height: 280,
            pixelRatio: window.devicePixelRatio,
            padding: [50, 'auto', 50, 'auto'],
        });
        if (config['dw']) {
            chart.guide().text({
                position: ['min', 'max'],
                content: "单位(" + config['dw'] + ")",
                style: {
                    textBaseline: 'middle',
                    textAlign: 'center'
                },
                offsetY: -30
            });
        };
        chart.axis('key', {
            label: {
                rotate: -Math.PI / 4,
                textAlign: 'end',
                textBaseline: 'middle'
            }
        });
        chart.legend({
            align: 'right',
            itemWidth: 50
        });
        let key = {
            tickCount: 12,
            isRounding: true,
            formatter: function (res) {
                return res;
            }
        };
        let value = {};
        if (type == 'line') {
            key['range'] = [0, 1];
        }
        if (config['max']) {
            value['max'] = config['max'];
        }
        if (config['min']) {
            value['min'] = config['min'];
        }
        chart.scale({
            value: value,
            key: key
        });
        if (config['tooltip'] !== false) {
            chart.tooltip({
                // custom: true,
                // showXTip: true,
                // showYTip: true,
                // snap: true,
                // crosshairsType: 'xy',
                // crosshairsStyle: {
                //     lineDash: [2]
                // },
                onShow: function onShow(ev) {
                    var items = ev.items;
                    items[0].name = null;
                    items[0].name = items[0].title;
                    items[0].value = items[0].value;
                }
            });
        } else {
            chart.tooltip(false);
        }

        if (type == 'line') {
            chart.line().position('key*value').color('type').shape('smooth');
        } else {
            chart.interval().position('key*value').color('type');
        }
        chart.source(data);
        chart.render();
        // return chart;
        this.chartObj = chart;
    }

}