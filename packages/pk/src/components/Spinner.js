import { Paper, Box, CircularProgress } from '@mui/material';

export default function Spinner () {
    const spinner = {
        justifyContent: 'center', 
        alignItems: 'center', 
        display: 'flex', 
        height: '150px'
    }

    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <Box sx={spinner}>
                <CircularProgress />
            </Box>
        </Paper>
    )

}