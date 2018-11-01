// not used
class d3Base {
    constructor(container, config, data) {

        this._defaultConfig;
        this.scaleX;
        this.container;
        this.scaleY;
        this.config;
        this._draw;
        this._updateDraw;


    }
    AppendData(data) {
        this._addData(data);
        this._initScales();
        this._updateDraw();
    }

    UpdateData() {
        this._setData(data);
        this._initScales();
        this._updateDraw();
    }

    Resize(width, height) {
        this.scaleX.range([0, width]);
        this.scaleY.range([height, 0]);
        this._updateDraw();
    }


    ZoomX(min, max) {
        this.scaleX.domain([min, max]);
        this._updateDraw();
    }
    ZoomY(min, max) {
        this.scaleY.domain([max, min]);
        this._updateDraw();
    }


    _init(container, data, config) {
        this.config = MergeTo(this._defaultConfig, config);
        this._initContainer(container);
        let layoutParams = calculatedLayout(this.container, this.config.width, this.config.height);
        this.config.width = layoutParams.width;
        this.config.height = layoutParams.height;
        this.data = clone(data);
    }
    _initContainer(container) {
        if (typeof container === "string") { // if #divId , or  .divclass 
            this.container = d3.select(container).append("svg")
                .attr("width", "100%").attr("height", "100%");
        } else { // else  assume container is appended g or svg
            this.container = container;
        }
    }
    _setData(data) {
        for (var key in data) {
            if (!data.hasOwnProperty(key)) continue;
            if (!this.data.hasOwnProperty(key)) continue;
            this.data[key] = clone(data[key]);
        }
    }

    _addData(data) {
        for (var key in data) {
            if (!data.hasOwnProperty(key)) continue;
            if (!this.data.hasOwnProperty(key)) continue;
            this.data[key] = this.data[key].concat(data[key]);
            if (this.config.maxDataCount) {
                let start = this.data[key].length - this.config.maxDataCount;
                this.data[key] = this.data[key].slice(start);
            }
        }
    }
    _initScales() {


        let dataArrays = Object.values(this.data);
        let flattenData = [].concat.apply([], dataArrays);

        this.domainX = this.config.domainX || d3.extent(flattenData, this.config.x);
        this.domainY = this.config.domainY || d3.extent(flattenData, this.config.y);

        this.scaleX = this.config.scaleX || d3.scaleLinear()
            .range([0, this.config.width])
            .domain(this.domainX);

        this.scaleY = this.config.scaleY || d3.scaleLinear()
            .range([this.config.height, 0])
            .domain(this.domainY.reverse());
    }
}