import React, { PureComponent } from "react";
import Split from "react-split";

export class SplitContainer extends PureComponent {
  render() {
    return (
      <>
        <Split
          sizes={[25, 75]}
          minSize={100}
          expandToMin={false}
          gutterSize={10}
          gutterAlign="center"
          snapOffset={30}
          dragInterval={1}
          direction="horizontal"
          cursor="col-resize"
          className="content"
        >
          <div className="split">
            Rundown Rundown Rundown Rundown Rundown Rundown Rundown Rundown
            Rundown Rundown Rundown Rundown Rundown Rundown Rundown Rundown
            Rundown Rundown Rundown Rundown Rundown Rundown Rundown Rundown
            Rundown Rundown Rundown Rundown Rundown Rundown Rundown Rundown
            Rundown Rundown Rundown Rundown Rundown Rundown Rundown Rundown
            Rundown Rundown Rundown Rundown Rundown Rundown Rundown Rundown
            Rundown Rundown Rundown Rundown Rundown Rundown Rundown Rundown
            Rundown Rundown Rundown Rundown Rundown Rundown Rundown Rundown
            Rundown Rundown Rundown Rundown Rundown Rundown Rundown Rundown
            Rundown Rundown Rundown Rundown Rundown Rundown Rundown Rundown
          </div>
          <div className="split">
            Story Story Story Story Story Story Story Story Story Story Story
            Story Story Story Story Story Story Story Story Story Story Story
            Story Story Story Story Story Story Story Story Story Story Story
            Story Story Story Story Story Story Story Story Story Story Story
            Story Story Story Story Story Story Story Story Story Story Story
            Story Story Story Story Story Story Story Story Story Story Story
            Story Story Story Story Story Story Story Story Story Story Story
            Story Story Story Story Story Story Story Story Story Story Story
            Story Story Story Story Story Story Story Story Story Story Story
            Story Story Story Story Story Story Story Story Story Story Story
            Story Story Story Story Story Story Story Story Story Story Story
            Story Story Story Story Story Story Story Story Story Story Story
          </div>
        </Split>
      </>
    );
  }
}