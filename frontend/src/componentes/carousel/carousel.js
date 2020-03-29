import React from 'react'
import { Link } from 'react-router-dom'
import './carousel.css'

const Carousel = ({items, title, Component}) => (
  <div className="carousel-container">
    <div className="title">
      <h2>{title}</h2>
      <Link to={title} className="carousel-title-more">ver mas</Link>
    </div>
    <div className="carousel">
      {items.map(producto => (
        <Component key={producto.id} item={producto}/>
      ))}
    </div>
  </div>
)

export default Carousel