import React from 'react';
import GoogleMapReact from 'google-map-react';
import './DetailMap.scss';
import { ImHome3 } from 'react-icons/im';

const AnyReactComponent = props => (
  <div>
    <ImHome3 className="icon" />
  </div>
);

class DetailMap extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 0,
      lng: 0,
    };
  }

  componentDidMount() {
    // fetch('./data/DetailMockData.json');
    fetch(`/room/${this.props.props.match.params.id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          lat: res.lat,
          lng: res.lng,
        });
      });
  }

  static defaultProps = {
    center: {
      lat: 37.55,
      lng: 126.978,
    },
    zoom: 12,
  };

  render() {
    return (
      <div className="detailMap" id="map">
        <span className="title">위치</span>
        <div className="map">
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyBcwxMpuo9ukk3AxD07OuzSDLC-YyWXOQ8' }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <AnyReactComponent lat={this.state.lat} lng={this.state.lng} text="My Marker" />
          </GoogleMapReact>
          <span className="notice">정확한 위치는 예약 완료 후에 표시됩니다.</span>
        </div>
      </div>
    );
  }
}

export default DetailMap;
