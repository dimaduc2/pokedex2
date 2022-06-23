//Phần 1: các Import
import React, { Component } from 'react'
import logo from './logo.svg';
import { OverlayTrigger, Tooltip, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Image from 'react-bootstrap/Image'
import Right_Arrow from './Right_Arrow.png'
import { Link, } from "react-router-dom";
import { BsSquare, BsFillForwardFill, BsArrowRight, BsFillArrowRightCircleFill } from 'react-icons/bs';

class Favorite extends Component {

  componentDidMount = () => {
    
    // this.props.luuPokemonUaThich('')

    // axios.get('http://localhost:5400/tenUaThich?ten='+ten)
    // .then(res => {
    //   res.data
    // })

    console.log(this.props.danhSachUaThich)

  }




//Phần 2: các State
  // state = {}

//Phần 3: các Function

  render() {
    // const { } = this.state
    const { danhSachUaThich,  } = this.props
    return (
      <div className="Favorite">
      <br/><br/>
      {danhSachUaThich.length===0
        ?null
        :<Button variant="danger" onClick={this.props.xoaTatCaPokemonUaThich}>X</Button>
      }
      <br/><br/>
      <Container>
        <Row>
          {danhSachUaThich.map((moiPokemonUaThich, index)=>
            <Col>
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={
                <Tooltip id="button-tooltip">
                  Number: {moiPokemonUaThich.number}
                  <br/>
                  Type: {moiPokemonUaThich.type}
                  <br/>
                  Hp: {moiPokemonUaThich.hp}
                  <br/>
                  Attack: {moiPokemonUaThich.attack}
                  <br/>
                  Defense: {moiPokemonUaThich.defense}
                  <br/>
                  Sp.atk: {moiPokemonUaThich.sp_atk}
                  <br/>
                  Sp.def: {moiPokemonUaThich.sp_def}
                  <br/>
                  Speed: {moiPokemonUaThich.speed}
                  <br/>
                  HeightM: {moiPokemonUaThich.heightM}
                  <br/>
                  WeightKG: {moiPokemonUaThich.weightKG}
                </Tooltip>
                }> 
                <Image src={moiPokemonUaThich.image} style={{width: '200px'}}/>
              </OverlayTrigger>
              <br/>
              <Button variant="warning" onClick={() => this.props.chonPokemon(moiPokemonUaThich.name)}><Link to="/Pokemon">{moiPokemonUaThich.name}</Link></Button>
              {/* <Button variant="danger" onClick={() => this.props.xoaPokemonUaThich(moiPokemonUaThich.name)}>X</Button> */}
              <Button variant="danger" onClick={() => this.props.xoaPokemonUaThich(index)}>X</Button>
            </Col>
          )}
        </Row>
      </Container>
      <br/><br/>
    </div>
  )
}
}
export default Favorite;