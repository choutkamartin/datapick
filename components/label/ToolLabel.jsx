import { useState, useRef, useEffect } from "react";
import { joinClassNames } from "utils/helpers";
/**
 * A component that is responsible for drawing objects such as polygon or rectangles on the image.
 * @param {*} selectedObject
 * @param {Array} annotations An array containing all annotations for the current image.
 * @returns
 */
export default function ToolLabel({
  selectedObject,
  annotations,
  setAnnotations,
  tool,
  brightness,
  image,
  highlight,
}) {
  const backgroundRef = useRef();
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [objectWidth, setObjectWidth] = useState(0);
  const [objectHeight, setObjectHeight] = useState(0);
  const [positionX, setPositionX] = useState(null);
  const [positionY, setPositionY] = useState(null);
  const [objectX, setObjectX] = useState();
  const [objectY, setObjectY] = useState();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [multiplier, setMultiplier] = useState(1);

  /**
   * Executes when the user clicks on the drawing box, sets a mouseDown state to true, gets coordinates of the object and sets them. It draws either a polygon or a rectangle based on a selected tool.
   * @param {*} e An event from the event listener
   */
  function startDraw(e) {
    setIsMouseDown(true);
    const { x, y } = backgroundRef.current.getBoundingClientRect();
    const { pointX, pointY } = getCoordinates(e, x, y);
    setObjectX(pointX / multiplier);
    setObjectY(pointY / multiplier);
    switch (tool) {
      case "box":
        drawRectangle(pointX, pointY);
        break;
      case "polygon":
        drawPolygon(pointX, pointY);
        break;
      default:
        break;
    }
  }

  /**
   * A function for drawing rectangles.
   * @param {number} positionX An x position of a click relative to the image
   * @param {number} positionY An y position of a click relative to the image
   */
  function drawRectangle(positionX, positionY) {
    const position = annotations.findIndex(
      (object) => object.id === selectedObject.id
    );
    let calculatedWidth;
    let calculatedHeight;
    let objectXMutated;
    let objectYMutated;
    calculatedWidth = positionX - objectX;
    calculatedHeight = positionY - objectY;
    if (calculatedWidth < 0) {
      objectXMutated = positionX;
      objectYMutated = objectY;
      calculatedWidth = objectX - positionX;
    } else {
      objectXMutated = objectX;
      objectYMutated = objectY;
    }

    if (position != -1) {
      const items = [...annotations];
      const item = { ...items[position] };
      item.x = objectXMutated;
      item.y = objectYMutated;
      item.width = calculatedWidth;
      item.height = calculatedHeight;
      items[position] = item;
      setAnnotations(items);
    } else {
      const object = {
        id: selectedObject.id,
        name: selectedObject.name,
        type: selectedObject.type,
        x: objectXMutated,
        y: objectYMutated,
        width: calculatedWidth,
        height: calculatedHeight,
      };
      setAnnotations((annotations) => [...annotations, object]);
    }
  }

  /**
   * A function for drawing polygons.
   * @param {number} pointX An x position of a click relative to the image
   * @param {number} pointY An y position of a click relative to the image
   */
  function drawPolygon(pointX, pointY) {
    const position = annotations.findIndex(
      (object) => object.id === selectedObject.id
    );

    if (position != -1) {
      const items = [...annotations];
      const item = { ...items[position] };
      pointX = pointX / multiplier;
      pointY = pointY / multiplier;
      item.data.push({ x: pointX, y: pointY });
      items[position] = item;
      setAnnotations(items);
    } else {
      const object = {
        id: selectedObject.id,
        name: selectedObject.name,
        type: selectedObject.type,
        data: [
          {
            x: pointX / multiplier,
            y: pointY / multiplier,
          },
        ],
      };
      setAnnotations((annotations) => [...annotations, object]);
    }
  }

  /**
   * A function that calculates the upper left coordinates of the image.
   * @param {*} e An event from the event listener.
   * @returns X and y coordinates of the left upper corner of the image.
   */
  function getCoordinates(e) {
    const { x, y } = backgroundRef.current.getBoundingClientRect();
    const { clientX, clientY } = e;
    const pointX = clientX - x;
    const pointY = clientY - y;
    return { pointX, pointY };
  }

  /**
   * A function setting the mouse position relative to the image if the tool is a rectangle.
   * @param {*} e  An event from the event listener.
   */
  function setMousePosition(e) {
    if (tool === "box") {
      const { x, y } = backgroundRef.current.getBoundingClientRect();
      let { pointX, pointY } = getCoordinates(e, x, y);
      pointX = pointX / multiplier;
      pointY = pointY / multiplier;
      setPositionX(e.clientX);
      setPositionY(e.clientY);

      if (isMouseDown === true) {
        drawRectangle(pointX, pointY, positionX, positionY);
      }
    }
  }

  /**
   * Set the mouse up if the user has stopped dragging
   */
  function stopDrag() {
    setIsMouseDown(false);
  }

  /**
   * A function that takes in the drawn object, and maps their coordinates accordingly so that can be used in the HTML points attribute.
   * @param {*} item The drawed object ie. polygon.
   * @returns Coordinates of the polygon points properly joined.
   */
  function getPositionString(item) {
    const position = item.data.map((coordinate) => {
      return `${coordinate.x}/${coordinate.y} `;
    });

    const positionString = position
      .toString()
      .replaceAll(",", " ")
      .replaceAll("/", ",");
    return positionString;
  }

  /**
   * Sets the image height and width state
   * @param {*} e Event object from the onLoad event
   */
  function handleImageLoad(e) {
    setObjectHeight(e.target.naturalHeight);
    setObjectWidth(e.target.naturalWidth);
    setImageHeight(e.target.naturalHeight);
    setImageWidth(e.target.naturalWidth);
  }

  /**
   * Sets the multiplier based on the Shift key, deltaY change and multiplier condition
   * @param {*} event Event object from the wheel event
   */
  function handleWheel(event) {
    if (event.shiftKey === true) {
      if (event.deltaY < 0) {
        if (multiplier <= 32) {
          setMultiplier(multiplier * 1.25);
        }
      } else if (event.deltaY > 0) {
        if (multiplier > 1) {
          setMultiplier(multiplier * 0.75);
        }
      }
    }
  }

  /** Updates dimensions each time multiplier changes */
  useEffect(() => {
    updateDimensions();
  }, [multiplier]);

  /**
   * Changes the image dimensions based on multiplier and initial height or width
   */
  function updateDimensions() {
    setImageHeight(multiplier * objectHeight);
    setImageWidth(multiplier * objectWidth);
  }

  return (
    <div className="overflow-auto">
      <div
        className="overflow-auto"
        onMouseMove={setMousePosition}
        onMouseDown={startDraw}
        onMouseUp={stopDrag}
        onWheel={handleWheel}
        style={{
          width: objectWidth,
          height: objectHeight,
        }}
      >
        <div
          className="relative top-0 left-0"
          ref={backgroundRef}
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
        >
          <img
            src={`https://datapick.s3.eu-central-1.amazonaws.com/${image.key}`}
            alt="Image to annotate"
            className="block image-annotation"
            onLoad={handleImageLoad}
            style={{
              filter: `brightness(${brightness}%`,
              width: imageWidth,
              height: imageHeight,
            }}
          />
          <svg
            viewBox={`0 0 ${objectWidth} ${objectHeight}`}
            className="absolute w-full h-full top-0 left-0 cursor-crosshair"
          >
            <rect
              x="0"
              y="0"
              width={objectWidth}
              height={objectHeight}
              className="w-full h-full"
              fill="transparent"
            />
            <g>
              {annotations
                .filter((item) => item.type === "box")
                .map((item) => {
                  return (
                    <rect
                      key={item.id}
                      x={item.x}
                      y={item.y}
                      width={item.width}
                      height={item.height}
                      className={joinClassNames(
                        highlight === item.id && "highlighted",
                        "object"
                      )}
                    />
                  );
                })}
              {annotations
                .filter((item) => item.type === "polygon")
                .map((item) => {
                  return (
                    <polygon
                      key={item.id}
                      points={getPositionString(item)}
                      className={joinClassNames(
                        highlight === item.id && "highlighted",
                        "object"
                      )}
                    />
                  );
                })}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
