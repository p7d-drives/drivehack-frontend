import { useState, Component } from 'react'
import './App.css'
import { Button } from "keep-react";
import Navbar from './Navbar.jsx';
import ReactPlayer from 'react-player';
import { Stage, Layer, Image, Circle, Line, Text, Arrow } from 'react-konva';
import { useImageSize } from 'react-image-size';
import image from './SampleVideo_1280x720_20mb.jpg'

class URLImage extends Component {
  state = {
    image: null,
  };
  componentDidMount() {
    this.loadImage();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
  }
  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener('load', this.handleLoad);
  }
  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image,
    });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  };
  render() {
    return (
      <Image
        x={this.props.x}
        y={this.props.y}
        scaleX={this.props.scaleX}
        scaleY={this.props.scaleY}
        image={this.state.image}
        ref={(node) => {
          this.imageNode = node;
        }}
      />
    );
  }
}

class ResultStage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.url
    }
  }

  render() {
    return (
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="basis-4/5">
          <ReactPlayer 
            height='100%'
            width='100%'
            url={this.state.url}
            controls={true}
          />
        </div>
        <div className="basis-1/5">
            <Button>MEOW1</Button>
        </div>
      </div>
    );
  }
}

const SelectStage = (props) => {
  const [state, setState] = useState({ url: props.url, points: [], mouse_pos: {x: 0, y: 0}, monitors: Array() });
  const [dim] = useImageSize(state.url);
  const palette = ['#0F3CD9', '#0a9952', '#d8a800', '#e92215', '#455468']

  function drawPoint(e) {
    let pos = e.target.getStage().getPointerPosition();
    setState({url: state.url, points: state.points.concat(pos), mouse_pos: state.mouse_pos, monitors: state.monitors})
  }

  function onMouseMove(e) {
    let pos = e.target.getStage().getPointerPosition();
    setState({url: state.url, points: state.points, mouse_pos: pos, monitors:state.monitors})
  }

  function createPairsArray(elements) {
    let res = elements;
    if(elements.length % 2)
      res = elements.concat(undefined);
    const pairsArray = [];
    
    for (let i = 0; i < res.length; i += 2) {
      if (i + 1 < res.length) {
        pairsArray.push([res[i], res[i + 1]]);
      } else {
        pairsArray.push([res[i]]);
      }
    }

    return pairsArray;
  }

  let monitors = (state.monitors.length < (state.points.length - state.points.length % 2) / 2) ? createPairsArray(state.points).map((e, i) => {
    let name = String.fromCharCode('A'.charCodeAt(0) + i);
    let reversed = false;
    return { name, reversed, in: 0, out: 0 }
  }) : state.monitors
  state.monitors = monitors

  function sendMonitors() {
    let res = [];
    for(let i = 0; i < state.monitors.length; i++) {
      let m = state.monitors[i];
      let a = state.points[i * 2];
      let b = state.points[i * 2 + 1];
      res.push({ color: palette[i % palette.length], reversed: m.reversed, a: [a.x / 1110, a.y / 624], b: [b.x / 1110, b.y / 624] });
    }
    console.log(res);
    props.nextStage()
  }

  return (
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="basis-4/5">
          <Stage width={1110} height={624} listening={false} onClick={drawPoint} onMouseMove={onMouseMove}>
            <Layer key={0}>
              <URLImage x={0} y={0} src={props.url} scaleX={1110 / dim?.width} scaleY={624 / dim?.height} />
            </Layer>
            <Layer key={1}>
              {createPairsArray(state.points).map(([a, b], i) => (b) ? (
                <>
                  <Text text={String.fromCharCode('A'.charCodeAt(0) + i)} x={a.x - 10} y={a.y-30} fontSize={20} fill={palette[i % palette.length]}></Text>
                  <Line points={[a.x, a.y, b.x, b.y]} stroke={palette[i % palette.length]} strokeWidth={6} opacity={0.7}></Line>
                  <Circle x={a.x} y={a.y} radius={10} fill="black" key={i * 5 + 1}></Circle>
                  <Circle x={a.x} y={a.y} radius={7} fill={palette[i % palette.length]} key={i * 5 + 2}></Circle>
                  <Circle x={b.x} y={b.y} radius={10} fill="black" key={i * 5 + 3}></Circle>
                  <Circle x={b.x} y={b.y} radius={7} fill={palette[i % palette.length]} key={i * 5 + 4}></Circle>
                  {(() => {
                    let mid = {x: (a.x + b.x) / 2, y: (a.y + b.y) / 2};
                    let len = Math.sqrt((a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y));
                    let perp = {x: (a.y - b.y) / len * 30, y: -(a.x - b.x) / len * 30};
                    if(state.monitors[i].reversed) 
                      perp = {x: -perp.x, y: -perp.y}
                    let mpp = {x: mid.x + perp.x, y: mid.y + perp.y}
                    console.log(mid, len, perp)
                    return (<>
                      <Line points={[mid.x, mid.y, mpp.x, mpp.y]} stroke={palette[i % palette.length]} strokeWidth={6} opacity={0.7}></Line>
                      <Circle x={mpp.x} y={mpp.y} fill="black" key={0} radius={10}></Circle>
                      <Circle x={mpp.x} y={mpp.y} fill={palette[i % palette.length]} key={1} radius={7}></Circle>
                    </>)
                    //<Circle x={mid.x + perp.x} y={mid.y + perp.y} fill={palette[i % palette.length]} radius={10}></Circle>
                  })()}
                </>  
              ) : (
                <>
                  <Line points={[a.x, a.y, state.mouse_pos.x, state.mouse_pos.y ]} stroke={palette[i % palette.length]} strokeWidth={6} opacity={0.7}></Line>
                  <Circle x={a.x} y={a.y} radius={10} fill="black" key={i * 5 + 1}></Circle>
                  <Circle x={a.x} y={a.y} radius={7} fill={palette[i % palette.length]} key={i * 3 + 2}></Circle>
                  <Circle x={state.mouse_pos.x} y={state.mouse_pos.y} radius={10} fill="black" key={i * 5 + 3}></Circle>
                  <Circle x={state.mouse_pos.x} y={state.mouse_pos.y} radius={7} fill={palette[i % palette.length]} key={i * 5 + 4}></Circle>
                </>
              )
              )}
            </Layer>
          </Stage>
        </div>
        <div className="basis-1/5">
          <div className='text-heading-4'>Monitors:</div>
          {state.monitors.map((m, i) => (
            <>
              <div key={i}>
                <span className='text-body-1 font-bold' style={{color: palette[i % palette.length], paddingRight: '0.5rem'}}> {m.name}  </span>
                <span className='text-body-1 font-bold'>IN: {(m.reversed) ? m.out : m.in}</span>
                <Button className='font-bold' style={{margin: '0 0.5rem', background: 'transparent', color: (state.monitors[i].reversed) ? 'black' : 'gray', fontSize: '1.5rem'}} onClick={(e) => {
                  setState({...state, monitors: monitors.map((e, _i) => {
                    if(_i == i)
                      return {...state.monitors[i], reversed: !state.monitors[i].reversed}
                    else
                      return state.monitors[_i]  
                  })})
                }}>&#8644;</Button>
                <span className='text-body-1 font-bold'>OUT: {(m.reversed) ? m.in : m.out}</span>
                <Button style={{marginLeft: '0 0.5rem', background: 'transparent', color: 'black', fontSize: '1.5rem'}} onClick={(e) => {
                  let m = state.monitors.filter((_, i_) => i_ != i)
                  let points = state.points.filter((_, i_) => i_ != 2*i && i_ != 2*i + 1 )
                  setState({...state, points: points, monitors: m})
                }}>&#x2715;</Button>
              </div>
            </>
          ))}
          { (state.monitors.length) ? <Button onClick={sendMonitors}>Process</Button> : []}
        </div>
    </div>
    );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: "select",
      lines: [],
      video: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
      image: image
    };
  }

  render() {
    return (
      <>
      <Navbar />
      <div className='container'>
        { (this.state.stage == "select") ? <SelectStage url={this.state.image} nextStage={() => this.setState({...this.state, stage: "result"})}/> : <ResultStage url={this.state.video} /> }
      </div>
      </>
    )
  }
};

export default App
