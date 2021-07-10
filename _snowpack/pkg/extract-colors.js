/**
 * Font RegExp helpers.
 */

const weights = 'bold|bolder|lighter|[1-9]00'
  , styles = 'italic|oblique'
  , variants = 'small-caps'
  , stretches = 'ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded'
  , units = 'px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q'
  , string = '\'([^\']+)\'|"([^"]+)"|[\\w\\s-]+';

// [ [ <‘font-style’> || <font-variant-css21> || <‘font-weight’> || <‘font-stretch’> ]?
//    <‘font-size’> [ / <‘line-height’> ]? <‘font-family’> ]
// https://drafts.csswg.org/css-fonts-3/#font-prop
const weightRe = new RegExp('(' + weights + ') +', 'i');
const styleRe = new RegExp('(' + styles + ') +', 'i');
const variantRe = new RegExp('(' + variants + ') +', 'i');
const stretchRe = new RegExp('(' + stretches + ') +', 'i');
const sizeFamilyRe = new RegExp(
  '([\\d\\.]+)(' + units + ') *'
  + '((?:' + string + ')( *, *(?:' + string + '))*)');

/**
 * Cache font parsing.
 */

const cache = {};

const defaultHeight = 16; // pt, common browser default

/**
 * Parse font `str`.
 *
 * @param {String} str
 * @return {Object} Parsed font. `size` is in device units. `unit` is the unit
 *   appearing in the input string.
 * @api private
 */

var parseFont = function (str) {
  // Cached
  if (cache[str]) return cache[str]

  // Try for required properties first.
  const sizeFamily = sizeFamilyRe.exec(str);
  if (!sizeFamily) return // invalid

  // Default values and required properties
  const font = {
    weight: 'normal',
    style: 'normal',
    stretch: 'normal',
    variant: 'normal',
    size: parseFloat(sizeFamily[1]),
    unit: sizeFamily[2],
    family: sizeFamily[3].replace(/["']/g, '').replace(/ *, */g, ',')
  };

  // Optional, unordered properties.
  let weight, style, variant, stretch;
  // Stop search at `sizeFamily.index`
  let substr = str.substring(0, sizeFamily.index);
  if ((weight = weightRe.exec(substr))) font.weight = weight[1];
  if ((style = styleRe.exec(substr))) font.style = style[1];
  if ((variant = variantRe.exec(substr))) font.variant = variant[1];
  if ((stretch = stretchRe.exec(substr))) font.stretch = stretch[1];

  // Convert to device units. (`font.unit` is the original unit)
  // TODO: ch, ex
  switch (font.unit) {
    case 'pt':
      font.size /= 0.75;
      break
    case 'pc':
      font.size *= 16;
      break
    case 'in':
      font.size *= 96;
      break
    case 'cm':
      font.size *= 96.0 / 2.54;
      break
    case 'mm':
      font.size *= 96.0 / 25.4;
      break
    case '%':
      // TODO disabled because existing unit tests assume 100
      // font.size *= defaultHeight / 100 / 0.75
      break
    case 'em':
    case 'rem':
      font.size *= defaultHeight / 0.75;
      break
    case 'q':
      font.size *= 96 / 25.4 / 4;
      break
  }

  return (cache[str] = font)
};

/* globals document, ImageData */



var parseFont_1 = parseFont;

var createCanvas = function (width, height) {
  return Object.assign(document.createElement('canvas'), { width: width, height: height })
};

var createImageData = function (array, width, height) {
  // Browser implementation of ImageData looks at the number of arguments passed
  switch (arguments.length) {
    case 0: return new ImageData()
    case 1: return new ImageData(array)
    case 2: return new ImageData(array, width)
    default: return new ImageData(array, width, height)
  }
};

var loadImage = function (src, options) {
  return new Promise(function (resolve, reject) {
    const image = Object.assign(document.createElement('img'), options);

    function cleanup () {
      image.onload = null;
      image.onerror = null;
    }

    image.onload = function () { cleanup(); resolve(image); };
    image.onerror = function () { cleanup(); reject(new Error('Failed to load the image "' + src + '"')); };

    image.src = src;
  })
};

var browser = {
	parseFont: parseFont_1,
	createCanvas: createCanvas,
	createImageData: createImageData,
	loadImage: loadImage
};

class t{constructor(t,e,r,i=t<<16|e<<8|r){this.isColor=!0,this.red=t,this.green=e,this.blue=r,this.hex=i,this.count=1;}distance(t){return (Math.abs(t.red-this.red)+Math.abs(t.green-this.green)+Math.abs(t.blue-this.blue))/765}getWeight(t,e){return this.count/e*(1-t)+this.getSaturation()*t}getSaturation(){return void 0===this.saturation&&(this.saturation=Math.max(Math.abs(this.red-this.green)/255,Math.abs(this.red-this.blue)/255,Math.abs(this.green-this.blue)/255)),this.saturation}}class e{constructor(){this.count=1,this.children={};}addGroup(t){return this.children[t]?this.children[t].count++:this.children[t]=new e,this.children[t]}addColor(e,r,i,o){return this.children[e]?this.children[e].count++:this.children[e]=new t(r,i,o,e),this.children[e]}getList(){return Object.keys(this.children).map((t=>this.children[t]))}getMaxWeight(t,e){if(void 0===this.maxWeight){const r=this.getList().map((r=>r.isColor?r.getWeight(t,e):r.getMaxWeight(t,e)));r.sort(((t,e)=>e-t)),this.maxWeight=r[0]||0;}return this.maxWeight}getMaxWeightColor(t,e){const r=this.getList();return r.sort(((r,i)=>r.isColor?i.getWeight(t,e)-r.getWeight(t,e):i.getMaxWeight(t,e)-r.getMaxWeight(t,e))),r[0].isColor?r[0]:r[0].getMaxWeightColor(t,e)}getMaxCountColor(){const t=this.getList();return t.sort(((t,e)=>t.isColor?e.count-t.count:e.getMaxCountColor()-t.getMaxCountColor())),t[0].isColor?t[0]:t[0].getMaxCountColor()}getColors(t,e,r){const i=this.getList().map((t=>{const{count:e}=t,r=t.getMaxCountColor();return r.count=e,r}));i.sort(((t,i)=>i.getWeight(e,r)-t.getWeight(e,r)));const o=[];return i.forEach((e=>{const r=o.find((r=>r.distance(e)<t));r?r.count+=e.count:o.push(e);})),o}}const r=(t,e,r=0,i=Number.MAX_VALUE)=>{if(Number(e)!==e||e<r||e>i)throw new Error(t+" is invalid");return Number(e)};class i{constructor({pixels:t=i.pixelsDefault,distance:e=i.distanceDefault,saturationImportance:o=i.saturationImportanceDefault,splitPower:s=i.splitPowerDefault,colorValidator:a=i.colorValidatorDefault}={}){this.pixels=((t,e,r=0,i=Number.MAX_SAFE_INTEGER)=>{if(!Number.isInteger(e)||e<r||e>i)throw new Error(t+" is invalid");return parseInt(e)})("pixels",t,1),this.splitPower=r("splitPower",s,2,16),this.distance=r("distance",e,0,1),this.saturationImportance=r("saturationImportance",o,0,1),this.colorValidator=((t,e)=>{if(!e||"[object Function]"!=={}.toString.call(e))throw new Error(t+" is invalid");return e})("colorValidator",a);}process(t){const r=new e,i=this.splitPower;for(let e=0;e<t.length;e+=4){const o=t[e],s=t[e+1],a=t[e+2],n=t[e+3];if(this.colorValidator(o,s,a,n)){const t=o<<16|s<<8|a,e=(o>>4&15)<<2|(s>>4&15)<<1|a>>4&15,n=Math.round(o*(i-1)/255)*(i*i)+Math.round(s*(i-1)/255)*i+Math.round(a*(i-1)/255);r.addGroup(n).addGroup(e).addColor(t,o,s,a);}}return r.getColors(this.distance,this.saturationImportance,this.pixels)}extract(t){return this.process(t).map((t=>({hex:`#${"0".repeat(6-t.hex.toString(16).length)}${t.hex.toString(16)}`,red:t.red,green:t.green,blue:t.blue,area:t.count/this.pixels,saturation:t.saturation/255})))}}i.pixelsDefault=1e4,i.distanceDefault=.2,i.saturationImportanceDefault=.2,i.splitPowerDefault=10,i.colorValidatorDefault=(t,e,r,i=255)=>i>250;const{createCanvas:o,loadImage:s}=browser,a=(t,e)=>new i(e).extract(t.data),n=(t,e)=>s(t).then((t=>{const r=new i(e),s=((t,e)=>{const r=t.width*t.height,i=r<e?t.width:Math.round(t.width*Math.sqrt(e/r)),s=r<e?t.height:Math.round(t.height*Math.sqrt(e/r)),a=o(i,s).getContext("2d");return a.drawImage(t,0,0,t.width,t.height,0,0,i,s),a.getImageData(0,0,i,s)})(t,r.pixels);return r.extract(s.data)}));var extractColors_es={extractColorsFromImageData:a,extractColorsFromSrc:n,extractColors:(t,e)=>t.width&&t.height&&t.data&&t.data.length?new Promise((r=>{r(a(t,e));})):n(t,e)};

export default extractColors_es;
