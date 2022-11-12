//Phần 1: các Import
import React, { Component } from 'react'
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import { Table, Container, Row, Col, Popover} from 'react-bootstrap';
import logo from './logo.svg';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import axios from 'axios';
import Image from 'react-bootstrap/Image'
import Right_Arrow from './Right_Arrow.png'
import { BsSquare, BsFillForwardFill, BsArrowRight, BsFillArrowRightCircleFill } from 'react-icons/bs';



class Pokemon extends Component {

//Phần 2: các State
  // state = {}

//Phần 3: các Function

  render() {
    // const { } = this.state
    const {thongTinPokemon, tenDaChon} = this.props
    return (
      <div className="Pokemon">
        <br/><br/>


        

        {/* Lúc bắt đầu hộp chống rỗng vì câu trả chưa về thì thạm thời null cho đến khi có câu trả lời trong hộp thì hiện ra bình thường */}
        {Object.keys(thongTinPokemon).length===0
          ?null
          :
          <div>
            <Container>
              <Row>
                <Col><Image src={thongTinPokemon.PKDuocChon.image} style={{width: '400px'}} /></Col>
                <Col>
                  Name: {thongTinPokemon.PKDuocChon.name}
                  <br/>
                  Number: {thongTinPokemon.PKDuocChon.number}
                  <br/>
                  Type: {thongTinPokemon.PKDuocChon.type}
                  <br/>
                  Hp: {thongTinPokemon.PKDuocChon.hp}
                  <br/>
                  Attack: {thongTinPokemon.PKDuocChon.attack}
                  <br/>
                  Defense: {thongTinPokemon.PKDuocChon.defense}
                  <br/>
                  Sp.atk {thongTinPokemon.PKDuocChon.sp_atk}
                  <br/>
                  Sp.def: {thongTinPokemon.PKDuocChon.sp_def}
                  <br/>
                  Speed: {thongTinPokemon.PKDuocChon.speed}
                  <br/>
                  HeightM: {thongTinPokemon.PKDuocChon.heightM}
                  <br/>
                  WeightKG: {thongTinPokemon.PKDuocChon.weightKG}
                  <br/>
                  Evo From: <Image src={thongTinPokemon.PKEvoFrom.image} style={{width: '50px'}} />{thongTinPokemon.PKDuocChon.evo_from}
                  <br/>
                  Evo to: 
                  {/* {thongTinPokemon.PKDuocChon.evo_to} */}
                  {thongTinPokemon.PKEvoTo.map((moiConLon, index)=><div><Image src={moiConLon.image} style={{width: '50px'}} />{moiConLon.name}</div>)}
                </Col>
              </Row>
              <br/><br/><br/>
              <Row>
                <Col>
                  <OverlayTrigger
                    key={'top'}
                    placement={'top'}
                    overlay={
                      <Popover id={`popover-positioned-${'top'}`}>
                        Name: {thongTinPokemon.PKEvoFrom.name}
                        <br/>
                        Number: {thongTinPokemon.PKEvoFrom.number}
                        <br/>
                        Type: {thongTinPokemon.PKEvoFrom.type}
                        <br/>
                        Hp: {thongTinPokemon.PKEvoFrom.hp}
                        <br/>
                        Attack: {thongTinPokemon.PKEvoFrom.attack}
                        <br/>
                        Defense: {thongTinPokemon.PKEvoFrom.defense}
                        <br/>
                        Sp.atk {thongTinPokemon.PKEvoFrom.sp_atk}
                        <br/>
                        Sp.def: {thongTinPokemon.PKEvoFrom.sp_def}
                        <br/>
                        Speed: {thongTinPokemon.PKEvoFrom.speed}
                        <br/>
                        HeightM: {thongTinPokemon.PKEvoFrom.heightM}
                        <br/>
                        WeightKG: {thongTinPokemon.PKEvoFrom.weightKG}
                      </Popover>
                    }
                  >
                    <Image src={thongTinPokemon.PKEvoFrom.image} style={{width: '100px'}} onClick={() => this.props.chonPokemon(thongTinPokemon.PKEvoFrom.name)} />
                  </OverlayTrigger>
                  <br/>
                  {/* {thongTinPokemon.PKEvoFrom.name} */}
                </Col>
                <Col>
                  {Object.keys(thongTinPokemon.PKEvoFrom).length===0
                    ? null
                    : <Image src={Right_Arrow} style={{width: '100px'}} />
                  }
                </Col>
                <Col>
                  <OverlayTrigger
                    key={'top'}
                    placement={'top'}
                    overlay={
                      <Popover id={`popover-positioned-${'top'}`}>
                        Name: {thongTinPokemon.PKDuocChon.name}
                        <br/>
                        Number: {thongTinPokemon.PKDuocChon.number}
                        <br/>
                        Type: {thongTinPokemon.PKDuocChon.type}
                        <br/>
                        Hp: {thongTinPokemon.PKDuocChon.hp}
                        <br/>
                        Attack: {thongTinPokemon.PKDuocChon.attack}
                        <br/>
                        Defense: {thongTinPokemon.PKDuocChon.defense}
                        <br/>
                        Sp.atk {thongTinPokemon.PKDuocChon.sp_atk}
                        <br/>
                        Sp.def: {thongTinPokemon.PKDuocChon.sp_def}
                        <br/>
                        Speed: {thongTinPokemon.PKDuocChon.speed}
                        <br/>
                        HeightM: {thongTinPokemon.PKDuocChon.heightM}
                        <br/>
                        WeightKG: {thongTinPokemon.PKDuocChon.weightKG}
                      </Popover>
                    }
                  >
                    <Image src={thongTinPokemon.PKDuocChon.image} style={{width: '100px'}} />
                  </OverlayTrigger>
                  <br/>
                  {/* {thongTinPokemon.PKDuocChon.name} */}
                </Col>
                <Col>
                  {thongTinPokemon.PKEvoTo.length===0
                    ? null
                    : <Image src={Right_Arrow} style={{width: '100px'}} />
                  }
                </Col>
                <Col>{thongTinPokemon.PKEvoTo.map((moiConLon, index)=>
                  <OverlayTrigger
                    key={'top'}
                    placement={'top'}
                    overlay={
                      <Popover id={`popover-positioned-${'top'}`}>
                        Name: {moiConLon.name}
                        <br/>
                        Number: {moiConLon.number}
                        <br/>
                        Type: {moiConLon.type}
                        <br/>
                        Hp: {moiConLon.hp}
                        <br/>
                        Attack: {moiConLon.attack}
                        <br/>
                        Defense: {moiConLon.defense}
                        <br/>
                        Sp.atk {moiConLon.sp_atk}
                        <br/>
                        Sp.def: {moiConLon.sp_def}
                        <br/>
                        Speed: {moiConLon.speed}
                        <br/>
                        HeightM: {moiConLon.heightM}
                        <br/>
                        WeightKG: {moiConLon.weightKG}
                      </Popover>
                    }
                  >
                    <Image src={moiConLon.image} style={{width: '100px'}} onClick={() => this.props.chonPokemon(moiConLon.name)} />
                  </OverlayTrigger>
                  // <br/>
                  // {moiConLon.name}
                )}</Col>
              </Row>
            </Container>
          </div>
        }

          
          



        <br/><br/>
      </div>
    )
  }
}
export default Pokemon;