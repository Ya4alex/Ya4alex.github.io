(function(){"use strict";function u(t,r,n){const e=r.x-t.x,a=r.y-t.y,o=n.x-t.x,l=n.y-t.y,s=2*(e*(n.y-r.y)-a*(n.x-r.x));if(s==0)return null;const i=e*(t.x+r.x)+a*(t.y+r.y),c=o*(t.x+n.x)+l*(t.y+n.y),f=(l*i-a*c)/s,x=(e*c-o*i)/s,d=Math.sqrt(Math.pow(t.x-f,2)+Math.pow(t.y-x,2));return{x:f,y:x,r:d}}function h(t,r){var n=t.x-r.x,e=t.y-r.y,a=Math.sqrt(n*n+e*e),o=Math.atan2(e,n),l=Math.acos((r.r-t.r)/a),s=Math.cos(o+l),i=Math.sin(o+l),c={x:t.x+t.r*s,y:t.y+t.r*i},f={x:r.x+r.r*s,y:r.y+r.r*i};return[c,f]}function g(t,r){const[n,e]=h(t,r);return Math.sqrt((e.x-n.x)**2+(e.y-n.y)**2)*(t.r+r.r)/2}function*y(t,r){for(let n=0;n<t.length-2;n++)for(let e=n+1;e<t.length-1;e++)for(let a=e+1;a<t.length;a++){const o=u(t[n],t[e],t[a]);o!==null&&(yield o)}}function M(t,r){const n=Array.from(y(t)),e=Array.from(y(r));let a=-1/0,o=null;for(let l=0;l<n.length;l++)for(let s=0;s<e.length;s++){const i=g(n[l],e[s]);i>a&&(a=i,o=[n[l],e[s]])}return[o,a]}self.onmessage=function(t){const{points1:r,points2:n}=t.data,e=M(r,n);self.postMessage(e)}})();