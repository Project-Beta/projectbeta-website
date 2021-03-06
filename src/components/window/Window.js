import React from "react";
import logo_src from "../../images/logo-white.png";
import close_src from "../../images/navigation/close.png";
// import move_src from "../../images/navigation/nav-move.png";

import Explorer from "./Explorer";
import Textfile from "./Textfile";
import ImageViewer from "./ImageViewer";
import Team from "./Team";
import Events from "./Events";
import Contact from "./Contact";
import Pdf from "./Pdf";
import Unknown from "./Unknown";

import Draggable from "react-draggable"; // Both at the same time

export default function Window(props) {
  const obj = React.useRef();
  React.useEffect(() => {
    obj.current.style.zIndex = `${props.z}`;
    obj.current.style.display = props.visible ? "initial" : "none";
  }, [props]);

  function setWindowContent(dir) {
    if (dir.indexOf(".") === -1) return <Explorer {...props} />;
    else if (dir.endsWith(".txt") || dir.endsWith(".zip"))
      return <Textfile {...props} />;
    else if (dir.endsWith(".png")) return <ImageViewer {...props} />;
    else if (dir === "Guidelines.pdf") return <Pdf {...props} />;
    else if (dir === "Team.pdf") return <Team {...props} />;
    else if (dir === "Contact.pdf") return <Contact {...props} />;
    else if (dir === "Unknown.exe") return <Unknown {...props} />;
    else if (dir.search("/Events/")) return <Events {...props} />;
  }
  const windowContent = setWindowContent(props.dir);

  return (
    <Draggable
      handle={props.isMobile ? "#some-random-element" : ".window--header"}
      defaultPosition={{
        x: props.isMobile ? 0 : props.x,
        y: props.isMobile ? 10 : props.y,
      }}
      onStart={() => props.focusWindow(props.dir)}
    >
      <div
        className="window"
        id={`window--${props.id}`}
        ref={obj}
        onClick={() => {
          if (props.z !== props.zMax) {
            props.focusWindow(props.dir);
          }
        }}
      >
        <div className="window--header">
          <img src={logo_src} alt="PB Logo" draggable="false" />
          <h3>C:/ProjectBeta/{props.dir}</h3>
          {/* <h1>{props.z}</h1> */}
        </div>
        <img
          src={close_src}
          className="window--close"
          alt="Close button"
          onClick={() => {
            props.removeWindow(props.dir);
          }}
        />
        <div className="window--content">{windowContent}</div>
      </div>
    </Draggable>
  );
}
