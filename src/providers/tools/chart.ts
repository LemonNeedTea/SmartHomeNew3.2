import { Injectable } from '@angular/core';
// import F2 from '@antv/f2';
import F2 from "@antv/f2/lib/index-all";

@Injectable()
export class chartToolsProvider {
    private chartObj: any = {};

    constructor() {
        this.chartObj = {};
    }
    getPieChart(id: string, data: any,dw:string) {
        if (this.chartObj[id]) {
            this.chartObj[id].clear();
            this.chartObj[id] = null;
        }
        var chart = new F2.Chart({
            id: id,
            pixelRatio: window.devicePixelRatio,
            height: 280,

        });
        chart.source(data, {
            percent: {
                formatter: function formatter(val) {
                    return val * 100 + '%';
                }
            }
        });
        chart.coord('polar', {
            transposed: true,
            radius: 0.85,
            innerRadius: 0.618
        });
        chart.axis(false);
        chart.legend(false);
        chart.tooltip(false);
        chart.guide().html({
            position: ['50%', '50%'],
            html: '<div style="text-align: center;width: 100px;height: 72px;vertical-align: middle;">' + `<p id="number${id}" style="font-size: 28px;margin: 10px 10px 5px;font-weight: bold;"></p>` + `<p id="name${id}" style="font-size: 12px;margin: 0;"></p>` + '</div>'
        });
        chart.interval().position('1*number').adjust('stack').color('type', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14']);
        chart.pieLabel({
            sidePadding: 30,
            activeShape: true,
            label1: function label1(data) {
                return {
                    text: data.number +dw,//* 100 + "%",
                    fill: '#343434',
                    fontWeight: 'bold'
                };
            },
            label2: function label2(data) {
                return {
                    text: data.type,
                    fill: '#999'
                };
            },
            onClick: function onClick(ev) {
                var data = ev.data;
                if (data) {

                    document.getElementById(`name${id}`).innerText = data.type;
                    let value=(data.number/data.const) * 100;
                    document.getElementById(`number${id}`).innerText = value.toFixed(2) + "%";
                }
            },
        });
        chart.render();
        this.chartObj[id] = chart;
    }
    getLineChart(id: string, data: any, config: any) {
        return this.getChart(id, 'line', data, config);
    }
    getBarChart(id: string, data: any, config: any) {
        return this.getChart(id, 'bar', data, config);
    }
    getChart(id: string, type: string, data: any, config: any) {
        if (this.chartObj[id]) {
            this.chartObj[id].clear();
            this.chartObj[id] = null;
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
        this.chartObj[id] = chart;
        return chart;

    }

}