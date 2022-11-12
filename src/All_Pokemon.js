// import logo from './logo.svg';
import './App.css';
import React, { Component,  } from 'react'
import { Container, Button, Table, Row, Col, Card, Modal, Dropdown, OverlayTrigger, Tooltip, Spinner, Offcanvas, Toast, ToastContainer } from 'react-bootstrap';
import { BsGridFill , BsJustify, BsCheckLg, BsFillCaretDownFill, BsFillCaretUpFill, BsFillArrowUpCircleFill, BsFillArrowDownCircleFill, BsFillInfoCircleFill} from 'react-icons/bs';
import { BsHeartFill, BsHeart, BsCheck2 } from 'react-icons/bs';
import Image from 'react-bootstrap/Image'
import axios from 'axios';
import PokeDexBD from './PokeDexBD.png'
import { Link, } from "react-router-dom";

class All_Pokemon extends Component {
  state = {
    nutBamGrid: 'success',
    nutBamTable: '',
    lenTren: 'len1234',
    xuongDuoi: 'xuong5678',
    tenTim: '',
    coHienThanhSSKo: false, 
    moDongAnhTo: false,
    thongTinPokemon: {},
    thongTinPokeEvoTo: [],
    viTriDangXem: -1,
  }

  hienAnhTo = (index) => {
    this.setState({moDongAnhTo: true});
    this.setState({thongTinPokemon: this.props.danhSachPokemon[index]});
    this.setState({thongTinPokeEvoTo: this.props.danhSachPokemon[index].evo_to});
    this.setState({viTriDangXem: index});
  }

  dongAnhTo = () => {
    this.setState({moDongAnhTo: false});
  }

  hienThanhSoSanh = (thongTinPokemon) => {
    this.setState({coHienThanhSSKo: true});
    this.props.luuPokemonSoSanh(thongTinPokemon)
  }
  handleClose = () => {
    this.setState({coHienThanhSSKo: false});
  }


  xoaVaDong = (idMuonXoa, viTri) => {
    this.props.xoaThongTin(idMuonXoa, viTri)
    this.dongAnhTo()
    // this.setState({moDongAnhTo: false});
  }

  render() {
    const {thongTinPokemon, thongTinPokeEvoTo, moDongAnhTo, coHienThanhSSKo, viTriDangXem,} = this.state
    const {thayDoiGridTable, nutBamTable, nutBamGrid, danhSachPokemon, xuoiNguocCu, MauBangTable, tenSucManh, tenThuTu, danhSachUaThich, danhSachSoSanh, dbChon, } = this.props
    
    return (
      <div className="All_Pokemon">
        <Modal 
          show={moDongAnhTo}
          onHide={this.dongAnhTo}
          centered
          >
          <Image src={thongTinPokemon.image} style={{width: '200px'}} ></Image>
          <Modal.Header closeButton><Modal.Title>
            {thongTinPokemon.name}
          </Modal.Title></Modal.Header>
          <Modal.Body>
            Number: {thongTinPokemon.number}
            <br/>
            Type: {'['+thongTinPokemon.type+']'}
            <br/>
            Hp: {thongTinPokemon.hp}
            <br/>
            Attack: {thongTinPokemon.attack}
            <br/>
            Defense: {thongTinPokemon.defense}
            <br/>
            Sp.atk: {thongTinPokemon.sp_atk}
            <br/>
            Sp.def: {thongTinPokemon.sp_def}
            <br/>
            Speed: {thongTinPokemon.speed}
            <br/>
            HeightM: {thongTinPokemon.heightM}
            <br/>
            WeightKG: {thongTinPokemon.weightKG}
            <br/>
            Evo From: {thongTinPokemon.evo_from}
            <br/>
            Evo.to: 
            {/* {thongTinPokeEvoTo} */}
            {thongTinPokeEvoTo.map((moiPokeEvoTo, index)=>
              <div>
                {index+1+". "}{moiPokeEvoTo}
              </div>
            )}
          </Modal.Body>
                    
          <Modal.Footer>
            {dbChon === 'MySQL'
              ? <Button variant="danger" style={{color:'black'}} onClick={() => this.xoaVaDong(thongTinPokemon.id, viTriDangXem)}>X</Button>
              : <Button variant="danger" style={{color:'black'}} onClick={() => this.xoaVaDong(thongTinPokemon._id, viTriDangXem)}>X</Button>
            }

            {danhSachSoSanh.some(moiPoke => moiPoke.name === thongTinPokemon.name)
              ?<Button variant="light" style={{color:'blue'}} onClick={() => this.props.xoaPokemonSoSanhDungTen(thongTinPokemon.name)}><BsCheck2/>So sánh</Button>
              :<Button variant="light" style={{color:'black'}} onClick={() => this.hienThanhSoSanh(thongTinPokemon)}>So sánh</Button>
            }
            
            {danhSachUaThich.some(moiPoke => moiPoke.name === thongTinPokemon.name)
              ?
              // <Button variant="light" onClick={this.props.xoaPokemonUaThich}><BsHeartFill color='red' /></Button>
              <Button variant="light" onClick={() => this.props.xoaPokemonUaThichDungTen(thongTinPokemon.name)}><BsHeartFill color='red' /></Button>
              :<Button variant="light" onClick={() => this.props.luuPokemonUaThich(thongTinPokemon)}><BsHeart /></Button>
            }

            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip id="button-tooltip">Xem kỹ thông tin</Tooltip>}
            >
              <Button variant="warning" onClick={() => this.props.chonPokemon(thongTinPokemon.name)}><Link to="/Pokemon"><BsFillInfoCircleFill /></Link></Button>
            </OverlayTrigger>
            <Button variant="danger" href={'https://pokemondb.net/pokedex/'+thongTinPokemon.name} target="_blank"><Image src={PokeDexBD}/></Button>
            <Button variant="secondary" onClick={this.dongAnhTo}>Close</Button>
          </Modal.Footer>
        </Modal>
        
        <Offcanvas show={danhSachSoSanh.length>0 && coHienThanhSSKo} onHide={this.handleClose} placement={'bottom'} scroll={true} backdrop={false} style={{height: '250px'}}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <Button variant="warning"  disabled={danhSachSoSanh.length<2} ><Link to="/So_Sanh">Xem So Sánh</Link></Button>
              <br/>
              {danhSachSoSanh.length>0
                ?<a href='#' onClick={this.props.xoaTatCaPokemonSoSanh}>Xóa tất cả</a>
                :null
              }
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {/* <Button variant="light" onClick={this.props.xoaTatCaPokemonSoSanh}>X</Button> */}
            <Container>
              <Row>
                {danhSachSoSanh.map((moiPokemon, index)=>
                  <Col>
                    <Image src={moiPokemon.image} style={{width: '50px'}}/>
                    <br/>
                    {moiPokemon.name}
                    <br/>
                    <span onClick={() => this.props.xoaPokemonSoSanh(index)}>X</span>
                  </Col>
                )}
              </Row>
            </Container>
          </Offcanvas.Body>
        </Offcanvas>

        <Button variant={nutBamTable} onClick={this.props.thayDoiTable} ><BsJustify /></Button>
        <Button variant={nutBamGrid} onClick={this.props.thayDoiGrid}><BsGridFill /></Button>
        <Button onClick={this.len}><BsFillArrowUpCircleFill /></Button>
        <Button onClick={this.xuong}><BsFillArrowDownCircleFill /></Button>
        
        <br/>
        
        {thayDoiGridTable==='Grid' 
          ?
            <div className="d-flex justify-content-around">
              <Container>
                <Row>
                  {danhSachPokemon.length===0
                    ? 
                    <Col>
                      <br/><br/>
                      <Spinner animation="border" />
                      <div>Loading...</div>
                      <br/><br/>
                    </Col>
                    :
                    danhSachPokemon.map((moiPokemon, index)=>
                      <Col>
                        <Card style={{width: '18rem'}} onClick={() => this.hienAnhTo(index)}>
                          <Card.Img variant="top" src={moiPokemon.image} style={{width: '200px'}} />
                          <Card.Body><Card.Title>
                            {moiPokemon.name}
                          </Card.Title></Card.Body>
                        </Card>
                      </Col>
                    )
                  }
                </Row>
              </Container>
            </div>
          :  
            <div>
              <Table variant={MauBangTable}>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th onClick={() => this.props.ThayDoiThuTu('name')}>Name{tenThuTu==='name' ?(xuoiNguocCu===1?<BsFillCaretUpFill/>:<BsFillCaretDownFill/>) :null}</th>
                    <th onClick={() => this.props.ThayDoiThuTu('number')}>Number{tenThuTu==='number' ?(xuoiNguocCu===1?<BsFillCaretUpFill/>:<BsFillCaretDownFill/>) :null}</th>
                    <th>
                    <Dropdown>
                      <Dropdown.Toggle variant="dark"><b>Type: {tenSucManh}</b></Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#/" onClick={() => this.props.ChonSucManh('All')}>All {tenSucManh==='All' ?<BsCheckLg/> :null}</Dropdown.Item>
                        <Dropdown.Item href="#/Normal" onClick={() => this.props.ChonSucManh('Normal')}>Normal {tenSucManh==='Normal' ?<BsCheckLg/> :null}</Dropdown.Item>
                        <Dropdown.Item href="#/Fire" onClick={() => this.props.ChonSucManh('Fire')}>Fire {tenSucManh==='Fire' ?<BsCheckLg/> :null}</Dropdown.Item>
                        <Dropdown.Item href="#/Water" onClick={() => this.props.ChonSucManh('Water')}>Water {tenSucManh==='Water' ?<BsCheckLg/> :null}</Dropdown.Item>
                        <Dropdown.Item href="#/Electric" onClick={() => this.props.ChonSucManh('Electric')}>Electric {tenSucManh==='Electric' ?<BsCheckLg/> :null}</Dropdown.Item>
                        <Dropdown.Item href="#/Grass" onClick={() => this.props.ChonSucManh('Grass')}>Grass {tenSucManh==='Grass' ?<BsCheckLg/> :null}</Dropdown.Item>
                        <Dropdown.Item href="#/Ice" onClick={() => this.props.ChonSucManh('Ice')}>Ice {tenSucManh==='Ice' ?<BsCheckLg/> :null}</Dropdown.Item>
                        <Dropdown.Item href="#/Fighting" onClick={() => this.props.ChonSucManh('Fighting')}>Fighting {tenSucManh==='Fighting' ?<BsCheckLg/> :null}</Dropdown.Item>
                        <Dropdown.Item href="#/Poison" onClick={() => this.props.ChonSucManh('Poison')}>Poison {tenSucManh==='Poison' ?<BsCheckLg/> :null}</Dropdown.Item>
                        <Dropdown.Item href="#/Ground" onClick={() => this.props.ChonSucManh('Ground')}>Ground {tenSucManh==='Ground' ?<BsCheckLg/> :null}</Dropdown.Item>
                        <Dropdown.Item href="#/Flying" onClick={() => this.props.ChonSucManh('Flying')}>Flying {tenSucManh==='Flying' ?<BsCheckLg/> :null}</Dropdown.Item>
                        <Dropdown.Item href="#/Psychic" onClick={() => this.props.ChonSucManh('Psychic')}>Psychic {tenSucManh==='Psychic' ?<BsCheckLg/> :null}</Dropdown.Item>
                        <Dropdown.Item href="#/Bug" onClick={() => this.props.ChonSucManh('Bug')}>Bug {tenSucManh==='Bug' ?<BsCheckLg/> :null}</Dropdown.Item>
                        <Dropdown.Item href="#/Rock" onClick={() => this.props.ChonSucManh('Rock')}>Rock {tenSucManh==='Rock' ?<BsCheckLg/> :null}</Dropdown.Item>
                        <Dropdown.Item href="#/Ghost" onClick={() => this.props.ChonSucManh('Ghost')}>Ghost {tenSucManh==='Ghost' ?<BsCheckLg/> :null}</Dropdown.Item>
                        <Dropdown.Item href="#/Dragon" onClick={() => this.props.ChonSucManh('Dragon')}>Dragon {tenSucManh==='Dragon' ?<BsCheckLg/> :null}</Dropdown.Item>
                        <Dropdown.Item href="#/Dark" onClick={() => this.props.ChonSucManh('Dark')}>Dark {tenSucManh==='Dark' ?<BsCheckLg/> :null}</Dropdown.Item>
                        <Dropdown.Item href="#/Steel" onClick={() => this.props.ChonSucManh('Steel')}>Steel {tenSucManh==='Steel' ?<BsCheckLg/> :null}</Dropdown.Item>
                        <Dropdown.Item href="#/Fairy" onClick={() => this.props.ChonSucManh('Fairy')}>Fairy {tenSucManh==='Fairy' ?<BsCheckLg/> :null}</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    </th>
                    {/* <DropdownButton as='th' variant="dark" title="Type">
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton> */}

                    <th onClick={() => this.props.ThayDoiThuTu('hp')}>Hp{tenThuTu==='hp' ?(xuoiNguocCu===1?<BsFillCaretUpFill/>:<BsFillCaretDownFill/>) :null}</th>
                    <th onClick={() => this.props.ThayDoiThuTu('attack')}>Attack{tenThuTu==='attack' ?(xuoiNguocCu===1?<BsFillCaretUpFill/>:<BsFillCaretDownFill/>) :null}</th>
                    <th onClick={() => this.props.ThayDoiThuTu('defense')}>Defense{tenThuTu==='defense' ?(xuoiNguocCu===1?<BsFillCaretUpFill/>:<BsFillCaretDownFill/>) :null}</th>
                    <th onClick={() => this.props.ThayDoiThuTu('sp_atk')}>Sp.atk{tenThuTu==='sp_atk' ?(xuoiNguocCu===1?<BsFillCaretUpFill/>:<BsFillCaretDownFill/>) :null}</th>
                    <th onClick={() => this.props.ThayDoiThuTu('sp_def')}>Sp.def{tenThuTu==='sp_def' ?(xuoiNguocCu===1?<BsFillCaretUpFill/>:<BsFillCaretDownFill/>) :null}</th>
                    <th onClick={() => this.props.ThayDoiThuTu('speed')}>Speed{tenThuTu==='speed' ?(xuoiNguocCu===1?<BsFillCaretUpFill/>:<BsFillCaretDownFill/>) :null}</th>
                    <th onClick={() => this.props.ThayDoiThuTu('heightM')}>HeightM{tenThuTu==='heightM' ?(xuoiNguocCu===1?<BsFillCaretUpFill/>:<BsFillCaretDownFill/>) :null}</th>
                    <th onClick={() => this.props.ThayDoiThuTu('weightKG')}>WeightKG{tenThuTu==='weightKG' ?(xuoiNguocCu===1?<BsFillCaretUpFill/>:<BsFillCaretDownFill/>) :null}</th>
                    <th>Evo From</th>
                    <th>Evo.to</th>
                  </tr>
                </thead>
                <tbody>
                  {danhSachPokemon.length===0
                    ?
                    <Container>
                      <Row>
                        <Col>
                          <br/><br/>
                          <Spinner animation="border" />
                          <div>Loading...</div>
                          <br/><br/>
                        </Col>
                      </Row>
                    </Container>
                    // 'Không tìm thấy Pokemon trong danh sách'
                    :
                    danhSachPokemon.map((moiPokemon, index)=>
                      <tr>
                        <td><Image src={moiPokemon.image} style={{width: '50px'}} ></Image></td>
                        <td onClick={() => this.props.chonPokemon(moiPokemon.name)}><Link to="/Pokemon">{moiPokemon.name}</Link></td>
                        <td>{moiPokemon.number}</td>
                        <td>{moiPokemon.type.map((moiSucManh, index)=><div>{moiSucManh}</div>)}</td>
                        <td>{moiPokemon.hp}</td>
                        <td>{moiPokemon.attack}</td>
                        <td>{moiPokemon.defense}</td>
                        <td>{moiPokemon.sp_atk}</td>
                        <td>{moiPokemon.sp_def}</td>
                        <td>{moiPokemon.speed}</td>
                        <td>{moiPokemon.heightM}</td>
                        <td>{moiPokemon.weightKG}</td>
                        <td>{moiPokemon.evo_from}</td>
                        <td>{moiPokemon.evo_to}</td>
                      </tr>
                  )}
                </tbody>
              </Table>
            </div>
        }
        <br/>
      </div>

    )
  }
}
export default All_Pokemon;