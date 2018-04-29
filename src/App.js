import React, { Component } from 'react';
import './App.css';
import { Math as CesiumMath, Cartesian3, Color, createWorldTerrain, ArcGisMapServerImageryProvider } from "cesium";
import { Viewer, Entity, Camera, GeoJsonDataSource, CameraFlyTo, ImageryLayer } from "cesium-react";

const positions = [
  Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100),
  Cartesian3.fromDegrees(139.767052, 35.681167, 100)
];

class App extends Component {
  componentDidMount() {
    // const imageryProvider = new BingMapsImageryProvider({
    //   url: BING_MAPS_URL,
    //   key: BING_MAPS_KEY,
    // });



  }
  render() {
    const terrainProvider = createWorldTerrain();
    return (
      <div className="App">
        <Viewer full terrainProvider={terrainProvider} enableLighting={true}>
          {/* <ImageryLayer
            imageryProvider={new ArcGisMapServerImageryProvider({
              url: "//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer"
            })} /> */}
          <GeoJsonDataSource
            data={{
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [-2.627566, 51.455386]
              }
            }}
            onLoad={dataSource => {
              dataSource.entities.values.forEach(e => {
                e.billboard = null;
                e.point = { color: Color.YELLOW, pixelSize: 10 };
              })
            }}
          />
          <Camera
            view={{
              destination: Cartesian3.fromDegrees(-5.036352, 56.797585, 1100),
              orientation: {
                heading: CesiumMath.toRadians(175.0),
                pitch: CesiumMath.toRadians(-35.0),
                roll: 0.0
              }
            }}
          />
          <CameraFlyTo
            destination={Cartesian3.fromDegrees(-5.033519, 56.781978, 1200)}
            orientation={{ pitch: CesiumMath.toRadians(-40.0), heading: CesiumMath.toRadians(175.0), roll: 0.0 }}
            duration={80}
          />
          <Entity
            name="test"
            description="test"
            position={positions[0]}
            point={{ pixelSize: 10 }} />
          <div
            style={{
              position: "absolute",
              left: "10px",
              top: "10px",
              zIndex: "100"
            }}>
          </div>
        </Viewer>
      </div>
    );
  }
}

export default App;
