import { y } from '../common/lit-html-7e28c940.js';

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const i=new Map,a=t=>(e,...o)=>{var r;const a=o.length;let l,s;const n=[],u=[];let c,$=0,v=!1;for(;$<a;){for(c=e[$];$<a&&void 0!==(s=o[$],l=null===(r=s)||void 0===r?void 0:r._$litStatic$);)c+=l+e[++$],v=!0;u.push(s),n.push(c),$++;}if($===a&&n.push(e[a]),v){const t=n.join("$$lit$$");void 0===(e=i.get(t))&&i.set(t,e=n),o=u;}return t(e,...o)},l=a(y);

export { l as html };
