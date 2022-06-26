import * as React from 'react';
import style from './NoticeBoard.module.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, deleteData } from '../../Redux/action';
import { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
const axios = require("axios")

export const NoticeBoard = () => {

  const [text, setText] = useState("")

  const navigate = useNavigate()
  
    const tokenStr = localStorage.getItem('token')
    const token = tokenStr ? JSON.parse(tokenStr) : navigate('/signin')

 

    const BaseUrl = `https://crimescheck.herokuapp.com`;

    const user = JSON.parse(localStorage.getItem('users'))
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
   const handleSubmit = async () =>  {
        if(text.length !== 0) {
          const res1 = await axios.post(`${BaseUrl}/post`,{
            user_id : user.user_id,
            notice_text: text,
            date : date,
          }).then((res) => {  
            let url = `${BaseUrl}/posts`
            dispatch(fetchData(url))
            alert("Success!")
          }).catch(err => {
          alert(err.message)
          })
        }
        else{
          alert("Please fill Field!")
        }
        
      }

      const dispatch = useDispatch()
      const { dataObj, loading } = useSelector((store) => store)
      
      useEffect(() => {
        let url = `${BaseUrl}/posts`
        dispatch(fetchData(url))
     }, [])

    const handleDelete = (id) => {
      let url = `${BaseUrl}/post/${id}`
      dispatch(deleteData(url))
  }
  console.log(dataObj.reverse())

    return (
      <div className={style.boardContainer}>
          <div>
            <Typography component="h1" variant="h5">
            Notice Board
            </Typography>
            <Box noValidate sx={{ mt: 1 }}>
              <label>Leave your Message here</label><br></br><br></br>
              <textarea rows="3" cols="50" maxLength="100" onChange={(e) => {setText(e.target.value)}} className={style.textField}></textarea>          
              <Button
              className={style.btn}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 0, mb: 2 }}
                onClick={handleSubmit}
              >
              Submit
              </Button>
              </Box>
              </div>

            <div className={style.post_controller}>

              {/* Loading  */}

              { loading ? <div className={style.spinner_div}>
                  <Box>
                      <CircularProgress />
                  </Box>
                  </div>
                : <div>
                        {dataObj?.map((el) => (
                        <div className={style.feeds}>
                            <div>
                              <div>
                              <Typography component="h1" variant="h6">
                            {el.userdata[0].username} , <span style={{fontSize:"15px"}}>{el.date}</span>
                            </Typography>
                              </div>
                            <div>
                            <Button style={{margin:"auto"}}  onClick={() => handleDelete(el._id)}>
                                  <CloseIcon />
                              </Button>
                            </div>
                            </div>
                            <div>
                            <Typography component="p">
                              {el.notice_text}
                            </Typography>         
                            </div>
                          </div>
                        ))}
                  </div>
            }
              </div>
        </div>
    )
}