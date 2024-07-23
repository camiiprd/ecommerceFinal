import React from "react";
import {  useNavigate } from "react-router-dom";

export const Carousel = ({
  data,
  activeIndex,
  limitarTexto,
  handlePrev,
  handleNext,
}) => {

  const navigate = useNavigate();

  const handleNavigate = (id)=>{
    navigate(`/productos/${id}`)
  }

  return (
    <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators" >
        {data.map((producto, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={index}
            className={index === activeIndex ? "active" : ""}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner" data-bs-interval="500" >
        {data.map((producto, index) => (
          <div
            key={index}
            className={`carousel-item ${index === activeIndex ? "active" : ""}`}
            style={{cursor:"pointer"}}
            onClick={()=> handleNavigate(producto.idproductos)}
          >
            <img
              src={producto.img}
              className="d-block w-100 carousel-edit"
              alt={`Slide ${index + 1}`}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>{producto.nombre}</h5>
              <p>{producto.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        onClick={handlePrev}
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        onClick={handleNext}
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};
