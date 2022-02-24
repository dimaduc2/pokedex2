import logo from './logo.svg';
import './App.css';
// import Home from './Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, NavDropdown, Button, Table, Row, Col, Form, Card, Modal, Dropdown, DropdownButton, InputGroup, FormControl } from 'react-bootstrap';
import { BsGridFill , BsJustify, BsCheckLg, BsFillCaretDownFill, BsFillCaretUpFill, BsFillArrowUpCircleFill, BsFillArrowDownCircleFill, BsZoomIn, 
        BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import Image from 'react-bootstrap/Image'
import React, { Component } from 'react'
import axios from 'axios';
import Home from './Home'
import All_Pokemon from './All_Pokemon'
import About from './About'
import Pokeball from './Pokeball.jpg'
import MCZ from './006.5 Mega Charizard Z (X&Y).jpg'
import { Routes, Route, Link } from "react-router-dom";

// const types = {
//   'Normal'    : {'mau': '#E6E6E6', 'kiHieu':'star'},
//   'Fire'      : {'mau': '#FF4000', 'kiHieu':'fire'},
//   'Water'     : {'mau': '#2E9AFE', 'kiHieu':'theme'},
//   'Electric'  : {'mau': '#F7FE2E', 'kiHieu':'bolt'},
//   'Grass'     : {'mau': '#01DF01', 'kiHieu':'leaf'},
//   'Ice'       : {'mau': '#58FAF4', 'kiHieu':'snowflake outline'},
//   'Fighting'  : {'mau': '#610B0B', 'kiHieu':'hand rock'},
//   'Poison'    : {'mau': '#610B5E', 'kiHieu':'lab'},
//   'Ground'    : {'mau': '#B18904', 'kiHieu':'blackberry'},
//   'Flying'    : {'mau': '#819FF7', 'kiHieu':'studiovinari'},
//   'Psychic'   : {'mau': '#FE2E64', 'kiHieu':'eye'},
//   'Bug'       : {'mau': '#82FA58', 'kiHieu':'bug'},
//   'Rock'      : {'mau': '#886A08', 'kiHieu':'slack hash'},
//   'Ghost'     : {'mau': '#29088A', 'kiHieu':'snapchat ghost'},
//   'Dragon'    : {'mau': '#3A01DF', 'kiHieu':'d and d'},
//   'Dark'      : {'mau': '#3B240B', 'kiHieu':'moon'},
//   'Steel'     : {'mau': '#A4A4A4', 'kiHieu':'cube'},
//   'Fairy'     : {'mau': '#F7819F', 'kiHieu':'like'},
// }

class App extends Component {
  state = {
    danhSachPokemon:[0],
    coLoi:'',
    mauSangToi: 'mauToi',
    mauSangToiMenu: 'light',
    MauBangTable: 'dark',
    tenSucManh: 'All',
    tenThuTu: 'number',
    xuoiNguocCu: 1,
    lenTren: 'len1234',
    xuongDuoi: 'xuong5678',
    tenTim: '',
    chonMenu: 'Home',
  }
  
  componentDidMount(){
    axios.get('http://localhost:5400/pokemon?thuTu=number&type=all&xuoiNguoc=1')
    .then(res => {
      if(res.data==='Không kết nối với MongoDB'){
        this.setState({coLoi: res.data});
      }
      else{
        this.setState({danhSachPokemon: res.data});
        console.log(res.data)
      }
    })
  }

  ChonSucManh = (SucManh) => {
    // alert(SucManh)
    axios.get('http://localhost:5400/pokemon?thuTu='+this.state.tenThuTu+'&type='+SucManh)
    .then(res => {
      this.setState({danhSachPokemon: res.data});
    })
    this.setState({tenSucManh: SucManh});
  }

  doiSangToi = () => {
    if(this.state.mauSangToi === 'mauToi'){
      this.setState({mauSangToi: 'mauSang'});
      this.setState({mauSangToiMenu: 'danger'});
      this.setState({MauBangTable: 'light'});
    }
    else{
      this.setState({mauSangToi: 'mauToi'});
      this.setState({mauSangToiMenu: 'light'});
      this.setState({MauBangTable: 'dark'});
    }
  }

  ThayDoiThuTu = (thuTuMoi) => {
    let xuoiNguocMoi = this.state.xuoiNguocCu
    if(this.state.tenThuTu === thuTuMoi){
      // nếu đang xuôi, đổi thành hướng ngược
      if(xuoiNguocMoi === -1){
        xuoiNguocMoi = 1;
      }
      // nếu đang ngược, đổi thành hướng xuôi
      else if(xuoiNguocMoi === 1){
        xuoiNguocMoi = -1;
      }
    }
    // nếu thứ tự khác thì nó xuôi
    else{
      xuoiNguocMoi = 1;
    }
    this.setState({xuoiNguocCu: xuoiNguocMoi});
                                                                                              // Gửi xuôi Ngược lên Server
    axios.get('http://localhost:5400/pokemon?thuTu='+thuTuMoi+'&type='+this.state.tenSucManh+'&xuoiNguoc='+xuoiNguocMoi)
    .then(res => {
      if(res.data==='Không kết nối với MongoDB'){
        this.setState({coLoi: res.data});
      }
      else{
        this.setState({danhSachPokemon: res.data});
        console.log(res.data)
      }
    })
    this.setState({tenThuTu: thuTuMoi});
  }



  vietTen = (event) => {
    this.setState({tenTim: event.target.value});
  }
  timTen = () => {
    axios.get('http://localhost:5400/timPokemon?thongTinCanTim='+this.state.tenTim)
    .then(res => {
      this.setState({danhSachPokemon: res.data});
    })
  }


  len = () => {
    axios.get('http://localhost:5400/pokemonLen?lenTren='+this.state.lenTren)
  }
  xuong = () => {
    axios.get('http://localhost:5400/pokemonXuong?xuongDuoi='+this.state.xuongDuoi)
  }

  damMenu = (index) => {
    this.setState({chonMenu: index});
  }


  render() {
    const {danhSachPokemon, mauSangToi, mauSangToiMenu, MauBangTable, tenSucManh, tenThuTu, xuoiNguocCu, chonMenu} = this.state
    return (  
      <div className="App" style={{backgroundColor: mauSangToi === 'mauToi' ?'#808080' :'white', color: mauSangToi === 'mauToi' ?'#ffbf00' :'black'}}>
        
        <div style={{fontSize: '90px'}}><Image src={Pokeball} style={{width: '100px'}} /><b>Pokemon Database</b><Image src={MCZ} style={{width: '130px'}} /></div>

        <Navbar expand="lg" bg={mauSangToiMenu} sticky="top">
          <Container>
            <Navbar.Brand as={Link} onClick={() => this.damMenu('Home')} to="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

              <Nav className="me-auto">
                <Nav.Link as={Link} onClick={() => this.damMenu('Pokemon')} to="/All_Pokemon">All Pokemon</Nav.Link>
                <Nav.Link as={Link} onClick={() => this.damMenu('About')} to="/About">About</Nav.Link>
              </Nav>

              {mauSangToi === 'mauToi' ?<BsFillMoonFill /> :<BsFillSunFill />}

              <Form>
                <Form.Check 
                  type="switch"
                  id="custom-switch"
                  onChange={this.doiSangToi}
                />
              </Form>
              
              <InputGroup size="sm" className="mb-3" style={{width: '200px'}}>
                <FormControl 
                  onChange={this.vietTen}
                  value={this.state.tenTim}
                  
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  
                  aria-label="Small" 
                  aria-describedby="inputGroup-sizing-sm" 
                 />
                <InputGroup.Text onClick={this.timTen}><BsZoomIn/></InputGroup.Text>
              </InputGroup>


            </Navbar.Collapse>
          </Container>
        </Navbar>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/All_Pokemon" element={<All_Pokemon danhSachPokemon={danhSachPokemon} xuoiNguocCu={xuoiNguocCu} ThayDoiThuTu={this.ThayDoiThuTu} 
                    MauBangTable={MauBangTable} ChonSucManh={this.ChonSucManh} tenSucManh={tenSucManh} tenThuTu={tenThuTu} />} />
          <Route path="/About" element={<About />} />
        </Routes>

        {/* {chonMenu==='Home'?<Home />:null} */}
        
        {/* {chonMenu==='Pokemon'?<All_Pokemon danhSachPokemon={danhSachPokemon} xuoiNguocCu={xuoiNguocCu} ThayDoiThuTu={this.ThayDoiThuTu} 
                    MauBangTable={MauBangTable} ChonSucManh={this.ChonSucManh} tenSucManh={tenSucManh} tenThuTu={tenThuTu} />:null} */}
        
        
      </div>
    );
  }
}
export default App;