import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

export default function CustomizedDialogs({selected, visible, onModal}) {

  const [commetData, setCommetData] = useState([])

  useEffect(() => {
      if(selected){
        onModal(!visible)
        const onGetCommetData = async () => {
            fetch(`https://jsonplaceholder.typicode.com/comments/${selected}`)
              .then((response) => response.json())
              .then((json) => setCommetData(json))
          }
          onGetCommetData()
          onModal(visible)
      }

  }, [selected])


  return (
    <div>
      <BootstrapDialog
        onClose={()=>onModal(!visible)}
        aria-labelledby="customized-dialog-title"
        open={visible}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={()=>onModal(!visible)}
        >
          This is the result
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <table>
              <thead>
                  <tr>
                      <td>name</td>
                      <td>email</td>
                      <td>body</td>
                  </tr>
              </thead>
              <tbody>
              <tr>
                  <td>{commetData.name}</td>
                  <td>{commetData.email}</td>
                  <td>{commetData.body}</td>
            </tr>
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>onModal(!visible)}>
            OK
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  )
}
