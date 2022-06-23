//Phần 1: các Import
import React, { Component } from 'react'
import { Table, Container, Row, Col, } from 'react-bootstrap';
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

        {/* {thongTinPokemon.length===0
          ? null
          : */}
            
        {Object.keys(thongTinPokemon).length > 0
          ?
          <Container>
            <Row>
              <Col>
                <Image src={thongTinPokemon.pokemonTimThay.image} style={{width: '400px'}} />
              </Col>
              <Col>
                Name: {thongTinPokemon.pokemonTimThay.name}
                <br/>
                Number: {thongTinPokemon.pokemonTimThay.number}
                <br/>
                Type: {thongTinPokemon.pokemonTimThay.type}
                <br/>
                Hp: {thongTinPokemon.pokemonTimThay.hp}
                <br/>
                Attack: {thongTinPokemon.pokemonTimThay.attack}
                <br/>
                Defense: {thongTinPokemon.pokemonTimThay.defense}
                <br/>
                Sp.atk {thongTinPokemon.pokemonTimThay.sp_atk}
                <br/>
                Sp.def: {thongTinPokemon.pokemonTimThay.sp_def}
                <br/>
                Speed: {thongTinPokemon.pokemonTimThay.speed}
                <br/>
                HeightM: {thongTinPokemon.pokemonTimThay.heightM}
                <br/>
                WeightKG: {thongTinPokemon.pokemonTimThay.weightKG}
                <br/>
                Evo From: {thongTinPokemon.pokemonTimThay.evo_from}
                <br/>
                Evo to: {thongTinPokemon.pokemonTimThay.evo_to.map((moithongTinPokemon, index)=>
                          <square>{moithongTinPokemon}</square>
                        )}
              </Col>
            </Row>

            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

            <Row>
              <Col>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                  <Tooltip id="button-tooltip">
                    Number: {thongTinPokemon.pokemonEvoFrom.number}
                    <br/>
                    Type: {thongTinPokemon.pokemonEvoFrom.type}
                    <br/>
                    Hp: {thongTinPokemon.pokemonEvoFrom.hp}
                    <br/>
                    Attack: {thongTinPokemon.pokemonEvoFrom.attack}
                    <br/>
                    Defense: {thongTinPokemon.pokemonEvoFrom.defense}
                    <br/>
                    Sp.atk: {thongTinPokemon.pokemonEvoFrom.sp_atk}
                    <br/>
                    Sp.def: {thongTinPokemon.pokemonEvoFrom.sp_def}
                    <br/>
                    Speed: {thongTinPokemon.pokemonEvoFrom.speed}
                    <br/>
                    HeightM: {thongTinPokemon.pokemonEvoFrom.heightM}
                    <br/>
                    WeightKG: {thongTinPokemon.pokemonEvoFrom.weightKG}
                  </Tooltip>
                }
                > 
                <img src={thongTinPokemon.pokemonEvoFrom.image} style={{width: '150px'}} onClick={() => this.props.chonPokemon(thongTinPokemon.pokemonEvoFrom.name)} />
                </OverlayTrigger>
                <br/>
                {thongTinPokemon.pokemonEvoFrom.name}
              </Col>
              <Col>
                {
                  Object.keys(thongTinPokemon.pokemonEvoFrom).length===0
                  ?null
                  :<square><Image src={Right_Arrow} style={{width: '100px'}} /></square>
                }
              </Col>
              <Col>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                  <Tooltip id="button-tooltip">
                    Number: {thongTinPokemon.pokemonTimThay.number}
                    <br/>
                    Type: {thongTinPokemon.pokemonTimThay.type}
                    <br/>
                    Hp: {thongTinPokemon.pokemonTimThay.hp}
                    <br/>
                    Attack: {thongTinPokemon.pokemonTimThay.attack}
                    <br/>
                    Defense: {thongTinPokemon.pokemonTimThay.defense}
                    <br/>
                    Sp.atk: {thongTinPokemon.pokemonTimThay.sp_atk}
                    <br/>
                    Sp.def: {thongTinPokemon.pokemonTimThay.sp_def}
                    <br/>
                    Speed: {thongTinPokemon.pokemonTimThay.speed}
                    <br/>
                    HeightM: {thongTinPokemon.pokemonTimThay.heightM}
                    <br/>
                    WeightKG: {thongTinPokemon.pokemonTimThay.weightKG}
                  </Tooltip>
                }
                > 
                  <img src={thongTinPokemon.pokemonTimThay.image} style={{width: '150px'}} />
                </OverlayTrigger>,
                <br/>
                {thongTinPokemon.pokemonTimThay.name}
              </Col>
              <Col>
                {
                  thongTinPokemon.pokemonEvoTo.length===0
                  ?null
                  :<square><Image src={Right_Arrow} style={{width: '100px'}} /></square>
                }
              </Col>
              <Col>
                {thongTinPokemon.pokemonEvoTo.map((moithongTinPokemon, index)=>
                  <square>
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                      <Tooltip id="button-tooltip">
                        Number: {moithongTinPokemon.number}
                        <br/>
                        Type: {moithongTinPokemon.type}
                        <br/>
                        Hp: {moithongTinPokemon.hp}
                        <br/>
                        Attack: {moithongTinPokemon.attack}
                        <br/>
                        Defense: {moithongTinPokemon.defense}
                        <br/>
                        Sp.atk: {moithongTinPokemon.sp_atk}
                        <br/>
                        Sp.def: {moithongTinPokemon.sp_def}
                        <br/>
                        Speed: {moithongTinPokemon.speed}
                        <br/>
                        HeightM: {moithongTinPokemon.heightM}
                        <br/>
                        WeightKG: {moithongTinPokemon.weightKG}
                      </Tooltip>
                    }
                    > 
                    <img src={moithongTinPokemon.image} style={{width: '150px'}} onClick={() => this.props.chonPokemon(moithongTinPokemon.name)} />
                    </OverlayTrigger>,
                    
                    <br/>
                    {moithongTinPokemon.name}
                  </square>
                )}
              </Col>
            </Row>
          </Container>
          :null
        }
        <br/><br/>
      </div>
    )
  }
}
export default Pokemon;