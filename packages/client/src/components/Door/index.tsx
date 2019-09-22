import gql from 'graphql-tag';
import { TweenLite } from 'gsap';
import React, { Component } from 'react';
import { ChildMutateProps } from 'react-apollo';
import { OpenDoorHOC, OpenDoorMutation, OpenDoorVariables } from '../../generated/components';
import './Door.scss';

interface IComponentProps {
  id: string;
  day: string;
  message: string;
  isOpen: boolean;
  image_url: string;
  offset: { left: number; top: number; width: number; height: number };
}

type IProps = ChildMutateProps<IComponentProps, OpenDoorMutation, OpenDoorVariables>;

interface IState {
  left: number;
  top: number;
}

class Door extends Component<IProps, IState> {
  public static getDerivedStateFromProps(nextProps: any, prevState: any) {
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
  }

  public componentDidMount() {
    M.AutoInit();

    TweenLite.set(this.door, { transformStyle: 'preserve-3d' });
    TweenLite.set([this.back, this.front], { backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' });

    if (!this.props.isOpen) {
      TweenLite.set(this.back, { rotationY: -180 });
    } else {
      TweenLite.set(this.front, { rotationY: -180 });
    }

    if (this.door !== null) {
      this.setState({
        left: -Math.abs(this.door.getBoundingClientRect().left + this.props.offset.left),
        top: -Math.abs(this.door.getBoundingClientRect().top + this.props.offset.top)
      });
    }
  }

  public onClick = () => {
    if (!this.props.isOpen) {
      TweenLite.to(this.door, 1, { rotationY: -180 });
    }
    this.props.mutate({ variables: { doorId: this.props.id } });
  };

  public onDoorBackClick = () => {
    console.log('Door clicked');
  };

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
              backgroundPositionY: this.state.top,
              backgroundImage: `url(${this.props.image_url})`
            }}
            className="door__back modal-trigger"
            ref={div => (this.back = div)}
            data-target={`#modal${this.props.day}`}
          >
            <div
              className="door__label"
              data-target={`#modal${this.props.day}`}
              style={{ background: 'transparent' }}
              onClick={this.onDoorBackClick}
            >
              back
            </div>
          </div>
        </div>
        <div id={`#modal${this.props.day}`} className="modal card card-modal">
          <div className="card-image">
            <img className="activator" style={{ objectFit: 'cover' }} src="https://unsplash.it/800/500" />
          </div>
          <div className="card-content">
            <span className="card-title activator">
              {`${this.props.day}. Dezember`}
              <i className="material-icons right">more_vert</i>
            </span>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">
              {`${this.props.day}. Dezember`}
              <i className="material-icons right">close</i>
            </span>
            <p>{this.props.message}</p>
          </div>
          <div className="card-action">
            <a href="#" className="modal-close">
              Schließen
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export const OPEN_DOOR = gql`
  mutation OpenDoor($doorId: ID!) {
    openDoor(doorId: $doorId)
  }
`;

export default OpenDoorHOC<IComponentProps>({})(Door);
