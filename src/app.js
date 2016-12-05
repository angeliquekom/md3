import { svg } from './svg';
import { line } from './line';
import { donut } from './donut';

var d3 = require('d3')

module.exports = {
  vis: function(conf){

    let svgObject = svg(conf);

    // console.log(svgObject);

    if (conf.type === 'line'){
      line(svgObject, conf);
    }
    if (conf.type === 'donut'){
      donut(svgObject, conf);
    }
  }
}
