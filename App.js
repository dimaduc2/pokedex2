import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Form, InputGroup, FormControl, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { BsZoomIn, BsFillMoonFill, BsFillSunFill, BsHeartFill, BsHeart, BsArrowLeftRight, BsCaretDownFill } from 'react-icons/bs';
import Image from 'react-bootstrap/Image'
import React, { Component } from 'react'
import axios from 'axios';
import Home from './Home'
import All_Pokemon from './All_Pokemon'
import Pokemon from './Pokemon'
import Favorite from './Favorite'
import So_Sanh from './So_Sanh'
import Admin from './Admin'
import About from './About'
import PokeBall from './PokeBall'
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
    danhSachPokemon:[],
    danhSachTatCaPokemon:[],
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
    // thongTinPokemon:[],
    thongTinPokemon:{},
    tenDaChon:'',
    danhSachUaThich:[], 
    danhSachTenUaThich:[],
    danhSachSoSanh:[],

    soTim:'',
    dauTim:'',
    thongTinTim:'',
  }
  
  componentDidMount(){
    axios.get('http://localhost:5400/pokemon?thuTu=number&type=all&xuoiNguoc=1')
    .then(res => {
      if(res.data==='Kh??ng k???t n???i v???i MongoDB'){
        this.setState({coLoi: res.data});
      }
      else{
        this.setState({danhSachPokemon: res.data});
        this.setState({danhSachTatCaPokemon: res.data});
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
      // n???u ??ang xu??i, ?????i th??nh h?????ng ng?????c
      if(xuoiNguocMoi === -1){
        xuoiNguocMoi = 1;
      }
      // n???u ??ang ng?????c, ?????i th??nh h?????ng xu??i
      else if(xuoiNguocMoi === 1){
        xuoiNguocMoi = -1;
      }
    }
    // n???u th??? t??? kh??c th?? n?? xu??i
    else{
      xuoiNguocMoi = 1;
    }
    this.setState({xuoiNguocCu: xuoiNguocMoi});
                                                                                              // G???i xu??i Ng?????c l??n Server
    axios.get('http://localhost:5400/pokemon?thuTu='+thuTuMoi+'&type='+this.state.tenSucManh+'&xuoiNguoc='+xuoiNguocMoi)
    .then(res => {
      if(res.data==='Kh??ng k???t n???i v???i MongoDB'){
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

  chonCaiGi = (event) => {
    this.setState({thongTinTim: event.target.value});
  }
  chonDau = (event) => {
    this.setState({dauTim: event.target.value});
  }
  vietSoPokemon = (event) => {
      this.setState({soTim: event.target.value});
  }
  timPokemonDeChon = () => {
    if(Number.isFinite(Number(this.state.soTim)) === false){
      alert('??? ch??? ?? ch???ng th??? 3 sai, h??ng ph???i l?? ch??? m?? l?? s???')
    }else{
      // alert(this.state.thongTinTim + ' ' + this.state.dauTim + ' ' + this.state.soTim)
      axios.get('http://localhost:5400/timThongTinSucKhoePokemon?thongTinTim='+this.state.thongTinTim+'&dauTim='+this.state.dauTim+'&soTim='+this.state.soTim)
      .then(res => {
        this.setState({danhSachPokemon: res.data});
      })
      
      



      // this.setState({chonMenu: 'All_Pokemon'});
    }
    
  }

  
  // chonCaiGi = (event) => {
  //   this.setState({: event.target.value});
  // }
  // = () => {
  //   alert(this.state.=this.state.)
  // }


  
  len = () => {
    axios.get('http://localhost:5400/pokemonLen?lenTren='+this.state.lenTren)
  }
  xuong = () => {
    axios.get('http://localhost:5400/pokemonXuong?xuongDuoi='+this.state.xuongDuoi)
  }

  damMenu = (tenMenuChon) => {
    this.setState({chonMenu: tenMenuChon});
  }
  
  chonPokemon = (ten) => {
    axios.get('http://localhost:5400/timMotPokemon?ten='+ten)
    .then(res => {
      this.setState({thongTinPokemon: res.data});
      console.log(res.data)
      this.setState({tenDaChon: ten});
    })
  }


  

  luuPokemonUaThich = (pokemon) => {
    // C??ch 1:
    // axios.get('http://localhost:5400/tenUaThich?ten='+ten)
    // .then(res => {
    //   // this.setState({danhSachUaThich: this.state.danhSachUaThich+=res.data+';'+'\n'});
    //   this.setState({danhSachUaThich: res.data+'\n'});
    // })

    // C??ch 2:
    // let timThayKhong = false
    // for(var i=0; i<this.state.danhSachUaThich.length; i++){
    //   if(this.state.danhSachUaThich[i].name===pokemon.name){
    //     timThayKhong=true
    //   }
    // }
    // if(timThayKhong===false){
    //   this.state.danhSachUaThich.push(pokemon)
    // }

    // C??ch 3:
    // if(!this.state.danhSachTenUaThich.includes(pokemon.name)){
    //   this.state.danhSachTenUaThich.push(pokemon.name)
    //   this.setState({danhSachTenUaThich: this.state.danhSachTenUaThich});
    //   this.state.danhSachUaThich.push(pokemon)
    // }
    
    // C??ch 4:
    if(!this.state.danhSachUaThich.some(moiPoke => moiPoke.name === pokemon.name)){
      this.state.danhSachUaThich.push(pokemon)
    }
    this.setState({danhSachUaThich: this.state.danhSachUaThich});
  }

  // xoaPokemonUaThich = (pokemon) => {
  //   for(var i=0; i<this.state.danhSachUaThich.length; i++){
  //     if(this.state.danhSachUaThich[i].name===pokemon){
  //       this.state.danhSachUaThich.splice(i, 1);
  //       this.setState({danhSachUaThich: this.state.danhSachUaThich});
  //       break;
  //     }
  //   }
  // }
  xoaPokemonUaThich = (viTriDeXoa) => {
    var coXoaKhong = window.confirm("C?? x??a kh??ng?");
    if(coXoaKhong === true){
      this.state.danhSachUaThich.splice(viTriDeXoa, 1);
      this.setState({danhSachUaThich: this.state.danhSachUaThich});
      // this.state.danhSachTenUaThich.splice(viTriDeXoa, 1);
      // this.setState({danhSachTenUaThich: this.state.danhSachTenUaThich});
    }
  }

  xoaPokemonUaThichDungTen = (tenDeXoa) => {
    for(var i=0; i<this.state.danhSachUaThich.length; i++){
      if(this.state.danhSachUaThich[i].name===tenDeXoa){
        this.state.danhSachUaThich.splice(i, 1);
        this.setState({danhSachUaThich: this.state.danhSachUaThich});
      }
    }
  }

  xoaTatCaPokemonUaThich = () => {
    var coXoaKhong = window.confirm("C?? x??a t???t c??? kh??ng?");
    if(coXoaKhong === true){
      this.setState({danhSachUaThich: []});
      // this.setState({danhSachTenUaThich: []});
    }
  }

  luuPokemonSoSanh = (pokemon) => {
    if(!this.state.danhSachSoSanh.some(moiPoke => moiPoke.name === pokemon.name)){
      this.state.danhSachSoSanh.push(pokemon)
    }
    this.setState({danhSachSoSanh: this.state.danhSachSoSanh});
  }

  xoaPokemonSoSanhDungTen = (tenDeXoa) => {
    for(var i=0; i<this.state.danhSachSoSanh.length; i++){
      if(this.state.danhSachSoSanh[i].name===tenDeXoa){
        this.state.danhSachSoSanh.splice(i, 1);
        this.setState({danhSachSoSanh: this.state.danhSachSoSanh});
      }
    }
  }

  xoaPokemonSoSanh = (viTriDeXoa) => {
    var coXoaKhong = window.confirm("C?? x??a kh??ng?");
    if(coXoaKhong === true){
      this.state.danhSachSoSanh.splice(viTriDeXoa, 1);
      this.setState({danhSachSoSanh: this.state.danhSachSoSanh});
    }
  }
  xoaTatCaPokemonSoSanh = () => {
    var coXoaKhong = window.confirm("C?? x??a t???t c??? kh??ng?");
    if(coXoaKhong === true){
      this.setState({danhSachSoSanh: []});
    }
  }

  timSo = (event) => {
    alert(event)
    // this.setState({so: event.target.value});
  }
  chonSo = (q??er) => {
    alert(q??er)
  }

  xoaThongTin = (id, index) => {
    var coXoaKhong = window.confirm("C?? x??a kh??ng?");
    if(coXoaKhong === true){
      axios.delete('http://localhost:5400/xoaThongTin/'+id+'?thuTu=number')
      .then(res => {
        alert(res.data);
        // this.setState({danhSachPokemon: res.data});
      })
      this.state.danhSachPokemon.splice(index, 1)
      this.forceUpdate()
    }
  }


  render() {
    const {danhSachTenUaThich, danhSachPokemon, danhSachTatCaPokemon, mauSangToi, mauSangToiMenu, MauBangTable, tenSucManh, tenThuTu, xuoiNguocCu, thongTinPokemon, tenDaChon, chonMenu, 
            danhSachUaThich, danhSachSoSanh, soTim, tenTim} = this.state
    return (  
      <div className="App" style={{backgroundColor: mauSangToi === 'mauToi' ?'#808080' :'white', color: mauSangToi === 'mauToi' ?'#ffbf00' :'black'}}>
        
        <div style={{fontSize: '90px'}}><Image src={Pokeball} style={{width: '100px'}} /><b>Pokemon Database</b><Image src={MCZ} style={{width: '130px'}} /></div>

        <Navbar expand="lg" bg={mauSangToiMenu} sticky="top">
          <Container>
            <Navbar.Brand as={Link} onClick={() => this.damMenu('Home')} to="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

              <Nav className="me-auto">
                <Nav.Link active={chonMenu==='All_Pokemon'} as={Link} onClick={() => this.damMenu('All_Pokemon')} to="/All_Pokemon">All Pokemon</Nav.Link>
                <Nav.Link active={chonMenu==='PokeBall'} as={Link} onClick={() => this.damMenu('PokeBall')} to="/PokeBall">PokeBall</Nav.Link>
                {/* <Nav.Link as={Link} onClick={() => this.damMenu('Favorite')} to="/Favorite">Favorite</Nav.Link> */}
                <Nav.Link active={chonMenu==='So_Sanh'} as={Link} onClick={() => this.damMenu('So_Sanh')} to="/So_Sanh">So Sanh</Nav.Link>
                <Nav.Link active={chonMenu==='Admin'} as={Link} onClick={() => this.damMenu('Admin')} to="/Admin">Admin</Nav.Link>
                <Nav.Link active={chonMenu==='About'} as={Link} onClick={() => this.damMenu('About')} to="/About">About</Nav.Link>
              </Nav>

              <Link to="/Favorite" 
              // onClick={this.luuPokemonUaThich}
              >
                <BsHeartFill />
                {danhSachUaThich.length === 0
                  ?null
                  :'x'+danhSachUaThich.length
                }
              </Link>
              
              <div style={{paddingRight: '50px'}}/>
              
              {mauSangToi === 'mauToi' ?<BsFillMoonFill /> :<BsFillSunFill />}
              <Form>
                <Form.Check 
                  type="switch"
                  id="custom-switch"
                  onChange={this.doiSangToi}
                />
              </Form>

              <div style={{paddingRight: '50px'}}/>

              <InputGroup size="sm" className="mb-3" style={{width: '200px'}}>
                <FormControl 
                  onChange={this.vietTen}
                  value={tenTim}
                  
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  
                  aria-label="Small" 
                  aria-describedby="inputGroup-sizing-sm" 
                 />
                <InputGroup.Text onClick={this.timTen} as={Link} to="/All_Pokemon"><BsZoomIn/></InputGroup.Text>
              </InputGroup>

              <div style={{paddingRight: '25px'}}/>

              {['bottom'].map((placement) => (
                  <OverlayTrigger
                    trigger="click"
                    key={placement}
                    placement={placement}
                    overlay={
                      <Popover id={`popover-positioned-${placement}`}>
                        <Popover.Header as="h3">T??m nh???ng Pokemon n??o ????? so s??nh</Popover.Header>
                        <Popover.Body>
                          Ch???n th??ng tin
                          <Form.Select aria-label="Default select example" onChange={this.chonCaiGi}>
                            <option></option>
                            <option value='hp'>Hp</option>
                            <option value='attack'>Attack</option>
                            <option value='defense'>Defense</option>
                            <option value='speed'>Speed</option>
                          </Form.Select>
                          Ch???n d???u
                          <Form.Select aria-label="Default select example" onChange={this.chonDau}>
                            <option></option>
                            <option value='='>=</option>
                            <option value='<'>&lt;</option>
                            <option value='>'>&gt;</option>
                          </Form.Select>
                          Vi???t s???
                          <FormControl 
                            onChange={this.vietSoPokemon}
                            value={soTim}
                            
                            type="search"
                            placeholder="Vi???t s???"
                            className="me-2"
                            
                            aria-label="Small" 
                            aria-describedby="inputGroup-sizing-sm" 
                          />

                          <Button onClick={this.timPokemonDeChon} as={Link} to="/All_Pokemon">T??m</Button>

                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <div variant="secondary"><BsCaretDownFill /></div>

                  </OverlayTrigger>
                ))
              }






            </Navbar.Collapse>
          </Container>
        </Navbar>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/All_Pokemon" element={<All_Pokemon danhSachPokemon={danhSachPokemon} xuoiNguocCu={xuoiNguocCu} ThayDoiThuTu={this.ThayDoiThuTu} 
            MauBangTable={MauBangTable} ChonSucManh={this.ChonSucManh} tenSucManh={tenSucManh} tenThuTu={tenThuTu} chonPokemon={this.chonPokemon} 
            luuPokemonUaThich={this.luuPokemonUaThich} danhSachUaThich={danhSachUaThich} xoaPokemonUaThichDungTen={this.xoaPokemonUaThichDungTen} 
            luuPokemonSoSanh={this.luuPokemonSoSanh} xoaPokemonSoSanhDungTen={this.xoaPokemonSoSanhDungTen} danhSachSoSanh={danhSachSoSanh} 
            xoaPokemonSoSanh={this.xoaPokemonSoSanh} xoaTatCaPokemonSoSanh={this.xoaTatCaPokemonSoSanh} xoaThongTin={this.xoaThongTin} />} />
          <Route path="/Pokemon" element={<Pokemon thongTinPokemon={thongTinPokemon} tenDaChon={tenDaChon} chonPokemon={this.chonPokemon} />} />
          <Route path="/PokeBall" element={<PokeBall />} />
          <Route path="/Favorite" element={<Favorite danhSachUaThich={danhSachUaThich} luuPokemonUaThich={this.luuPokemonUaThich} chonPokemon={this.chonPokemon} 
            xoaPokemonUaThich={this.xoaPokemonUaThich} xoaTatCaPokemonUaThich={this.xoaTatCaPokemonUaThich} />} />
          <Route path="/So_Sanh" element={<So_Sanh danhSachSoSanh={danhSachSoSanh} xoaPokemonSoSanh={this.xoaPokemonSoSanh} xoaTatCaPokemonSoSanh={this.xoaTatCaPokemonSoSanh} 
            danhSachTatCaPokemon={danhSachTatCaPokemon}  />} />
          <Route path="/Admin" element={<Admin danhSachTatCaPokemon={danhSachTatCaPokemon}  />} />
          <Route path="/About" element={<About  />} />
        </Routes>

        {/* {chonMenu==='Home'?<Home />:null} */}
        
        {/* {chonMenu==='Pokemon'?<All_Pokemon danhSachPokemon={danhSachPokemon} xuoiNguocCu={xuoiNguocCu} ThayDoiThuTu={this.ThayDoiThuTu} 
                    MauBangTable={MauBangTable} ChonSucManh={this.ChonSucManh} tenSucManh={tenSucManh} tenThuTu={tenThuTu} />:null} */}
        
      </div>
    );
  }
}
export default App;