//Phần 1: các Import
import React, { Component } from 'react'
import logo from './logo.svg';
import { Table, Button, Form } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'

class So_Sanh extends Component {

//Phần 2: các State
  state = {
    tenMoi:'',
    numberMoi:'',
    typeMoi:'',
    hpMoi:'',
    attackMoi:'',
    defenseMoi:'',
    sp_atkMoi:'',
    sp_defMoi:'',
    speedMoi:'',
    heightMMoi:'',
    weightKGMoi:'',
    evo_fromMoi:'',
    evo_toMoi:'',

    viTriPokemonDuocChon: 0,
  }

//Phần 3: các Function

  chonTenPokemon = (event) => {
    this.setState({viTriPokemonDuocChon: event.target.value});
    // console.log(event)
  }
  
  themPokemon = (soViTriDuocChon) => {
    if(this.props.danhSachSoSanh.some(moiPokemon => moiPokemon.name===this.props.danhSachTatCaPokemon[soViTriDuocChon].name)){
      alert('Có nó rồi, không thê nữa')
    }else{
      this.props.danhSachSoSanh.push(this.props.danhSachTatCaPokemon[soViTriDuocChon])
      this.forceUpdate()
    }
  }

  // // themPokemon = (tenDuocChon) => {
  // themPokemon = (soViTriDuocChon) => {
  //   var daCoChua = false
  //   for(var i=0; i<this.props.danhSachSoSanh.length; i++){
  //     if(this.props.danhSachSoSanh[i].name===this.props.danhSachPokemon[soViTriDuocChon].name){
  //       daCoChua = true
  //       break;
  //     }
  //   }    
  //   if(daCoChua === true){
  //     alert('Có nó rồi, không thê nữa')
  //   }else{
  //     // alert('Chưa có và thêm nữa')
  //       this.props.danhSachSoSanh.push(this.props.danhSachPokemon[soViTriDuocChon])
  //       this.forceUpdate()
  //     // for(var i=0; i<this.props.danhSachPokemon.length; i++){
  //     //   if(this.props.danhSachPokemon[i].name===tenDuocChon){
  //     //     this.props.danhSachSoSanh.push(this.props.danhSachPokemon[i])
  //     //     this.forceUpdate()
  //     //     break;
  //     //   }
  //     // }
  //   //   this.props.danhSachSoSanh.push(this.props.danhSachPokemon[soViTriDuocChon])
  //   //   this.forceUpdate()
  //   }
  // }

  
  render() {
    const { viTriPokemonDuocChon } = this.state
    const { danhSachSoSanh, danhSachTatCaPokemon } = this.props
    // const {  } = this.state
    return (
      <div className="So_Sanh">
        
        <br/><br/>
        <Form.Select aria-label="Default select example" onChange={this.chonTenPokemon}>
          <option></option>
          {danhSachTatCaPokemon.map((moiPokemonChonMotCon, index)=>
            // <option value={moiPokemonChonMotCon.name}>{moiPokemonChonMotCon.name}</option>
            <option value={index}>{moiPokemonChonMotCon.name}</option>
          )}
        </Form.Select>
        <Button onClick={() => this.themPokemon(viTriPokemonDuocChon)}>Thêm Pokemon để chọn</Button>
        {/* <Button onClick={() => this.themPokemon({})}>Thêm Pokemon để chọn</Button> */}
        <br/><br/>


        {danhSachSoSanh.length 
          ? 
            <div>
              <Button variant="danger" onClick={this.props.xoaTatCaPokemonSoSanh}>X</Button>
              <br/><br/>
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td></td>
                    {danhSachSoSanh.map((moiPokemonUaThich, index)=>
                      <td><span onClick={() => this.props.xoaPokemonSoSanh(index)}>X</span></td>
                    )}
                  </tr>
                  <tr>
                    <td>Name</td>
                    {danhSachSoSanh.map((moiPokemonUaThich, index)=>
                      <td>{moiPokemonUaThich.name}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Image</td>
                    {danhSachSoSanh.map((moiPokemonUaThich, index)=>
                      <td><Image src={moiPokemonUaThich.image} style={{width: '100px'}}/></td>
                    )}
                  </tr>
                  <tr>
                    <td>Number</td>
                    {danhSachSoSanh.map((moiPokemonUaThich, index)=>
                      <td>{moiPokemonUaThich.number}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Type</td>
                    {danhSachSoSanh.map((moiPokemonUaThich, index)=>
                      <td>{moiPokemonUaThich.type}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Hp</td>
                    {danhSachSoSanh.map((moiPokemonUaThich, index)=>
                      <td>{moiPokemonUaThich.hp}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Attack</td>
                    {danhSachSoSanh.map((moiPokemonUaThich, index)=>
                      <td>{moiPokemonUaThich.attack}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Defense</td>
                    {danhSachSoSanh.map((moiPokemonUaThich, index)=>
                      <td>{moiPokemonUaThich.defense}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Sp.atk</td>
                    {danhSachSoSanh.map((moiPokemonUaThich, index)=>
                      <td>{moiPokemonUaThich.sp_atk}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Sp.def</td>
                    {danhSachSoSanh.map((moiPokemonUaThich, index)=>
                      <td>{moiPokemonUaThich.sp_def}</td>
                    )}
                  </tr>
                  <tr>
                    <td>Speed</td>
                    {danhSachSoSanh.map((moiPokemonUaThich, index)=>
                      <td>{moiPokemonUaThich.speed}</td>
                    )}
                  </tr>
                  <tr>
                    <td>HeightM</td>
                    {danhSachSoSanh.map((moiPokemonUaThich, index)=>
                      <td>{moiPokemonUaThich.heightM}</td>
                    )}
                  </tr>
                  <tr>
                    <td>WeightKG</td>
                    {danhSachSoSanh.map((moiPokemonUaThich, index)=>
                      <td>{moiPokemonUaThich.weightKG}</td>
                    )}
                  </tr>
                </tbody>
              </Table>
            </div>
          : null
        }
        <br/><br/>
      </div>
    )
  }
}
export default So_Sanh;