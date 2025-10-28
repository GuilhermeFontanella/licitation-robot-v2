import { Service } from "@/app/service/service";
import { CheckLineIcon, CloseIcon, CloseLineIcon, PencilIcon } from "@/icons";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Slide from "@mui/material/Slide";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { TransitionProps } from "@mui/material/transitions";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
const card = (
  <>
    <CardContent style={{background: 'blue'}}>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
        Word of the Day
      </Typography>
      <Typography variant="h5" component="div">
        be{bull}nev{bull}o{bull}lent
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </>
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface IApiKey {
    id: number;
    value: string;
    user_id: string;
    description: string;
    createdAt: any;
}

const TabTwo = (props: TabPanelProps) => {
    const service: Service = new Service();
  const { children, value, index, ...other } = props;
  const [fieldEnabled, setFieldEnabled] = useState<boolean>(false);
  const [storedApiKey, setStoredApiKey] = useState<IApiKey[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openSnackBar, setOpenSnackBar] = useState<{
    open: boolean;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    Transition: Slide,
  });
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const getApiKeys = async () => {
    setIsLoading(true);
    setFieldEnabled(false);
    try {
        const response = await service.getApiKey();
        setStoredApiKey(response);
        setInputValue(response[0].value)
    } catch (err: any) {
        throw Error(err);
    } finally {
        setIsLoading(false);
    }
  }

  useEffect(() => {
    getApiKeys();
  }, []);

  const updateApiKey = async () => {
    setIsLoading(true);
    setFieldEnabled(false);
    try {
        const id = storedApiKey[0].id;
        const response = await service.updateApiKey(String(id), {...storedApiKey[0], value: inputValue});
        setSnackbarMessage("Api key salva com sucesso!")
        setOpenSnackBar({...openSnackBar, open: true});
        getApiKeys();
        return response;
    } catch (err: any) {
        setSnackbarMessage(`Ops, ocorreu um erro: ${err}`)
        throw Error(err);
    } finally {
        setIsLoading(false);
        setFieldEnabled(false);
    }
  }

   const handleCloseSnackbar = () => {
    setOpenSnackBar({
      ...openSnackBar,
      open: false,
    });
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
        {
            value === index && (
            <Box sx={{ p: 3 }}>
              <Grid container spacing={2}>
                <Grid size={8}>
                  {card}
                </Grid>
                <Grid size={4}>
                  {card}
                </Grid>
                <Grid size={4}>
                  {card}
                </Grid>
                <Grid size={8}>
                  {card}
                </Grid>
              </Grid>
            </Box>
        )}
        <Snackbar
        open={openSnackBar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        slots={{ transition: openSnackBar.Transition}}
        action={
            <IconButton aria-label="edit-button" color="inherit" onClick={updateApiKey}>
                <CloseLineIcon />
            </IconButton>
        }
      />
    </div>
  );
}

export default TabTwo;