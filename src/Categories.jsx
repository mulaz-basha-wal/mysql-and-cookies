import React, { useEffect, useState } from "react";
import axios from "axios";
import Category from "./Category";
import { Button, Modal } from "react-bootstrap";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [modalID, setModalID] = useState(null);
  const [modalName, setModalName] = useState(null);
  const [modalDesc, setModalDesc] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toModify = (category) => {
    setModalID(category.id);
    setModalName(category.name);
    setModalDesc(category.description);
    handleShow();
  };

  const loadCategories = () => {
    axios
      .get("/categories")
      .then((res) => {
        setCategories(res.data.result);
      })
      .catch((error) => {
        console.log(error);
        alert("Error while loading categories");
      });
  };
  useEffect(() => {
    loadCategories();
  }, []);

  const addCategory = (e) => {
    e.preventDefault();
    const id = parseInt(e.target.id.value);
    const name = e.target.name.value;
    const desc = e.target.desc.value;

    axios
      .post("/categories/", { id, name, description: desc })
      .then((res) => {
        if (res.data.error) {
          throw new Error(res.data.error.code);
        } else {
          loadCategories();
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };
  const updateCategory = () => {
    axios
      .put(`/categories/${modalID}`, {
        id: modalID,
        name: modalName,
        description: modalDesc,
      })
      .then((res) => {
        if (res.data.error) {
          throw new Error(res.data.error.code);
        } else {
          loadCategories();
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
    handleClose();
  };
  const removeCategory = (id) => {
    axios
      .delete(`/categories/${id}`)
      .then((res) => {
        if (res.data.error) {
          throw new Error(res.data.error.code);
        } else {
          loadCategories();
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };
  return (
    <div>
      <form className='form-container bg-light clearfix' onSubmit={addCategory}>
        <h1 className='text-center mb-4'> Add Category</h1>
        <div className='forum-group text-center'>
          <input
            type='number'
            name='id'
            className='form-control'
            placeholder='Category ID'
          />
          <input
            type='text'
            name='name'
            className='form-control'
            placeholder='Category Name'
          />
          <textarea
            name='desc'
            className='form-control'
            placeholder='Description'
          />
          <input type='submit' className='btn btn-success m-1' />
        </div>
      </form>
      <div>
        <h1 className='text-light text-center mt-4 pt-4'>
          Available Categories
        </h1>
        <div className='categories-list'>
          {categories.length > 0 ? (
            categories.map((category) => (
              <Category
                key={category.id}
                category={category}
                delete={removeCategory}
                update={toModify}
              />
            ))
          ) : (
            <h4 className='text-light'>No Categories Available</h4>
          )}
        </div>
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
              value={modalName}
              onChange={(e) => setModalName(e.target.value)}
            />
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
          <Button variant='primary' onClick={updateCategory}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
