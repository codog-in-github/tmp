import { useEffect, useRef } from "react"
import { createRoot } from "react-dom/client"
import { Map } from "../Map"

const InfoWindow = ({ center, children }) => {
  const [ instance ] = Map.useMapInstance()
  const childrenElement = useRef(document.createElement('div'))
  const overlapRef = useRef(null)
  const rootRef = useRef(null)
  useEffect(() => {
    rootRef.current = createRoot(childrenElement.current)
  }, [])
  useEffect(() => {
    rootRef.current.render(children)
  }, [children])
  useEffect(() => {
    if(instance) {
      const marker = new window.T.InfoWindow()
      overlapRef.current = marker
      instance.addOverLay(marker)
      marker.setContent(childrenElement.current)
    }
    return () => {
      if(instance) {
        instance.removeOverLay(overlapRef.current)
      }
    }
  }, [instance])
  useEffect(() => {
    if(instance) {
      overlapRef.current.setLngLat(new window.T.LngLat(center.lng, center.lat))
    }
  }, [center, instance])
}

export default InfoWindow
