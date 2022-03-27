import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

export default function Dishes() {
  const [dishes, setDishes] = useState([]);
  const [modalID, setModalID] = useState(null);
  const [modalName, setModalName] = useState(null);
  const [modalDesc, setModalDesc] = useState(null);
  const [modalPrice, setModalPrice] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toModify = (item) => {
    setModalID(item.id);
    setModalName(item.name);
    setModalDesc(item.description);
    setModalPrice(item.price);
    handleShow();
  };
  const updateDish = () => {
    axios
      .put(`/dishes/${modalID}`, {
        id: modalID,
        name: modalName,
        description: modalDesc,
        price: modalPrice,
        cid: document.querySelector("#cat-select-modal").value,
      })
      .then((res) => {
        if (res.data.error) {
          throw new Error(res.data.error.code);
        } else {
          loadItems();
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
    handleClose();
  };
  const removeDish = (id) => {
    axios
      .delete(`/dishes/${id}`)
      .then((res) => {
        if (res.data.error) {
          throw new Error(res.data.error.code);
        } else {
          loadItems();
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };
  const loadCategories = () => {
    const select = document.querySelector("#cat-select");
    const modalSelect = document.querySelector("#cat-select-modal");
    let options = "<option value='0'>Select Category</option>";

    axios
      .get("/categories")
      .then((res) => {
        if (res.data.error) {
          throw new Error(`Custom - ${res.data.error.code}`);
        } else {
          res.data.result.forEach((option) => {
            options += `<option value='${option.id}'>${option.id}. ${option.name}</option>`;
          });
          try {
            select.innerHTML = options;
            modalSelect.innerHTML = options;
          } catch {
            select.innerHTML = options;
          }
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error while loading categories");
      });
  };

  const loadItems = () => {
    axios
      .get("/dishes")
      .then((res) => {
        if (res.data.error) {
          throw new Error(res.data.error.code);
        } else {
          setDishes(res.data.result);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error while loading dishes");
      });
  };

  useEffect(() => {
    loadItems();
  }, []);

  const addFoodItem = (e) => {
    e.preventDefault();
    const id = parseInt(e.target.id.value);
    const name = e.target.name.value;
    const description = e.target.desc.value;
    const price = e.target.price.value;
    const cid = e.target.cid.value;

    axios
      .post("/dishes", { id, name, description, price, cid })
      .then((res) => {
        if (res.data.error) {
          throw new Error(res.data.error.code);
        } else {
          loadItems();
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };
  return (
    <div>
      <form className='form-container bg-light clearfix' onSubmit={addFoodItem}>
        <h1 className='text-center mb-4'> Add Food Item</h1>
        <div className='forum-group text-center'>
          <input
            type='number'
            name='id'
            className='form-control'
            placeholder='Food item ID'
          />
          <input
            type='text'
            name='name'
            className='form-control'
            placeholder='Food Item Name'
          />
          <input
            type='number'
            name='price'
            className='form-control'
            placeholder='Price'
          />
          <div className='form-group cat-bar'>
            <select className='form-select' name='cid' id='cat-select'>
              <option value='1'>Select Category</option>
            </select>
            <button
              type='button'
              className='reload btn'
              onClick={loadCategories}>
              <i className='fa fa-refresh' />
            </button>
          </div>
          <textarea
            name='desc'
            className='form-control'
            placeholder='Description'
          />
          <input type='submit' className='btn btn-success m-1' />
        </div>
      </form>
      <div className='container dishes-list table-responsive'>
        {dishes.length > 0 ? (
          <>
            <h1 className='text-light text-center mt-4 pt-4'>
              Available Dishes
            </h1>
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th scope='col'>Item ID</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Description</th>
                  <th scope='col'>Category ID</th>
                  <th scope='col'>Price</th>
                  <th scope='col' width='200px'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {dishes.map((item) => {
                  return (
                    <tr key={item.name}>
                      <th scope='row'>{item.id}</th>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.cid}</td>
                      <td>{`₹${item.price}`}</td>
                      <td className='btn-right'>
                        <button
                          className='btn btn-success m-1'
                          onClick={() => {
                            toModify(item);
                          }}>
                          Update
                        </button>
                        <button
                          className='btn btn-danger m-1'
                          onClick={() => {
                            removeDish(item.id);
                          }}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <h1 className='text-light text-center mt-4 mt-4'>
            No Dishes Available
          </h1>
        )}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='forum-group text-center'>
            <input
              type='number'
              name='id'
              className='form-control'
              value={modalID}
              disabled
            />
            <input
              type='text'
              name='name'
              className='form-control'
              placeholder='Food Item Name'
              value={modalName}
              onChange={(e) => setModalName(e.target.value)}
            />
            <input
              type='number'
              name='price'
              className='form-control'
              placeholder='Food Item Price'
              value={modalPrice}
              onChange={(e) => setModalPrice(parseInt(e.target.value))}
            />
            <div className='form-group cat-bar'>
              <select className='form-select' name='cid' id='cat-select-modal'>
                <option value='1'>Select Category</option>
              </select>
              <button className='reload btn' onClick={loadCategories}>
                <i className='fa fa-refresh' />
              </button>
            </div>
            <textarea
              name='desc'
              className='form-control'
              value={modalDesc}
              onChange={(e) => setModalDesc(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={updateDish}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
