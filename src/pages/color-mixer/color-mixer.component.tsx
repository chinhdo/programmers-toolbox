import React from 'react';
import './color-mixer.styles.scss';

// TODO mobile touch handling

/** Page that has a color mixer. */
class ColorMixerPage extends React.Component<Props, State> {
  private slPickerRef: React.RefObject<HTMLCanvasElement>;
  private huePickerRef: React.RefObject<HTMLCanvasElement>;
  private debugRef: React.RefObject<HTMLDivElement>;

  private triangleHalfHeight = 5;

  constructor(props: Props) {
    super(props);

    this.slPickerRef = React.createRef();
    this.huePickerRef = React.createRef();
    this.debugRef = React.createRef();

    this.state = { debug: '', huePointerY: 0, hue: 0 };
    this.hueMouseMove = this.hueMouseMove.bind(this);
    this.hueMouseDown = this.hueMouseDown.bind(this);
    this.setHue1 = this.setHue1.bind(this);
  }

  // TODO: test
  hslToRgb(h: number, s: number, l: number): Rgb {
    let r, g, b;

    if (s === 0) {
      r = g = b = 1; // achromatic
    } else {
      const hue2Rgb = (p: number, q: number, t: number): number => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2Rgb(p, q, h + 1 / 3);
      g = hue2Rgb(p, q, h);
      b = hue2Rgb(p, q, h - 1 / 3);
    }

    return new Rgb(r * 255, g * 255, b * 255);
  }

  hueMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    if (e.buttons === 1) {
      this.setHue1(e);
    }
  }

  hueMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    this.setHue1(e);
  }

  componentDidMount(): void {
    this.setHue2(0);
  }

  drawPicker(rgb: Rgb): void {
    if (this.slPickerRef.current) {
      const c = this.slPickerRef.current;
      const ctx = c.getContext('2d');
      if (ctx) {
        for (let x = 0; x < c.width; x++) {
          for (let y = 0; y < c.height; y++) {
            const r = rgb.r - y * (rgb.r / c.height);
            const g = rgb.g - y * (rgb.g / c.height);
            const b = rgb.b - y * (rgb.b / c.height);
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    }
  }

  timeout?: NodeJS.Timeout;

  // TODO rename this
  setHue1(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    const div = this.huePickerRef.current;

    if (div) {
      let y = e.clientY;
      if (y < div.offsetTop) {
        y = div.offsetTop;
      } else if (y > div.offsetTop + div.offsetHeight) {
        y = div.offsetTop + div.offsetHeight;
      }

      const hue = Math.round((y - div.offsetTop) * (255 / div.offsetHeight));
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.setHue2(hue);
    }
  }

  // TODO rename this
  setHue2(hue: number): void {
    const div = this.huePickerRef.current;
    if (div) {
      const rgb = this.hslToRgb((255 - hue) / 255, 1, 0.5);

      this.setState(
        {
          debug: `hue=${hue} ${rgb}`,
          huePointerY: hue * (div.offsetHeight / 255) + div.offsetTop + this.triangleHalfHeight,
        },
        () => {
          if (this.timeout) {
            clearTimeout(this.timeout);
          }
          setTimeout(() => this.drawPicker(rgb), 250);
        },
      );
    }
  }

  render(): React.ReactNode {
    return (
      <div className="ColorMixerPage">
        <h1>CSS Color Mixer</h1>
        <p>I am working on this page - the color mixer is not fully working yet.</p>
        <div className="mixer">
          <div className="sl-picker">
            <canvas ref={this.slPickerRef}></canvas>
          </div>
          <div className="pointerDiv" onMouseMove={this.hueMouseMove}>
            <svg className="pointer" viewBox="0 0 100 100" style={{ top: this.state.huePointerY - 10 }}>
              <polygon points="0,0 100,50 0,100" />
            </svg>
          </div>
          <div className="hue-picker" onMouseMove={this.hueMouseMove} onMouseDown={this.hueMouseDown}>
            <canvas ref={this.huePickerRef}></canvas>
          </div>
          {/* <div className="hue" ref={this.hueRef} onMouseMove={this.hueMouseMove} onMouseDown={this.hueMouseDown}></div> */}
        </div>
        <div className="debug" dangerouslySetInnerHTML={{ __html: this.state.debug }}></div>
      </div>
    );
  }
}

type Props = Record<string, unknown>;

type State = {
  debug: string;
  huePointerY: number;
  hue: number;
};

/** Represents a color in RGB (red-green-blue) format */
class Rgb {
  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  r: number;
  g: number;
  b: number;

  toString() {
    return `${Math.round(this.r)} ${Math.round(this.g)} ${Math.round(this.b)}`;
  }
}

/** Represents a color in HSV (hue-saturation-value) format */
// TODO
// class Hsl {
//   constructor(h: number, s: number, l: number) {
//     this.h = h;
//     this.s = s;
//     this.l = l;
//   }

//   h: number;
//   s: number;
//   l: number;
// }

export default ColorMixerPage;
