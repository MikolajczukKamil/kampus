import React, {
  Component,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
  createRef,
  ReactNode,
  RefObject,
} from 'react'
import { IMap, Vector } from './IMap'

interface IContainerMapProps {
  children: ReactNode
  className: string
  map: IMap
  rootRef: RefObject<HTMLDivElement>
}

export class ContainerMap extends Component<IContainerMapProps> {
  mapRef = createRef<HTMLDivElement>()
  baseX = this.props.map.startPosition.x
  baseY = this.props.map.startPosition.y

  componentDidMount() {
    const { map } = this.props
    const { current } = this.mapRef

    current!.style.width = `${map.width}px`
    current!.style.height = `${map.height}px`

    this.updateMapPosition()
  }

  isMapInMoving = false
  start: Vector = { x: 0, y: 0 }
  now: Vector = { x: 0, y: 0 }

  get PositionX(): number {
    const {
      map: { width: mapWidth },
      rootRef: { current: container },
    } = this.props

    const mapViewWidth: number = container ? container.clientWidth : 0

    return Math.max(
      0,
      Math.min(mapWidth - mapViewWidth, this.baseX + this.start.x - this.now.x)
    )
  }

  get PositionY(): number {
    const {
      map: { height: mapHeight },
      rootRef: { current: container },
    } = this.props

    const mapViewHeight: number = container ? container.clientHeight : 0

    return Math.max(
      0,
      Math.min(
        mapHeight - mapViewHeight,
        this.baseY + this.start.y - this.now.y
      )
    )
  }

  updateMapPosition() {
    this.mapRef.current!.style.transform = `translate(-${this.PositionX}px, -${this.PositionY}px)`
  }

  startMoving(x: number, y: number) {
    const { current } = this.mapRef

    this.isMapInMoving = true
    this.start.x = this.now.x = x
    this.start.y = this.now.y = y

    current!.style.cursor = 'move'
    current?.addEventListener('mousemove', this.handleMoveMapDesktop)
    current?.addEventListener('touchmove', this.handleMoveMapMobile)
  }

  stopMoving() {
    const { current } = this.mapRef

    this.baseX = this.PositionX
    this.baseY = this.PositionY

    this.isMapInMoving = false
    this.start.x = this.now.x = 0
    this.start.y = this.now.y = 0

    current!.style.cursor = 'default'
    current?.removeEventListener('mousemove', this.handleMoveMapDesktop)
    current?.removeEventListener('touchmove', this.handleMoveMapMobile)
  }

  moveMap(x: number, y: number) {
    this.now.x = x
    this.now.y = y

    this.updateMapPosition()
  }

  handleStartMovingDesktop = ({
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) => {
    this.startMoving(clientX, clientY)
  }

  handleStartMovingMobile = ({ touches }: ReactTouchEvent<HTMLDivElement>) => {
    if (touches.length === 1) {
      this.startMoving(touches[0].clientX, touches[0].clientY)
    }
  }

  handleStopMoving = () => {
    if (this.isMapInMoving) {
      this.stopMoving()
    }
  }

  handleMoveMapDesktop = ({ clientX, clientY }: MouseEvent) => {
    this.moveMap(clientX, clientY)
  }

  handleMoveMapMobile = ({ touches }: TouchEvent) => {
    if (touches.length === 1) {
      this.moveMap(touches[0].clientX, touches[0].clientY)
    }
  }

  render() {
    const { className, map, children } = this.props

    return (
      <div
        ref={this.mapRef}
        className={className}
        style={{ backgroundImage: `url(${map.image})` }}
        /** Desktop */
        onMouseDown={this.handleStartMovingDesktop}
        onMouseUp={this.handleStopMoving}
        onMouseOut={this.handleStopMoving}
        /** Mobile */
        onTouchStart={this.handleStartMovingMobile}
        onTouchEnd={this.handleStopMoving}
        onTouchCancel={this.handleStopMoving}
      >
        {children}
      </div>
    )
  }
}
