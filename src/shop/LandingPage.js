import React, {useEffect, useState} from 'react'
import FlightTakeoffTwoToneIcon from '@material-ui/icons/FlightTakeoffTwoTone';
import Axios from 'axios'
import Button from '@material-ui/core/Button';
import { Col, Card, Row } from 'antd'
import "antd/dist/antd.css";
import ImageSlider from '../util/ImageSlider';
import CheckBox from '../shop/sections/CheckBox'
import RadioButton from '../shop/sections/RadioButton'
import {continents, price } from '../shop/sections/Data'
import SearchFeature from './sections/SearchFeature';

const {Meta} = Card
 function LandingPage() {
    
    const baseUrl = 'http://localhost:5000/accounts';

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] =useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [SearchTerms, setSearchTerms] = useState("")
    console.log(SearchTerms)
    
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })

    const getProducts = (variables) => {
        Axios.post(`${baseUrl}/products`, variables)
        .then(res => {
            if(res.data.success){
                if(variables.loadMore){
                    setProducts([...Products, ...res.data.products])   
                }else{
                    setProducts(res.data.products)
                }
                  setPostSize(res.data.postSize)
                //   console.log(setLimit)
            }else{
                alert('Error occurred while loading')
            }
        })
    }
    useEffect(() => {

        const variables = {
            skip: Skip,
            limit: Limit
         }
      getProducts(variables) 

    })

   const loadMore = () => {
        let skip = Skip + Limit

        const variables = {
           skip: skip,
           limit: Limit,
           loadMore: true
        }

        getProducts(variables)
        setSkip(skip)
   }

   const renderCards = Products.map((product, index) => {
       return (
           <Col lg={6} md={8} xs={24} key={index}>
               <Card 
               hoverable={true}
               cover = {<a href={`/product/${product._id}`}><ImageSlider images={product.images}/></a>}
               >
                  <Meta
                    title={product.title}
                    description={`$${product.price}`}
                    />
                </Card>
           </Col>
       )
   })

   const handlePrice = (value) => {
       const data = price
       let array = []

       for (let key in data){
           if(data[key]._id === parseInt(value, 10)){
               array = data[key].array
           }
       }
       return array
   }

   const handleFilters = (filters, category) => {
        const newFilters = { ...Filters }

        newFilters[category] = filters
         
        if(category === "price"){
            let priceValues = handlePrice(filters)  
             newFilters[category] = priceValues
        }

        showFilteredResults(newFilters)
        setFilters(newFilters)
   }

    const showFilteredResults = (filters) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters
         }

        getProducts(variables)
        setSkip(0)
    }

    const updateSearchTerms = (newSearchTerm) => {
       

        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
         }
         setSkip(0)
         setSearchTerms(newSearchTerm)

        getProducts(variables)
    }

    return (
       <div style={{width: '80%', margin: '3rem auto'}}>
           <div style={{ textAlign: 'center' }}>
               <h3> Let's Travel Anywhere<FlightTakeoffTwoToneIcon fontSize='large'/></h3>
            </div>
               

               <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                <CheckBox 
                list={continents}
               handleFilters={filters => handleFilters(filters, 'continents')}/> 
               
                </Col>
                <Col lg={12} xs={24}>
                <RadioButton
                list={price}
               handleFilters={filters => handleFilters(filters, 'price')}/> 
                </Col>
               </Row>

               
               <div style={{display: 'flex', justifyContent:'flex-end', margin: '1rem auto'}}>
               <SearchFeature
               refreshFunction={updateSearchTerms}/>
               </div>
             

               {
                     Products.length === 0 ?
                     <div style={{ display:'flex', height:'300px', justifyContent:'center', alignItems:'center'}}>
                         <h2> No products added ....</h2>
                     </div>
                     :
                     <div>
                        <Row gutter={[16,16]}>
                        {renderCards}
                        </Row>
                     </div>
               }
                <br/><br/>
                {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent:'center'}}>
                <Button color='primary' onClick={loadMore}> Load More</Button>
           </div>
        }
           </div>
    )
}

export default LandingPage