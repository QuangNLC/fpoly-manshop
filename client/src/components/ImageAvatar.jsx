import React from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import img from '../assets/imgs/avt.png'

const ImageAvatar = ({ src }) => {
    return (
        <Stack direction="row" spacing={2}>
            <Avatar alt="" src={img} />
        </Stack>
    );
}

export default ImageAvatar