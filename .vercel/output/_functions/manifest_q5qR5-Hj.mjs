import 'piccolore';
import { q as decodeKey } from './chunks/astro/server_DOi6Bj5i.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DetA4K5s.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/jairocampos/Documents/projects/vexalabs-academy/","cacheDir":"file:///Users/jairocampos/Documents/projects/vexalabs-academy/node_modules/.astro/","outDir":"file:///Users/jairocampos/Documents/projects/vexalabs-academy/dist/","srcDir":"file:///Users/jairocampos/Documents/projects/vexalabs-academy/src/","publicDir":"file:///Users/jairocampos/Documents/projects/vexalabs-academy/public/","buildClientDir":"file:///Users/jairocampos/Documents/projects/vexalabs-academy/dist/client/","buildServerDir":"file:///Users/jairocampos/Documents/projects/vexalabs-academy/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"gracias/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/gracias","isIndex":false,"type":"page","pattern":"^\\/gracias\\/?$","segments":[[{"content":"gracias","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/gracias.astro","pathname":"/gracias","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/webhooks/lemonsqueezy","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/webhooks\\/lemonsqueezy\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"webhooks","dynamic":false,"spread":false}],[{"content":"lemonsqueezy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/webhooks/lemonsqueezy.ts","pathname":"/api/webhooks/lemonsqueezy","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://academic.vexalabs.co","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/jairocampos/Documents/projects/vexalabs-academy/src/pages/gracias.astro",{"propagation":"none","containsHead":true}],["/Users/jairocampos/Documents/projects/vexalabs-academy/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/api/webhooks/lemonsqueezy@_@ts":"pages/api/webhooks/lemonsqueezy.astro.mjs","\u0000@astro-page:src/pages/gracias@_@astro":"pages/gracias.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_q5qR5-Hj.mjs","/Users/jairocampos/Documents/projects/vexalabs-academy/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CKACVYkJ.mjs","/Users/jairocampos/Documents/projects/vexalabs-academy/src/components/Nav.astro?astro&type=script&index=0&lang.ts":"_astro/Nav.astro_astro_type_script_index_0_lang.BytyFJj1.js","/Users/jairocampos/Documents/projects/vexalabs-academy/src/components/Pricing.astro?astro&type=script&index=0&lang.ts":"_astro/Pricing.astro_astro_type_script_index_0_lang.vYv_zaNC.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/jairocampos/Documents/projects/vexalabs-academy/src/components/Nav.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"astro:page-load\",()=>{const e=document.getElementById(\"mobile-menu-btn\"),t=document.getElementById(\"mobile-menu\");!e||!t||(e.addEventListener(\"click\",()=>{const n=e.getAttribute(\"aria-expanded\")===\"true\";e.setAttribute(\"aria-expanded\",String(!n)),t.classList.toggle(\"hidden\")}),t.querySelectorAll(\"a\").forEach(n=>{n.addEventListener(\"click\",()=>{t.classList.add(\"hidden\"),e.setAttribute(\"aria-expanded\",\"false\")})}))});"],["/Users/jairocampos/Documents/projects/vexalabs-academy/src/components/Pricing.astro?astro&type=script&index=0&lang.ts","document.querySelectorAll(\".checkout-btn\").forEach(t=>{t.addEventListener(\"click\",()=>{const a=parseFloat(t.dataset.price?.replace(\"$\",\"\")||\"0\"),e=t.dataset.plan||\"\";typeof fbq<\"u\"&&fbq(\"track\",\"InitiateCheckout\",{value:a,currency:\"USD\",content_name:e})})});window.addEventListener(\"message\",t=>{if(t.origin===\"https://app.lemonsqueezy.com\"&&typeof t.data==\"string\")try{const a=JSON.parse(t.data);if(a.event===\"Checkout.Success\"){const e=a.data?.order?.data?.attributes?.total?(a.data.order.data.attributes.total/100).toFixed(0):\"149\";window.location.href=`/gracias?amount=${e}`}}catch{}});"]],"assets":["/_astro/gracias.C5gPo8aH.css","/favicon.ico","/favicon.svg","/jairo.png","/logo-vexalabs-academy.svg","/logo-vexalabs.webp","/assets/projects/gymgo.png","/assets/projects/mantenix.png","/assets/projects/nutrixa.png","/gracias/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"pwJftVQfB9PNQ4E/hHN7UdG85QKsXDTQqGE6rwOyIDY="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
