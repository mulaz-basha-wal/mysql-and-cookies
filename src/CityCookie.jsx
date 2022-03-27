import React from "react";
import axios from "axios";

export default function CityCookie() {
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`/cookie/setcookie/city/${e.target.city.value}`)
      .then((res) => {
        alert("owhwoow city set");
      })
      .catch((error) => console.log(error));
  };
  return (
    <form className='form-container bg-light clearfix' onSubmit={onSubmit}>
      <h1 className='text-center mb-4'> City Cookie</h1>
      <div className='forum-group text-center'>
        <input
          type='text'
          name='city'
          className='form-control'
          placeholder='City'
        />
        <input type='submit' className='btn btn-success m-1' />
      </div>
    </form>
  );
}
