const Applet = imports.ui.applet;
const Lang = imports.lang;
const Main = imports.ui.main;

function WorkspaceNameApplet(metadata, orientation, panel_height, instanceId) {
  this._init(metadata, orientation, panel_height, instanceId);
}

WorkspaceNameApplet.prototype = {
  __proto__: Applet.TextApplet.prototype,

  _init: function(metadata, orientation, panel_height, instanceId) {
    Applet.TextApplet.prototype._init.call(this, orientation, panel_height, instanceId);
    this.metadata = metadata;

    try {
      this.log(this.metadata.version);
      global.window_manager.connect('switch-workspace', Lang.bind(this, this.update));
      this.update();
    } catch(e) {
      this.logError(this.uuid + " Main Applet Exception: " + e.toString());
    }
  },

  log: function(message) {
    global.log('[' + this.metadata.uuid + '] ' + message);
  },

  logError: function(message) {
    global.logError('[' + this.metadata.uuid + '] ' + message);
  },

  update: function() {
    let active_workspace = global.screen.get_active_workspace();
    let name = Main.getWorkspaceName(active_workspace.index());
    this.set_applet_label(name);
  }
}

function main(metadata, orientation, panel_height, instanceId) {
  return new WorkspaceNameApplet(metadata, orientation, panel_height, instanceId);
}
