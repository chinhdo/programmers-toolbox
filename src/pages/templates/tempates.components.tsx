// <!doctype html>

// <html lang="en">
// <head>
//   <meta charset="utf-8">

//   <title>The HTML5 Herald</title>
//   <meta name="description" content="The HTML5 Herald">
//   <meta name="author" content="SitePoint">

//   <link rel="stylesheet" href="css/styles.css?v=1.0">

// </head>

// <body>
//   <script src="js/scripts.js"></script>
// </body>
// </html>

import React from 'react';
import './css-tracer.styles.scss';

type Props = Record<string, unknown>;

type State = Record<string, unknown>;

class TemplatesPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return <div className="TemplatesPage">TEMPLATES</div>;
  }
}

export default TemplatesPage;
