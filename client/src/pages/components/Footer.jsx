import React from "react";

export const Footer = ({loading}) => {
  return (
    <footer hidden = { loading ? true: false} >
      <section id="footer" className="bg-dark text-white py-3">
        <div className="container-fluid">
          <div className="row mt-5">
            <div className="col-sm-12 col-md-4 text-center text-white">
              <h3 className="mt-5">Nosotros</h3>
              <p className="mt-5">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa
                consequatur sit omnis saepe expedita, quibusdam numquam
                consectetur minus tempora delectus.
              </p>
              <p>empresa@algo.com. todlos los derechos serservados</p>
            </div>

            <div className="col-sm-12 col-md-4 text-center text-white">
              <h3 className="mt-5">Contáctanos</h3>
              <p className="mt-5">
                <i className="fas fa-map-marker-alt"></i> Calle 52 b # 325-963 -
                Pereira/Colombia
                <br />
                <br />
                <i className="fas fa-phone"></i> 57 5555555
              </p>
            </div>

            <div className="col-sm-12 col-md-4 text-center text-white">
              <h3 className="mt-5">Consultas</h3>
              <form>
                <div className="form-group">
                  <label htmlFor="nombre">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Ingresa tu email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">consulta</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu consulta"
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-2">
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};
