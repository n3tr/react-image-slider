import React, { PropTypes } from 'react'
import Carousel from './Carousel';

class ImageSlider extends React.Component {

  componentDidMount() {
    new Carousel(this.refs['photo-carousel']);
  }

  render () {
    const images = [
      "https://i2.24x7th.com/df/0/ui/post/2016/02/02/8/b/4e192bba16dfd304e7606d1a1ea31ab5.jpeg",
      "https://i1.24x7th.com/df/0/ui/post/2016/02/02/8/b/812b408b021b5af6092f069045744c71.jpeg",
      "https://i2.24x7th.com/df/0/ui/post/2016/02/02/8/b/389a1c5b3a690124cd40f450eb422d89.jpeg",
      "https://i1.24x7th.com/df/0/ui/post/2016/02/02/8/b/42f00d579c8e55b9ad00aa2d08588863.jpeg"
    ];


    return (
      <div className="photo-carousel" ref="photo-carousel">
        <div className="photo-carousel__container">
          { this.getPanes(images) }
        </div>
      </div>
    )
  }

  getPanes(images) {
    return images.map((image, i) => {
      const style = {
        left: String(i * 100) + '%',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      };
      return (
        <div className="pane" style={style} key={i}>

        </div>
      )
    });
  }


}

export default ImageSlider;
