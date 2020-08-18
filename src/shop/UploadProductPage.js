import React, {useState} from 'react'
import { Typography, Button, } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import FileUpload from '../util/FileUpload'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux'
import { accountService} from '../redux/actions/userActions';
import Axios from 'axios';
//import { useDispatch } from "react-redux"

const Continents = [
    { key: 1, value: 'Africa'},
    { key: 2, value: 'Europe'},
    { key: 3, value: 'Asia'},
    { key: 4, value: 'North America'},
    { key: 5, value: 'South America'},
    { key: 6, value: 'Australia'},
    { key: 7, value: 'Antartica'}
]



function UploadProductPage(props) {

    // const dispatch = useDispatch()
    // const user = accountService.userValue.id
    // dispatch(getById(user));

    const [TitleValue, setTitleValue] = useState('')
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [ContinentsValue, setContinents] = useState(1)
    const [Images, setImages] = useState([])
 
    const onTitleChange = (event) => {
       setTitleValue(event.target.value)
    }

    const onDescriptionChange= (event) => {
        setDescriptionValue(event.target.value)
     }
     const onPriceChange = (event) => {
        setPriceValue(event.target.value)
     }
     const onContinentsChange=(event)=> {
         setContinents(event.target.value)
     }

    const updateImages = (newImages) => {
        console.log(newImages)
        setImages(newImages)
    }

    const baseUrl = 'http://localhost:5000/accounts';

    const onSubmit = (event) => {
       event.preventDefault()

       if(!TitleValue || !DescriptionValue || !PriceValue || !ContinentsValue || !Images){
            return alert("All fields are required")
       }

      
    
       const user = accountService.userValue.id
       const dataToSubmit = {
           writer: user,
           title: TitleValue,
           description: DescriptionValue,
           price: PriceValue,
           images: Images,
           continents: ContinentsValue       
       }
            console.log("data", dataToSubmit)
       Axios.post(`${baseUrl}/product/uploadProduct`, dataToSubmit)
             .then((res) => {
                 if(res.data.success){
                       alert('Upload Successfull')
                       props.history.push('/')
                 }else{
                     alert('Upload Failed')
                 }
             })
    } 

    return (
        <div style={{ maxWidth: '700px', margin:'2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom:'2rem'}}>
                 <Typography variant="h2">Upload Product</Typography>
            </div>
            
            <form onSubmit={onSubmit}>
               {/* dropzone */}
               <FileUpload
               refreshFunction = {updateImages}/>

               <br/>
               <br/>
               <TextField
               label="Title"
               required
               fullWidth
               variant='outlined'
               onChange={onTitleChange}
               value={TitleValue}/>

               <br/>
               <br/>
               <TextField
               label="Description"
               fullWidth
               required
               variant='outlined'
               multiline
               rows="5"
               onChange={onDescriptionChange}
               value={DescriptionValue}/>

               <br/>
               <br/>
               <TextField
               label="Price($)"
               fullWidth
               required
               variant='outlined'
               onChange={onPriceChange}
               value={PriceValue}
               type="number"/>
               <br/>
               <br/>
               <Select value={ContinentsValue} variant="outlined"  onChange={onContinentsChange}>
               {Continents.map(item => 
                    <MenuItem key={item.key} value={item.key}>
                          {item.value}
                    </MenuItem>
               )}      
               </Select>
                <br/>
                <br/>
  
            <Button variant="contained" color="primary" onClick={onSubmit}>
                Submit
            </Button>
            </form>

        </div>
    )
}

const mapStateToProps = (state) => ({
   users: state.user
   
  });

export default connect( mapStateToProps )(UploadProductPage) 
