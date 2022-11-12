//Phần 1: các Import
import React, { Component } from 'react'
import logo from './logo.svg';
import { Button, InputGroup, FormControl, Form, Alert, Dropdown, Link, Toast, ToastContainer } from 'react-bootstrap';
import axios from 'axios';


const danhSachSucManh = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 
                      'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy']
                      

class Admin extends Component {
//Phần 2: các State
  state = {
    idCu: '',
    tenMoi: '',
    numberMoi: 0,
    typeMoi: [],
    imageMoi: '',
    hpMoi: 0,
    attackMoi: 0,
    defenseMoi: 0,
    sp_atkMoi: 0,
    sp_defMoi: 0,
    speedMoi: 0,
    heightMMoi: 0,
    weightKGMoi: 0,
    evo_fromMoi: '',
    evo_toMoi: [],
    thongBao: '',
    mauThongBao: '',
    thongBaoSaiChu: '',
  }

  //Phần 3: các Function
  
  themOChongType = () => {
    this.state.typeMoi.push('')
    this.setState({typeMoi: this.state.typeMoi});
  }
  botOChongType = () => {
    this.state.typeMoi.pop()
    this.setState({typeMoi: this.state.typeMoi});
  }
  
  themOChongEvoTo = () => {
    this.state.evo_toMoi.push('')
    this.setState({evo_toMoi: this.state.evo_toMoi});
  }
  botOChongEvoTo = (chuTrongOChong, viThiCuaOChong) => {
    if(chuTrongOChong===''){
      this.state.evo_toMoi.splice(viThiCuaOChong, 1)
      this.setState({evo_toMoi: this.state.evo_toMoi});
    }else{
      var coXoaKhong = window.confirm("Có xóa không?");
      if(coXoaKhong === true){
        this.state.evo_toMoi.splice(viThiCuaOChong, 1)
        this.setState({evo_toMoi: this.state.evo_toMoi});
      }
    }
  }
  

  chonTenPokemon = (event) => {
    // Nếu chọn chống rỗng
    if(event.target.value==='-1'){
      // alert(event.target.value)
      this.setState({idCu: ''});
      this.setState({tenMoi: ''});
      this.setState({numberMoi: 0});
      this.setState({typeMoi: []});
      this.setState({imageMoi: ''});
      this.setState({hpMoi: 0});
      this.setState({attackMoi: 0});
      this.setState({defenseMoi: 0});
      this.setState({sp_atkMoi: 0});
      this.setState({sp_defMoi: 0});
      this.setState({speedMoi: 0});
      this.setState({heightMMoi: 0});
      this.setState({weightKGMoi: 0});
      this.setState({evo_fromMoi: ''});
      this.setState({evo_toMoi: []});
    }else{
      // alert(event.target.value)
      let PokemonChon = this.props.danhSachTatCaPokemon[event.target.value]
      if(this.props.dbChon==='MySQL'){
        this.setState({idCu: PokemonChon.id});
      }
      else if(this.props.dbChon==='Mongo'){
        this.setState({idCu: PokemonChon._id});
      }
      this.setState({tenMoi: PokemonChon.name});
      this.setState({numberMoi: PokemonChon.number});
      this.setState({typeMoi: PokemonChon.type});
      this.setState({imageMoi: PokemonChon.image});
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


  }

  vietTen = (event) => {
    this.setState({tenMoi: event.target.value});
  }
  vietNumber= (event) => {
  this.setState({numberMoi: Number(event.target.value)});
  }
  
  vietType = (event, soViTri) => {
    this.state.typeMoi[soViTri] = event.target.value
    this.setState({typeMoi: this.state.typeMoi});
  }
  
  vietImage = (event) => {
    this.setState({imageMoi: event.target.value});
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

  vietEvo_to = (event, soViTri) => {
    this.state.evo_toMoi[soViTri] = event.target.value
    this.setState({evo_toMoi: this.state.evo_toMoi});
  }
  
  xoaPokemon = (id) => {
    this.props.xoaThongTin(id)
    this.setState({mauThongBao: 'success'});
  }

  suaPokemon = (id) => {
    var thongTinPokemonSua = {
      name: this.state.tenMoi,
      number: this.state.numberMoi,
      type: this.state.typeMoi,
      image: this.state.imageMoi,
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
    alert(this.state.idCu)

    axios.put('http://localhost:5400/suaPokemon/'+id+'?dbChon='+this.props.dbChon, thongTinPokemonSua)
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

    // axios.put('http://localhost:5400/suaPokemon/'+id, thongTinPokemonSua)
    // .then(res => {
    //   this.setState({thongBao: res.data});
    //   this.setState({mauThongBao: 'success'});
    // })
    // .catch(err => {
    //   this.setState({mauThongBao: 'danger'});
    //   if(err.response){
    //     this.setState({thongBao: err.response.data});
    //   }
    //   else if(err.request){
    //     this.setState({thongBao: 'Có Lỗi, không sửa được, do không nói chuyện được với Server'});
    //   }
    // })
  }
  
  themMoi = () => {
    var thongTinPokemonMoi = {
      name: this.state.tenMoi,
      number: this.state.numberMoi,
      type: this.state.typeMoi,
      image: this.state.imageMoi,
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
    axios.post('http://localhost:5400/themPokemonMoi?dbChon='+this.props.dbChon, thongTinPokemonMoi)
    .then(res => {
      this.setState({mauThongBao: 'success'});
      this.setState({thongBao: 'Đã thêm'});
    })
    .catch(err => {
      this.setState({mauThongBao: 'danger'});
      if(err.response){
        this.setState({thongBao: err.response.data});
      }
      else if(err.request){
        this.setState({thongBao: 'Có Lỗi, không thêm mới được, do không nói chuyện được với Server'});
      }
    })


    // axios.post('http://localhost:5400/themPokemonMoi', thongTinPokemonMoi)
    // .then(res => {
    //   this.setState({thongBao: res.data});
    //   this.setState({mauThongBao: 'success'});
    // })
    // .catch(err => {
    //   this.setState({mauThongBao: 'danger'});
    //   if(err.response){
    //     this.setState({thongBao: err.response.data});
    //   }
    //   else if(err.request){
    //     this.setState({thongBao: 'Có Lỗi, không thêm mới được, do không nói chuyện được với Server'});
    //   }
    // })


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

  suaArrayMySQL = () => {
    axios.get('http://localhost:5400/suaArrayMySQL')
  }

  render() {
    const {
      idCu, 
      tenMoi, 
      numberMoi, 
      typeMoi, 
      imageMoi, 
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
    } = this.state
    const { danhSachSoSanh, danhSachTatCaPokemon, thongBaoXoa, mauThongBaoXoa, } = this.props

    return (
      <div className="Admin">
        <br/><br/>
        <Form.Select aria-label="Default select example" onChange={this.chonTenPokemon}>
          <option value={-1}></option>
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
          
          {typeMoi.map((moiArrayType, index)=>
            // moiArrayType === ''
            // ? null
            // :
            <div>
              Type {index+1}
              {/* <FormControl 
                onChange={(event) => this.vietType(event, index)}
                // onChange={this.vietType}
                // value={moiArrayType}
                type="search"
                placeholder="Viết Type mới"
                className="me-2"
                aria-label="Small" 
                aria-describedby="inputGroup-sizing-sm" 
              /> */}
              <Form.Select aria-label="Default select example" value={moiArrayType} onChange={(event) => this.vietType(event, index)}>
                <option></option>
                {danhSachSucManh.map((moiSucManh, index)=>
                  <option value={moiSucManh}>{moiSucManh}</option>
                )}
              </Form.Select>
            </div>
          )}
          
          <Button onClick={this.themOChongType}>+</Button>
          <Button onClick={this.botOChongType}>-</Button>
        </InputGroup>
        {typeMoi.map((moiType, index)=>
          <div>
            {moiType}
          </div>
        )}
        
        <InputGroup size="sm" className="mb-3" style={{width: '200px'}}>
          Image
          <FormControl 
            onChange={this.vietImage}
            value={imageMoi}
            type="search"
            placeholder="Viết Image mới"
            className="me-2"
            aria-label="Small" 
            aria-describedby="inputGroup-sizing-sm" 
          />
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
          {evo_toMoi.map((moiEvo_toMoi, index)=>
            // moiEvo_toMoi === ''
            // ? null
            // :
              <div>
                Evo To {index+1}
                <FormControl 
                  onChange={(event) => this.vietEvo_to(event, index)}
                  value={moiEvo_toMoi}
                  type="search"
                  placeholder="Viết Evo_To mới"
                  className="me-2"
                  aria-label="Small" 
                  aria-describedby="inputGroup-sizing-sm" 
                /><Button onClick={() => this.botOChongEvoTo(moiEvo_toMoi, index)}>X</Button>
              </div>
          )}
          <Button onClick={this.themOChongEvoTo}>Thêm ô chống</Button>
        </InputGroup>

        <Button onClick={       this.themMoi        } disabled={
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
        <Button variant="danger" onClick={() => this.xoaPokemon(idCu)}>X</Button>
        {/* <Button onClick={this.suaArrayMySQL}>Sửa Array</Button> */}
        <br/><br/>

        {thongBao
          ?<Alert variant={mauThongBao}><Alert.Heading>{thongBao}</Alert.Heading></Alert>
          :<div>{thongBaoXoa
            ?<Alert variant={mauThongBaoXoa}><Alert.Heading>{thongBaoXoa}</Alert.Heading></Alert>
            :null
          }</div>
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