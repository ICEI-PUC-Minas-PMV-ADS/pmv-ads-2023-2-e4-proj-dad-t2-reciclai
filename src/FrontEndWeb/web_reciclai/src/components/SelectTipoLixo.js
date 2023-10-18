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
                <MenuItem value={"Eletrodomestico"}>Eletrodoméstico</MenuItem>
                <MenuItem value={"Eletroportateis"}>Eletroportáteis</MenuItem>
                <MenuItem value={"Monitores"}>Monitores</MenuItem>
                <MenuItem value={"Iluminacao"}>Iluminação</MenuItem>
                <MenuItem value={"Fios_cabos"}>Fios e Cabos</MenuItem>
                <MenuItem value={"Pilhas_baterias"}>Pilhas e baterias</MenuItem>
                <MenuItem value={"Ti_telecomunicacao"}>TI e telecomunicações</MenuItem>
                <MenuItem value={"Paineis_fotovoltaicos"}>Painéis Fotovoltaicos</MenuItem>
            </TextField>

        </Box>
    )
}