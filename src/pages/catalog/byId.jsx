import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../usefetch';
import { Label } from 'reactstrap'
import CurrencyFormat from 'react-currency-format'

const CatalogByID = () =>{
    const {id} = useParams();
    const {data :products, error, isPending} = useFetch ('http://localhost:8080/products/' + id);


    return (
        <div className='test' style={{marginLeft:"100px", marginRight:"100px"}} >
            <h2 style={{marginTop:"30px", marginBottom:"20px"}}>Product Info</h2>
            { isPending && <div style={{margin: "auto", width: "60%" , padding:"10px"}} >Loading... </div>}
            { error && <div> {error} </div>}
            { products && (
                <div className="card" >
                    <img className='card-img' src={`https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg`}/>
                    <hr/>
                    <Label className='card-title'> {products.name}</Label>
                    <Label className='card-category'>{products.description}</Label>
                    <Label className='card-info'>Lorem ipsum dolor sit amet</Label>
                    <CurrencyFormat className='card-price'value={products.price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} />
                    
                </div>
            )}
        </div>
    )
}

export default CatalogByID