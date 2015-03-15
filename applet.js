const Applet = imports.ui.applet;
const Lang = imports.lang;
const St = imports.gi.St;
const Main = imports.ui.main;

let uuid = "workspace-name@willurd";
let spacing = '    ';

function WorkspaceNameApplet(metadata, orientation, panel_height, instanceId) {
  this._init(metadata, orientation, panel_height, instanceId);
}

WorkspaceNameApplet.prototype = {
  __proto__: Applet.TextApplet.prototype,

  _init: function(metadata, orientation, panel_height, instanceId) {
    Applet.TextApplet.prototype._init.call(this, orientation, panel_height, instanceId);
    this.metadata = metadata;

    try {
      global.log(uuid + ": v0.0.1");
      global.window_manager.connect('switch-workspace', Lang.bind(this, this.update));
      this.update();
    } catch(e) {
      global.logError(uuid + " Main Applet Exception: " + e.toString());
    }
  },

  update: function() {
    let active_workspace = global.screen.get_active_workspace();
    let name = Main.getWorkspaceName(active_workspace.index());

    this.set_applet_label(spacing + name + spacing);
  }
}

function main(metadata, orientation, panel_height, instanceId) {
  return new WorkspaceNameApplet(metadata, orientation, panel_height, instanceId);
}
