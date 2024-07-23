import React, { useEffect, useState } from "react";
import { useProveedores } from "../../../context/ProveedoresContext";
import { useCategorias } from "../../../context/CategoriasContext";
import { UseProductos } from "../../../context/ProductosContext";
import Swal from 'sweetalert2'
import { useForm } from "../../../hooks/useForm";

const initialForm = {
  idproductos: null,
  codeBar: "",
  nombre: "",
  descripcion: "",
  precio: "",
  stock: "",
  img: "",
  idproveedores: "",
  idcategoria: "",
};

export const ModalProductos = ({dataToEdit, setDataToEdit, createProductos, updateProductos}) => {
  const { formState: form, onInputChange, onResetForm, setFormState } = useForm(initialForm)


  const { proveedores, getProveedores } = useProveedores();
  const { categorias, getCategorias } = useCategorias();

  useEffect(() => {
    const getProveedoresRequest = async () => {
      await getProveedores();
    };
    const getCategoriasRequest = async () => {
      await getCategorias();
    };
    getProveedoresRequest();
    getCategoriasRequest();
  }, []);

  useEffect(()=>{
     if(dataToEdit){
      setFormState(dataToEdit)
     }else{
      setFormState(initialForm)
     }
  },[dataToEdit])


  


  const handleSelectedProveedoresChange = (e)=>{
    setFormState({
      ...form,
      idproveedores: e.target.value
    })
  }

  const handleSelectedCategorias = (e)=>{
    setFormState({
      ...form,
      idcategoria: e.target.value
    })
  }

  

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!form.codeBar || !form.nombre || !form.descripcion || !form.precio || !form.stock || !form.img || !form.idproveedores || !form.idcategoria){
      Swal.fire({
        title:"Los campos no pueden ir vacios",
        text:"Todos los campos son obligatorios",
        icon: "error"
      })
      return;
    }
    if(form.idproductos === null){
      await createProductos(form)
    }else{
      await updateProductos(form.idproductos, form)
    }
    onResetForm();
  }

  return (
    <div
      className="modal fade"
      id="exampleModalProductos"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog ">
        <div className="modal-content">
          <div
            className="modal-header"
            style={{ backgroundColor: "#4e73df", color: "white" }}
          >
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {dataToEdit ? "Editar producto" : "Alta Producto"}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">
                  Codigo de barras <i className="fa-solid fa-barcode"></i>{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese codigo de barras"
                  name="codeBar"
                  value={form.codeBar}
                  onChange={onInputChange}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">
                  Nombre del producto{" "}
                  <i className="fa-solid fa-cash-register"></i>
                </label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Ingrese nombre del producto"
                  name="nombre"
                  value={form.nombre}
                  onChange={onInputChange}
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">
                  Descripcion <i className="fa-solid fa-cash-register"></i>
                </label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Ingrese nombre del producto"
                  name="descripcion"
                  value={form.descripcion}
                  onChange={onInputChange}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">
                  Precio <i className="fa-solid fa-hand-holding-dollar"></i>
                </label>
                <input
                  type="number"
                  className="form-control "
                  placeholder="Ingrese precio"
                  name="precio"
                  value={form.precio}
                  onChange={onInputChange}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">
                  Stock <i className="fa-solid fa-cart-shopping"></i>
                </label>
                <input
                  type="number"
                  className="form-control "
                  placeholder="Ingrese Stock"
                  name="stock"
                  value={form.stock}
                  onChange={onInputChange}
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">
                  URL img <i className="fa-solid fa-cart-shopping"></i>
                </label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Ingrese Stock"
                  name="img"
                  value={form.img}
                  onChange={onInputChange}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example4cg">
                  Proveedor <i className="fa-solid fa-user-tie"></i>
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="idproveedores"
                  value={form.idproveedores}
                  onChange={handleSelectedProveedoresChange}
                >
                  <option value="">Seleccione un proveedor</option>
                  {proveedores.map((pro) => (
                    <option key={pro.idproveedores} value={pro.idproveedores}>
                      {pro.razonSocial}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example4cg">
                  Categoria
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="idcategoria"
                  value={form.idcategoria}
                  onChange={handleSelectedCategorias}
                >
                  <option value="">Seleccione una categoria </option>
                  {categorias.map((cat) => (
                    <option key={cat.idcategoria} value={cat.idcategoria}>
                      {cat.nombreCat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-footer">
                  <button
                    type="submit"
                    className={
                      dataToEdit ? "btn btn-warning" : "btn btn-success"
                    }
                    data-bs-dismiss="modal"
                  >
                    {dataToEdit ? (
                      <span>
                        {" "}
                        <i className="fa-regular fa-pen-to-square"></i>{" "}
                        Confirmar
                      </span>
                    ) : (
                      <span>
                        {" "}
                        <i className="fa-solid fa-plus"></i> Crear
                      </span>
                    )}
                  </button>
                  <button
                    type="reset"
                    className="btn btn-danger"
                    onClick={()=>{
                      onResetForm()
                      setDataToEdit(null)
                    }}
                  >
                    {" "}
                    <i className="fa-solid fa-xmark"></i> Cancelar
                  </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
