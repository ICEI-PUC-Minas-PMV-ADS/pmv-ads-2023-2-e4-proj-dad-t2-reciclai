import { Box, TextField, MenuItem } from '@mui/material';
import { useState } from 'react';

export const SelectTipoLixo = () => {

    const [tipoLixo, setTipoLixo] = useState('');
    const handleChange = (e) => {
       setTipoLixo(e.target.value) 
    }

    return(
        <Box>
            <TextField 
            label="Tipo de Lixo"
            variant="standard"
            select
            value={tipoLixo}
            onChange={handleChange}
            fullWidth >
                <MenuItem value={0}>Eletrodoméstico</MenuItem>
                <MenuItem value={1}>Eletroportáteis</MenuItem>
                <MenuItem value={2}>Monitores</MenuItem>
                <MenuItem value={3}>Iluminação</MenuItem>
                <MenuItem value={4}>Fios e Cabos</MenuItem>
                <MenuItem value={5}>Pilhas e baterias</MenuItem>
                <MenuItem value={6}>TI e telecomunicações</MenuItem>
                <MenuItem value={7}>Painéis Fotovoltaicos</MenuItem>
            </TextField>

        </Box>
    )
}