
// Initialize some variables before react-native code would access them
var onmessage=null, self=global;
// Cache Node's original require as __debug__.require
global.__debug__={require: require};
// Prevent leaking process.versions from debugger process to
// worker because pure React Native doesn't do that and some packages as js-md5 rely on this behavior
Object.defineProperty(process, "versions", {
    value: undefined
});
// TODO: Replace by url.fileURLToPath method when Node 10 LTS become deprecated
function fileUrlToPath(url) {
  if (process.platform === 'win32') {
      return url.toString().replace('file:///', '');
  } else {
    return url.toString().replace('file://', '');
  }
}
function getNativeModules() {
    var NativeModules;
    try {
        // This approach is for old RN versions
        NativeModules = global.require('NativeModules');
    } catch (err) {
        // ignore error and try another way for more recent RN versions
        try {
            var nativeModuleId;
            var modules = global.__r.getModules();
            var ids = Object.keys(modules);
            for (var i = 0; i < ids.length; i++) {
              if (modules[ids[i]].verboseName) {
                 var packagePath = new String(modules[ids[i]].verboseName);
                 if (packagePath.indexOf('Libraries/BatchedBridge/NativeModules.js') > 0 || packagePath.indexOf('Libraries\\BatchedBridge\\NativeModules.js') > 0) {
                   nativeModuleId = parseInt(ids[i], 10);
                   break;
                 }
              }
            }
          if (nativeModuleId) {
            NativeModules = global.__r(nativeModuleId);
          }
        }
        catch (err) {
            // suppress errors
        }
    }
    return NativeModules;
}
// Originally, this was made for iOS only
var vscodeHandlers = {
    'vscode_reloadApp': function () {
        var NativeModules = getNativeModules();
        if (NativeModules && NativeModules.DevSettings) {
            NativeModules.DevSettings.reload();
        }
    },
    'vscode_showDevMenu': function () {
        var NativeModules = getNativeModules();
        if (NativeModules && NativeModules.DevMenu) {
            NativeModules.DevMenu.show();
        }
    }
};
process.on("message", function (message) {
    if (message.data && vscodeHandlers[message.data.method]) {
        vscodeHandlers[message.data.method]();
    } else if(onmessage) {
        onmessage(message);
    }
});
var postMessage = function(message){
    process.send(message);
};
if (!self.postMessage) {
    self.postMessage = postMessage;
}
var importScripts = (function(){
    var fs=require('fs'), vm=require('vm');
    return function(scriptUrl){
        scriptUrl = fileUrlToPath(scriptUrl);
        var scriptCode = fs.readFileSync(scriptUrl, 'utf8');
        // Add a 'debugger;' statement to stop code execution
        // to wait for the sourcemaps to be processed by the debug adapter
        vm.runInThisContext('debugger;' + scriptCode, {filename: scriptUrl});
    };
})();

// Worker is ran as nodejs process, so console.trace() writes to stderr and it leads to error in native app
// To avoid this console.trace() is overridden to print stacktrace via console.log()
// Please, see Node JS implementation: https://github.com/nodejs/node/blob/master/lib/internal/console/constructor.js
console.trace = (function() {
    return function() {
        try {
            var err = {
                name: 'Trace',
                message: require('util').format.apply(null, arguments)
                };
            // Node uses 10, but usually it's not enough for RN app trace
            Error.stackTraceLimit = 30;
            Error.captureStackTrace(err, console.trace);
            console.log(err.stack);
        } catch (e) {
            console.error(e);
        }
    };
})();

// As worker is ran in node, it breaks broadcast-channels package approach of identifying if it’s ran in node:
// https://github.com/pubkey/broadcast-channel/blob/master/src/util.js#L64
// To avoid it if process.toString() is called if will return empty string instead of [object process].
var nativeObjectToString = Object.prototype.toString;
Object.prototype.toString = function() {
    if (this === process) {
        return '';
    } else {
        return nativeObjectToString.call(this);
    }
};


{"id":"d9300a0e-f7ad-418e-a765-3d7d82a7426e","createdAt":"2025-10-08T02:22:48.609Z","runtimeVersion":"exposdk:54.0.0","launchAsset":{"key":"bundle","contentType":"application/javascript","url":"http://127.0.0.1:8081/index.bundle?platform=ios&dev=true&hot=false&lazy=true&transform.engine=hermes&transform.bytecode=1&transform.routerRoot=app&unstable_transformProfile=hermes-stable"},"assets":[],"metadata":{},"extra":{"eas":{},"expoClient":{"name":"PhiTH","slug":"PhiTH","version":"1.0.0","orientation":"portrait","icon":"./assets/icon.png","userInterfaceStyle":"light","newArchEnabled":true,"splash":{"image":"./assets/splash-icon.png","resizeMode":"contain","backgroundColor":"#ffffff","imageUrl":"http://127.0.0.1:8081/assets/./assets/splash-icon.png"},"ios":{"supportsTablet":true},"android":{"adaptiveIcon":{"foregroundImage":"./assets/adaptive-icon.png","backgroundColor":"#ffffff","foregroundImageUrl":"http://127.0.0.1:8081/assets/./assets/adaptive-icon.png"},"edgeToEdgeEnabled":true},"web":{"favicon":"./assets/favicon.png"},"_internal":{"isDebug":false,"projectRoot":"D:\\backup\\DAI-HOC\\2531_app_dev_for_moblie_devices\\PhiTH","dynamicConfigPath":null,"staticConfigPath":"D:\\backup\\DAI-HOC\\2531_app_dev_for_moblie_devices\\PhiTH\\app.json","packageJsonPath":"D:\\backup\\DAI-HOC\\2531_app_dev_for_moblie_devices\\PhiTH\\package.json"},"sdkVersion":"54.0.0","platforms":["ios","android"],"iconUrl":"http://127.0.0.1:8081/assets/./assets/icon.png","hostUri":"127.0.0.1:8081"},"expoGo":{"debuggerHost":"127.0.0.1:8081","developer":{"tool":"expo-cli","projectRoot":"D:\\backup\\DAI-HOC\\2531_app_dev_for_moblie_devices\\PhiTH"},"packagerOpts":{"dev":true},"mainModuleName":"index"},"scopeKey":"@anonymous/PhiTH-05e3a3e0-9c95-46be-b4a3-566393f197a5"}}
// Notify debugger that we're done with loading
// and started listening for IPC messages
postMessage({workerLoaded:true});