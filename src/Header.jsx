import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className='header-bar'>
      <Link className='link ' to='/'>
        Products
      </Link>
      <Link className='link ' to='/categories'>
        Categories
      </Link>
      <Link className='link ' to='/citycookie'>
        City Cookie
      </Link>
      <Link className='link ' to='/cookieexpiry'>
        Cookie Expiry
      </Link>
    </div>
  );
}
