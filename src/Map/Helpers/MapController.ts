import {
  MouseEvent as ReactMouseEvent,
  RefObject,
  TouchEvent as ReactTouchEvent,
  useContext,
  useEffect,
  useState,
} from 'react'
import { IMap } from '../IMap'
import { Vector } from '../Math/Vector'
import { MapContext } from '../MapContext'

class MapController {
  private baseX: number
  private baseY: number

  private isMapInMoving = false
  private start: Vector = { x: 0, y: 0 }
  private now: Vector = { x: 0, y: 0 }

  constructor(
    private mapRef: RefObject<HTMLDivElement>,
    private rootRef: RefObject<HTMLDivElement>,
    private map: IMap,
    private scale: number,
  ) {
    this.baseX = map.startPosition.x
    this.baseY = map.startPosition.y
  }

  public get Map() {
    return this.map
  }

  public useNewMap(map: IMap) {
    if (this.isMapInMoving) {
      this.stopMoving()
    }

    this.map = map

    this.updateMapPosition()
  }

  public useScale(scale: number) {
    this.scale = scale

    this.updateMapPosition()
  }

  public get Transform(): string {
    return `translate(-${ this.PositionX }px, -${ this.PositionY }px) scale(${ this.scale })`
  }

  private get PositionX(): number {
    const {
      map: { width: mapWidth },
      rootRef: { current: container },
    } = this

    const mapViewWidth = container?.clientWidth || 0

    return Math.max(
      0,
      Math.min(
        mapWidth * this.scale - mapViewWidth,
        this.baseX + (this.start.x - this.now.x),
      ),
    )
  }

  private get PositionY(): number {
    const {
      map: { height: mapHeight },
      rootRef: { current: container },
    } = this

    const mapViewHeight = container?.clientHeight || 0

    return Math.max(
      0,
      Math.min(
        mapHeight * this.scale - mapViewHeight,
        this.baseY + (this.start.y - this.now.y),
      ),
    )
  }

  private updateMapPosition() {
    if (this.mapRef.current) {
      this.mapRef.current.style.transform = this.Transform
    }
  }

  private startMoving(x: number, y: number) {
    const { current } = this.mapRef

    if (this.isMapInMoving || !current) return

    this.isMapInMoving = true
    this.start.x = this.now.x = x
    this.start.y = this.now.y = y

    current.style.cursor = 'move'
    current.addEventListener('mousemove', this.handleMoveMapDesktop) // , { capture: true }
    current.addEventListener('touchmove', this.handleMoveMapMobile)
  }

  private stopMoving() {
    const { current } = this.mapRef

    if (!this.isMapInMoving || !current) return

    this.baseX = this.PositionX
    this.baseY = this.PositionY

    this.isMapInMoving = false
    this.start.x = this.now.x = 0
    this.start.y = this.now.y = 0

    current.style.cursor = 'default'
    current.removeEventListener('mousemove', this.handleMoveMapDesktop) // , { capture: true }
    current.removeEventListener('touchmove', this.handleMoveMapMobile)
  }

  private moveMap(x: number, y: number) {
    this.now.x = x
    this.now.y = y

    this.updateMapPosition()
  }

  /** Handlers */

  public handleStartMovingDesktop = ({ clientX, clientY, target }: ReactMouseEvent) => {
    if (target === this.mapRef.current) {
      this.startMoving(clientX, clientY)
    }
  }

  public handleStartMovingMobile = ({ touches }: ReactTouchEvent<HTMLDivElement>) => {
    if (touches.length === 1) {
      this.startMoving(touches[0].clientX, touches[0].clientY)
    }
  }

  public handleStopMoving = (ev: ReactMouseEvent | ReactTouchEvent) => {
    if (ev.target === this.mapRef.current) {
      this.stopMoving()
    }
  }

  public handleMoveMapDesktop = ({ clientX, clientY }: MouseEvent) => {
    this.moveMap(clientX, clientY)
  }

  public handleMoveMapMobile = ({ touches }: TouchEvent) => {
    if (touches.length === 1) {
      this.moveMap(touches[0].clientX, touches[0].clientY)
    }
  }
}

export function useMapController(mapRef: RefObject<HTMLDivElement>, rootRef: RefObject<HTMLDivElement>) {
  const { map, scale } = useContext(MapContext)
  const [ controller ] = useState(new MapController(mapRef, rootRef, map, scale))

  useEffect(() => {
    // Changing the map re-creates MapController
    if (controller.Map !== map) {
      controller.useNewMap(map)

      console.warn('MapController: Map instance changed')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ map ])

  useEffect(() => {
    controller.useScale(scale)
  }, [ controller, scale ])

  return controller
}
