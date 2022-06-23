//Phần 1: các Import
import React, { Component } from 'react'
import logo from './logo.svg';
import { Button, InputGroup, FormControl, Form, Alert, Dropdown, Link } from 'react-bootstrap';
import axios from 'axios';


const danhSachSucManh = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 
                      'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy']
                      

class Admin extends Component {

//Phần 2: các State
  state = {
    idCu: '',
    tenMoi: '',
    numberMoi: 0,
    typeMoi: '',
    hpMoi: 0,
    attackMoi: 0,
    defenseMoi: 0,
    sp_atkMoi: 0,
    sp_defMoi: 0,
    speedMoi: 0,
    heightMMoi: 0,
    weightKGMoi: 0,
    evo_fromMoi: '',
    evo_toMoi: '',
    thongBao: '',
    mauThongBao: '',
    thongBaoSaiChu: '',
    // soThemType: 1,
    themArrayType: ['A', 'B'],
    soThemEvoTo: 1,
    themArrayEvoTo: [],
  }

  //Phần 3: các Function
  
  themOChongType = () => {
    // if(this.state.soThemType<3){
    //   this.setState({soThemType: this.state.soThemType + 1});
    // }
    this.setState({themArrayType: this.state.themArrayType.push('C')});
  }
  botOChongType = () => {
    // if(this.state.soThemType>1){
    //   this.setState({soThemType: this.state.soThemType - 1});
    // }
  }
  
  themOChongEvoTo = () => {
    if(this.state.soThemEvoTo<8){
      this.setState({soThemEvoTo: this.state.soThemEvoTo + 1});
    }
  }
  botOChongEvoTo = () => {
    if(this.state.soThemEvoTo>1){
      this.setState({soThemEvoTo: this.state.soThemEvoTo - 1});
    }
  }
  

  chonTenPokemon = (event) => {
    // alert(this.props.danhSachTatCaPokemon[event.target.value].name)
    let PokemonChon = this.props.danhSachTatCaPokemon[event.target.value]
    this.setState({idCu: PokemonChon._id});
    this.setState({tenMoi: PokemonChon.name});
    this.setState({numberMoi: PokemonChon.number});
    this.setState({hpMoi: PokemonChon.hp});
    this.setState({attackMoi: PokemonChon.attack});
    this.setState({defenseMoi: PokemonChon.defense});
    this.setState({sp_atkMoi: PokemonChon.sp_atk});
    this.setState({sp_defMoi: PokemonChon.sp_def});
    this.setState({speedMoi: PokemonChon.speed});
    this.setState({heightMMoi: PokemonChon.heightM});
    this.setState({weightKGMoi: PokemonChon.weightKG});
    this.setState({evo_fromMoi: PokemonChon.evo_from});
    this.setState({evo_toMoi: PokemonChon.evo_to});

  }

  vietTen = (event) => {
    this.setState({tenMoi: event.target.value});
  }
  vietNumber= (event) => {
  this.setState({numberMoi: Number(event.target.value)});
  }
  vietType = (event) => {
    this.setState({typeMoi: event.target.value});
  }

  vietHp = (event) => {
    this.setState({hpMoi: Number(event.target.value)});
  }
  vietAttack = (event) => {
    // if(Number.isFinite(event.target.value) === false){
    //   this.setState({thongBaoSaiChu: 'Không phải là chữ mà là số'});
    // }
    // else{
      this.setState({attackMoi: Number(event.target.value)});
    //   this.setState({thongBaoSaiChu: ''});
    // }
  }

  vietDefense = (event) => {
  this.setState({defenseMoi: Number(event.target.value)});
  }
  vietSp_atk = (event) => {
  this.setState({sp_atkMoi: Number(event.target.value)});
  }
  vietSp_def = (event) => {
  this.setState({sp_defMoi: Number(event.target.value)});
  }
  vietSpeed = (event) => {
  this.setState({speedMoi: Number(event.target.value)});
  }
  vietHeightM = (event) => {
  this.setState({heightMMoi: Number(event.target.value)});
  }
  vietWeightKG = (event) => {
  this.setState({weightKGMoi: Number(event.target.value)});
  }
  vietEvo_from = (event) => {
  this.setState({evo_fromMoi: event.target.value});
  }
  vietEvo_to = (event) => {
  this.setState({evo_toMoi: event.target.value});
  }

  suaPokemon = (id) =>{
    var thongTinPokemonSua = {
      name: this.state.tenMoi,
      number: this.state.numberMoi,
      type: this.state.typeMoi,
      hp: this.state.hpMoi,
      attack: this.state.attackMoi,
      defense: this.state.defenseMoi,
      sp_atk: this.state.sp_atkMoi,
      sp_def: this.state.sp_defMoi,
      speed: this.state.speedMoi,
      heightM: this.state.heightMMoi,
      weightKG: this.state.weightKGMoi,
      evo_from: this.state.evo_fromMoi,
      evo_to: this.state.evo_toMoi
    }
    axios.put('http://localhost:5400/suaPokemon/'+id, thongTinPokemonSua)
    .then(res => {
      this.setState({thongBao: res.data});
      this.setState({mauThongBao: 'success'});
    })
    .catch(err => {
      this.setState({mauThongBao: 'danger'});
      if(err.response){
        this.setState({thongBao: err.response.data});
      }
      else if(err.request){
        this.setState({thongBao: 'Có Lỗi, không sửa được, do không nói chuyện được với Server'});
      }
    })
  }

  themMoi = () => {
    var thongTinPokemonMoi = {
      name: this.state.tenMoi,
      number: this.state.numberMoi,
      type: this.state.typeMoi,
      hp: this.state.hpMoi,
      attack: this.state.attackMoi,
      defense: this.state.defenseMoi,
      sp_atk: this.state.sp_atkMoi,
      sp_def: this.state.sp_defMoi,
      speed: this.state.speedMoi,
      heightM: this.state.heightMMoi,
      weightKG: this.state.weightKGMoi,
      evo_from: this.state.evo_fromMoi,
      evo_to: this.state.evo_toMoi, 
    }


    axios.post('http://localhost:5400/themPokemonMoi', thongTinPokemonMoi)
    .then(res => {
      this.setState({thongBao: res.data});
      this.setState({mauThongBao: 'success'});
    })
    .catch(err => {
      this.setState({mauThongBao: 'danger'});
      if(err.response){
        this.setState({thongBao: err.response.data});
      }
      else if(err.request){
        this.setState({thongBao: 'Có Lỗi, không thêm mới được, do không nói chuyện chuyện được với Server'});
      }
    })
  
    
    
    
    



    // axios.get('http://localhost:5400/themPokemonMoi?tenMoi='+this.state.tenMoi
    //   +'&numberMoi'+this.state.numberMoi
    //   +'&typeMoi'+this.state.typeMoi
    //   +'&hpMoi'+this.state.hpMoi
    //   +'&attackMoi'+this.state.attackMoi
    //   +'&defenseMoi'+this.state.defenseMoi
    //   +'&sp_atkMoi'+this.state.sp_atkMoi
    //   +'&sp_defMoi'+this.state.sp_defMoi
    //   +'&speedMoi'+this.state.speedMoi
    //   +'&heightMMoi'+this.state.heightMMoi
    //   +'&weightKGMoi'+this.state.weightKGMoi
    //   +'&evo_fromMoi'+this.state.evo_fromMoi
    //   +'&evo_toMoi'+this.state.evo_toMoi
    // )
  }


  render() {
    const {
      idCu, 
      tenMoi, 
      numberMoi, 
      typeMoi, 
      hpMoi, 
      attackMoi, 
      defenseMoi, 
      sp_atkMoi, 
      sp_defMoi, 
      speedMoi, 
      heightMMoi, 
      weightKGMoi, 
      evo_fromMoi, 
      evo_toMoi, 
      thongBao, 
      mauThongBao, 
      thongBaoSaiChu, 
      soThemType, 
      themArrayType, 
      soThemEvoTo, 
    } = this.state
    const { danhSachSoSanh, danhSachTatCaPokemon,  } = this.props

    return (
      <div className="Admin">
        <br/><br/>
        <Form.Select aria-label="Default select example" onChange={this.chonTenPokemon}>
          <option></option>
          {danhSachTatCaPokemon.map((moiPokemonChonMotCon, index)=>
            // <option value={moiPokemonChonMotCon.name}>{moiPokemonChonMotCon.name}</option>
            <option value={index}>{moiPokemonChonMotCon.name}</option>
          )}
        </Form.Select>
        <br/><br/>
        
        <InputGroup size="sm" className="mb-3" style={{width: '200px'}}>
          Name
          <FormControl 
            onChange={this.vietTen}
            value={tenMoi}
            type="search"
            placeholder="Viết Name mới"
            className="me-2"
            aria-label="Small" 
            aria-describedby="inputGroup-sizing-sm" 
            />
        </InputGroup>

        <InputGroup size="sm" className="mb-3" style={{width: '200px'}}>
          Number
          <FormControl 
            onChange={this.vietNumber}
            value={numberMoi}
            type="search"
            placeholder="Viết Number mới"
            className="me-2"
            aria-label="Small" 
            aria-describedby="inputGroup-sizing-sm" 
          />
          {Number.isFinite(numberMoi) === false
            ?<div class="text-danger">Không phải là số, sửa nó</div>
            :null
          }
        </InputGroup>

        <InputGroup size="sm" className="mb-3" style={{width: '200px'}}>
          Type
          <FormControl 
            onChange={this.vietType}
            value={typeMoi}
            type="search"
            placeholder="Viết Type mới"
            className="me-2"
            aria-label="Small" 
            aria-describedby="inputGroup-sizing-sm" 
          />
          <Form.Select aria-label="Default select example" onChange={this.chonTenPokemon}>
            <option></option>
            {danhSachSucManh.map((moiSucManh, index)=>
            <option value={index}>{moiSucManh}</option>
            )}
          </Form.Select>
          
          {/* {soThemType===1
            ?<div>123</div>
            : null
          }
          {soThemType===2
            ?<div>123<br/>456</div>
            : null
          }
          {soThemType>=3
            ?<div>123<br/>456<br/>789</div>
            : null
          } */}
          
          {themArrayType}
          
          <Button onClick={this.themOChongType}>+</Button>
          <Button onClick={this.botOChongType}>-</Button>
        </InputGroup>
          
        <InputGroup size="sm" className="mb-3" style={{width: '200px'}}>
          Hp
          <FormControl 
            onChange={this.vietHp}
            value={hpMoi}
            type="search"
            placeholder="Viết Hp mới"
            className="me-2"
            aria-label="Small" 
            aria-describedby="inputGroup-sizing-sm" 
          />
          {/* {thongBaoSaiChu} */}
          {Number.isFinite(hpMoi) === false
            ?<div class="text-danger">Không phải là số, sửa nó</div>
            :null
          }
        </InputGroup>

        <InputGroup size="sm" className="mb-3" style={{width: '200px'}}>
          Attack
          <FormControl 
            onChange={this.vietAttack}
            value={attackMoi}
            type="search"
            placeholder="Viết Attack mới"
            className="me-2"
            aria-label="Small" 
            aria-describedby="inputGroup-sizing-sm" 
            />
          {/* {thongBaoSaiChu} */}
          {Number.isFinite(attackMoi) === false
            ?<div class="text-danger">Không phải là số, sửa nó</div>
            :null
          }
        </InputGroup>

        <InputGroup size="sm" className="mb-3" style={{width: '200px'}}>
          Defense
          <FormControl 
            onChange={this.vietDefense}
            value={defenseMoi}
            type="search"
            placeholder="Viết Defense mới"
            className="me-2"
            aria-label="Small" 
            aria-describedby="inputGroup-sizing-sm" 
          />
          {Number.isFinite(defenseMoi) === false
            ?<div class="text-danger">Không phải là số, sửa nó</div>
            :null
          }
        </InputGroup>

        <InputGroup size="sm" className="mb-3" style={{width: '200px'}}>
          Sp.atk
          <FormControl 
            onChange={this.vietSp_atk}
            value={sp_atkMoi}
            type="search"
            placeholder="Viết Sp_atk mới"
            className="me-2"
            aria-label="Small" 
            aria-describedby="inputGroup-sizing-sm" 
          />
          {Number.isFinite(sp_atkMoi) === false
            ?<div class="text-danger">Không phải là số, sửa nó</div>
            :null
          }
        </InputGroup>

        <InputGroup size="sm" className="mb-3" style={{width: '200px'}}>
          Sp.def
          <FormControl 
            onChange={this.vietSp_def}
            value={sp_defMoi}
            type="search"
            placeholder="Viết Sp_def mới"
            className="me-2"
            aria-label="Small" 
            aria-describedby="inputGroup-sizing-sm" 
          />
          {Number.isFinite(sp_defMoi) === false
            ?<div class="text-danger">Không phải là số, sửa nó</div>
            :null
          }
        </InputGroup>

        <InputGroup size="sm" className="mb-3" style={{width: '200px'}}>
          Speed
          <FormControl 
            onChange={this.vietSpeed}
            value={speedMoi}
            type="search"
            placeholder="Viết Speed mới"
            className="me-2"
            aria-label="Small" 
            aria-describedby="inputGroup-sizing-sm" 
          />
          {Number.isFinite(speedMoi) === false
            ?<div class="text-danger">Không phải là số, sửa nó</div>
            :null
          }
        </InputGroup>

        <InputGroup size="sm" className="mb-3" style={{width: '200px'}}>
          HeightM
          <FormControl 
            onChange={this.vietHeightM}
            value={heightMMoi}
            type="search"
            placeholder="Viết HeightM mới"
            className="me-2"
            aria-label="Small" 
            aria-describedby="inputGroup-sizing-sm" 
          />
          {Number.isFinite(heightMMoi) === false
            ?<div class="text-danger">Không phải là số, sửa nó</div>
            :null
          }
        </InputGroup>

        <InputGroup size="sm" className="mb-3" style={{width: '200px'}}>
          WeightKG
          <FormControl 
            onChange={this.vietWeightKG}
            value={weightKGMoi}
            type="search"
            placeholder="Viết WeightKG mới"
            className="me-2"
            aria-label="Small" 
            aria-describedby="inputGroup-sizing-sm" 
          />
          {Number.isFinite(weightKGMoi) === false
            ?<div class="text-danger">Không phải là số, sửa nó</div>
            :null
          }
        </InputGroup>

        <InputGroup size="sm" className="mb-3" style={{width: '200px'}}>
          Evo From
          <FormControl 
            onChange={this.vietEvo_from}
            value={evo_fromMoi}
            type="search"
            placeholder="Viết Evo_from mới"
            className="me-2"
            aria-label="Small" 
            aria-describedby="inputGroup-sizing-sm" 
          />
        </InputGroup>

        <InputGroup size="sm" className="mb-3" style={{width: '200px'}}>
          Evo To
          <FormControl 
            onChange={this.vietEvo_to}
            value={evo_toMoi}
            type="search"
            placeholder="Viết Evo_To mới"
            className="me-2"
            aria-label="Small" 
            aria-describedby="inputGroup-sizing-sm" 
          />
          
          {soThemEvoTo===1
            ?<div>123</div>
            : null
          }
          {soThemEvoTo===2
            ?<div>123<br/>456</div>
            : null
          }
          {soThemEvoTo>=3
            ?<div>123<br/>456<br/>789</div>
            : null
          }

          <Button onClick={this.themOChongEvoTo}>+</Button>
          <Button onClick={this.botOChongEvoTo}>-</Button>
        </InputGroup>


        <Button onClick={      this.themMoi         } disabled={
                                                                  !Number.isFinite(numberMoi) || 
                                                                  !Number.isFinite(hpMoi) || 
                                                                  !Number.isFinite(attackMoi) || 
                                                                  !Number.isFinite(defenseMoi) || 
                                                                  !Number.isFinite(sp_atkMoi) || 
                                                                  !Number.isFinite(sp_defMoi) || 
                                                                  !Number.isFinite(speedMoi) || 
                                                                  !Number.isFinite(heightMMoi) || 
                                                                  !Number.isFinite(weightKGMoi)
                                                                }>Thêm Pokemon</Button>
        <Button onClick={() => this.suaPokemon(idCu)} disabled={
                                                                  !Number.isFinite(numberMoi) || 
                                                                  !Number.isFinite(hpMoi) || 
                                                                  !Number.isFinite(attackMoi) || 
                                                                  !Number.isFinite(defenseMoi) || 
                                                                  !Number.isFinite(sp_atkMoi) || 
                                                                  !Number.isFinite(sp_defMoi) || 
                                                                  !Number.isFinite(speedMoi) || 
                                                                  !Number.isFinite(heightMMoi) || 
                                                                  !Number.isFinite(weightKGMoi)
                                                                }>Sửa Pokemon</Button>
        <br/><br/>
        {thongBao
          ?<Alert variant={mauThongBao}><Alert.Heading>{thongBao}</Alert.Heading></Alert>
          :null
        }
        {
        Number.isFinite(numberMoi) && Number.isFinite(hpMoi) && Number.isFinite(attackMoi) && Number.isFinite(defenseMoi) && Number.isFinite(sp_atkMoi) && 
        Number.isFinite(sp_defMoi) && Number.isFinite(speedMoi) && Number.isFinite(heightMMoi) && Number.isFinite(weightKGMoi)
          ?null
          :<Alert variant='warning'><Alert.Heading>Không thêm hay sửa được, hãy sửa ở trên</Alert.Heading></Alert>
        }
        <br/><br/>
      </div>
    )
  }
}
export default Admin;