import React, { Component } from "react";

class KommunicateChat extends Component {
  componentDidMount() {
    // Clear chat history
    this.clearChatHistory();

    // Load Kommunicate script
    this.loadKommunicateScript();
  }

  clearChatHistory() {
    // Clear chat history using Kommunicate's API
    if (window.kommunicate && window.kommunicate.clearMessages) {
      window.kommunicate.clearMessages();
    }
  }

  loadKommunicateScript() {
    // Load Kommunicate script
    if (!window.kommunicate || !window.kommunicate._globals) {
      // If not loaded, load the script
      (function (d, m) {
        var kommunicateSettings = {
          appId: "3cbfb503922a049adabb5fa6b9ee615af",
          popupWidget: true,
          automaticChatOpenOnNavigation: true,
        };
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0];
        h.appendChild(s);
        window.kommunicate = m;
        m._globals = kommunicateSettings;
      })(document, window.kommunicate || {});
    }
  }

  render() {
    return <div></div>;
  }
}

export default KommunicateChat;
