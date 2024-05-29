import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Icon } from '@mui/material';

export const StepperBodyThird = () => {
  return (
    <Box
      sx={{
        bgcolor: 'transparent',
        padding: '2rem',
      }}
    >
      <Box
        sx={{
          bgcolor: '#edf7ed',
          padding: '1rem',
          borderRadius: '0.5rem',
        }}
      >
        <Stack
          direction="row"
          justifyContent='start'
        >
          <Icon
            fontSize="medium"
            color="success"
            children={<CheckCircleOutlineOutlinedIcon />}
          />
          <Stack
            direction="column"
            justifyContent='start'
          >
            <Box
              component="p"
              sx={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: "#1d4620",
                margin: '0 1rem'
              }}
              children=" New Insurance Policy Registration Successfully!!!"
            />
            <Box
              component="p"
              sx={{
                fontSize: '1rem',
                fontWeight: 'normal',
                color: "#1d4620",
                margin: '1rem'
              }}
              children={
                <div>
                  Total fee of the policy is: <strong> $1100 </strong>
                </div>
              }
            />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
