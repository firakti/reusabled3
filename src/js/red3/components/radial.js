// from https://codepen.io/dabrorius/pen/dWmOgB with some changes

import d3Base from "./d3-base";
import * as d3 from "d3";

export default class Radial extends d3Base {
    constructor(container, data, config) {
        super(container, data, config);
        this._defaultConfig = {
            outerRadiusFactor: 0.9,
            thickness: 10,
            width: "100%",
            height: "100%",
            max: 1,
            min: 0,
            text: d => d,
            fontsize: 15,
            fontColor: "white"
        };

    }
    _initScales() {

    }
    _init() {
        super._init();
        let smaller = (this.width < this.height) ? this.width : this.height;
        this.outerRadius = smaller * 0.5 * this.config.outerRadiusFactor;
    }
    _draw() {
        // const arcIndex = 0;
        // const arcCount = 1;
        // const startValue = this.data
        // const startAngle = Math.PI * startValue / 50
        // const angleDiff = Math.PI * progressPercent / 50 - startAngle;
        // const startAngleDeg = startAngle / Math.PI * 180
        // const angleDiffDeg = angleDiff / Math.PI * 180

        const startAngle = 0;
        const endAngle = Math.PI * 2 * (this.data / (this.config.max - this.config.min));
        const color = "#1acaf2";
        const valueText = this.config.text(this.data);
        this.shadowArc = d3.arc()
            .startAngle(0)
            .endAngle(Math.PI * 2)
            .innerRadius(this.outerRadius - this.config.thickness)
            .outerRadius(this.outerRadius);

        this.mainArc = d3.arc()
            .startAngle(startAngle)
            .endAngle(endAngle)
            .innerRadius(this.outerRadius - this.config.thickness)
            .outerRadius(this.outerRadius);

        this.container.append("path")
            .attr("fill", color)
            .attr("opacity", 0.2)
            .attr("transform", `translate(${this.width/2},${this.height/2})`)
            .attr("d", this.shadowArc());

        this.mainArcPath = this.container.append("path")
            .attr("fill", color)
            .attr("transform", `translate(${this.width/2},${this.height/2})`)
            .attr("d", this.mainArc());

        this.percentLabel = this.container.append("text")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .attr("font-size", this.config.fontsize)
            .attr("fill", this.config.fontColor || color)
            .attr("transform", `translate(${this.width/2},${this.height/2})`)
            .text(valueText);
    }
    _updateDraw() {
        // const startValue = this.data
        // const startAngle = Math.PI * startValue / 50
        // const angleDiff = Math.PI * progressPercent / 50 - startAngle;
        // const startAngleDeg = startAngle / Math.PI * 180
        // const angleDiffDeg = angleDiff / Math.PI * 180
        // const transitionDuration = 1500

        // this.mainArcPath.transition().duration(transitionDuration).attrTween('d', function() {
        //     return function(t) {
        //         this.mainArc.endAngle(startAngle + angleDiff * t);
        //         return this.mainArc();
        //     }
        // })
        // end.transition().duration(transitionDuration).attrTween('transform', function() {
        //     return function(t) {
        //         return `translate(${size.width/2},${size.height/2})` +
        //             `rotate(${(startAngleDeg + angleDiffDeg * t)})` +
        //             `translate(0,-${outerRadius-thickness/2})`
        //     }
        // })
        // this.percentLabel.transition().duration(transitionDuration).tween('bla', function() {
        //     return function(t) {
        //         this.percentLabel.text(Math.round(startValue + (progressPercent - startValue) * t));
        //     }
        // })
        // value = progressPercent
    }

}