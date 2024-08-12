import { loadScript } from "../helpers"
import PropTypes from "prop-types"
import { useEffect, useRef, createContext, useContext, useState } from "react"
const loadTDTScript = async () => {
  await loadScript('https://api.tianditu.gov.cn/api?v=4.0&tk=235ab72c138cb0cbd3b35e15800ec46f')
  if(window.T) {
    return window.T
  }
  throw new Error('加载地图脚本失败')
}

const MapContext = createContext({
  instance: null
})

const useMap = () => {
  const map = useRef({
    instance: null
  })
  return [map.current]
}

const useMapInstance = () => {
  const { instance } = useContext(MapContext)
  return [instance]
}


const Map = ({
  onReady = () => {},
  onError = () => {},
  map,
  children,
  zoom,
  center,
  dragable,
  ...props
}) => {
  const mapElement = useRef(null)
  const [mapInstance, setMapInstance] = useState(null)

  useEffect(() => {
    loadTDTScript()
      .then((T) => {
        const instance = new T.Map(mapElement.current)
        setMapInstance(instance)
        onReady(instance, T)
        if(map) {
          map.instance = instance
        }
      })
      .catch(onError)
  }, [])

  useEffect(() => {
    if(!mapInstance) {
      return
    }
    mapInstance.centerAndZoom(
      new window.T.LngLat(center.lng, center.lat), 
      zoom
    )
  }, [mapInstance, center, zoom])

  useEffect(() => {
    if(!mapInstance) {
      return
    }
    setTimeout(() => {
      mapInstance.isDrag(dragable)
    })
  }, [mapInstance, dragable])
  return (
    <MapContext.Provider
      value={{
        instance: mapInstance
      }}
    >
      <div {...props} ref={mapElement}>{children}</div>
    </MapContext.Provider>
  )
}

class Center {
  lng = 0
  lat = 0

  constructor(lng, lat) {
    this.lng = lng
    this.lat = lat
  }
}

Map.propTypes = {
  onReady: PropTypes.func,
  onError: PropTypes.func,
  children: PropTypes.node,
  center: PropTypes.instanceOf(Center),
  zoom: PropTypes.number,
  dragable: PropTypes.bool
}

Map.useMap = useMap
Map.useMapInstance = useMapInstance

export { Map, Center }
