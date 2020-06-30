import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { getAll, accountService  } from '../../../../redux/actions/userActions'
import { Typography } from '@material-ui/core';
import { connect } from "react-redux";


class List extends Component {

    state = {
        users: []
    }
    
  
    
    componentDidMount(){    
        this.props.dispatch(getAll())
        .then(res => res.payload)   
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({
            users: nextProps.users.users
        })
    }


    deleteUser = (id) => {
        if(window.confirm('Are you sure to this!')){
            this.props.dispatch(accountService.delete(id))
            .then(() =>{
               this.props.users.users.filter(user => user.id !== id)
            })
        }
         else{
             return
         }
    }

    render (){
     
        return(
<div>
<div>
 <Typography variant='h3'> Accounts Overview </Typography>
    <Link to="/admin/add" className="btn btn-sm btn-success mb-2">Add New Account</Link>
    </div>
<table className="table table-striped">
    <thead>
        <tr>
            <th style={{ width: '30%' }}>Name</th>
            <th style={{ width: '30%' }}>Email</th>
            <th style={{ width: '30%' }}>Role</th>
            <th style={{ width: '10%' }}></th>
        </tr>
    </thead>
    <tbody>
        {this.props.users.users && this.props.users.users.map(user =>
            <tr key={user.id}>
                <td>{user.title} {user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>              
                <td style={{ whiteSpace: 'nowrap' }}>
                    <Link to={`/admin/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                    <button onClick={() => {this.deleteUser(`${user.id}`)}} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={user.isDeleting}>
                        {user.isDeleting 
                            ? <span className="spinner-border spinner-border-sm"></span>
                            : <span>Delete</span>
                        }
                    </button>
                </td>
            </tr>
        )}
        {!this.props.users.users &&
            <tr>
                <td colSpan="4" className="text-center">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                </td>
            </tr>
        }
    </tbody>
</table>
</div>

        )
    }
}



const mapStateToProps = (state) => ({
    users: state.user,
  });

export default  connect(mapStateToProps)(List)