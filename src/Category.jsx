import React from "react";

export default function Category(props) {
  const category = props.category;
  return (
    <div className='category-wrapper'>
      <h5 className='wrap-2'>{`${category.id}. ${category.name}`}</h5>
      <p className='wrap-2'>{category.description}</p>
      <button
        className='btn btn-success m-1'
        onClick={() => {
          props.update(category);
        }}>
        Update
      </button>
      <button
        className='btn btn-danger m-1'
        onClick={() => {
          props.delete(category.id);
        }}>
        Remove
      </button>
    </div>
  );
}
