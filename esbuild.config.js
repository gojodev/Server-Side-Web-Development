/**
 * the only reason why this files exists so that I can use 
 * CommonJS Modules or ES6 modules on the client side
 * and translate both of those into something the
 * browser can understand which is the bundler's job
 * 
 * and kashif said that he would allow for all soultions as long
 * as they are using MongoDB and mongoose
 * 
 * I need a bundler for darkreader and Fuse.js (the search function)
 */

require("esbuild").build({
    // the entry point file described above
    entryPoints: ["./public/javascripts/viewBookings.js"],
    // the build folder location described above
    outfile: "./public/javascripts/bundle.js",
    bundle: true,
    // Replace with the browser versions you need to target
    target: ["chrome60", "firefox60", "safari11", "edge20"],
    // Optional and for development only. This provides the ability to
    // map the built code back to the original source format when debugging.
    sourcemap: "inline",
}).catch(() => process.exit(1));