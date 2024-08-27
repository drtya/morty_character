'use client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import Slider from 'react-slick';
import EpisodeCard from './episode-card';

type Props = { episodes: string[] };

const SliderEpisode = ({ episodes }:Props) => {
  var settings = {
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 2,
    responsive:[
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  console.log(episodes);
  
  return (
    <Slider {...settings}>
      {episodes.map((el) => (
        <EpisodeCard episodeUrl={el} key={el}/>
      ))}
    </Slider>
  );
};

export default SliderEpisode;
