import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { InsuranceContainer } from '../Insurance/InsuranceContainer';
import Stack from '@mui/material/Stack';
import { useInsuranceContext } from '../Insurance/InsuranceContext';


export const AppContainer = () => {
  const {totalFee} = useInsuranceContext();

  return (
    <Box sx={{ width: '100%', padding: '0.5rem' }}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={9}>
          <InsuranceContainer />
        </Grid>

        <Grid item xs={3}>
          <Paper
            sx={{
              overflow: "hidden",
              margin: "1rem"
            }}
          >
            <Stack
              direction="column"
              justifyContent='start'
            >
              <Box
                component="p"
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: "#212121",
                  margin: '0 1rem'
                }}
                children="Summary"
              />
              <Box
                component="p"
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 'normal',
                  color: "#212121",
                  margin: '1rem 1rem 0 1rem'
                }}
                children={
                  <div>
                     Creation Date: <strong> xxx </strong>
                  </div>
                }
              />
            <Box
              component="p"
              sx={{
                fontSize: '0.875rem',
                fontWeight: 'normal',
                color: "#212121",
                margin: '1rem'
              }}
              children={
                <div>
                  Fee: <strong> ${totalFee} </strong>
                </div>
              }
            />
          </Stack>
        </Paper>
      </Grid>
    </Grid>
    </Box >
  );
}
