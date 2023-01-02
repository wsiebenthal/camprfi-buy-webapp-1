import React, { Fragment } from 'react'

import { Link, Navigate, Route, Routes } from 'react-router-dom';

const Header = () => {
  return (
    <Fragment>

      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top justify-content-center mb-4">
        <h1 className="navbar-brand mb-0">Welcome to Camprfi</h1>
        <div className="navbar-nav justify-content-between">
        </div>
      </nav>
    </Fragment>

  )
}

export default Header;
