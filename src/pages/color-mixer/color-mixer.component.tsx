import React from 'react';
import './color-mixer.styles.scss';

type Props = Record<string, unknown>;

type State = {
  debug: string;
  huePointerY: number;
};

class ColorMixerPage extends React.Component<Props, State> {
  private pickerRef: React.RefObject<HTMLCanvasElement>;
  private hueRef: React.RefObject<HTMLDivElement>;
  private debugRef: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);

    this.pickerRef = React.createRef();
    this.hueRef = React.createRef();
    this.debugRef = React.createRef();

    this.state = { debug: '', huePointerY: 0 };
    this.hueMouseMove = this.hueMouseMove.bind(this);
    this.hueMouseDown = this.hueMouseDown.bind(this);
    this.mapHue = this.mapHue.bind(this);
  }

  hueMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    if (e.buttons === 1) {
      this.mapHue(e);
    }
  }

  hueMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    this.mapHue(e);
  }

  componentDidMount(): void {
    this.setState({ huePointerY: (this.hueRef.current?.offsetTop || 100) + 5 });

    if (this.pickerRef.current) {
      const pickedRed = 255;
      const pickedGreen = 0;
      const pickedBlue = 0;

      const c = this.pickerRef.current;
      const ctx = c.getContext('2d');
      if (ctx) {
        for (let x = 0; x < c.width; x++) {
          for (let y = 0; y < c.height; y++) {
            const r = pickedRed - y * (pickedRed / c.height);
            const g = pickedGreen - y * (pickedGreen / c.height);
            const b = pickedBlue - y * (pickedBlue / c.height);

            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    }
  }

  mapHue(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    const y = e.clientY + 5 + (this.hueRef.current?.clientTop ? this.hueRef.current?.offsetTop : 0);
    this.setState({ debug: e.clientY.toString(), huePointerY: y });
  }

  // TODO mobile touch handling

  render(): React.ReactNode {
    return (
      <div className="ColorMixerPage">
        <h1>CSS Color Mixer</h1>
        <p>I am working on this page - the color mixer is not fully working yet.</p>
        <div className="mixer">
          <div className="picker">
            <canvas ref={this.pickerRef}></canvas>
          </div>
          <div className="pointerDiv" onMouseMove={this.hueMouseMove}>
            <svg className="pointer" viewBox="0 0 100 100" style={{ top: this.state.huePointerY - 10 }}>
              <polygon points="0,0 100,50 0,100" />
            </svg>
          </div>
          <div className="hue" ref={this.hueRef} onMouseMove={this.hueMouseMove} onMouseDown={this.hueMouseDown}></div>
        </div>
        <div className="debug" dangerouslySetInnerHTML={{ __html: this.state.debug }}></div>
      </div>
    );
  }
}

export default ColorMixerPage;
