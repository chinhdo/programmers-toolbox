import React, { ChangeEvent } from 'react';
import './css-tracer.styles.scss';

type Props = Record<string, unknown>;

type State = {
  imgHidden: boolean;
  imgClassName: string;
  handle1X: number;
  handle1Y: number;
  handle2X: number;
  handle2Y: number;
};

class CssTracerPage extends React.Component<Props, State> {
  private handle1Ref: React.RefObject<HTMLDivElement>;
  private handle2Ref: React.RefObject<HTMLDivElement>;
  constructor(props: Props) {
    super(props);

    this.state = { imgHidden: false, imgClassName: '', handle1X: 25, handle1Y: 25, handle2X: 50, handle2Y: 50 };

    this.canvasClicked = this.canvasClicked.bind(this);
    this.hideImageChanged = this.hideImageChanged.bind(this);

    this.handle1Ref = React.createRef();
    this.handle2Ref = React.createRef();
  }

  canvasClicked(e: React.MouseEvent<HTMLDivElement>): void {
    const x = Math.round(10000 * ((e.clientX - e.currentTarget.offsetLeft) / e.currentTarget.offsetWidth)) / 100;
    const y = Math.round(10000 * ((e.clientY - e.currentTarget.offsetTop) / e.currentTarget.offsetHeight)) / 100;
    console.log(x, y);
  }

  handleDragged(e: React.DragEvent<HTMLDivElement>): void {
    console.log(e);
  }

  hideImageChanged(e: ChangeEvent<HTMLInputElement>): void {
    const hidden = e.currentTarget.checked;
    this.setState({ imgHidden: e.currentTarget.checked, imgClassName: hidden ? 'hidden' : '' });
  }

  render(): React.ReactNode {
    return (
      <div className="CssTracer">
        <h1>CSS Tracer</h1>
        <div className="cssCanvas" onClick={this.canvasClicked}>
          <div
            className="handle"
            ref={this.handle1Ref}
            onDrag={this.handleDragged}
            style={{ left: this.state.handle1X + '%', top: this.state.handle1Y + '%' }}
          ></div>
          <div
            className="handle"
            ref={this.handle2Ref}
            style={{ left: this.state.handle2X + '%', top: this.state.handle2Y + '%' }}
          ></div>
          <div className="curve"></div>
          <img alt="tracer" className={this.state.imgClassName} src="/assets/dat-tien.jpg"></img>
        </div>
        <div className="controls">
          <label>
            <input type="checkbox" onChange={this.hideImageChanged}></input>Hide image
          </label>
        </div>
      </div>
    );
  }
}

export default CssTracerPage;
