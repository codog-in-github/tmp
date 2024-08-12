import { useEffect,useRef } from "react"
import { Map } from "../Map"

const Zoom = ({ position = 'T_ANCHOR_BOTTOM_LEFT', color }) => {
  const [instance] = Map.useMapInstance()
  const scaleInstant = useRef(null)
  useEffect(() => {
    if(instance) {
      scaleInstant.current = new window.T.Control.Zoom()
      instance.addControl(scaleInstant.current)
    }
    return () => {
      if(instance && scaleInstant.current) {
        instance.removeControl(scaleInstant.current)
      }
    }
  }, [instance, position])
  useEffect(() => {
    if(scaleInstant.current) {
      scaleInstant.current.setColor(color)
    }
  }, [color])
  useEffect(() => {
    if(instance && scaleInstant.current) {
      scaleInstant.current.setPosition(window[position])
    }
  }, [instance, position])
}

export default Zoom
