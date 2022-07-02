import React from "react";
import logo_src from "../../images/logo-white.png";
import close_src from "../../images/navigation/close.png";
import move_src from "../../images/navigation/nav-move.png";

import Explorer from "./Explorer";
import Textfile from "./Textfile";
import ImageViewer from "./ImageViewer";
import Team from "./Team";
import Events from "./Events";
import Contact from "./Contact";

export default function Window(props) {
  /**
   * @param {Object} props
   */
  const [location, setLocation] = React.useState({
    abs_x: window.innerWidth <= 900 ? 0 : props.x,
    abs_y: window.innerWidth <= 900 ? 0 : props.y,
    dyn_x: 0,
    dyn_y: 0,
    cursor_x: 0,
    cursor_y: 0,
  });
  const obj = React.useRef();
  React.useEffect(() => {
    obj.current.style.left = `${props.x}px`;
    obj.current.style.top = `${props.y}px`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    obj.current.style.zIndex = `${props.z}`;
    obj.current.style.display = props.visible ? "initial" : "none";
  }, [props]);
  React.useEffect(() => {
    function toggleDisplayMode() {
      if (window.innerWidth <= 900) {
        obj.current.style.top = `10px`;
        obj.current.style.left = `0px`;
      } else {
        obj.current.style.top = `${location.abs_y}px`;
        obj.current.style.left = `${location.abs_x}px`;
      }
    }

    window.addEventListener("resize", toggleDisplayMode());

    return () => {
      window.removeEventListener("resize", toggleDisplayMode());
    };
  }, []);

  function handleDragStart(event) {
    console.log("You have entered dragging mode!");
    setLocation((e) => {
      return {
        ...e,
        cursor_x: event.clientX,
        cursor_y: event.clientY,
      };
    });
  }
  function handleTouchStart(event) {
    setLocation((e) => {
      return {
        ...e,
        cursor_x: event.touches[0].clientX,
        cursor_y: event.touches[0].clientY,
      };
    });
  }

  function handleDrag(event) {
    setLocation((e) => {
      return {
        ...e,
        dyn_x: e.abs_x + (event.clientX - e.cursor_x),
        dyn_y: e.abs_y + (event.clientY - e.cursor_y),
      };
    });

    obj.current.style.left = `${
      location.abs_x + (event.clientX - location.cursor_x)
    }px`;
    obj.current.style.top = `${
      location.abs_y + (event.clientY - location.cursor_y)
    }px`;
  }
  function handleTouch(event) {
    setLocation((e) => {
      return {
        ...e,
        dyn_x: e.abs_x + (event.touches[0].clientX - e.cursor_x),
        dyn_y: e.abs_y + (event.touches[0].clientY - e.cursor_y),
      };
    });

    obj.current.style.left = `${
      location.abs_x + (event.touches[0].clientX - location.cursor_x)
    }px`;
    obj.current.style.top = `${
      location.abs_y + (event.touches[0].clientY - location.cursor_y)
    }px`;
  }

  function handleDragEnd(event) {
    setLocation((e) => {
      return {
        ...e,
        abs_x: e.abs_x + (event.clientX - e.cursor_x),
        abs_y: e.abs_y + (event.clientY - e.cursor_y),
        dyn_x: 0,
        dyn_y: 0,
      };
    });

    obj.current.style.left = `${
      location.abs_x + (event.clientX - location.cursor_x)
    }px`;
    obj.current.style.top = `${
      location.abs_y + (event.clientY - location.cursor_y)
    }px`;
  }
  function handleTouchEnd(event) {
    setLocation((e) => {
      return {
        ...e,
        abs_x: e.abs_x + (event.changedTouches[0].clientX - e.cursor_x),
        abs_y: e.abs_y + (event.changedTouches[0].clientY - e.cursor_y),
        dyn_x: 0,
        dyn_y: 0,
      };
    });

    obj.current.style.left = `${
      location.abs_x + (event.changedTouches[0].clientX - location.cursor_x)
    }px`;
    obj.current.style.top = `${
      location.abs_y + (event.changedTouches[0].clientY - location.cursor_y)
    }px`;
  }

  function setWindowContent(dir) {
    if (dir.indexOf(".") === -1) return <Explorer {...props} />;
    else if (dir === "Alumni.zip") return <Textfile {...props} />;
    else if (dir.endsWith(".png")) return <ImageViewer {...props} />;
    else if (dir === "Team.pdf") return <Team {...props} />;
    else if (dir === "Contact.pdf") return <Contact {...props} />;
    else if (dir.search("/Events/")) return <Events {...props} />;
  }
  const windowContent = setWindowContent(props.dir);

  return (
    <div
      className="window"
      id={`window--${props.id}`}
      ref={obj}
      onDoubleClick={() => {
        props.focusWindow(props.dir);
      }}
    >
      <div className="window--header">
        <img src={logo_src} alt="PB Logo" />
        <h3>C:/ProjectBeta/{props.dir}</h3>
        <img
          src={move_src}
          className="window--move"
          alt="Move button"
          onDragStart={(e) => {
            handleDragStart(e);
            props.focusWindow(props.dir);
          }}
          onTouchStart={(e) => {
            handleTouchStart(e);
            props.focusWindow(props.dir);
          }}
          onDrag={handleDrag}
          onTouchMove={handleTouch}
          onDragEnd={handleDragEnd}
          onTouchEnd={handleTouchEnd}
          draggable={true}
        />
        <img
          src={close_src}
          className="window--close"
          alt="Close button"
          onClick={() => props.removeWindow(props.dir)}
        />
      </div>
      <div className="window--content">{windowContent}</div>
    </div>
  );
}
