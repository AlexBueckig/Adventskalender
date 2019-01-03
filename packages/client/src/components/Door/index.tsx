import { TweenLite } from 'gsap';
import React, { Component } from 'react';

import './Door.scss';

interface IProps {
  day: string;
  message: string;
  isOpen: boolean;
  offset: { left: number; top: number; width: number; height: number };
}

interface IState {
  left: number;
  top: number;
}

class Door extends Component<IProps, IState> {
  public static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    return {
      left: -Math.abs(prevState.left + nextProps.offset.left),
      top: -Math.abs(prevState.top + nextProps.offset.top)
    };
  }
  public door: HTMLElement | null;
  public front: HTMLElement | null;
  public back: HTMLElement | null;

  constructor(props: IProps) {
    super(props);
    this.door = null;
    this.front = null;
    this.back = null;
    this.state = { left: 0, top: 0 };

    this.onClick = this.onClick.bind(this);
  }

  public componentDidMount() {
    TweenLite.set(this.door, { transformStyle: 'preserve-3d' });
    TweenLite.set([this.back, this.front], { backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' });

    if (!this.props.isOpen) {
      TweenLite.set(this.back, { rotationY: -180 });
    } else {
      TweenLite.set(this.front, { rotationY: -180 });
    }

    if (this.door !== null) {
      this.setState({
        left: -Math.abs(this.door.getBoundingClientRect().left),
        top: -Math.abs(this.door.getBoundingClientRect().top)
      });
    }
  }

  public onClick() {
    if (!this.props.isOpen) {
      TweenLite.to(this.door, 1, { rotationY: -180 });
    }
  }

  public render() {
    return (
      <div className={'door day' + this.props.day} onClick={this.onClick}>
        <div className="door__content" ref={div => (this.door = div)}>
          <div className="door__front" ref={div => (this.front = div)}>
            <p className="door__label">{this.props.day}</p>
          </div>
          <div
            style={{
              backgroundPositionX: this.state.left,
              backgroundPositionY: this.state.top
            }}
            className="door__back"
            ref={div => (this.back = div)}
          >
            <p className="door__label">back</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Door;
