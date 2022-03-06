//Phần 1: các Import
import React, { Component } from 'react'
import logo from './logo.svg';
import { InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';

class Pokemon extends Component {

//Phần 2: các State
  state = {
    danhSachPokemon: '',
    tenTim: '',

  }

//Phần 3: các Function
  vietTen = (event) => {
    this.setState({tenTim: event.target.value});
  }
  timThongTinTen = () => {
    axios.get('http://localhost:5400/tim1Pokemon?tim1ThongTin='+this.state.tenTim)
    .then(res => {
      this.setState({danhSachPokemon: res.data});
    })
  }

  render() {
    const {danhSachPokemon, } = this.state
    return (
      <div className="Pokemon">
        <br/><br/>
        
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
          <InputGroup.Text 
          onClick={this.timThongTinTen}
          >Tìm</InputGroup.Text>
        </InputGroup>
        
{danhSachPokemon}


        <br/><br/>
      </div>
    )
  }
}
export default Pokemon;