import { Box, TextField, MenuItem } from '@mui/material';
import { useState } from 'react';

export const SelectPerfil = () => {

    const [perfil, setPerfil] = useState('');
    const handleChange = (e) => {
       setPerfil(e.target.value) 
       console.log(e.target.value);
    }

    return(
        <Box>
            <TextField 
            label="Perfil"
            variant="standard"
            select
            value={perfil}
            onChange={handleChange}
            fullWidth >
                <MenuItem value={0}>Solicitante</MenuItem>
                <MenuItem value={1}>Coletor</MenuItem>
            </TextField>

        </Box>
    )
}