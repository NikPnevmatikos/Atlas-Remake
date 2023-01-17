import React from 'react'
import { } from 'react-bootstrap'

// import { atlas_logo } from './atlas_logo.png'

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img style={{width:"80px", height:"80px"}} src="/atlas_logo.png" alt="" ></img>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarColor03">
            <ul className="navbar-nav justify-content-end" style={{ width: "100%" }}>
              <li class="nav-item">
                <a class="nav-link active" href="#">
                  <span class="visually-hidden">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/students">Φοιτητές/τριες</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/intership_provider">Φορείς Υποδοχής</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/about">About Άτλα</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/announcement">Ανακοινώσεις</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/sign_in">Σύνδεση</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/sign_up">Εγγραφή</a>
              </li>
            </ul>
            {/* <button type="button" class="btn btn-info">Ελληνικά</button> */}
            {/* <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
              <div class="dropdown-menu" style="">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Separated link</a>
              </div>
            </li> */}

          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header