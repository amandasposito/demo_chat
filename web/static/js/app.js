// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "deps/phoenix_html/web/static/js/phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import {Socket} from "deps/phoenix/web/static/js/phoenix"

class App {
  static init() {
    var username = $("#username");
      var msgBody  = $("#message");

      let socket = new Socket("/socket");
      socket.connect();
      socket.onClose( e => console.log("Closed connection") );

      var channel = socket.channel("rooms:lobby", {});

      channel.join()
             .receive( "error", () => console.log("Failed to connect") )
             .receive( "ok",    () => console.log("Connected") )

      msgBody.off("keypress")
        .on("keypress", e => {
          if (e.keyCode == 13) {

            channel.push("new:message", {
                    user: username.val(),
                    body: msgBody.val()
                  });

            msgBody.val("");
          }
        });

      channel.on( "new:message", msg => this.renderMessage(msg) )
  }

  static renderMessage(msg) {
    var messages = $("#messages")
    var user = this.sanitize(msg.user || "New User")
    var body = this.sanitize(msg.body)

    messages.append(`<p><b>[${user}]</b>: ${body}</p>`)
  }

  static sanitize(str) {
    return $("<div/>").text(str).html()
  }
}

$( () => App.init() )

export default App
