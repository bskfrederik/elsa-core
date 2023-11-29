import{h as t,r as e,c as r,a}from"./p-a7a3baa1.js";import{l as i}from"./p-e71312f9.js";import{l as n,t as s}from"./p-3ff104be.js";import{c as f}from"./p-144a434e.js";import{T as h}from"./p-ded5f755.js";import{o}from"./p-691e5295.js";import"./p-219f806a.js";import"./p-b6964c5d.js";import"./p-72dc819a.js";import"./p-ddecd487.js";function l(t,e){if(c(t)){t="100%"}var r=d(t);t=e===360?t:Math.min(e,Math.max(0,parseFloat(t)));if(r){t=parseInt(String(t*e),10)/100}if(Math.abs(t-e)<1e-6){return 1}if(e===360){t=(t<0?t%e+e:t%e)/parseFloat(String(e))}else{t=t%e/parseFloat(String(e))}return t}function u(t){return Math.min(1,Math.max(0,t))}function c(t){return typeof t==="string"&&t.indexOf(".")!==-1&&parseFloat(t)===1}function d(t){return typeof t==="string"&&t.indexOf("%")!==-1}function v(t){t=parseFloat(t);if(isNaN(t)||t<0||t>1){t=1}return t}function w(t){if(t<=1){return"".concat(Number(t)*100,"%")}return t}function b(t){return t.length===1?"0"+t:String(t)}function g(t,e,r){return{r:l(t,255)*255,g:l(e,255)*255,b:l(r,255)*255}}function p(t,e,r){t=l(t,255);e=l(e,255);r=l(r,255);var a=Math.max(t,e,r);var i=Math.min(t,e,r);var n=0;var s=0;var f=(a+i)/2;if(a===i){s=0;n=0}else{var h=a-i;s=f>.5?h/(2-a-i):h/(a+i);switch(a){case t:n=(e-r)/h+(e<r?6:0);break;case e:n=(r-t)/h+2;break;case r:n=(t-e)/h+4;break}n/=6}return{h:n,s,l:f}}function m(t,e,r){if(r<0){r+=1}if(r>1){r-=1}if(r<1/6){return t+(e-t)*(6*r)}if(r<1/2){return e}if(r<2/3){return t+(e-t)*(2/3-r)*6}return t}function y(t,e,r){var a;var i;var n;t=l(t,360);e=l(e,100);r=l(r,100);if(e===0){i=r;n=r;a=r}else{var s=r<.5?r*(1+e):r+e-r*e;var f=2*r-s;a=m(f,s,t+1/3);i=m(f,s,t);n=m(f,s,t-1/3)}return{r:a*255,g:i*255,b:n*255}}function x(t,e,r){t=l(t,255);e=l(e,255);r=l(r,255);var a=Math.max(t,e,r);var i=Math.min(t,e,r);var n=0;var s=a;var f=a-i;var h=a===0?0:f/a;if(a===i){n=0}else{switch(a){case t:n=(e-r)/f+(e<r?6:0);break;case e:n=(r-t)/f+2;break;case r:n=(t-e)/f+4;break}n/=6}return{h:n,s:h,v:s}}function M(t,e,r){t=l(t,360)*6;e=l(e,100);r=l(r,100);var a=Math.floor(t);var i=t-a;var n=r*(1-e);var s=r*(1-i*e);var f=r*(1-(1-i)*e);var h=a%6;var o=[r,s,n,n,f,r][h];var u=[f,r,r,s,n,n][h];var c=[n,n,f,r,r,s][h];return{r:o*255,g:u*255,b:c*255}}function k(t,e,r,a){var i=[b(Math.round(t).toString(16)),b(Math.round(e).toString(16)),b(Math.round(r).toString(16))];if(a&&i[0].startsWith(i[0].charAt(1))&&i[1].startsWith(i[1].charAt(1))&&i[2].startsWith(i[2].charAt(1))){return i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0)}return i.join("")}function F(t,e,r,a,i){var n=[b(Math.round(t).toString(16)),b(Math.round(e).toString(16)),b(Math.round(r).toString(16)),b(j(a))];if(i&&n[0].startsWith(n[0].charAt(1))&&n[1].startsWith(n[1].charAt(1))&&n[2].startsWith(n[2].charAt(1))&&n[3].startsWith(n[3].charAt(1))){return n[0].charAt(0)+n[1].charAt(0)+n[2].charAt(0)+n[3].charAt(0)}return n.join("")}function j(t){return Math.round(parseFloat(t)*255).toString(16)}function A(t){return C(t)/255}function C(t){return parseInt(t,16)}function q(t){return{r:t>>16,g:(t&65280)>>8,b:t&255}}var S={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function E(t){var e={r:0,g:0,b:0};var r=1;var a=null;var i=null;var n=null;var s=false;var f=false;if(typeof t==="string"){t=_(t)}if(typeof t==="object"){if(O(t.r)&&O(t.g)&&O(t.b)){e=g(t.r,t.g,t.b);s=true;f=String(t.r).substr(-1)==="%"?"prgb":"rgb"}else if(O(t.h)&&O(t.s)&&O(t.v)){a=w(t.s);i=w(t.v);e=M(t.h,a,i);s=true;f="hsv"}else if(O(t.h)&&O(t.s)&&O(t.l)){a=w(t.s);n=w(t.l);e=y(t.h,a,n);s=true;f="hsl"}if(Object.prototype.hasOwnProperty.call(t,"a")){r=t.a}}r=v(r);return{ok:s,format:t.format||f,r:Math.min(255,Math.max(e.r,0)),g:Math.min(255,Math.max(e.g,0)),b:Math.min(255,Math.max(e.b,0)),a:r}}var R="[-\\+]?\\d+%?";var z="[-\\+]?\\d*\\.\\d+%?";var $="(?:".concat(z,")|(?:").concat(R,")");var B="[\\s|\\(]+(".concat($,")[,|\\s]+(").concat($,")[,|\\s]+(").concat($,")\\s*\\)?");var I="[\\s|\\(]+(".concat($,")[,|\\s]+(").concat($,")[,|\\s]+(").concat($,")[,|\\s]+(").concat($,")\\s*\\)?");var N={CSS_UNIT:new RegExp($),rgb:new RegExp("rgb"+B),rgba:new RegExp("rgba"+I),hsl:new RegExp("hsl"+B),hsla:new RegExp("hsla"+I),hsv:new RegExp("hsv"+B),hsva:new RegExp("hsva"+I),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function _(t){t=t.trim().toLowerCase();if(t.length===0){return false}var e=false;if(S[t]){t=S[t];e=true}else if(t==="transparent"){return{r:0,g:0,b:0,a:0,format:"name"}}var r=N.rgb.exec(t);if(r){return{r:r[1],g:r[2],b:r[3]}}r=N.rgba.exec(t);if(r){return{r:r[1],g:r[2],b:r[3],a:r[4]}}r=N.hsl.exec(t);if(r){return{h:r[1],s:r[2],l:r[3]}}r=N.hsla.exec(t);if(r){return{h:r[1],s:r[2],l:r[3],a:r[4]}}r=N.hsv.exec(t);if(r){return{h:r[1],s:r[2],v:r[3]}}r=N.hsva.exec(t);if(r){return{h:r[1],s:r[2],v:r[3],a:r[4]}}r=N.hex8.exec(t);if(r){return{r:C(r[1]),g:C(r[2]),b:C(r[3]),a:A(r[4]),format:e?"name":"hex8"}}r=N.hex6.exec(t);if(r){return{r:C(r[1]),g:C(r[2]),b:C(r[3]),format:e?"name":"hex"}}r=N.hex4.exec(t);if(r){return{r:C(r[1]+r[1]),g:C(r[2]+r[2]),b:C(r[3]+r[3]),a:A(r[4]+r[4]),format:e?"name":"hex8"}}r=N.hex3.exec(t);if(r){return{r:C(r[1]+r[1]),g:C(r[2]+r[2]),b:C(r[3]+r[3]),format:e?"name":"hex"}}return false}function O(t){return Boolean(N.CSS_UNIT.exec(String(t)))}var T=function(){function t(e,r){if(e===void 0){e=""}if(r===void 0){r={}}var a;if(e instanceof t){return e}if(typeof e==="number"){e=q(e)}this.originalInput=e;var i=E(e);this.originalInput=e;this.r=i.r;this.g=i.g;this.b=i.b;this.a=i.a;this.roundA=Math.round(100*this.a)/100;this.format=(a=r.format)!==null&&a!==void 0?a:i.format;this.gradientType=r.gradientType;if(this.r<1){this.r=Math.round(this.r)}if(this.g<1){this.g=Math.round(this.g)}if(this.b<1){this.b=Math.round(this.b)}this.isValid=i.ok}t.prototype.isDark=function(){return this.getBrightness()<128};t.prototype.isLight=function(){return!this.isDark()};t.prototype.getBrightness=function(){var t=this.toRgb();return(t.r*299+t.g*587+t.b*114)/1e3};t.prototype.getLuminance=function(){var t=this.toRgb();var e;var r;var a;var i=t.r/255;var n=t.g/255;var s=t.b/255;if(i<=.03928){e=i/12.92}else{e=Math.pow((i+.055)/1.055,2.4)}if(n<=.03928){r=n/12.92}else{r=Math.pow((n+.055)/1.055,2.4)}if(s<=.03928){a=s/12.92}else{a=Math.pow((s+.055)/1.055,2.4)}return.2126*e+.7152*r+.0722*a};t.prototype.getAlpha=function(){return this.a};t.prototype.setAlpha=function(t){this.a=v(t);this.roundA=Math.round(100*this.a)/100;return this};t.prototype.isMonochrome=function(){var t=this.toHsl().s;return t===0};t.prototype.toHsv=function(){var t=x(this.r,this.g,this.b);return{h:t.h*360,s:t.s,v:t.v,a:this.a}};t.prototype.toHsvString=function(){var t=x(this.r,this.g,this.b);var e=Math.round(t.h*360);var r=Math.round(t.s*100);var a=Math.round(t.v*100);return this.a===1?"hsv(".concat(e,", ").concat(r,"%, ").concat(a,"%)"):"hsva(".concat(e,", ").concat(r,"%, ").concat(a,"%, ").concat(this.roundA,")")};t.prototype.toHsl=function(){var t=p(this.r,this.g,this.b);return{h:t.h*360,s:t.s,l:t.l,a:this.a}};t.prototype.toHslString=function(){var t=p(this.r,this.g,this.b);var e=Math.round(t.h*360);var r=Math.round(t.s*100);var a=Math.round(t.l*100);return this.a===1?"hsl(".concat(e,", ").concat(r,"%, ").concat(a,"%)"):"hsla(".concat(e,", ").concat(r,"%, ").concat(a,"%, ").concat(this.roundA,")")};t.prototype.toHex=function(t){if(t===void 0){t=false}return k(this.r,this.g,this.b,t)};t.prototype.toHexString=function(t){if(t===void 0){t=false}return"#"+this.toHex(t)};t.prototype.toHex8=function(t){if(t===void 0){t=false}return F(this.r,this.g,this.b,this.a,t)};t.prototype.toHex8String=function(t){if(t===void 0){t=false}return"#"+this.toHex8(t)};t.prototype.toHexShortString=function(t){if(t===void 0){t=false}return this.a===1?this.toHexString(t):this.toHex8String(t)};t.prototype.toRgb=function(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}};t.prototype.toRgbString=function(){var t=Math.round(this.r);var e=Math.round(this.g);var r=Math.round(this.b);return this.a===1?"rgb(".concat(t,", ").concat(e,", ").concat(r,")"):"rgba(".concat(t,", ").concat(e,", ").concat(r,", ").concat(this.roundA,")")};t.prototype.toPercentageRgb=function(){var t=function(t){return"".concat(Math.round(l(t,255)*100),"%")};return{r:t(this.r),g:t(this.g),b:t(this.b),a:this.a}};t.prototype.toPercentageRgbString=function(){var t=function(t){return Math.round(l(t,255)*100)};return this.a===1?"rgb(".concat(t(this.r),"%, ").concat(t(this.g),"%, ").concat(t(this.b),"%)"):"rgba(".concat(t(this.r),"%, ").concat(t(this.g),"%, ").concat(t(this.b),"%, ").concat(this.roundA,")")};t.prototype.toName=function(){if(this.a===0){return"transparent"}if(this.a<1){return false}var t="#"+k(this.r,this.g,this.b,false);for(var e=0,r=Object.entries(S);e<r.length;e++){var a=r[e],i=a[0],n=a[1];if(t===n){return i}}return false};t.prototype.toString=function(t){var e=Boolean(t);t=t!==null&&t!==void 0?t:this.format;var r=false;var a=this.a<1&&this.a>=0;var i=!e&&a&&(t.startsWith("hex")||t==="name");if(i){if(t==="name"&&this.a===0){return this.toName()}return this.toRgbString()}if(t==="rgb"){r=this.toRgbString()}if(t==="prgb"){r=this.toPercentageRgbString()}if(t==="hex"||t==="hex6"){r=this.toHexString()}if(t==="hex3"){r=this.toHexString(true)}if(t==="hex4"){r=this.toHex8String(true)}if(t==="hex8"){r=this.toHex8String()}if(t==="name"){r=this.toName()}if(t==="hsl"){r=this.toHslString()}if(t==="hsv"){r=this.toHsvString()}return r||this.toHexString()};t.prototype.toNumber=function(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)};t.prototype.clone=function(){return new t(this.toString())};t.prototype.lighten=function(e){if(e===void 0){e=10}var r=this.toHsl();r.l+=e/100;r.l=u(r.l);return new t(r)};t.prototype.brighten=function(e){if(e===void 0){e=10}var r=this.toRgb();r.r=Math.max(0,Math.min(255,r.r-Math.round(255*-(e/100))));r.g=Math.max(0,Math.min(255,r.g-Math.round(255*-(e/100))));r.b=Math.max(0,Math.min(255,r.b-Math.round(255*-(e/100))));return new t(r)};t.prototype.darken=function(e){if(e===void 0){e=10}var r=this.toHsl();r.l-=e/100;r.l=u(r.l);return new t(r)};t.prototype.tint=function(t){if(t===void 0){t=10}return this.mix("white",t)};t.prototype.shade=function(t){if(t===void 0){t=10}return this.mix("black",t)};t.prototype.desaturate=function(e){if(e===void 0){e=10}var r=this.toHsl();r.s-=e/100;r.s=u(r.s);return new t(r)};t.prototype.saturate=function(e){if(e===void 0){e=10}var r=this.toHsl();r.s+=e/100;r.s=u(r.s);return new t(r)};t.prototype.greyscale=function(){return this.desaturate(100)};t.prototype.spin=function(e){var r=this.toHsl();var a=(r.h+e)%360;r.h=a<0?360+a:a;return new t(r)};t.prototype.mix=function(e,r){if(r===void 0){r=50}var a=this.toRgb();var i=new t(e).toRgb();var n=r/100;var s={r:(i.r-a.r)*n+a.r,g:(i.g-a.g)*n+a.g,b:(i.b-a.b)*n+a.b,a:(i.a-a.a)*n+a.a};return new t(s)};t.prototype.analogous=function(e,r){if(e===void 0){e=6}if(r===void 0){r=30}var a=this.toHsl();var i=360/r;var n=[this];for(a.h=(a.h-(i*e>>1)+720)%360;--e;){a.h=(a.h+i)%360;n.push(new t(a))}return n};t.prototype.complement=function(){var e=this.toHsl();e.h=(e.h+180)%360;return new t(e)};t.prototype.monochromatic=function(e){if(e===void 0){e=6}var r=this.toHsv();var a=r.h;var i=r.s;var n=r.v;var s=[];var f=1/e;while(e--){s.push(new t({h:a,s:i,v:n}));n=(n+f)%1}return s};t.prototype.splitcomplement=function(){var e=this.toHsl();var r=e.h;return[this,new t({h:(r+72)%360,s:e.s,l:e.l}),new t({h:(r+216)%360,s:e.s,l:e.l})]};t.prototype.onBackground=function(e){var r=this.toRgb();var a=new t(e).toRgb();var i=r.a+a.a*(1-r.a);return new t({r:(r.r*r.a+a.r*a.a*(1-r.a))/i,g:(r.g*r.a+a.g*a.a*(1-r.a))/i,b:(r.b*r.a+a.b*a.a*(1-r.a))/i,a:i})};t.prototype.triad=function(){return this.polyad(3)};t.prototype.tetrad=function(){return this.polyad(4)};t.prototype.polyad=function(e){var r=this.toHsl();var a=r.h;var i=[this];var n=360/e;for(var s=1;s<e;s++){i.push(new t({h:(a+s*n)%360,s:r.s,l:r.l}))}return i};t.prototype.equals=function(e){return this.toRgbString()===new t(e).toRgbString()};return t}();const{state:L,onChange:U}=f({labels:[]});const W=({text:e,color:r})=>{const a=r;const i=new T(r).lighten(55).toHexString();const n={color:a,backgroundColor:i};return t("span",{class:"tw-inline-flex tw-items-center tw-px-3 tw-py-0.5 tw-rounded-full tw-text-sm tw-font-medium",style:n},e)};const D=()=>t("svg",{class:"tw-h-6 tw-w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"}),t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"}));const G=class{constructor(a){e(this,a);this.selectedLabelsChanged=r(this,"selectedLabelsChanged",7);this.renderFlyout=()=>{const e=this.selectedLabels;const r=this.filteredLabels;const a=this.searchText;return t("div",{ref:t=>this.flyoutPanel=t,class:"tw-absolute tw-z-10 tw-right-0 tw-transform tw-mt-3 tw-px-2 tw-w-screen tw-max-w-md tw-px-0 hidden","data-transition-enter":"tw-transition tw-ease-out tw-duration-200","data-transition-enter-start":"tw-opacity-0 tw-translate-y-1","data-transition-enter-end":"tw-opacity-100 tw-translate-y-0","data-transition-leave":"tw-transition tw-ease-in tw-duration-150","data-transition-leave-start":"tw-opacity-100 tw-translate-y-0","data-transition-leave-end":"tw-opacity-0 tw-translate-y-1"},t("div",{class:"tw-rounded-lg tw-shadow-lg tw-ring-1 tw-ring-black tw-ring-opacity-5 tw-overflow-hidden"},t("div",{class:"tw-mx-auto tw-max-w-3xl tw-transform tw-divide-y tw-divide-gray-100 tw-overflow-hidden tw-rounded-xl tw-bg-white tw-shadow-2xl tw-ring-1 tw-ring-black tw-ring-opacity-5 tw-transition-all tw-opacity-100 tw-scale-100"},t("div",{class:"tw-relative"},t("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",class:"tw-pointer-events-none tw-absolute top-3.5 left-4 tw-h-5 tw-w-5 tw-text-gray-400"},t("path",{"fill-rule":"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z","clip-rule":"evenodd"})),t("input",{class:"tw-h-12 tw-w-full tw-border-0 tw-bg-transparent tw-pl-11 tw-pr-4 tw-text-gray-800 tw-placeholder-gray-400 focus:tw-ring-0 sm:tw-text-sm",placeholder:"Search...",role:"combobox",type:"text",ref:t=>this.searchTextElement=t,onInput:t=>this.onSearchTextChanged(t),value:a})),t("ul",{class:"tw-max-h-96 tw-scroll-py-3 tw-overflow-y-auto tw-p-1",role:"listbox"},r.map((r=>{const a=new T(r.color).lighten(40).toHexString();const i={backgroundColor:a};const n=!!e.find((t=>t==r.id));return t("li",{role:"option","tab-index":"-1"},t("a",{class:"tw-block tw-select-none tw-rounded-xl tw-p-3 tw-bg-white hover:tw-bg-gray-100",href:"#",onClick:t=>this.onLabelClick(t,r)},t("div",{class:"tw-flex tw-justify-start tw-gap-1.5"},t("div",{class:"tw-flex-none tw-w-8"},n?t(h,null):undefined),t("div",{class:"tw-flex-grow "},t("div",{class:"tw-flex tw-gap-1.5"},t("div",{class:"tw-flex-shrink-0 tw-flex tw-flex-col tw-justify-center "},t("div",{class:"tw-w-4 tw-h-4 tw-rounded-full",style:i,"aria-hidden":"true"})),t("div",{class:"tw-flex-grow"},t("p",{class:"tw-text-sm tw-font-medium tw-text-gray-900 tw-font-bold"},r.name))),t("div",null,t("p",{class:"tw-text-sm tw-font-normal tw-text-gray-500"},r.description))))))}))))))};this.renderLabel=e=>{const r=L.labels.find((t=>t.id==e));return t("div",{class:"tw-mr-2"},t(W,{text:r.name,color:r.color}))};this.closeFlyoutPanel=()=>{if(!!this.flyoutPanel)n(this.flyoutPanel)};this.toggleFlyoutPanel=()=>{this.filterLabelsDebounced();this.searchText=null;s(this.flyoutPanel);if(!!this.searchTextElement)this.searchTextElement.value="";this.searchTextElement.focus()};this.filterLabels=()=>{const t=this.searchText;if(o(t)){this.filteredLabels=L.labels;return}const e=t.toLocaleLowerCase();this.filteredLabels=L.labels.filter((t=>t.name.toLocaleLowerCase().includes(e)||t.description.toLocaleLowerCase().includes(e)))};this.getFilteredSelectedLabels=()=>{const t=L.labels;return this.selectedLabels.filter((e=>!!t.find((t=>t.id==e))))};this.onLabelClick=(t,e)=>{if(!this.selectedLabels.find((t=>t==e.id)))this.selectedLabels=[...this.selectedLabels,e.id];else this.selectedLabels=this.selectedLabels.filter((t=>t!=e.id));const r=this.getFilteredSelectedLabels();this.selectedLabels=r;this.selectedLabelsChanged.emit(r)};this.onSearchTextChanged=t=>{const e=t.target.value.trim();this.searchText=e;this.filterLabelsDebounced()};this.selectedLabels=[];this.buttonClass="tw-text-blue-500 hover:tw-text-blue-300";this.containerClass=undefined;this.selectedLabelsState=[];this.searchText=undefined;this.filteredLabels=undefined;this.filterLabelsDebounced=i.debounce(this.filterLabels,200);this.filteredLabels=L.labels}onWindowClicked(t){const e=t.target;if(!this.element.contains(e))this.closeFlyoutPanel()}render(){const e=this.getFilteredSelectedLabels();return t("div",{class:`tw-flex ${this.containerClass}`},t("div",{class:"tw-flex tw-flex-grow"},e.map(this.renderLabel)),t("div",{class:"tw-relative"},t("button",{onClick:t=>this.toggleFlyoutPanel(),class:this.buttonClass},t(D,null)),this.renderFlyout()))}get element(){return a(this)}};export{G as elsa_label_picker};
//# sourceMappingURL=p-9d636e70.entry.js.map