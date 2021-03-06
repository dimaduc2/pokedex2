//Phần 1: các Import
import React, { Component } from 'react'
import { Container, Row, Col, Card, Offcanvas } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import axios from 'axios';

class PokeBal extends Component {

//Phần 2: các State
state = {
  danhSachPokeBall:[],
  coLoi:false,
  kichThuoc: 'tiny',
  Name:'',
  Image:'',
  Id:'',
}
  
componentDidMount(){
  axios.get('http://localhost:5400/pokeball')

  .then(res => {
    if(res.data==='Không kết nối với MongoDB'){
      this.setState({coLoi: res.data});
    }
    else{
      this.setState({danhSachPokeBall: res.data});
    }
  })
}


handleClose = () => { 
  this.setState({show: false});
}
handleShow = (nhanTen, nhanImage) => {
  this.setState({show: true});
  this.setState({thongTinPokeBallName: nhanTen});
  this.setState({thongTinPokeBallImage: nhanImage});
}


//Phần 3: các Function
  

  render() {
    const { show, danhSachPokeBall, thongTinPokeBallName, thongTinPokeBallImage } = this.state
    return (
      <div className="PokeBall">
        <br/><br/>

        <Offcanvas show={show} onHide={this.handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              {thongTinPokeBallName}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Image src={thongTinPokeBallImage} width={300} />
          </Offcanvas.Body>
        </Offcanvas>

        <Container>
          <Row>
            {danhSachPokeBall.map((moiPokeBall, index)=>
              <Col>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={moiPokeBall.image} style={{width: '200px'}} onClick={() => this.handleShow(moiPokeBall.name, moiPokeBall.image)} />
                  <Card.Body><Card.Title>
                    {moiPokeBall.name}
                  </Card.Title></Card.Body>
                </Card>
              </Col>
            )}
          </Row>
        </Container>

        {/* <br/><br/><br/><br/><br/><br/>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              {danhSachPokeBall.map((moiPokeBall, index)=>
                <th>
                  <div>
                    <Image src={moiPokeBall.image}></Image>
                    <br/>
                    <b>{moiPokeBall.name}</b>
                  </div>
                </th>
              )}
            </tr>
          </thead>
        </Table> */}

        <br/><br/>
      </div>
    )
  }
}
export default PokeBal;