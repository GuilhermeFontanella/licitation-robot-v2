import { Service } from "@/app/service/service";
import { CheckLineIcon, CloseIcon, CloseLineIcon, PencilIcon } from "@/icons";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Slide from "@mui/material/Slide";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from "react";

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

const TabOne = (props: TabPanelProps) => {
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
                <Container style={{display: 'flex', alignItems: 'baseline'}}>
                    <TextField 
                    fullWidth={true} 
                    disabled={!fieldEnabled} 
                    id="standard-basic" 
                    label="Api Key" 
                    variant="standard"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)} />
                        {!fieldEnabled && (
                            <Box component="section">
                                    <Tooltip title="Editar Api key">
                                        <IconButton aria-label="edit-button" onClick={() => {setFieldEnabled(!fieldEnabled)}}>
                                            {isLoading ? (
                                                <CircularProgress size={18} />
                                            ) : (
                                                <PencilIcon />
                                            )}
                                        </IconButton>
                                    </Tooltip>
                            </Box>
                        )}
                        {fieldEnabled && (
                            <Box component="section" style={{display: 'flex'}}>
                                <Tooltip title="Salvar">
                                    <IconButton aria-label="edit-button" color="success" onClick={updateApiKey}>
                                        {isLoading ? (
                                                <CircularProgress size={18} />
                                            ) : (
                                                <CheckLineIcon />
                                            )}
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Cancelar">
                                    <IconButton aria-label="edit-button" color="error" onClick={() => {setInputValue(storedApiKey[0].value); setFieldEnabled(false)}}>
                                        {isLoading ? (
                                                <CircularProgress size={18} />
                                            ) : (
                                                <CloseLineIcon />
                                            )}
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        )}
                </Container>
            </Box>
        )}
        <Snackbar
        open={openSnackBar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        slots={{ transition: openSnackBar.Transition}}
        action={
            <IconButton aria-label="edit-button" color="inherit" onClick={() => setOpenSnackBar({...openSnackBar, open: false})}>
                <CloseLineIcon />
            </IconButton>
        }
      />
    </div>
  );
}

export default TabOne;