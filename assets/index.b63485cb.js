var ie=Object.defineProperty,ne=Object.defineProperties;var ae=Object.getOwnPropertyDescriptors;var G=Object.getOwnPropertySymbols;var se=Object.prototype.hasOwnProperty,re=Object.prototype.propertyIsEnumerable;var N=(t,e,i)=>e in t?ie(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,w=(t,e)=>{for(var i in e||(e={}))se.call(e,i)&&N(t,i,e[i]);if(G)for(var i of G(e))re.call(e,i)&&N(t,i,e[i]);return t},y=(t,e)=>ne(t,ae(e));import{d as J,w as L,a as d,h as o,r as h,b as v,o as _,c as u,l as oe,S as C,W as le,P as ce,e as de,f as F,g as p,G as he,i as me,A as M,M as f,j as ue,k as K,m as P,n as S,p as Q,B as Y,q as pe}from"./vendor.27380aee.js";const fe=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function i(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerpolicy&&(s.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?s.credentials="include":a.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(a){if(a.ep)return;a.ep=!0;const s=i(a);fetch(a.href,s)}};fe();var m=(t=>(t.Home="home",t.SingleColorCube="single-color-cube",t.RainbowCube="rainbow-cube",t.LoadedModels="loaded-models",t))(m||{});const E={paths:["home"],search:void 0,hash:void 0},R=J.createSpaRouter({maxListenerCount:1,routeBase:"threejs-experiments",routeSanitizer:t=>{const e=t.paths[0];return L.isEnumValue(e,m)?y(w({},E),{paths:[e]}):E}});function be(t){return t.paths[0].replace(/-/g," ").split(" ").map(n=>{var a;return`${(a=n[0])==null?void 0:a.toLocaleUpperCase()}${n.slice(1)}`}).join(" ")}const $=d({tagName:"vir-app-route-link",props:{route:E},renderCallback:({props:t})=>{const e=be(t.route);return o`
            <a
                href=${R.createRoutesUrl(t.route)}
                @click=${n=>{J.routeOnLinkClick(n,t.route,R)}}
            >
                ${e}
            </a>
        `}}),x=d({tagName:"vir-app-nav",styles:h`
        :host {
            display: block;
        }
        ul {
            padding: 16px;
            margin: 0;
            list-style-type: none;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }

        ul li {
            padding: 1px 16px;
            margin: 4px 0;
            border: 1px solid grey;
            border-width: 0 1px;
        }
    `,props:{currentRoute:void 0,routeListener:void 0},events:{navUpdate:v()},renderCallback:({props:t,events:e,dispatch:i})=>o`
            <ul
                ${_(()=>{t.routeListener||(t.routeListener=R.addRouteListener(!0,n=>{var r;const a=n.paths[0],s=(r=t.currentRoute)==null?void 0:r.paths[0];a!==s&&(t.currentRoute=n,i(new e.navUpdate(n)))}))})}
            >
                ${L.getEnumTypedValues(m).map(n=>o`
                    <li>
                        <${$} ${u($.props.route,y(w({},E),{paths:[n]}))}></${$}>
                    </li>
                `)}
            </ul>
        `}),I=d({tagName:"vir-home",styles:h`
        :host {
            padding: 0 32px;
        }
    `,renderCallback:()=>oe`
            <h1>Welcome</h1>
            <p>
                Experiments with Three.js in a SPA. Rendering context is preserved across examples
                to prevent GPU memory leaks. Animations are entirely destroyed upon switching
                examples.
                <br />
                Uses my own simple web component library
                <!-- prettier-ignore -->
                <a href="https://www.npmjs.com/package/element-vir">element-vir</a>
                and my own simple router for single page applications
                <!-- prettier-ignore -->
                <a href="https://www.npmjs.com/package/spa-router-vir">spa-router-vir.</a>
            </p>
            <a href="https://github.com/electrovir/threejs-experiments">Source code</a>
        `}),X=class extends CustomEvent{constructor(t){super(X.eventName,{detail:t,bubbles:!0,composed:!0})}};let z=X;z.eventName="fpsCount";const Z=class extends CustomEvent{constructor(){super(Z.eventName,{bubbles:!0,composed:!0})}};let k=Z;k.eventName="animationDestroyed";class T extends EventTarget{constructor(){super(...arguments);this.lastRenderTime=0,this.lastFpsEmitTime=0,this.frameCountSinceLastFps=0,this.animationEnabled=!1,this.fpsEmitDelay=500,this.isDestroyed=!1}animate(e,i,n,a){return!1}initScene(e){return new C}destroyWebGlRenderer(){var e;this.webGlRenderer&&(this.webGlRenderer.renderLists.dispose(),(e=this.webGlRenderer)==null||e.clear(),this.webGlRenderer.state.reset(),delete this.webGlRenderer.context,this.webGlRenderer.dispose()),this.webGlRenderer=void 0}destroyScene(){var e;(e=this.scene)==null||e.clear(),this.scene=void 0}destroy(){this.dispatchEvent(new k),this.animationEnabled=!1,this.isDestroyed=!0,this.animate=()=>!1,this.destroyScene(),this.destroyWebGlRenderer(),this.camera=void 0,this.canvas=void 0,this.starterCameraDimensions=void 0,this.lastRenderTime=0,this.lastFpsEmitTime=0}init(e,i,n=500,a){if(this.isDestroyed)throw console.error(this),new Error("Cannot initialize a destroyed animation.");this.canvas=e,this.animationEnabled=i,this.fpsEmitDelay=n||500,this.webGlRenderer=new le({canvas:e}),a&&this.updateSize(a)}isInitialized(){return!!(this.canvas&&this.camera&&this.scene&&this.webGlRenderer)}addEventListener(e,i,n){return super.addEventListener(e,i,n),i}enableAnimation(e){e&&!this.animationEnabled&&this.resumeAnimation(),this.animationEnabled=e}emitFps(e){const i=e-this.lastFpsEmitTime;if(i>this.fpsEmitDelay){const n=this.frameCountSinceLastFps*1e3/i;this.dispatchEvent(new z(n)),this.frameCountSinceLastFps=0,this.lastFpsEmitTime=e}else++this.frameCountSinceLastFps}resumeAnimation(){requestAnimationFrame(e=>{this.lastRenderTime=e,this.lastFpsEmitTime=e,this.frameCountSinceLastFps=0,requestAnimationFrame(i=>this.animateWrapper(i))})}animateWrapper(e){if(this.animationEnabled)if(this.isInitialized()){const i=this.lastRenderTime;this.emitFps(e),this.lastRenderTime=e,this.animate(e-i,this.webGlRenderer,this.camera,this.scene)&&requestAnimationFrame(a=>this.animateWrapper(a))}else requestAnimationFrame(i=>this.animateWrapper(i))}initSizes(e){this.camera=new ce(75,e.w/e.h,.1,1e3);const i=Math.tan(Math.PI/180*this.camera.fov/2);this.camera.position.z=3,this.scene=this.initScene(this.camera),this.starterCameraDimensions={tanFov:i,canvasHeight:e.h},this.resumeAnimation()}updateSize(e){var n;const i={w:Math.floor(e.w),h:Math.floor(e.h)};if(this.starterCameraDimensions||this.initSizes(i),!!(this.canvas&&this.webGlRenderer&&this.camera)&&((n=this.webGlRenderer)==null||n.setSize(i.w,i.h),this.camera)){if(!this.starterCameraDimensions)throw new Error("Camera was defined for updating canvas size but not the initial camera dimensions.");if(!this.scene)throw new Error("Camera is defined already but the scene isn't.");this.camera.aspect=i.w/i.h,this.camera.fov=360/Math.PI*Math.atan(this.starterCameraDimensions.tanFov*(i.h/this.starterCameraDimensions.canvasHeight)),this.camera.updateProjectionMatrix()}}}function ge(t,e=100){let i=!1,n,a,s=[];return(...r)=>{s=r,n||(i||(t(...s),i=!0),n=window.setTimeout(()=>{t(...s),n=void 0,a&&window.clearTimeout(a),a=window.setTimeout(()=>{i=!1,a=void 0},Math.floor(e*2))},e))}}let b;const g=d({tagName:"vir-resize-canvas",styles:h`
        :host {
            display: flex;
            flex-direction: column;
            position: relative;
            align-items: stretch;
            box-sizing: border-box;
            overflow: hidden;
        }
        .canvas-wrapper {
            position: relative;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
        }
        canvas {
            /*
                Don't let the canvas take up space. That way canvas-wrapper isn't stretched to fit
                the canvas when it's really big (when animating, threeJS manually resizes the canvas
                to set pixel values).
            */
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            background-color: black;
        }
    `,events:{canvasInit:v(),canvasResize:v()},renderCallback:({dispatch:t,events:e})=>(b&&t(new e.canvasInit(b)),o`
            <div
                ${de(i=>{t(new e.canvasResize({w:i.contentRect.width,h:i.contentRect.height}))})}
                class="canvas-wrapper"
            >
                ${b||o`
                          <canvas
                              ${_(i=>{if(i instanceof HTMLCanvasElement)b=i,t(new e.canvasInit(i));else throw new Error("Canvas DOM was created but didn't send back a canvas element.")})}
                          ></canvas>
                      `}
            </div>
        `)}),l=d({tagName:"vir-animation",styles:h`
        :host {
            display: flex;
            flex-direction: column;
        }

        ${F(g.tagName)} {
            flex-grow: 1;
        }
    `,events:{fpsUpdate:v()},props:{animationEnabled:!0,animation:void 0,canvas:void 0,canvasSize:void 0,resizeListener:void 0},renderCallback:({props:t,dispatch:e,events:i})=>(t.animation&&(!t.animation.isInitialized()&&t.canvas&&(t.animation.init(t.canvas,t.animationEnabled,void 0,t.canvasSize),t.animation.addEventListener(z.eventName,n=>{e(new i.fpsUpdate(n.detail))}),t.resizeListener=ge(n=>{var a;(a=t.animation)==null||a.updateSize(n)},250),t.animation.addEventListener(k.eventName,()=>t.animation=void 0)),t.animation.isInitialized()&&t.animation.enableAnimation(t.animationEnabled)),o`
            <${g}
                    ${p(g.events.canvasInit,n=>{t.canvas=n.detail})}
                    ${p(g.events.canvasResize,n=>{var a;(a=t.resizeListener)==null||a.call(t,n.detail),t.canvasSize=n.detail})}
            ></${g}>
        `)});async function ve(t,e){return new Promise((i,n)=>{t.load(e,a=>{i(a)},void 0,a=>{n(a)})})}var V=(t=>(t.Bottle="bottle",t.Cube="cube",t.Sphere="sphere",t))(V||{});function U(t){t.morphTargetInfluences&&(t.morphDirections=t.morphTargetInfluences.map(()=>0),t.morphDirections[0]=1)}const ee={bottle:{sourceUrl:"https://github.com/KhronosGroup/glTF-Sample-Models/tree/a6cc02ac66d4fe7fbac622f9a9e5e5d9aab011f4/2.0/WaterBottle",license:{name:"CC0",url:"https://creativecommons.org/publicdomain/zero/1.0/"},href:"models/WaterBottle.glb",callback:t=>{const e=t.scene;return e.position.set(3,3,-5),e.scale.set(10,10,10),e}},cube:{sourceUrl:"https://github.com/KhronosGroup/glTF-Sample-Models/tree/a6cc02ac66d4fe7fbac622f9a9e5e5d9aab011f4/2.0/AnimatedMorphCube",license:{name:"CC0",url:"https://creativecommons.org/publicdomain/zero/1.0/"},href:"models/AnimatedMorphCube.glb",callback:t=>{const e=t.scene.children[0];return e.traverse(i=>{i instanceof f&&(i.material=new P({color:16750848}))}),e.position.set(-4,2,-2),U(e),e}},sphere:{sourceUrl:"https://github.com/KhronosGroup/glTF-Sample-Models/tree/a6cc02ac66d4fe7fbac622f9a9e5e5d9aab011f4/2.0/AnimatedMorphSphere",license:{name:"CC0",url:"https://creativecommons.org/publicdomain/zero/1.0/"},href:"models/AnimatedMorphSphere.glb",callback:t=>{const e=t.scene.children[0];return e.traverse(i=>{i instanceof f&&(i.material=new P({color:3394815}))}),e.position.setY(-2),U(e),e}}};function we(t){return!!t.morphDirections&&t instanceof f}function j(t,e){if(!we(e))throw new Error("object was supposed to have morph directions");e.rotation.z+=t*.01;const i=e.morphTargetInfluences,n=e.morphDirections;i&&i.forEach((a,s)=>{i[s]+=n[s]*t*.01,i[s]>=1?(i[s]=1,n[s]=-1):i[s]<=0&&n[s]!==0&&(i[s]=0,n[s]=0,s+1 in n?n[s+1]=1:n[0]=1)})}const ye={bottle:(t,e)=>{e.rotation.y+=t*.01},cube:j,sphere:j};function W(t,e,i,n,a){const s=new S(t,e,i,n);return s.position.set(...a),s}const te=class extends CustomEvent{constructor(t){super(te.eventName,{detail:t,bubbles:!0,composed:!0})}};let A=te;A.eventName="modelToggled";class Ee extends T{constructor(){super(...arguments);this.scene=new C,this.loader=new he,this.models={cube:this.loadModel("cube"),bottle:this.loadModel("bottle"),sphere:this.loadModel("sphere")},this.insertedModels={}}async addLights(e,i=!1){const n=new me("white",7,0,Math.PI/16);n.position.set(1,.5,2),n.target=await this.models.bottle;const a=[new M(4210752),W(16777215,.8,20,1,[-1,1,4]),W(16777215,1,10,1,[3,4,-4]),n];a.forEach(s=>e.add(s)),i&&a.forEach(s=>{if(s instanceof M)return;const r=new f(new ue(.05),new K({color:s.color}));r.position.set(s.position.x,s.position.y,s.position.z),e.add(r)})}async loadModel(e){const i=ee[e],n=await ve(this.loader,i.href);return i.callback(n)}async showModel(e,i){const n=await this.models[i],a=i in this.insertedModels;this.dispatchEvent(new A({model:i,showing:e})),e&&!a?(this.insertedModels[i]=n,this.scene.add(n)):!e&&a&&(delete this.insertedModels[i],this.scene.remove(n))}initScene(e){return e.position.set(0,0,6),this.showModel(!0,"sphere"),this.showModel(!0,"bottle"),this.addLights(this.scene),this.scene}animate(e,i,n,a){const s=e*60/1e3;return Object.keys(this.insertedModels).forEach(r=>{ye[r](s,this.insertedModels[r])}),i.render(a,n),!0}}const q=d({tagName:"vir-loading-model",styles:h`
        :host {
            display: flex;
            flex-direction: column;
        }

        :host > * {
            padding: 0 32px;
        }

        :host > ${F(l.tagName)} {
            /*
                this padding is used to manually verify that the canvas size is not overflowing
            */
            padding: 8px;
            flex-grow: 1;
        }

        button {
            width: 100px;
            padding: 6px;
        }

        label {
            cursor: pointer;
        }

        label input {
            cursor: pointer;
        }
    `,props:{animation:void 0,animationEnabled:!0,currentFps:0,modelsShowing:{}},renderCallback:({props:t})=>(t.animation||(t.animation=new Ee,t.animation.addEventListener(A.eventName,e=>{t.modelsShowing=y(w({},t.modelsShowing),{[e.detail.model]:e.detail.showing})})),o`
        <h1>Loaded Models</h1>
        <p>
            Example of loading various glb files, per <a href="https://threejs.org/docs/index.html#manual/en/introduction/Loading-3D-models">the guide.</a>
            <br>
            <br>
            ${L.getEnumTypedValues(V).map(e=>{var a;const i=`${e}-checkbox`,n=ee[e];return o`<label for=${i}>
                    <input id=${i} ?checked=${!!t.modelsShowing[e]} @change=${s=>{var D;const r=s.target.checked;(D=t.animation)==null||D.showModel(r,e)}} type="checkbox"></input>
                        ${(a=e[0])==null?void 0:a.toUpperCase()}${e.slice(1)}</label>
                    <span>
                        (<a href=${n.sourceUrl}>source</a>) license: <a href=${n.license.url}>${n.license.name}</a>
                    </span>
                <br>
            `})}
            <br>
            FPS: ${t.currentFps.toFixed(1)}
        </p>
        <${l}
            ${Q(l.props.animation,t.animation,e=>{e==null||e.destroy()})}
            ${u(l.props.animationEnabled,t.animationEnabled)}
            ${p(l.events.fpsUpdate,e=>{t.currentFps=e.detail})}
        >
        </${l}>
        `)}),c=d({tagName:"vir-animation-spa-page",styles:h`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }

        .slot-wrapper {
            padding: 0 32px;
        }

        :host > ${F(l.tagName)} {
            /*
                this padding is used to manually verify that the canvas size is not overflowing
            */
            padding: 8px;
            flex-grow: 1;
        }
    `,events:{fps:v()},props:{animation:void 0,animationEnabled:!0},renderCallback:({props:t,dispatch:e,events:i})=>o`<div class="slot-wrapper">
        <slot></slot>
    </div>
        <${l}
            ${Q(l.props.animation,t.animation,n=>{n==null||n.destroy()})}
            ${u(l.props.animationEnabled,t.animationEnabled)}
            ${p(l.events.fpsUpdate,n=>{e(new i.fps(n.detail))})}
        >
        </${l}>
        `});class Ce extends T{constructor(e=16711680,i=1){super();this.cubeColor=e,this.cubeSize=i,this.cube=new f(new Y(this.cubeSize),new pe({color:this.cubeColor})),this.frameCount=0}addLights(e){const i=new S(16777215,1,10);i.position.set(1,0,1);const n=new S(16777215,1,10);n.position.set(-.5,1,1),[new M(4210752),n,i].forEach(s=>e.add(s))}initScene(){const e=new C;return this.cube.material.clearcoat=.5,e.add(this.cube),this.addLights(e),e}animate(e,i,n,a){const s=e*60/1e3;++this.frameCount,this.frameCount>100&&(this.frameCount=0),this.cube.rotation.x+=s*.01,this.cube.rotation.y+=s*.01;const r=this.cube.material.color.getHSL({});return this.cube.material.color.setHSL(r.h+s*.003,r.s,r.l),i.render(a,n),!0}}const H=d({tagName:"vir-rainbow-cube",styles:h`
        :host {
            display: flex;
            flex-direction: column;
        }

        button {
            width: 100px;
            padding: 6px;
        }
    `,props:{animation:void 0,animationEnabled:!0,currentFps:0},renderCallback:({props:t})=>(t.animation||(t.animation=new Ce),o`
        <${c}
            ${u(c.props.animationEnabled,t.animationEnabled)}
            ${u(c.props.animation,t.animation)}
            ${p(c.events.fps,e=>t.currentFps=e.detail)}
        >
            <h1>Rainbow Cube</h1>
            <p>
                Variation on the intro example. Using <a href="https://threejs.org/docs/?q=light#api/en/lights/AmbientLight">AmbientLight</a>, <a href="https://threejs.org/docs/?q=light#api/en/lights/PointLight">PointLight</a>, and <a href="https://threejs.org/docs/?q=mesh#api/en/materials/MeshPhysicalMaterial">MeshPhysicalMaterial</a> with <a href="https://threejs.org/docs/?q=mesh#api/en/materials/MeshPhysicalMaterial.clearcoat">clear coat</a>.
                <br>
                <button @click=${()=>t.animationEnabled=!t.animationEnabled}>${t.animationEnabled?"pause":"play"}</button>
                <br>
                FPS: ${t.currentFps.toFixed(1)}
            </p>
        </${c}>
        `)});class B extends T{constructor(e=65280){super();this.cubeColor=e,this.cube=new f(new Y,new K({color:this.cubeColor}))}initScene(){const e=new C;return e.add(this.cube),e}animate(e,i,n,a){const s=6e-4*e;return this.cube.rotation.x+=s,this.cube.rotation.y+=s,i.render(a,n),!0}}const O=d({tagName:"vir-single-color-cube",styles:h`
        :host {
            display: flex;
            flex-direction: column;
        }

        button {
            width: 100px;
            padding: 6px;
        }
    `,props:{animation:void 0,animationEnabled:!0,currentFps:0},renderCallback:({props:t})=>(t.animation||(t.animation=new B(65280)),o`
        <${c}
            ${u(c.props.animationEnabled,t.animationEnabled)}
            ${u(c.props.animation,t.animation)}
            ${p(c.events.fps,e=>t.currentFps=e.detail)}
        >
            <h1>Single Color Cube</h1>
            <p>
                From the
                <!-- ignore so there aren't spaces inside of the link -->
                <!-- prettier-ignore -->
                <a
                    href="https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene"
                    >Creating a Scene</a>
                (
                <!-- prettier-ignore -->
                <a
                href="https://github.com/mrdoob/three.js/blob/1396ee243314d73dd918b0789f260d6c85b5b683/docs/manual/en/introduction/Creating-a-scene.html"
                >source code</a>
                ) introduction with window
                <!-- prettier-ignore -->
                <a href="https://jsfiddle.net/Q4Jpu/">resize support.</a>
                <br>
                <button @click=${()=>{t.animation=new B(65280)}}>reset</button>
                <br>
                FPS: ${t.currentFps.toFixed(1)}
            </p>
        </${c}>
        `)});d({tagName:"vir-three-js-experiments-app",props:{spaRoute:void 0},styles:h`
        :host {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
        }

        main {
            flex-grow: 1;
            overflow: hidden;
            display: flex;
            align-items: stretch;
        }

        main > * {
            flex-grow: 1;
        }

        .github-banner {
            position: absolute;
            top: 0;
            right: 0;
        }
    `,renderCallback:({props:t})=>o`
            <nav>
                <${x}
                    ${p(x.events.navUpdate,e=>{t.spaRoute=e.detail})}
                ></${x}>
            </nav>
            <main>
                ${$e(t.spaRoute)}
            </main>`});function $e(t){switch(t==null?void 0:t.paths[0]){case void 0:case m.Home:return o`<${I}></${I}>`;case m.SingleColorCube:return o`<${O}></${O}>`;case m.RainbowCube:return o`<${H}></${H}>`;case m.LoadedModels:return o`<${q}></${q}>`}}
