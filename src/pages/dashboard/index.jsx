import  { useState, useEffect } from "react";
import { Button, Table } from 'reactstrap';
import Modal from "../../component/Modal";
import CurrencyFormat from 'react-currency-format';
import Form from "./form";
import axios from "axios";

const productApiURL = process.env.REACT_APP_PRODUCT_API_URL;

const Dashboard = () => {
  const [headers, setHeader] = useState([])
  const [data, setData] = useState([]);
  const [actionForm, setActionForm] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const handleCreate = () => {
    setActionForm("create");
    setModalVisible(true);
  }

  const handleDelete = async (id) => {
    await axios.delete(`${productApiURL}/${id}`)
    .then(() => {
      const updatedData = data.filter(v => id !== v.id);
      setData(updatedData)
      alert("Terhapus!");
    })
    .catch(err => alert(err))
  }

  const handleEdit = (id) => {
    setUpdateId(id)
    setActionForm("edit")
    setModalVisible(true)
  }

  const getData = async () => {
    await axios.get(`${productApiURL}`)
    .then(({data}) => {
      setData(data)
    })
    .catch(err => alert(err))
  }

  useEffect(() => {
    const header = ['NO', 'NAME', 'DESCRIPTION', 'PRICE', 'STOCK', 'OPTION']
    setHeader(header)
    getData()
  }, [])

  return (
    <div style={{margin:"110px", marginTop:"40px"}}>
      <h4> PRODUCT LIST </h4>
      <br />
      <Button color="primary" onClick={() => handleCreate()} style={{float:"right"}} > Add Data </Button>
      <br />  

      <Table>
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx}>{header} </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <th scope="row"> {idx + 1} </th>
                <td>{row.name}</td>
                <td>{row.description}</td>
                <td><CurrencyFormat value={row.price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></td>
                <td>{row.stock}</td>
              <td>
                <Button onClick={() => handleEdit(row.id)} > Edit</Button>
                  &nbsp;&nbsp;
                <Button color="danger" onClick={() => {if(window.confirm('Delete the item?')) {handleDelete(row.id)}; }} > Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Form */}
      <Modal
        title={`Form ${actionForm} Data`}
        isOpen={modalVisible}
        setOpen={setModalVisible}
        children={
          <Form
            action={actionForm}
            data={data}
            setModalVisible={setModalVisible}
            updateId={updateId}
          />
        }
      />
    </div>
  )
}

export default Dashboard;