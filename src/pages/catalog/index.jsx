import React, { useState, useEffect } from 'react'
import { Button, Col, Label, Row } from 'reactstrap'
import CurrencyFormat from 'react-currency-format';
import axios from 'axios';

const productApiURL = process.env.REACT_APP_PRODUCT_API_URL;

const Catalog = () => {
  const [data, setData] = useState([]);

  const buy = () => {
    alert("Silahkan lanjutkan pembayaran");
  }

  const add = () => {
    alert("Barang ditambahkan ke keranjang");
  }

  const getData = async () => {
    await axios.get(`${productApiURL}`)
    .then(({data}) => {
      setData(data)
    })
    .catch(err => alert(err))
  }

  useEffect(() => {
    getData()
    // ... another func
  }, [])

  return (
    <div>
      <h3 className='catalog-title'>Product List</h3>
      <Row style={{marginLeft:"100px" ,marginRight:"100px", marginTop:"20px"}} >
        {data.map((row, idx) => (
          <Col style={{marginLeft:"3px", marginTop:"3px", marginBottom :"20px" }} key={idx}>
            <div className="card">
              <img className='card-img' src={`https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg}`} width={390} height={200} />
              <hr style={{marginBottom:"3px"}}/>
                <Label className='card-title'>{row.name}</Label>
                <Label className='card-category'>{row.description}</Label> 
                <Label className='card-info'>Lorem ipsum dolor sit amet</Label>
                
                <a href={`/products/${row.id}`} style={{float:"left", marginLeft:"10px"}} > More Info</a> 
                <hr/>          
                <CurrencyFormat className='card-price' style={{float:"right", marginTop:"3px"}} value={row.price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} />
                
                <div style={{marginRight:"10px",  marginBottom:"10px"}}>
                  <Button color='danger' onClick={add} style={{float:"left", marginLeft:"73px"}}> Add </Button>  
                  <Button color='primary' onClick={buy} style={{float:"right"}}> Buy </Button>                 
                </div>
              
            </div>
          </Col>
        ))
        }
      </Row>
    </div >
  )
}

export default Catalog