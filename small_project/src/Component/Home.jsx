import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUsersAPI, editUsersAPI, loginUsersAPI } from '../Redux/action';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginUsersAPI())
      .then(res => setUsers(res.payload))
      .catch(err => console.log(err));
  }, [dispatch]);

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setOpenEditDialog(true);
  };

  const handleDeleteClick = (obj) => {
    dispatch(deleteUsersAPI(obj))
      .then(res => setUsers(res.payload))
      .catch(err => console.log(err))
  };

  const handleSaveEdit = () => {
    console.log(selectedRow);
    dispatch(editUsersAPI(selectedRow))
      .then(res => {
        res.type === "users/editUsersAPI/fulfilled" && (setUsers(res.payload), setOpenEditDialog(false))
      })
      .catch(err => console.log(err))
  };

  const handleChange = (e) => {
    setSelectedRow({ ...selectedRow, [e.target.name]: e.target.value });

  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, },
    { field: 'username', headerName: 'UserName', width: 130 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'companyName', headerName: 'Company Name', width: 180 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 70,
      sortable: false,
      renderCell: (params) => (
        <>
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => handleEditClick(params.row)}
          />
        </>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 70,
      sortable: false,
      renderCell: (params) => (
        <>
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(params)}
          />
        </>
      ),
    },
  ];

  const rows = users.map(user => ({
    id: user.id,
    username: user.username,
    name: user.name,
    companyName: user.company.name,
  }));

  return (
    <div>
      <div className='flex justify-center items-center shadow-xl rounded-b-3xl'>
        <h1 className='m-[.5em] text-[2em]'>USER-LIST</h1>
      </div>
      <div style={{ height: 400, width: '100%', marginTop: '1em' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="username"
            label="Username"
            type="text"
            fullWidth
            value={selectedRow?.username || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={selectedRow?.name || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="companyName"
            label="Company Name"
            type="text"
            fullWidth
            value={selectedRow?.companyName || ''}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
