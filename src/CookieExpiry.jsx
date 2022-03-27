import React from "react";
import axios from "axios";

export default function CookieExpiry() {
  const onSubmitWithTime = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const value = e.target.value.value;
    const time = e.target.time.value;
    axios
      .get(`/cookie/setcookiewithtime/${name}/${value}/${time}`)
      .then((res) => {
        alert(`owhwoow! Cookie set ${name}, ${value} with time ${time}`);
      })
      .catch((error) => console.log(error));
  };
  return (
    <form
      className='form-container bg-light clearfix'
      onSubmit={onSubmitWithTime}>
      <h1 className='text-center mb-4'> Cookie With Expiration</h1>
      <div className='forum-group text-center'>
        <input
          type='text'
          name='name'
          className='form-control'
          placeholder='Cookie Name'
        />
        <input
          type='text'
          name='value'
          className='form-control'
          placeholder='Cookie Value'
        />
        <input
          type='number'
          name='time'
          className='form-control'
          placeholder='Expiry in minutes '
        />
        <input type='submit' className='btn btn-success m-1' />
      </div>
    </form>
  );
}
