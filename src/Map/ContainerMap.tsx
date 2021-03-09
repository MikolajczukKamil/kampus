import React, {
  Component,
  MouseEvent as ReactMouseEvent,
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
  posX = this.props.map.startPosition.x
  posY = this.props.map.startPosition.y

  componentDidMount() {
    const { map } = this.props
    const { current } = this.mapRef

    current!.style.width = `${map.width}px`
    current!.style.height = `${map.height}px`

    this.updateMapPosition()
  }

  start: Vector = { x: 0, y: 0 }
  now: Vector = { x: 0, y: 0 }

  get PosX(): number {
    const { current: container } = this.props.rootRef

    return Math.max(
      0,
      Math.min(
        this.props.map.width - (container ? container.clientWidth : 0),
        this.posX + this.start.x - this.now.x
      )
    )
  }

  get PosY(): number {
    const { current: container } = this.props.rootRef

    return Math.max(
      0,
      Math.min(
        this.props.map.height - (container ? container.clientHeight : 0),
        this.posY + this.start.y - this.now.y
      )
    )
  }

  updateMapPosition() {
    this.mapRef.current!.style.transform = `translate(-${this.PosX}px, -${this.PosY}px)`
  }

  handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
    this.now.x = clientX
    this.now.y = clientY

    this.updateMapPosition()
  }

  handleMouseDown = ({ clientX, clientY }: ReactMouseEvent<HTMLDivElement>) => {
    const { current } = this.mapRef

    this.start.x = this.now.x = clientX
    this.start.y = this.now.y = clientY

    current!.style.cursor = 'pointer'
    current?.addEventListener('mousemove', this.handleMouseMove)
  }

  handleMouseUp = () => {
    const { current } = this.mapRef

    this.posX = this.PosX
    this.posY = this.PosY

    current!.style.cursor = 'default'
    current?.removeEventListener('mousemove', this.handleMouseMove)
  }

  render() {
    const { className, map, children } = this.props

    return (
      <div
        ref={this.mapRef}
        className={className}
        style={{ backgroundImage: `url(${map.image})` }}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleMouseDown as any}
        onMouseUp={this.handleMouseUp}
        onMouseOut={this.handleMouseUp}
      >
        {children}
      </div>
    )
  }
}
