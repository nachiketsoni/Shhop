import {useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import { updateUserRoleAsync } from '../../../asyncActions/admin/adminUserAction';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#669C96',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
const AdminUserTable = ({rows}) => {
  const dispatch=useDispatch();
  const {user}=useSelector((s)=>s.user);
  const [anchorEl, setAnchorEl]=useState(null);
  const [details,setDetails]=useState(null);
  const [selectedId,setId]=useState(null);
  // console.log(user._id)
  const open=Boolean(anchorEl);
  const handleSelection=(e,data,id)=>{
    setAnchorEl(e.currentTarget);
    setDetails(data);
    setId(id);
  }
  const handleClose=(e,rndm)=>{
    if(selectedId && !rndm){
      let tmp={...details,role:e.target.innerText}
      dispatch(updateUserRoleAsync(selectedId,tmp))

    }
    setAnchorEl(null)
    setDetails(null);
    setId(null);
    
  }

  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 500 }} aria-label="customized table">
      <TableHead>
        <TableRow>
        <StyledTableCell>#</StyledTableCell>
          <StyledTableCell align="right">User Id</StyledTableCell>
          <StyledTableCell align="right">Name</StyledTableCell>
          <StyledTableCell align="right">Username</StyledTableCell>
          <StyledTableCell align="right">Email</StyledTableCell>
          <StyledTableCell align="right">Role</StyledTableCell>

        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row,i) => (
          <StyledTableRow key={row._id}>
             <StyledTableCell component="th" scope="row">{i+1}</StyledTableCell>
            <StyledTableCell align="right" >
              {row._id}
            </StyledTableCell>
            <StyledTableCell align="right">{row.name}</StyledTableCell>
            <StyledTableCell align="right">{row.username}</StyledTableCell>
            <StyledTableCell align="right">{row.email}</StyledTableCell>  
            <StyledTableCell align="right">
            <Button
        id="change-status"
        aria-controls={open ? 'change-status' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        disabled={user._id===row._id?true:false}
        onClick={(e)=>handleSelection(e,{name:row.name,
                                         email:row.email},row._id)}
      >
         {row.role}
            </Button>
             <Menu
      // sx={{boxShadow:'0 0 10px red'}}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={(e)=>{handleClose(e,'surface')}}
        MenuListProps={{
          'aria-labelledby': 'change-status',
        }}
      >
        <MenuItem onClick={(e)=>{handleClose(e)}}>admin</MenuItem>
        <MenuItem onClick={(e)=>{handleClose(e)}}>user</MenuItem>
             </Menu>
              
             </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default AdminUserTable