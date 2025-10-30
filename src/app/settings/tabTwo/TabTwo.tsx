import { Service } from "@/app/service/service";
import ComponentCard from "@/components/common/ComponentCard";
import { CloseLineIcon } from "@/icons";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useRef, useState } from "react";
import styles from '@/app/settings/tabTwo/styles.module.css';

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
  const [storedPrompts, setStoredPrompts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
  const descriptionElementRef = useRef<HTMLElement>(null);
  const [promptSelected, setPromptSelected] = useState<any | null>(null);
  const [inputDialog, setInputDialog] = useState<string>('');
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

  const getPrompts = async () => {
    setIsLoading(true);
    try {
        const response = await service.getPropmts();
        setStoredPrompts(response);
    } catch (err: any) {
        throw Error(err);
    } finally {
        setIsLoading(false);
    }
  }

  const updatePrompts = async () => {
    setIsLoading(true);
    try {
      const id = promptSelected.id;
      const response = await service.updatePropmts(String(id), {...promptSelected, value: inputDialog});
      setSnackbarMessage("Prompt salvo com sucesso!")
      setOpenSnackBar({...openSnackBar, open: true});
      getPrompts();
      handleCloseDialog();
      return response;
    } catch (err: any) {
      throw Error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPrompts();
  }, []);

   const handleCloseSnackbar = () => {
    setOpenSnackBar({
      ...openSnackBar,
      open: false,
    });
  };

  const handleClickOpenDialog = (prompt: any) => {
    setOpenDialog(true);
    setScroll('paper');
    setPromptSelected(prompt);
    setInputDialog(prompt.value);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  useEffect(() => {
    if (openDialog) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openDialog]);

  return (
    <>
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
              {storedPrompts.map((e: any) => (
                <Grid size={6} key={e.id}>
                  <ComponentCard 
                    title={e.nickname} 
                    key={0}
                    headerButton={
                    
                      <div className="flex items-center gap-5">
                        <Button  size="small" variant="text" onClick={() => handleClickOpenDialog(e)} >
                            Editar
                          </Button>
                      </div>
                    
                    }>
                      <div className={`${styles.prompCard} flex flex-row grid grid-cols-12 justify-between items-center w-full gap-6 xl:flex-row`}>
                        <div className="col-span-12">
                          <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                              Descrição
                            </p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                              {e.value}
                            </p>
                          </div>

                        </div>
                      </div>
                    </ComponentCard>
                </Grid>
              ))}
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
              <IconButton aria-label="edit-button" color="inherit" onClick={() => setOpenSnackBar({...openSnackBar, open: false})}>
                  <CloseLineIcon />
              </IconButton>
          }
        />
      </div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth={'lg'}
      >
        <DialogTitle id="scroll-dialog-title">{promptSelected?.nickname}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            style={{width: '800px'}}
          >
            <TextField style={{width: '100%'}}
              id="filled-textarea"
              label="Prompt"
              placeholder="Insira o seu prompt aqui"
              multiline
              variant="filled"
              value={inputDialog}
              fullWidth={true}
              onChange={(value) => setInputDialog(value.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog()}>Cancelar</Button>
          <Button onClick={() => updatePrompts()}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TabTwo;