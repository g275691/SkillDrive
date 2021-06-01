import { YMaps, Map, Placemark } from 'react-yandex-maps';
import React, { useEffect, useState } from 'react';

class YandexMap extends React.Component {
    constructor() {
      super();
  
      this.state = { template: true };
  
      this.createTemplateLayoutFactory = ymaps => {
        if (ymaps && !this.state.template) {
          this.setState({
            template: ymaps.templateLayoutFactory.createClass(
              '<h3>Hello from custom template!</h3>'
            ),
          });
        }
      };
    }
  
    render() {
      return (
        <YMaps onApiAvaliable={this.createTemplateLayoutFactory}>
          <Map onLoad={this.createTemplateLayoutFactory} state={{ center: [55.7146, 37.72162], zoom: 9 }}                         modules={[
                            "layout.ImageWithContent", 
                            'geoObject.addon.balloon', 
                            'geoObject.addon.hint',
                            'templateLayoutFactory'
                        ]}>
            {this.state.template && (
              <Placemark
                geometry={[55.7146, 37.72162]}
                options={{ balloonContentLayout: this.state.template }}
              />
            )}
          </Map>
        </YMaps>
      );
    }
  }

export default YandexMap;