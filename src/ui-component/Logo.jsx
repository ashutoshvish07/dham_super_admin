// material-ui
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';


// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h1" component="h1" sx={{ color: theme.palette.orange.main }}>
          Dham
        </Typography>
      </Grid>

    </Grid>
  );
};

export default Logo;
